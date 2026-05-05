import "server-only";

import { and, asc, eq } from "drizzle-orm";

import { db, products, stores } from "@/db";
import { toneFromId } from "@/lib/product-tone";
import { nameToInitials } from "@/lib/seller";
import type { ProductTone } from "@/components/product-placeholder";

export type StorefrontProduct = {
  id: string;
  name: string;
  price: number;
  desc: string;
  tone: ProductTone;
  category: string;
};

export type StorePromo = {
  label: string;
  title: string;
  code: string;
  gradient: string;
};

export type PaymentId = "card" | "oxxo" | "spei" | "cash";

/**
 * Shape consumido por la UI pública. Los campos opcionales todavía no viven en
 * DB (rating, envío, promo, etc.); la UI los maneja con fallbacks y se irán
 * llenando conforme agreguemos features.
 */
export type Storefront = {
  slug: string;
  name: string;
  initials: string;
  description: string;
  status: "open" | "closed";
  categories: string[];
  payments: PaymentId[];
  products: StorefrontProduct[];
  // Opcionales — todavía sin persistencia.
  location?: string;
  rating?: number;
  reviews?: number;
  delivery?: string;
  shipping?: string;
  promo?: StorePromo;
  featuredId?: string;
};

const KNOWN_PAYMENTS: PaymentId[] = ["card", "oxxo", "spei", "cash"];

function sanitizePayments(raw: string[]): PaymentId[] {
  return raw.filter((p): p is PaymentId =>
    KNOWN_PAYMENTS.includes(p as PaymentId)
  );
}

const ALL_CATEGORY = "Todos";

/**
 * Lee la tienda pública por slug. Sólo incluye productos visibles. Devuelve
 * `null` si la tienda no existe.
 */
export async function getPublicStorefront(
  slug: string
): Promise<Storefront | null> {
  const store = await db.query.stores.findFirst({
    where: eq(stores.slug, slug),
  });
  if (!store) return null;

  const rows = await db.query.products.findMany({
    where: and(eq(products.storeId, store.id), eq(products.visible, true)),
    orderBy: [asc(products.sortOrder), asc(products.createdAt)],
  });

  // Solo incluimos categorías que tengan al menos un producto visible.
  const usedCategories = new Set<string>();
  for (const p of rows) {
    if (p.category && store.categories.includes(p.category)) {
      usedCategories.add(p.category);
    }
  }
  const visibleCategories = store.categories.filter((c) =>
    usedCategories.has(c)
  );

  return {
    slug: store.slug,
    name: store.name,
    initials: nameToInitials(store.name),
    description: store.description ?? "",
    status: store.isOpen ? "open" : "closed",
    categories: [ALL_CATEGORY, ...visibleCategories],
    payments: sanitizePayments(store.payments),
    products: rows.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      desc: p.description ?? "",
      tone: toneFromId(p.id),
      category: p.category ?? ALL_CATEGORY,
    })),
  };
}

/** Lista de slugs públicos. Útil para `generateStaticParams` o sitemaps. */
export async function listPublicSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: stores.slug }).from(stores);
  return rows.map((r) => r.slug);
}
