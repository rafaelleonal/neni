import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicStorefront } from "@/lib/storefront";

import { StorePage } from "./_components/store-page";

type Params = { tienda: string };

// Sin generateStaticParams — las tiendas se renderizan on-demand. Cuando
// crezcan podemos prerenderizar las top-N y dejar el resto SSR.

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tienda } = await params;
  const store = await getPublicStorefront(tienda);
  if (!store) return { title: "Tienda no encontrada · Neni" };
  return {
    title: `${store.name} · Neni`,
    description: store.description,
  };
}

export default async function TiendaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tienda } = await params;
  const store = await getPublicStorefront(tienda);
  if (!store) notFound();
  return <StorePage store={store} />;
}
