import { SellerSidebar } from "./_components/seller-sidebar";
import { SellerTabBar } from "./_components/seller-tab-bar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-td-bg flex min-h-dvh">
      <SellerSidebar />
      <main className="flex min-h-dvh flex-1 flex-col pb-24 lg:pb-0">
        {children}
      </main>
      <SellerTabBar />
    </div>
  );
}
