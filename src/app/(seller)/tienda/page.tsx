import { getCurrentStore } from "@/lib/seller";

import { TiendaSettings } from "./_components/tienda-settings";

export default async function TiendaPage() {
  const { store } = await getCurrentStore();

  return (
    <TiendaSettings
      initial={{
        name: store.name,
        slug: store.slug,
        description: store.description ?? "",
        isOpen: store.isOpen,
      }}
    />
  );
}
