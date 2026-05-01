"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { SELLER_NAV } from "./seller-nav";

export function SellerTabBar() {
  const pathname = usePathname();

  return (
    <nav className="border-td-line fixed right-0 bottom-0 left-0 z-40 flex justify-around border-t bg-white px-5 pt-2.5 pb-7 lg:hidden">
      {SELLER_NAV.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1",
              active ? "text-td-ink" : "text-td-mute"
            )}
          >
            <Icon size={20} />
            <div
              className={cn(
                "text-[10.5px]",
                active ? "font-semibold" : "font-medium"
              )}
            >
              {item.label}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
