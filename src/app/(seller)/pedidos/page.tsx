"use client";

import { useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";
import {
  ORDER_STATE_STYLE,
  RECENT_ORDERS,
  type Order,
  type OrderState,
} from "@/lib/mocks";
import { cn, formatPrice } from "@/lib/utils";

import { EMPTY_ORDERS_DEFAULTS, EmptyState } from "@/components/empty-state";
import { SearchIcon } from "@/components/neni-icons";

type Filter = "todos" | OrderState;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "nuevo", label: "Nuevos" },
  { id: "preparando", label: "Preparando" },
  { id: "camino", label: "En camino" },
  { id: "entregado", label: "Entregados" },
];

export default function PedidosPage() {
  const searchParams = useSearchParams();
  const forceEmpty = searchParams?.get("empty") === "1";
  const orders = forceEmpty ? [] : RECENT_ORDERS;

  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      todos: orders.length,
      nuevo: 0,
      preparando: 0,
      camino: 0,
      entregado: 0,
    };
    for (const o of orders) c[o.state]++;
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    return orders
      .filter((o) => (filter === "todos" ? true : o.state === filter))
      .filter((o) => {
        if (query.trim().length === 0) return true;
        const q = query.trim().toLowerCase();
        return (
          o.who.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)
        );
      });
  }, [orders, filter, query]);

  if (orders.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
        <header className="mb-2">
          <h1 className="text-xl font-semibold lg:text-2xl">Pedidos</h1>
        </header>
        <EmptyState {...EMPTY_ORDERS_DEFAULTS} />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <Header total={counts.todos} query={query} onQueryChange={setQuery} />
      <Filters value={filter} onChange={setFilter} counts={counts} />
      {filtered.length === 0 ? (
        <EmptyResults filter={filter} query={query} />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}

function Header({
  total,
  query,
  onQueryChange,
}: {
  total: number;
  query: string;
  onQueryChange: (value: string) => void;
}) {
  return (
    <header className="mb-6">
      <h1 className="text-xl font-semibold lg:text-2xl">Pedidos</h1>
      <div className="text-td-mute mt-0.5 text-xs lg:text-sm">
        {total} pedidos en total
      </div>

      <div className="border-td-line mt-4 flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5">
        <SearchIcon size={16} stroke="var(--td-mute)" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por cliente o número"
          className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent text-sm outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Limpiar búsqueda"
            className="text-td-mute hover:text-td-ink text-lg leading-none"
          >
            ×
          </button>
        )}
      </div>
    </header>
  );
}

function Filters({
  value,
  onChange,
  counts,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
  counts: Record<Filter, number>;
}) {
  return (
    <div className="no-scrollbar -mx-5 mb-3 flex gap-2 overflow-x-auto px-5 md:-mx-8 md:px-8 lg:-mx-10 lg:flex-wrap lg:overflow-visible lg:px-10">
      {FILTERS.map((f) => {
        const active = value === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onChange(f.id)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              active
                ? "bg-td-ink text-td-bg border-td-ink"
                : "border-td-line text-td-ink hover:bg-td-bg bg-white"
            )}
          >
            {f.label} · {counts[f.id]}
          </button>
        );
      })}
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const style = ORDER_STATE_STYLE[order.state];
  return (
    <button
      type="button"
      className="border-td-line hover:border-td-mute flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition-colors"
    >
      <div className="bg-td-bg text-td-mute grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-xs font-semibold">
        {order.id.replace("#", "")}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <div className="truncate text-sm font-semibold">{order.who}</div>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase"
            style={{
              background: style.bg,
              color: style.color,
            }}
          >
            {style.label}
          </span>
        </div>
        <div className="text-td-mute mt-0.5 truncate text-xs">
          {order.items} · {order.time}
        </div>
      </div>
      <div className="font-mono text-sm font-semibold">
        {formatPrice(order.total)}
      </div>
    </button>
  );
}

function EmptyResults({ filter, query }: { filter: Filter; query: string }) {
  const message =
    query.trim().length > 0
      ? `Ningún pedido coincide con "${query.trim()}"`
      : filter === "todos"
        ? "Aún no tienes pedidos."
        : `No hay pedidos en estado "${
            FILTERS.find((f) => f.id === filter)?.label ?? filter
          }".`;

  return (
    <div className="border-td-line text-td-mute rounded-2xl border border-dashed bg-white px-6 py-10 text-center text-sm">
      {message}
    </div>
  );
}
