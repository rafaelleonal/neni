"use client";

import { useMemo, useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

import { ArrowIcon, PlusIcon, SearchIcon } from "@/components/neni-icons";
import {
  ProductPlaceholder,
  type ProductTone,
} from "@/components/product-placeholder";

export type ProductRow = {
  id: string;
  name: string;
  price: string; // viene como string desde drizzle numeric
  stock: "Disponible" | "Agotado";
  visible: boolean;
  tone: ProductTone;
};

type Filter = "todos" | "disponibles" | "agotados" | "ocultos";

const FILTER_LABELS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "disponibles", label: "Disponibles" },
  { id: "agotados", label: "Agotados" },
  { id: "ocultos", label: "Ocultos" },
];

export function ProductsList({ initial }: { initial: ProductRow[] }) {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRow[]>(initial);
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");
  const [, startTransition] = useTransition();

  const counts = useMemo(
    () => ({
      todos: products.length,
      disponibles: products.filter((p) => p.stock === "Disponible").length,
      agotados: products.filter((p) => p.stock === "Agotado").length,
      ocultos: products.filter((p) => !p.visible).length,
    }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        switch (filter) {
          case "disponibles":
            return p.stock === "Disponible";
          case "agotados":
            return p.stock === "Agotado";
          case "ocultos":
            return !p.visible;
          default:
            return true;
        }
      })
      .filter((p) =>
        query.trim().length > 0
          ? p.name.toLowerCase().includes(query.trim().toLowerCase())
          : true
      );
  }, [products, filter, query]);

  async function toggleVisible(id: string) {
    haptic("selection");
    const prev = products;
    // Optimistic update.
    setProducts((curr) =>
      curr.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
    const target = prev.find((p) => p.id === id);
    if (!target) return;
    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !target.visible }),
    });
    if (!res.ok) {
      // Revertir si el backend falló.
      setProducts(prev);
      haptic("error");
      return;
    }
    // Revalida server data (KPIs del dashboard, etc.) en segundo plano.
    startTransition(() => router.refresh());
  }

  function handleFilter(next: Filter) {
    haptic("selection");
    setFilter(next);
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <Header
        total={counts.todos}
        visible={products.filter((p) => p.visible).length}
        query={query}
        onQueryChange={setQuery}
      />

      <AddProductCard />

      <Filters value={filter} onChange={handleFilter} counts={counts} />

      {filteredProducts.length === 0 ? (
        <EmptyResults query={query} filter={filter} />
      ) : (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onToggle={() => toggleVisible(product.id)}
            />
          ))}
        </div>
      )}

      {/* FAB - mobile only */}
      <Link
        href="/productos/nuevo"
        aria-label="Agregar producto"
        onClick={() => haptic("light")}
        className="bg-td-ink text-td-bg fixed right-5 bottom-24 grid h-14 w-14 place-items-center rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3)] lg:hidden"
      >
        <PlusIcon size={22} stroke="var(--td-bg)" sw={2.2} />
      </Link>
    </div>
  );
}

type HeaderProps = {
  total: number;
  visible: number;
  query: string;
  onQueryChange: (value: string) => void;
};

function Header({ total, visible, query, onQueryChange }: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h1 className="text-xl font-semibold lg:text-2xl">Productos</h1>
          <div className="text-td-mute mt-0.5 text-xs lg:text-sm">
            {total} {total === 1 ? "producto" : "productos"} · {visible}{" "}
            visibles
          </div>
        </div>
      </div>

      <div className="border-td-line mt-4 flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5">
        <SearchIcon size={16} stroke="var(--td-mute)" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar por nombre"
          className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent text-sm outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="text-td-mute hover:text-td-ink text-lg leading-none"
            aria-label="Limpiar búsqueda"
          >
            ×
          </button>
        )}
      </div>
    </header>
  );
}

function AddProductCard() {
  return (
    <Link
      href="/productos/nuevo"
      onClick={() => haptic("light")}
      className="bg-td-ink text-td-bg mb-4 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-transform active:scale-[0.99]"
    >
      <div className="bg-td-accent grid h-10 w-10 shrink-0 place-items-center rounded-xl">
        <PlusIcon size={18} stroke="#fff" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">Agregar producto</div>
        <div className="text-xs opacity-60">Foto, precio, descripción</div>
      </div>
      <ArrowIcon size={16} stroke="rgba(255,255,255,0.6)" />
    </Link>
  );
}

type FiltersProps = {
  value: Filter;
  onChange: (value: Filter) => void;
  counts: Record<Filter, number>;
};

function Filters({ value, onChange, counts }: FiltersProps) {
  return (
    <div className="no-scrollbar -mx-5 mb-3 flex gap-2 overflow-x-auto px-5 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10">
      {FILTER_LABELS.map((f) => {
        const active = value === f.id;
        const count = counts[f.id];
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
            {f.label} · {count}
          </button>
        );
      })}
    </div>
  );
}

type ProductCardProps = {
  product: ProductRow;
  onToggle: () => void;
};

function ProductCard({ product, onToggle }: ProductCardProps) {
  return (
    <div
      className={cn(
        "border-td-line hover:border-td-mute relative flex items-center gap-3 rounded-2xl border bg-white p-3 transition-[opacity,border-color]",
        !product.visible && "opacity-60"
      )}
    >
      <Link
        href={`/productos/${product.id}`}
        aria-label={`Editar ${product.name}`}
        className="absolute inset-0 rounded-2xl"
      />
      <div className="pointer-events-none h-14 w-14 shrink-0">
        <ProductPlaceholder h={56} label="" tone={product.tone} />
      </div>
      <div className="pointer-events-none relative min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{product.name}</div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-td-ink font-mono text-sm">
            ${Number(product.price).toFixed(2)}
          </span>
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 text-[10px] font-bold tracking-[0.3px] uppercase",
              product.stock === "Agotado"
                ? "bg-[#FCE4D6] text-[#9C3F12]"
                : "bg-td-line text-td-mute"
            )}
          >
            {product.stock}
          </span>
        </div>
      </div>
      <div className="relative">
        <Toggle pressed={product.visible} onToggle={onToggle} />
      </div>
    </div>
  );
}

type ToggleProps = {
  pressed: boolean;
  onToggle: () => void;
};

function Toggle({ pressed, onToggle }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      aria-label={pressed ? "Ocultar producto" : "Mostrar producto"}
      onClick={onToggle}
      className={cn(
        "relative h-6 w-10 shrink-0 rounded-full transition-colors",
        pressed ? "bg-td-accent" : "bg-td-line"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left]",
          pressed ? "left-[18px]" : "left-0.5"
        )}
      />
    </button>
  );
}

type EmptyResultsProps = {
  query: string;
  filter: Filter;
};

function EmptyResults({ query, filter }: EmptyResultsProps) {
  const message =
    query.trim().length > 0
      ? `Ningún producto coincide con "${query.trim()}"`
      : filter === "agotados"
        ? "No hay productos agotados."
        : filter === "ocultos"
          ? "Todos tus productos están visibles."
          : "Aún no tienes productos.";

  return (
    <div className="border-td-line text-td-mute rounded-2xl border border-dashed bg-white px-6 py-10 text-center text-sm">
      {message}
    </div>
  );
}
