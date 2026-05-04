import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { db, orderItems, orders } from "@/db";
import { getCurrentStore } from "@/lib/seller";

import { OrderDetailPage } from "./_components/order-detail";

type Params = { id: string };

function parseOrderNumber(raw: string): number | null {
  const decoded = decodeURIComponent(raw).replace(/^#/, "");
  const n = Number(decoded);
  return Number.isInteger(n) && n > 0 ? n : null;
}

function formatRelativeTime(iso: Date): string {
  const diff = Date.now() - iso.getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Hace un momento";
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days} d`;
  return iso.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Pedido #${id} · Neni`,
  };
}

export default async function PedidoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const number = parseOrderNumber(id);
  if (number === null) notFound();

  const { store } = await getCurrentStore();

  const order = await db.query.orders.findFirst({
    where: and(eq(orders.storeId, store.id), eq(orders.number, number)),
  });
  if (!order) notFound();

  const items = await db.query.orderItems.findMany({
    where: eq(orderItems.orderId, order.id),
  });

  const idLabel = `#${order.number.toString().padStart(4, "0")}`;
  const itemCount = items.reduce((sum, it) => sum + it.qty, 0);

  return (
    <OrderDetailPage
      storeName={store.name}
      order={{
        id: idLabel,
        who: order.customerName,
        items: `${itemCount} ${itemCount === 1 ? "producto" : "productos"}`,
        total: Number(order.total),
        state: order.state,
        time: formatRelativeTime(order.createdAt),
        phone: order.customerPhone,
        address: order.address ?? undefined,
        notes: order.notes ?? undefined,
        payment: order.payment,
        lines: items.map((it) => ({
          name: it.nameSnapshot,
          qty: it.qty,
          price: Number(it.priceSnapshot),
        })),
      }}
    />
  );
}
