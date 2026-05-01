import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStorefront, listStorefrontSlugs } from "@/lib/mocks";

import { StorePage } from "./_components/store-page";

type Params = { tienda: string };

export function generateStaticParams(): Params[] {
  return listStorefrontSlugs().map((tienda) => ({ tienda }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tienda } = await params;
  const store = getStorefront(tienda);
  if (!store) {
    return { title: "Tienda no encontrada · Neni" };
  }
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
  const store = getStorefront(tienda);

  if (!store) notFound();

  return <StorePage store={store} />;
}
