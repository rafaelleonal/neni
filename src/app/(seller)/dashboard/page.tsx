import Link from "next/link";
import { ORDER_STATE_STYLE, RECENT_ORDERS } from "@/lib/mocks";

import { BellIcon } from "@/components/neni-icons";

const RECENT_LIMIT = 4;

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <Header />
      <StoreStatus />
      <KpiGrid />
      <RecentOrders />
    </div>
  );
}

function Header() {
  return (
    <header className="mb-6 flex items-center gap-3">
      <div>
        <div className="text-td-mute text-xs">Hola,</div>
        <div className="text-lg font-semibold lg:text-xl">Memo 👋</div>
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
          TM
        </div>
      </div>
    </header>
  );
}

function StoreStatus() {
  return (
    <div className="border-td-line mb-4 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3">
      <div className="bg-td-accent h-2 w-2 rounded-full shadow-[0_0_0_3px_rgba(31,170,89,0.18)]" />
      <div className="flex-1">
        <div className="text-sm font-semibold">Tu tienda está abierta</div>
        <div className="text-td-mute text-xs">neni.mx/tacosdonmemo</div>
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

function KpiGrid() {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:mb-8 lg:grid-cols-4">
      <KpiToday />
      <KpiOrders />
      <KpiWeek />
      <KpiCustomers />
    </div>
  );
}

function KpiToday() {
  return (
    <div className="bg-td-ink text-td-bg relative overflow-hidden rounded-2xl p-4 lg:p-5">
      <div className="text-[11px] font-semibold tracking-[1.2px] uppercase opacity-60">
        Hoy
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        $2,840
      </div>
      <div className="mt-1 text-[11px] opacity-60">↑ 18% vs ayer</div>
      <svg width="100%" height="24" viewBox="0 0 100 24" className="mt-3">
        <path
          d="M0 18 L14 14 L28 16 L42 10 L56 12 L70 6 L84 8 L100 2"
          stroke="var(--td-accent)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

function KpiOrders() {
  const bars = [5, 8, 4, 9, 6, 11, 14];
  const max = Math.max(...bars);
  return (
    <div className="border-td-line rounded-2xl border bg-white p-4 lg:p-5">
      <div className="text-td-mute text-[11px] font-semibold tracking-[1.2px] uppercase">
        Pedidos
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        14
      </div>
      <div className="text-td-mute mt-1 text-[11px]">3 nuevos</div>
      <div className="mt-3 flex h-[22px] items-end gap-0.5">
        {bars.map((value, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${(value / max) * 100}%`,
              background:
                i === bars.length - 1 ? "var(--td-ink)" : "var(--td-line)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function KpiWeek() {
  return (
    <div className="border-td-line hidden rounded-2xl border bg-white p-4 lg:block lg:p-5">
      <div className="text-td-mute text-[11px] font-semibold tracking-[1.2px] uppercase">
        Semana
      </div>
      <div className="mt-1 font-mono text-2xl font-semibold tracking-[-1px] lg:text-3xl">
        $18,420
      </div>
      <div className="text-td-accent mt-1 text-[11px] font-semibold">
        ↑ 22% vs anterior
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
        28
      </div>
      <div className="text-td-mute mt-1 text-[11px]">5 nuevos esta semana</div>
    </div>
  );
}

function RecentOrders() {
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
        {RECENT_ORDERS.slice(0, RECENT_LIMIT).map((order) => {
          const style = ORDER_STATE_STYLE[order.state];
          return (
            <button
              key={order.id}
              type="button"
              className="border-td-line hover:border-td-mute flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-colors"
            >
              <div className="bg-td-bg text-td-mute grid h-10 w-10 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold">
                {order.id.replace("#", "")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{order.who}</div>
                <div className="text-td-mute text-xs">{order.items}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-sm font-semibold">
                  ${order.total}
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
            </button>
          );
        })}
      </div>
    </section>
  );
}
