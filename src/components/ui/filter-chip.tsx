"use client";

import { cn } from "@/lib/utils";

export type FilterChipProps = {
  active: boolean;
  label: string;
  count?: number;
  onClick: () => void;
};

export function FilterChip({ active, label, count, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
        active
          ? "bg-td-ink text-td-bg border-td-ink"
          : "border-td-line text-td-ink hover:bg-td-bg bg-white"
      )}
    >
      {label}
      {count !== undefined && ` · ${count}`}
    </button>
  );
}

export function FilterChipRow({
  children,
  wrap,
}: {
  children: React.ReactNode;
  wrap?: boolean;
}) {
  return (
    <div
      className={cn(
        "no-scrollbar -mx-5 mb-3 flex gap-2 overflow-x-auto px-5 md:-mx-8 md:px-8 lg:-mx-10 lg:px-10",
        wrap && "lg:flex-wrap lg:overflow-visible"
      )}
    >
      {children}
    </div>
  );
}
