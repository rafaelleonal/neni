import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";

import { db, products } from "@/db";
import { toneFromId } from "@/lib/product-tone";
import { getCurrentStore } from "@/lib/seller";

import { ProductEditor } from "./_components/product-editor";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  if (id === "nuevo") {
    return { title: "Nuevo producto · Neni" };
  }
  const { store } = await getCurrentStore();
  const product = await db.query.products.findFirst({
    where: and(eq(products.id, id), eq(products.storeId, store.id)),
  });
  return {
    title: product ? `Editar · ${product.name}` : "Producto · Neni",
  };
}

export default async function ProductoEditorPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const { store } = await getCurrentStore();

  if (id === "nuevo") {
    return (
      <ProductEditor mode="new" availableCategories={store.categories} />
    );
  }

  const product = await db.query.products.findFirst({
    where: and(eq(products.id, id), eq(products.storeId, store.id)),
  });
  if (!product) notFound();

  return (
    <ProductEditor
      mode="edit"
      availableCategories={store.categories}
      product={{
        id: product.id,
        name: product.name,
        price: Number(product.price),
        description: product.description ?? "",
        category: product.category ?? "",
        photoUrl: product.photoUrl,
        stock: product.stock,
        visible: product.visible,
        tone: toneFromId(product.id),
      }}
    />
  );
}
