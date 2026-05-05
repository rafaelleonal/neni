"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import {
  ORDER_STATES,
  formatOrderNumber,
  type OrderState,
} from "@/lib/order-states";
import { cn, formatPrice, formatRelativeTime } from "@/lib/utils";

import { FilterChip, FilterChipRow } from "@/components/ui/filter-chip";
import { OrderStateBadge } from "@/components/ui/order-state-badge";
import { SearchInput } from "@/components/ui/search-input";

export type OrderSummary = {
  id: string;
  number: number;
  customerName: string;
  state: OrderState;
  payment: string;
  total: string;
  itemCount: number;
  createdAt: string;
};

type Filter = "todos" | OrderState;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "nuevo", label: "Nuevos" },
  { id: "preparando", label: "Preparando" },
  { id: "camino", label: "En camino" },
  { id: "entregado", label: "Entregados" },
];

export function OrdersList({ initial }: { initial: OrderSummary[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      todos: initial.length,
      nuevo: 0,
      preparando: 0,
      camino: 0,
      entregado: 0,
      cancelado: 0,
    };
    for (const o of initial) c[o.state]++;
    return c;
  }, [initial]);

  const filtered = useMemo(() => {
    return initial
      .filter((o) => (filter === "todos" ? true : o.state === filter))
      .filter((o) => {
        if (query.trim().length === 0) return true;
        const q = query.trim().toLowerCase();
        const num = formatOrderNumber(o.number, false);
        return o.customerName.toLowerCase().includes(q) || num.includes(q);
      });
  }, [initial, filter, query]);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <Header total={counts.todos} query={query} onQueryChange={setQuery} />
      <FilterChipRow wrap>
        {FILTERS.map((f) => (
          <FilterChip
            key={f.id}
            active={filter === f.id}
            label={f.label}
            count={counts[f.id]}
            onClick={() => setFilter(f.id)}
          />
        ))}
      </FilterChipRow>
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
        {total} {total === 1 ? "pedido" : "pedidos"} en total
      </div>

      <div className="mt-4">
        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder="Buscar por cliente o número"
        />
      </div>
    </header>
  );
}

function OrderRow({ order }: { order: OrderSummary }) {
  const info = ORDER_STATES[order.state];
  const num = formatOrderNumber(order.number, false);
  const isNew = order.state === "nuevo";

  return (
    <Link
      href={`/pedidos/${num}`}
      className={cn(
        "group hover:border-td-mute relative flex items-center gap-4 overflow-hidden rounded-2xl border bg-white p-4 transition-colors",
        isNew ? "border-td-ink/15" : "border-td-line"
      )}
    >
      <span
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-1"
        style={{ background: info.bg }}
      />

      <div className="relative shrink-0">
        <div className="bg-td-bg text-td-ink grid h-12 w-12 place-items-center rounded-xl font-mono text-[13px] font-semibold tracking-[-0.5px]">
          {num}
        </div>
        {isNew && (
          <span className="bg-td-accent absolute -top-0.5 -right-0.5 grid h-3 w-3 place-items-center rounded-full ring-2 ring-white">
            <span className="bg-td-accent absolute h-full w-full animate-ping rounded-full opacity-60" />
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[15px] font-semibold">
            {order.customerName}
          </span>
          <OrderStateBadge state={order.state} />
        </div>
        <div className="text-td-mute mt-1 truncate text-xs">
          <span>
            {order.itemCount}{" "}
            {order.itemCount === 1 ? "producto" : "productos"}
          </span>
          <span className="mx-1.5">·</span>
          <span>{order.payment}</span>
          <span className="mx-1.5">·</span>
          <span>{formatRelativeTime(order.createdAt)}</span>
        </div>
      </div>

      <div className="text-right">
        <div className="font-mono text-base font-semibold tracking-[-0.3px]">
          {formatPrice(Number(order.total))}
        </div>
      </div>
    </Link>
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
