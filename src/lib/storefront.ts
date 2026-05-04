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

  return {
    slug: store.slug,
    name: store.name,
    initials: nameToInitials(store.name),
    description: store.description ?? "",
    status: "open",
    categories: [ALL_CATEGORY],
    products: rows.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      desc: p.description ?? "",
      tone: toneFromId(p.id),
      category: ALL_CATEGORY,
    })),
  };
}

/** Lista de slugs públicos. Útil para `generateStaticParams` o sitemaps. */
export async function listPublicSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: stores.slug }).from(stores);
  return rows.map((r) => r.slug);
}
