import { getCurrentStore, nameToInitials } from "@/lib/seller";

import { SellerSidebar } from "./_components/seller-sidebar";
import { SellerTabBar } from "./_components/seller-tab-bar";

export default async function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store } = await getCurrentStore();
  const initials = nameToInitials(store.name);

  return (
    <div className="bg-td-bg flex min-h-dvh">
      <SellerSidebar storeName={store.name} initials={initials} />
      <main className="flex min-h-dvh flex-1 flex-col pb-24 lg:pb-0">
        {children}
      </main>
      <SellerTabBar />
    </div>
  );
}
