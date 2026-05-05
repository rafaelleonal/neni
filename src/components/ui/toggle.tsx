"use client";

import { cn } from "@/lib/utils";

type Size = "md" | "lg";

const SIZES: Record<Size, { track: string; knob: string; on: string; off: string }> =
  {
    md: {
      track: "h-6 w-10",
      knob: "h-5 w-5 top-0.5",
      on: "left-[18px]",
      off: "left-0.5",
    },
    lg: {
      track: "h-7 w-12",
      knob: "h-6 w-6 top-0.5",
      on: "left-[22px]",
      off: "left-0.5",
    },
  };

export type ToggleProps = {
  pressed: boolean;
  onToggle: () => void;
  disabled?: boolean;
  size?: Size;
  ariaLabel?: string;
};

export function Toggle({
  pressed,
  onToggle,
  disabled,
  size = "md",
  ariaLabel,
}: ToggleProps) {
  const s = SIZES[size];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      aria-label={ariaLabel}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "relative shrink-0 rounded-full transition-colors disabled:opacity-60",
        s.track,
        pressed ? "bg-td-accent" : "bg-td-line"
      )}
    >
      <span
        className={cn(
          "absolute rounded-full bg-white transition-[left]",
          s.knob,
          pressed ? s.on : s.off
        )}
      />
    </button>
  );
}
