import Link from "next/link";
import { and, eq, gte, sql } from "drizzle-orm";

import { db, orders, products } from "@/db";
import { ORDER_STATE_STYLE, type OrderState } from "@/lib/mocks";
import { getCurrentStore, nameToInitials } from "@/lib/seller";
import { formatPrice } from "@/lib/utils";

import { BellIcon } from "@/components/neni-icons";

const RECENT_LIMIT = 4;

export default async function DashboardPage() {
  const { store } = await getCurrentStore();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [todayAgg] = await db
    .select({
      total: sql<string>`coalesce(sum(${orders.total}), 0)`.as("total"),
      count: sql<number>`count(*)::int`.as("count"),
    })
    .from(orders)
    .where(
      and(eq(orders.storeId, store.id), gte(orders.createdAt, startOfToday))
    );

  const [allTimeAgg] = await db
    .select({
      total: sql<number>`count(*)::int`.as("total"),
      newOnes:
        sql<number>`count(*) filter (where ${orders.state} = 'nuevo')::int`.as(
          "newOnes"
        ),
    })
    .from(orders)
    .where(eq(orders.storeId, store.id));

  const [productCount] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.storeId, store.id));

  const recentOrders = await db.query.orders.findMany({
    where: eq(orders.storeId, store.id),
    orderBy: (o, { desc }) => [desc(o.createdAt)],
    limit: RECENT_LIMIT,
  });

  const todayTotal = Number(todayAgg?.total ?? 0);
  const todayCount = Number(todayAgg?.count ?? 0);
  const ordersTotal = Number(allTimeAgg?.total ?? 0);
  const ordersNew = Number(allTimeAgg?.newOnes ?? 0);
  const totalProducts = Number(productCount?.n ?? 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <Header storeName={store.name} />
      <StoreStatus slug={store.slug} />
      <KpiGrid
        todayTotal={todayTotal}
        todayCount={todayCount}
        ordersTotal={ordersTotal}
        ordersNew={ordersNew}
        productCount={totalProducts}
      />
      <RecentOrders rows={recentOrders} />
    </div>
  );
}

function Header({ storeName }: { storeName: string }) {
  const initials = nameToInitials(storeName);
  const firstWord = storeName.split(/\s+/)[0] ?? storeName;
  return (
    <header className="mb-6 flex items-center gap-3">
      <div>
        <div className="text-td-mute text-xs">Hola,</div>
        <div className="text-lg font-semibold lg:text-xl">{firstWord} 👋</div>
      </div>
      <div className="ml-auto flex gap-2">
        <button
          type="button"
          aria-label="Notificaciones"
          className="border-td-line relative grid h-10 w-10 place-items-center rounded-xl border bg-white"
        >
          <BellIcon size={18} />
          <span className="bg-td-accent absolute top-2 right-2 h-1.5 w-1.5 rounded-full ring-2 ring-white" />
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#E9E3D4] font-mono text-sm font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}

function StoreStatus({ slug }: { slug: string }) {
  return (
    <div className="border-td-line mb-4 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
      <div className="bg-td-accent h-2 w-2 rounded-full shadow-[0_0_0_3px_rgba(31,170,89,0.18)]" />
      <div className="flex-1">
        <div className="text-sm font-semibold">Tu tienda está abierta</div>
        <div className="text-td-mute text-xs">neni.mx/{slug}</div>
      </div>
      <button
        type="button"
        aria-label="Cerrar tienda"
        className="bg-td-accent relative h-6 w-10 shrink-0 rounded-full"
      >
        <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white" />
      </button>
    </div>
  );
}

type KpiGridProps = {
  todayTotal: number;
  todayCount: number;
  ordersTotal: number;
  ordersNew: number;
  productCount: number;
};

function KpiGrid({
  todayTotal,
  todayCount,
  ordersTotal,
  ordersNew,
  productCount,
}: KpiGridProps) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:mb-8 lg:grid-cols-4">
      <KpiToday total={todayTotal} count={todayCount} />
      <KpiOrders total={ordersTotal} newCount={ordersNew} />
      <KpiProducts count={productCount} />
      <KpiCustomers />
    </div>
  );
}

function KpiToday({ total, count }: { total: number; count: number }) {
  return (
    <div className="bg-td-ink text-td-bg relative overflow-hidden rounded-2xl p-4 lg:p-5">
      <div className="text-[11px] font-semibold tracking-[1.2px] uppercase opacity-60">
        Hoy
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        {formatPrice(total)}
      </div>
      <div className="mt-1 text-[11px] opacity-60">
        {count === 0
          ? "Aún sin pedidos hoy"
          : `${count} ${count === 1 ? "pedido" : "pedidos"} hoy`}
      </div>
    </div>
  );
}

function KpiOrders({
  total,
  newCount,
}: {
  total: number;
  newCount: number;
}) {
  return (
    <div className="border-td-line rounded-2xl border bg-white p-4 lg:p-5">
      <div className="text-td-mute text-[11px] font-semibold tracking-[1.2px] uppercase">
        Pedidos
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        {total}
      </div>
      <div className="text-td-mute mt-1 text-[11px]">
        {newCount === 0 ? "Sin nuevos" : `${newCount} sin atender`}
      </div>
    </div>
  );
}

function KpiProducts({ count }: { count: number }) {
  return (
    <div className="border-td-line hidden rounded-2xl border bg-white p-4 lg:block lg:p-5">
      <div className="text-td-mute text-[11px] font-semibold tracking-[1.2px] uppercase">
        Productos
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        {count}
      </div>
      <div className="text-td-mute mt-1 text-[11px]">
        {count === 0 ? "Empieza agregando uno" : "En tu catálogo"}
      </div>
    </div>
  );
}

function KpiCustomers() {
  return (
    <div className="border-td-line hidden rounded-2xl border bg-white p-4 lg:block lg:p-5">
      <div className="text-td-mute text-[11px] font-semibold tracking-[1.2px] uppercase">
        Clientes
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        —
      </div>
      <div className="text-td-mute mt-1 text-[11px]">Pronto disponible</div>
    </div>
  );
}

type RecentOrderRow = {
  id: string;
  number: number;
  customerName: string;
  state: OrderState;
  total: string;
};

function RecentOrders({
  rows,
}: {
  rows: ReadonlyArray<RecentOrderRow>;
}) {
  if (rows.length === 0) {
    return (
      <section>
        <h2 className="mb-3 text-base font-semibold lg:text-lg">
          Pedidos recientes
        </h2>
        <div className="border-td-line text-td-mute rounded-2xl border border-dashed bg-white px-6 py-8 text-center text-sm">
          Cuando alguien compre en tu tienda, sus pedidos aparecerán aquí.
        </div>
      </section>
    );
  }
  return (
    <section>
      <div className="mb-3 flex items-center">
        <h2 className="text-base font-semibold lg:text-lg">
          Pedidos recientes
        </h2>
        <Link
          href="/pedidos"
          className="text-td-mute hover:text-td-ink ml-auto text-sm"
        >
          Ver todos
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {rows.map((order) => {
          const style = ORDER_STATE_STYLE[order.state];
          const num = order.number.toString().padStart(4, "0");
          return (
            <Link
              key={order.id}
              href={`/pedidos/${num}`}
              className="border-td-line hover:border-td-mute flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-colors"
            >
              <div className="bg-td-bg text-td-mute grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold">
                {num}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{order.customerName}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-semibold">
                  {formatPrice(Number(order.total))}
                </div>
                <div
                  className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase"
                  style={{
                    background: style.bg,
                    color: style.color,
                  }}
                >
                  {style.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
