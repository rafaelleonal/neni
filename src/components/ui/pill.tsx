import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PillVariant = "neutral" | "accent" | "dark" | "outline" | "muted";
export type PillSize = "xs" | "sm" | "md";

type PillProps = {
  variant?: PillVariant;
  size?: PillSize;
  uppercase?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<PillVariant, string> = {
  neutral: "bg-td-line text-td-mute",
  accent: "bg-td-accent text-white",
  dark: "bg-td-ink text-td-bg",
  outline: "bg-white text-td-ink border border-td-line",
  muted: "bg-td-bg text-td-mute",
};

const SIZE_STYLES: Record<PillSize, CSSProperties> = {
  xs: { padding: "2px 7px", fontSize: 9.5, fontWeight: 700, letterSpacing: 0.4 },
  sm: { padding: "4px 10px", fontSize: 11, fontWeight: 600 },
  md: { padding: "6px 12px", fontSize: 12.5, fontWeight: 500 },
};

export function Pill({
  variant = "neutral",
  size = "sm",
  uppercase = false,
  className,
  style,
  children,
}: PillProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full whitespace-nowrap",
        VARIANT_CLASSES[variant],
        uppercase && "uppercase",
        className,
      )}
      style={{
        ...SIZE_STYLES[size],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
