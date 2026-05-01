import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStorefront } from "@/lib/mocks";

import { OrderTrackingPage } from "./_components/order-tracking-page";

type Params = { tienda: string; id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tienda, id } = await params;
  const store = getStorefront(tienda);
  return {
    title: store ? `Pedido #${id} · ${store.name}` : `Pedido #${id} · Neni`,
  };
}

export default async function OrderPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tienda, id } = await params;
  const store = getStorefront(tienda);
  if (!store) notFound();
  return <OrderTrackingPage store={store} orderId={id} />;
}
