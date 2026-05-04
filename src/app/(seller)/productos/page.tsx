import { eq } from "drizzle-orm";

import { db, products } from "@/db";
import { toneFromId } from "@/lib/product-tone";
import { getCurrentStore } from "@/lib/seller";

import { EMPTY_PRODUCTS_DEFAULTS, EmptyState } from "@/components/empty-state";

import {
  ProductsList,
  type ProductRow,
} from "./_components/products-list";

export default async function ProductosPage() {
  const { store } = await getCurrentStore();

  const rows = await db.query.products.findMany({
    where: eq(products.storeId, store.id),
    orderBy: (p, { asc, desc }) => [asc(p.sortOrder), desc(p.createdAt)],
  });

  const initial: ProductRow[] = rows.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    stock: p.stock,
    visible: p.visible,
    tone: toneFromId(p.id),
  }));

  if (initial.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
        <header className="mb-2">
          <h1 className="text-xl font-semibold lg:text-2xl">Productos</h1>
        </header>
        <EmptyState {...EMPTY_PRODUCTS_DEFAULTS} />
      </div>
    );
  }

  return <ProductsList initial={initial} />;
}
