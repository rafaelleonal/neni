import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CardVariant = "light" | "dark" | "accent" | "muted";

type CardProps = {
  variant?: CardVariant;
  radius?: number;
  padding?: number | string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<CardVariant, string> = {
  light: "bg-white border border-td-line",
  dark: "bg-td-ink text-td-bg",
  accent: "bg-td-accent text-white",
  muted: "bg-td-bg border border-td-line",
};

export function Card({
  variant = "light",
  radius = 14,
  padding,
  className,
  style,
  children,
}: CardProps) {
  return (
    <div
      className={cn(VARIANT_CLASSES[variant], className)}
      style={{
        borderRadius: radius,
        ...(padding != null ? { padding } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}
