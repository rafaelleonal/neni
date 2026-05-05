import "server-only";

import { toneFromId } from "@/lib/product-tone";
import { nameToInitials } from "@/lib/seller";
import { db, products, stores } from "@/db";
import { and, asc, eq } from "drizzle-orm";

import type { ProductTone } from "@/components/product-placeholder";

export type StorefrontProduct = {
  id: string;
  name: string;
  price: number;
  desc: string;
  tone: ProductTone;
  category: string;
  photoUrl: string | null;
};

export type StorePromo = {
  label: string;
  title: string;
  code: string;
  gradient: string;
};

export type PaymentId = "card" | "oxxo" | "spei" | "cash";

/**
 * Shape consumed by the public UI. The optional fields still don't live in
 * DB (rating, shipping, promo, etc.); the UI handles them with fallbacks and
 * will be filled as we add features.
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
  // Optional — still without persistence.
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

  // Only include categories that have at least one visible product.
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
      photoUrl: p.photoUrl,
    })),
  };
}

/** Public slugs list. Useful for `generateStaticParams` or sitemaps. */
export async function listPublicSlugs(): Promise<string[]> {
  const rows = await db.select({ slug: stores.slug }).from(stores);
  return rows.map((r) => r.slug);
}
