"use client";

import { useMemo, useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

import { FilterChip, FilterChipRow } from "@/components/ui/filter-chip";
import { SearchInput } from "@/components/ui/search-input";
import { Toggle } from "@/components/ui/toggle";
import { ArrowIcon, PlusIcon } from "@/components/neni-icons";
import {
  ProductPlaceholder,
  type ProductTone,
} from "@/components/product-placeholder";

export type ProductRow = {
  id: string;
  name: string;
  price: string;
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
      setProducts(prev);
      haptic("error");
      return;
    }
    startTransition(() => router.refresh());
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

      <FilterChipRow>
        {FILTER_LABELS.map((f) => (
          <FilterChip
            key={f.id}
            active={filter === f.id}
            label={f.label}
            count={counts[f.id]}
            onClick={() => {
              haptic("selection");
              setFilter(f.id);
            }}
          />
        ))}
      </FilterChipRow>

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

function Header({
  total,
  visible,
  query,
  onQueryChange,
}: {
  total: number;
  visible: number;
  query: string;
  onQueryChange: (value: string) => void;
}) {
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

      <div className="mt-4">
        <SearchInput
          value={query}
          onChange={onQueryChange}
          placeholder="Buscar por nombre"
        />
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

function ProductCard({
  product,
  onToggle,
}: {
  product: ProductRow;
  onToggle: () => void;
}) {
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
        <Toggle
          pressed={product.visible}
          onToggle={onToggle}
          ariaLabel={
            product.visible
              ? `Ocultar ${product.name}`
              : `Mostrar ${product.name}`
          }
        />
      </div>
    </div>
  );
}

function EmptyResults({ query, filter }: { query: string; filter: Filter }) {
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
