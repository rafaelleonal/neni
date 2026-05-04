import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { db, orderItems, orders, stores } from "@/db";
import { getPublicStorefront } from "@/lib/storefront";

import { OrderTrackingPage } from "./_components/order-tracking-page";

type Params = { tienda: string; id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tienda, id } = await params;
  const store = await getPublicStorefront(tienda);
  return {
    title: store ? `Pedido #${id} · ${store.name}` : `Pedido #${id} · Neni`,
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tienda, id } = await params;
  const store = await getPublicStorefront(tienda);
  if (!store) notFound();

  // Localiza la tienda real (no el storefront público) para tener su id.
  const storeRow = await db.query.stores.findFirst({
    where: eq(stores.slug, tienda),
  });
  if (!storeRow) notFound();

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.id, id), eq(orders.storeId, storeRow.id)),
  });
  if (!order) notFound();

  const items = await db.query.orderItems.findMany({
    where: eq(orderItems.orderId, order.id),
  });

  return (
    <OrderTrackingPage
      store={store}
      order={{
        id: order.id,
        number: order.number,
        state: order.state,
        total: order.total,
        customerName: order.customerName,
        notes: order.notes,
        address: order.address,
        payment: order.payment,
        createdAt: order.createdAt.toISOString(),
        items: items.map((it) => ({
          id: it.id,
          name: it.nameSnapshot,
          price: it.priceSnapshot,
          qty: it.qty,
        })),
      }}
    />
  );
}
