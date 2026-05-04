import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicStorefront } from "@/lib/storefront";

import { CheckoutPage } from "./_components/checkout-page";

type Params = { tienda: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tienda } = await params;
  const store = await getPublicStorefront(tienda);
  return {
    title: store ? `Confirmar pedido · ${store.name}` : "Checkout · Neni",
  };
}

export default async function Checkout({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tienda } = await params;
  const store = await getPublicStorefront(tienda);
  if (!store) notFound();
  return <CheckoutPage store={store} />;
}
