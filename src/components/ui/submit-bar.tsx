"use client";

import { cn } from "@/lib/utils";

import { ArrowIcon, CheckIcon } from "@/components/neni-icons";

import { Button } from "./button";

export type SubmitBarProps = {
  label: string;
  submittingLabel?: string;
  submitting: boolean;
  disabled?: boolean;
  error?: string | null;
  onSubmit: () => void;
  icon?: "check" | "arrow" | "none";
};

export function SubmitBar({
  label,
  submittingLabel = "Guardando…",
  submitting,
  disabled,
  error,
  onSubmit,
  icon = "check",
}: SubmitBarProps) {
  const Icon =
    icon === "arrow" ? ArrowIcon : icon === "check" ? CheckIcon : null;
  return (
    <div className="bg-td-bg/95 border-td-line fixed right-0 bottom-0 left-0 border-t backdrop-blur lg:static lg:mx-auto lg:max-w-3xl lg:border-0 lg:bg-transparent lg:px-10 lg:pb-10 lg:backdrop-blur-none">
      <div
        className={cn(
          "mx-auto w-full max-w-3xl px-5 py-3 md:px-8 lg:px-0 lg:py-0"
        )}
      >
        {error && (
          <p className="mb-2 text-center text-sm font-medium text-[#9C3F12]">
            {error}
          </p>
        )}
        <Button
          full
          size="lg"
          type="button"
          disabled={disabled || submitting}
          onClick={onSubmit}
        >
          {submitting ? submittingLabel : label}
          {!submitting && Icon && <Icon size={16} />}
        </Button>
      </div>
    </div>
  );
}
