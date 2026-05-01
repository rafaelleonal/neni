"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { haptic } from "@/lib/haptics";
import { type Storefront, type StorefrontProduct } from "@/lib/mocks/stores";
import { cn, formatPrice } from "@/lib/utils";

import { MoreIcon, PlusIcon, SearchIcon } from "@/components/neni-icons";
import { ProductPlaceholder } from "@/components/product-placeholder";

type StorePageProps = {
  store: Storefront;
};

export function StorePage({ store }: StorePageProps) {
  const cart = useCart(store.slug);
  const [activeCategory, setActiveCategory] = useState(store.categories[0]);

  const cartCount = cart.items.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = useMemo(() => {
    return cart.items.reduce((sum, item) => {
      const product = store.products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.qty : 0);
    }, 0);
  }, [cart.items, store.products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "Todos") return store.products;
    return store.products.filter((p) => p.category === activeCategory);
  }, [store.products, activeCategory]);

  const featured = store.products.find((p) => p.id === store.featuredId);

  function handleAdd(productId: string) {
    haptic("light");
    cart.add(productId);
  }

  function handleCategory(category: string) {
    haptic("selection");
    setActiveCategory(category);
  }

  return (
    <main className="bg-td-bg min-h-dvh pb-32">
      <div className="mx-auto max-w-md md:max-w-3xl lg:max-w-5xl">
        <Hero store={store} />
        <StoreHeader store={store} />
        <CategoryChips
          categories={store.categories}
          active={activeCategory}
          onChange={handleCategory}
        />
        {featured && activeCategory === "Todos" && (
          <Featured product={featured} onAdd={() => handleAdd(featured.id)} />
        )}
        <ProductGrid
          products={filteredProducts}
          featuredId={activeCategory === "Todos" ? store.featuredId : undefined}
          onAdd={handleAdd}
        />
      </div>

      {cart.hydrated && cartCount > 0 && (
        <CartCta slug={store.slug} count={cartCount} total={cartTotal} />
      )}
    </main>
  );
}

function Hero({ store }: { store: Storefront }) {
  if (!store.promo) return null;
  return (
    <div className="mx-3.5 mt-3 lg:mx-0 lg:mt-6">
      <div
        className="relative h-[170px] overflow-hidden rounded-[22px] md:h-[220px] lg:h-[260px]"
        style={{ background: store.promo.gradient }}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0_18px,_rgba(255,255,255,0.08)_18px_36px)]" />
        <div className="absolute right-[18px] bottom-[14px] left-[18px] flex items-end justify-between md:right-8 md:bottom-6 md:left-8">
          <div className="text-white">
            <div className="text-[10px] font-semibold tracking-[1.2px] uppercase opacity-85 md:text-xs">
              {store.promo.label}
            </div>
            <div className="mt-0.5 text-[22px] leading-[1.1] font-semibold tracking-[-0.6px] md:text-3xl lg:text-4xl">
              {store.promo.title}
            </div>
          </div>
          <div className="text-td-ink rounded-full bg-white px-2.5 py-1.5 font-mono text-[11px] font-bold md:px-4 md:py-2 md:text-sm">
            {store.promo.code}
          </div>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          <button
            type="button"
            aria-label="Buscar"
            className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(255,255,255,0.25)] text-white backdrop-blur-[8px]"
          >
            <SearchIcon size={16} />
          </button>
          <button
            type="button"
            aria-label="Más opciones"
            className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(255,255,255,0.25)] text-white backdrop-blur-[8px]"
          >
            <MoreIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StoreHeader({ store }: { store: Storefront }) {
  return (
    <div className="relative px-5 pt-3 lg:px-0">
      <div className="border-td-bg absolute -top-[30px] left-[22px] grid h-[68px] w-[68px] place-items-center rounded-[20px] border-4 bg-white font-mono text-[22px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] lg:left-0">
        {store.initials}
      </div>
      <div className="mt-11">
        <div className="flex items-center gap-2">
          <h1 className="m-0 text-[23px] font-semibold tracking-[-0.6px] md:text-2xl lg:text-3xl">
            {store.name}
          </h1>
          {store.status === "open" && (
            <span className="bg-td-accent rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.3px] text-white">
              ABIERTO
            </span>
          )}
        </div>
        <div className="text-td-mute mt-1 text-[12.5px] md:text-sm">
          {store.description}
        </div>

        <div className="border-td-line mt-3 grid grid-cols-3 overflow-hidden rounded-[12px] border bg-white">
          <Stat
            label="Rating"
            value={store.rating.toString()}
            sub={`${store.reviews} reseñas`}
            divider
          />
          <Stat label="Entrega" value={store.delivery} sub="" divider />
          <Stat
            label="Envío"
            value={store.shipping.split(" ")[0]}
            sub={store.shipping.split(" ").slice(1).join(" ")}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  divider,
}: {
  label: string;
  value: string;
  sub: string;
  divider?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-2 py-2.5 text-center md:py-3",
        divider && "border-td-line border-r"
      )}
    >
      <div className="text-[13.5px] font-semibold tracking-[-0.3px] md:text-[15px]">
        {value}
      </div>
      <div className="text-td-mute mt-px text-[10px] md:text-xs">
        {label}
        {sub && ` · ${sub}`}
      </div>
    </div>
  );
}

function CategoryChips({
  categories,
  active,
  onChange,
}: {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto px-5 pb-3 lg:flex-wrap lg:overflow-visible lg:px-0">
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={cn(
              "border-td-line shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors",
              isActive
                ? "bg-td-ink text-td-bg border-td-ink"
                : "text-td-ink hover:bg-td-bg bg-white"
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

function Featured({
  product,
  onAdd,
}: {
  product: StorefrontProduct;
  onAdd: () => void;
}) {
  return (
    <div className="px-5 pt-1 pb-3 lg:px-0">
      <div className="border-td-line grid min-h-[140px] grid-cols-[1.1fr_1fr] overflow-hidden rounded-[16px] border bg-white md:min-h-[200px] md:grid-cols-[1fr_1.4fr]">
        <div className="relative">
          <ProductPlaceholder
            h={140}
            label={product.name.toLowerCase()}
            tone={product.tone}
            className="h-full"
          />
          {product.tag && (
            <div className="bg-td-accent absolute top-2 left-2 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] text-white uppercase">
              {product.tag}
            </div>
          )}
        </div>
        <div className="flex flex-col p-3.5 md:p-5">
          <div className="text-[15px] font-semibold tracking-[-0.3px] md:text-lg">
            {product.name}
          </div>
          <div className="text-td-mute mt-1 text-[11.5px] md:text-sm">
            {product.desc}
          </div>
          <div className="mt-auto flex items-baseline justify-between gap-2 pt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-semibold md:text-lg">
                {formatPrice(product.price)}
              </span>
              {product.old && (
                <span className="text-td-mute font-mono text-[12px] line-through">
                  {formatPrice(product.old)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={onAdd}
              aria-label="Agregar al carrito"
              className="bg-td-ink text-td-bg grid h-9 w-9 place-items-center rounded-full transition-transform active:scale-95"
            >
              <PlusIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({
  products,
  featuredId,
  onAdd,
}: {
  products: StorefrontProduct[];
  featuredId?: string;
  onAdd: (id: string) => void;
}) {
  const items = featuredId
    ? products.filter((p) => p.id !== featuredId)
    : products;

  return (
    <>
      <div className="flex items-baseline justify-between px-5 pt-2 pb-2.5 lg:px-0">
        <h2 className="text-[15px] font-semibold tracking-[-0.3px] md:text-base">
          Todo el catálogo
        </h2>
        <span className="text-td-mute text-[11.5px] md:text-xs">
          {items.length} producto{items.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pb-6 md:grid-cols-3 lg:grid-cols-4 lg:px-0">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => onAdd(product.id)}
          />
        ))}
      </div>
    </>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: StorefrontProduct;
  onAdd: () => void;
}) {
  return (
    <div className="border-td-line overflow-hidden rounded-[14px] border bg-white">
      <div className="relative">
        <ProductPlaceholder
          h={120}
          label={product.name.toLowerCase()}
          tone={product.tone}
        />
        {product.tag && (
          <div className="absolute top-2 left-2 rounded-full bg-[rgba(20,19,17,0.9)] px-2 py-0.5 text-[9.5px] font-semibold tracking-[0.3px] text-white uppercase">
            {product.tag}
          </div>
        )}
        <button
          type="button"
          onClick={onAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className="bg-td-ink text-td-bg absolute right-2 bottom-2 grid h-7 w-7 place-items-center rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform active:scale-95"
        >
          <PlusIcon size={14} />
        </button>
      </div>
      <div className="p-2.5">
        <div className="text-[13px] leading-[1.2] font-medium">
          {product.name}
        </div>
        <div className="text-td-mute mt-0.5 truncate text-[10.5px]">
          {product.desc}
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-mono text-[13px] font-semibold">
            {formatPrice(product.price)}
          </span>
          {product.old && (
            <span className="text-td-mute font-mono text-[10.5px] line-through">
              {formatPrice(product.old)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CartCta({
  slug,
  count,
  total,
}: {
  slug: string;
  count: number;
  total: number;
}) {
  return (
    <Link
      href={`/${slug}/checkout`}
      className="bg-td-accent fixed right-4 bottom-10 left-4 mx-auto flex max-w-md items-center gap-3 rounded-2xl px-3.5 py-3 text-white shadow-[0_12px_30px_rgba(31,170,89,0.35)] transition-transform active:scale-[0.99] md:max-w-md"
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-[rgba(255,255,255,0.22)] text-sm font-bold">
        {count}
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm font-semibold">Ver pedido</div>
        <div className="text-[11px] opacity-85">
          OXXO · SPEI · Tarjeta · Efectivo
        </div>
      </div>
      <div className="font-mono text-base font-semibold">
        {formatPrice(total)}
      </div>
    </Link>
  );
}
