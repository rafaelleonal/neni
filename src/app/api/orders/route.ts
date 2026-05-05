import { NextResponse } from "next/server";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { db, orderItems, orders, products, stores, user } from "@/db";
import { expandLocationLink } from "@/lib/maps";
import { notifySellerNewOrder } from "@/lib/notifications";

const itemSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().positive(),
});

const bodySchema = z.object({
  storeSlug: z.string().min(1),
  customerName: z.string().min(1).max(80),
  customerPhone: z.string().min(1).max(40),
  address: z.string().max(160).optional().nullable(),
  locationLink: z.string().url().max(500).optional().nullable(),
  notes: z.string().max(240).optional().nullable(),
  payment: z.enum(["card", "oxxo", "spei", "cash"]),
  items: z.array(itemSchema).min(1),
});

const PAYMENT_LABELS: Record<
  z.infer<typeof bodySchema>["payment"],
  string
> = {
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

  // 2. Traer los productos referenciados (sólo los que pertenecen a esta tienda
  //    y son visibles, para evitar comprar productos ocultos).
  const productIds = data.items.map((i) => i.productId);
  const dbProducts = await db.query.products.findMany({
    where: and(
      eq(products.storeId, store.id),
      eq(products.visible, true),
      inArray(products.id, productIds)
    ),
  });
  if (dbProducts.length === 0) {
    return NextResponse.json(
      { error: "NO_VALID_PRODUCTS" },
      { status: 400 }
    );
  }

  // 3. Calcular totales con precios "snapshot" del momento de la compra.
  const lines = data.items
    .map((item) => {
      const product = dbProducts.find((p) => p.id === item.productId);
      if (!product) return null;
      return {
        productId: product.id,
        nameSnapshot: product.name,
        priceSnapshot: product.price,
        qty: item.qty,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  if (lines.length === 0) {
    return NextResponse.json(
      { error: "NO_VALID_PRODUCTS" },
      { status: 400 }
    );
  }

  const total = lines
    .reduce((sum, l) => sum + Number(l.priceSnapshot) * l.qty, 0)
    .toFixed(2);

  // 4. Si el cliente pegó un shortlink (`maps.app.goo.gl/...`), resolverlo a
  //    URL canónica con `lat,lng` para poder mostrar el mapa embebido.
  const rawLocationLink = data.locationLink?.trim() || null;
  const locationLink = rawLocationLink
    ? await expandLocationLink(rawLocationLink)
    : null;

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

  // 5. Notificar al seller por WhatsApp (best-effort, no bloquea el response).
  if (createdOrder?.number) {
    const owner = await db.query.user.findFirst({
      where: eq(user.id, store.ownerUserId),
      columns: { phoneNumber: true },
    });
    if (owner?.phoneNumber) {
      await notifySellerNewOrder({
        sellerPhone: owner.phoneNumber,
        storeName: store.name,
        orderNumber: createdOrder.number,
        customerName: data.customerName.trim(),
        total: Number(total),
        payment: PAYMENT_LABELS[data.payment],
      });
    }
  }

  // 6. Devolver el id para que el cliente navegue al tracking.
  return NextResponse.json({ ok: true, orderId }, { status: 201 });
}
