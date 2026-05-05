"use client";

import { useState } from "react";

import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export type ConfirmDangerButtonProps = {
  label: string;
  confirmingLabel?: string;
  onConfirm: () => void;
  disabled?: boolean;
};

export function ConfirmDangerButton({
  label,
  confirmingLabel = "Toca de nuevo para confirmar",
  onConfirm,
  disabled,
}: ConfirmDangerButtonProps) {
  const [armed, setArmed] = useState(false);

  function handleClick() {
    if (disabled) return;
    if (!armed) {
      haptic("light");
      setArmed(true);
      return;
    }
    haptic("error");
    setArmed(false);
    onConfirm();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-colors disabled:opacity-60",
        armed
          ? "border-[#9C3F12] bg-[#FCE4D6] text-[#9C3F12]"
          : "border-td-line text-td-mute hover:border-[#9C3F12] hover:text-[#9C3F12]"
      )}
    >
      {armed ? confirmingLabel : label}
    </button>
  );
}
