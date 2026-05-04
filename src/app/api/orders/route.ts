import { NextResponse } from "next/server";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

import { db, orderItems, orders, products, stores } from "@/db";

const itemSchema = z.object({
  productId: z.string().min(1),
  qty: z.number().int().positive(),
});

const bodySchema = z.object({
  storeSlug: z.string().min(1),
  customerName: z.string().min(1).max(80),
  customerPhone: z.string().min(1).max(40),
  address: z.string().max(160).optional().nullable(),
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

  // 4. Crear order + items.
  const orderId = crypto.randomUUID();
  await db.insert(orders).values({
    id: orderId,
    storeId: store.id,
    customerName: data.customerName.trim(),
    customerPhone: data.customerPhone.trim(),
    address: data.address?.trim() || null,
    notes: data.notes?.trim() || null,
    state: "nuevo",
    payment: PAYMENT_LABELS[data.payment],
    total,
  });

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

  // 5. Devolver el id para que el cliente navegue al tracking.
  return NextResponse.json(
    { ok: true, orderId },
    { status: 201 }
  );
}
