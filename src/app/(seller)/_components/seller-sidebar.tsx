"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { haptic } from "@/lib/haptics";
import { PLANS, type PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

import { NeniLogo } from "@/components/neni-logo";

import { SELLER_NAV } from "./seller-nav";

type SellerSidebarProps = {
  storeName: string;
  initials: string;
  plan: PlanId;
};

export function SellerSidebar({
  storeName,
  initials,
  plan,
}: SellerSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    haptic("selection");
    await authClient.signOut();
    router.push("/acceso");
    router.refresh();
  }

  return (
    <aside className="bg-td-ink text-td-bg sticky top-0 hidden h-dvh w-[220px] shrink-0 flex-col gap-1 px-4 py-6 lg:flex">
      <div className="px-2 pt-1 pb-6">
        <NeniLogo size={26} color="var(--td-bg)" />
      </div>

      <nav className="flex flex-col gap-1">
        {SELLER_NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13.5px] transition-colors",
                active
                  ? "text-td-bg bg-white/10"
                  : "text-white/65 hover:bg-white/5 hover:text-white/90"
              )}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <Link
          href="/tienda/plan"
          className="rounded-xl bg-white/5 p-3 transition-colors hover:bg-white/10"
        >
          <div className="flex items-center gap-2">
            <div className="text-td-ink grid h-8 w-8 place-items-center rounded-lg bg-[#E9E3D4] font-mono text-[11px] font-bold">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold">{storeName}</div>
              <div className="text-[10px] opacity-60">
                Plan {PLANS[plan].name}
              </div>
            </div>
            {plan === "free" && (
              <span className="bg-td-accent rounded-full px-1.5 py-0.5 text-[8.5px] font-bold tracking-[0.4px] text-white uppercase">
                Pro
              </span>
            )}
          </div>
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-lg px-3 py-2 text-left text-[12.5px] text-white/55 transition-colors hover:bg-white/5 hover:text-white/85"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
