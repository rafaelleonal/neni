import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function UppercaseLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <UppercaseLabel>{label}</UppercaseLabel>
      {children}
      {hint && <p className="text-td-mute mt-1.5 text-[11px]">{hint}</p>}
    </label>
  );
}

export function SettingsCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-td-line mb-4 rounded-2xl border bg-white">
      <header className="border-b-td-line border-b px-4 pt-4 pb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && <p className="text-td-mute mt-0.5 text-xs">{subtitle}</p>}
      </header>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}
