import { NextResponse } from "next/server";
import { expandLocationLink } from "@/lib/maps";
import { notifySellerNewOrder } from "@/lib/notifications";
import { db, orderItems, orders, products, stores, user } from "@/db";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

// Remove control chars and RTL/zero-width; prevents phishing by injection of line breaks in WhatsApp messages and subtle XSS in displays.
const SAFE_TEXT_RE = /[\u0000-\u001F\u007F\u200B-\u200F\u202A-\u202E]/g;
const safeText = (max: number) =>
  z
    .string()
    .min(1)
    .max(max)
    .transform((s) => s.replace(SAFE_TEXT_RE, "").replace(/\s+/g, " ").trim())
    .refine((s) => s.length > 0, "No puede estar vacío");

const itemSchema = z.object({
  productId: z.string().min(1).max(64),
  qty: z.number().int().positive().max(1000),
});

const bodySchema = z.object({
  storeSlug: z.string().min(1).max(80),
  customerName: safeText(80),
  // E.164 Mexican: +52 + 1 (mobile) + 10 digits.
  customerPhone: z.string().regex(/^\+521\d{10}$/, "Formato MX requerido"),
  address: safeText(160).nullable().optional(),
  // Only http(s). Blocks data:, javascript:, vbscript:, file:, etc.
  locationLink: z
    .string()
    .url()
    .max(500)
    .refine((u) => {
      try {
        return /^https?:$/.test(new URL(u).protocol);
      } catch {
        return false;
      }
    }, "Solo se aceptan URLs http(s)")
    .nullable()
    .optional(),
  notes: safeText(240).nullable().optional(),
  payment: z.enum(["card", "oxxo", "spei", "cash"]),
  items: z.array(itemSchema).min(1).max(50),
});

const PAYMENT_LABELS: Record<z.infer<typeof bodySchema>["payment"], string> = {
  card: "Tarjeta",
  oxxo: "OXXO",
  spei: "SPEI",
  cash: "Efectivo",
};

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_BODY", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // 1. Localizar la tienda por slug.
  const store = await db.query.stores.findFirst({
    where: eq(stores.slug, data.storeSlug),
  });
  if (!store) {
    return NextResponse.json({ error: "STORE_NOT_FOUND" }, { status: 404 });
  }
  if (!store.isOpen) {
    return NextResponse.json({ error: "STORE_CLOSED" }, { status: 409 });
  }
  if (!store.payments.includes(data.payment)) {
    return NextResponse.json(
      { error: "PAYMENT_NOT_ACCEPTED" },
      { status: 400 }
    );
  }

  // 2. Detectar y rechazar IDs duplicados antes de hablar con DB.
  const productIds = data.items.map((i) => i.productId);
  const uniqueIds = new Set(productIds);
  if (uniqueIds.size !== productIds.length) {
    return NextResponse.json({ error: "DUPLICATE_ITEMS" }, { status: 400 });
  }

  // 3. Traer los productos referenciados (sólo los que pertenecen a esta tienda
  //    y son visibles, para evitar comprar productos ocultos).
  const dbProducts = await db.query.products.findMany({
    where: and(
      eq(products.storeId, store.id),
      eq(products.visible, true),
      inArray(products.id, productIds)
    ),
  });

  // 4. Rechazar si CUALQUIER item del pedido no se encontró en la tienda. Antes
  //    filtrábamos silenciosamente — eso permitía mezclar IDs basura/de otra
  //    tienda con uno válido y crear el order ignorando los inválidos.
  if (dbProducts.length !== productIds.length) {
    return NextResponse.json({ error: "INVALID_ITEMS" }, { status: 400 });
  }

  // 5. Calcular totales con precios "snapshot" del momento de la compra.
  const lines = data.items.map((item) => {
    const product = dbProducts.find((p) => p.id === item.productId)!;
    return {
      productId: product.id,
      nameSnapshot: product.name,
      priceSnapshot: product.price,
      qty: item.qty,
    };
  });

  const totalNum = lines.reduce(
    (sum, l) => sum + Number(l.priceSnapshot) * l.qty,
    0
  );
  // Cap defensivo — la columna `numeric(10,2)` desborda en ~$10M; rechazamos
  // mucho antes para evitar que un attacker arme un order absurdo.
  if (!Number.isFinite(totalNum) || totalNum <= 0 || totalNum > 1_000_000) {
    return NextResponse.json({ error: "TOTAL_OUT_OF_RANGE" }, { status: 400 });
  }
  const total = totalNum.toFixed(2);

  // 6. Si el cliente pegó un link de ubicación, lo resolvemos a URL canónica
  //    de Google Maps con `lat,lng`. Si no es un host permitido o no se puede
  //    extraer coords, rechazamos para no guardar URLs arbitrarias en DB.
  const rawLocationLink = data.locationLink?.trim() || null;
  let locationLink: string | null = null;
  if (rawLocationLink) {
    locationLink = await expandLocationLink(rawLocationLink);
    if (!locationLink) {
      return NextResponse.json(
        { error: "INVALID_LOCATION_LINK" },
        { status: 400 }
      );
    }
  }

  // 5. Crear order + items.
  const orderId = crypto.randomUUID();
  const [createdOrder] = await db
    .insert(orders)
    .values({
      id: orderId,
      storeId: store.id,
      customerName: data.customerName.trim(),
      customerPhone: data.customerPhone.trim(),
      address: data.address?.trim() || null,
      locationLink,
      notes: data.notes?.trim() || null,
      state: "nuevo",
      payment: PAYMENT_LABELS[data.payment],
      total,
    })
    .returning({ number: orders.number });

  await db.insert(orderItems).values(
    lines.map((l) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: l.productId,
      nameSnapshot: l.nameSnapshot,
      priceSnapshot: l.priceSnapshot,
      qty: l.qty,
    }))
  );

  if (createdOrder?.number) {
    const orderNumber = createdOrder.number;
    void db.query.user
      .findFirst({
        where: eq(user.id, store.ownerUserId),
        columns: { phoneNumber: true },
      })
      .then((owner) => {
        if (owner?.phoneNumber) {
          return notifySellerNewOrder({
            sellerPhone: owner.phoneNumber,
            storeName: store.name,
            orderNumber,
            customerName: data.customerName.trim(),
            total: Number(total),
            payment: PAYMENT_LABELS[data.payment],
          });
        }
      })
      .catch((err) => {
        console.warn("[orders:notify-seller] background failure:", err);
      });
  }

  return NextResponse.json({ ok: true, orderId }, { status: 201 });
}
