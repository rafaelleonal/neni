import { desc, eq, sql } from "drizzle-orm";

import { db, orderItems, orders } from "@/db";
import { getCurrentStore } from "@/lib/seller";

import { EMPTY_ORDERS_DEFAULTS, EmptyState } from "@/components/empty-state";

import {
  OrdersList,
  type OrderSummary,
} from "./_components/orders-list";

export default async function PedidosPage() {
  const { store } = await getCurrentStore();

  const rows = await db
    .select({
      id: orders.id,
      number: orders.number,
      customerName: orders.customerName,
      state: orders.state,
      payment: orders.payment,
      total: orders.total,
      createdAt: orders.createdAt,
      itemCount: sql<number>`coalesce(sum(${orderItems.qty}), 0)::int`.as(
        "item_count"
      ),
    })
    .from(orders)
    .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
    .where(eq(orders.storeId, store.id))
    .groupBy(orders.id)
    .orderBy(desc(orders.createdAt));

  const initial: OrderSummary[] = rows.map((r) => ({
    id: r.id,
    number: r.number,
    customerName: r.customerName,
    state: r.state,
    payment: r.payment,
    total: r.total,
    itemCount: Number(r.itemCount ?? 0),
    createdAt: r.createdAt.toISOString(),
  }));

  if (initial.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
        <header className="mb-2">
          <h1 className="text-xl font-semibold lg:text-2xl">Pedidos</h1>
        </header>
        <EmptyState {...EMPTY_ORDERS_DEFAULTS} />
      </div>
    );
  }

  return <OrdersList initial={initial} />;
}
