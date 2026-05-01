"use client";

import { useMemo, useState } from "react";

import { useSearchParams } from "next/navigation";
import { haptic } from "@/lib/haptics";
import { SELLER_PRODUCTS, type SellerProduct } from "@/lib/mocks";
import { cn } from "@/lib/utils";

import { EMPTY_PRODUCTS_DEFAULTS, EmptyState } from "@/components/empty-state";
import { ArrowIcon, PlusIcon, SearchIcon } from "@/components/neni-icons";
import { ProductPlaceholder } from "@/components/product-placeholder";

type Filter = "todos" | "disponibles" | "agotados" | "ocultos";

type ProductRow = SellerProduct & { id: string };

const INITIAL_PRODUCTS: ProductRow[] = SELLER_PRODUCTS.map((p, i) => ({
  ...p,
  id: `p-${i}`,
}));

export default function ProductosPage() {
  const searchParams = useSearchParams();
  const forceEmpty = searchParams?.get("empty") === "1";

  const [products, setProducts] = useState<ProductRow[]>(
    forceEmpty ? [] : INITIAL_PRODUCTS
  );
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");

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

  function toggleVisible(id: string) {
    haptic("selection");
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: !p.visible } : p))
    );
  }

  function handleFilter(next: Filter) {
    haptic("selection");
    setFilter(next);
  }

  if (products.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
        <header className="mb-2">
          <h1 className="text-xl font-semibold lg:text-2xl">Productos</h1>
        </header>
        <EmptyState {...EMPTY_PRODUCTS_DEFAULTS} />
      </div>
    );
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
      <button
        type="button"
        aria-label="Agregar producto"
        onClick={() => haptic("light")}
        className="bg-td-ink text-td-bg fixed right-5 bottom-24 grid h-14 w-14 place-items-center rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3)] lg:hidden"
      >
        <PlusIcon size={22} stroke="var(--td-bg)" sw={2.2} />
      </button>
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
            {total} productos · {visible} visibles
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
    <button
      type="button"
      className="bg-td-ink text-td-bg mb-4 flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-transform active:scale-[0.99]"
    >
      <div className="bg-td-accent grid h-10 w-10 shrink-0 place-items-center rounded-xl">
        <PlusIcon size={18} stroke="#fff" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold">Agregar producto</div>
        <div className="text-xs opacity-60">Foto, precio, variantes</div>
      </div>
      <ArrowIcon size={16} stroke="rgba(255,255,255,0.6)" />
    </button>
  );
}

type FiltersProps = {
  value: Filter;
  onChange: (value: Filter) => void;
  counts: Record<Filter, number>;
};

const FILTER_LABELS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "disponibles", label: "Disponibles" },
  { id: "agotados", label: "Agotados" },
  { id: "ocultos", label: "Ocultos" },
];

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
        "border-td-line flex items-center gap-3 rounded-2xl border bg-white p-3 transition-opacity",
        !product.visible && "opacity-60"
      )}
    >
      <div className="h-14 w-14 shrink-0">
        <ProductPlaceholder h={56} label="" tone={product.tone} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{product.name}</div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-td-ink font-mono text-sm">
            ${product.price.toFixed(2)}
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
      <Toggle pressed={product.visible} onToggle={onToggle} />
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
