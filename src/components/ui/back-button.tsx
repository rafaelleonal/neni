"use client";

import Link from "next/link";
import { haptic } from "@/lib/haptics";

type CommonProps = {
  ariaLabel?: string;
};

type LinkProps = CommonProps & {
  href: string;
  onClick?: never;
};

type ButtonProps = CommonProps & {
  onClick: () => void;
  href?: never;
};

export type BackButtonProps = LinkProps | ButtonProps;

export function BackButton(props: BackButtonProps) {
  const className =
    "text-td-mute -ml-2 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none transition-colors hover:bg-td-bg hover:text-td-ink hover:cursor-pointer";
  const ariaLabel = props.ariaLabel ?? "Atrás";

  if ("href" in props && props.href !== undefined) {
    return (
      <Link
        href={props.href}
        aria-label={ariaLabel}
        onClick={() => haptic("selection")}
        className={className}
      >
        ‹
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={() => {
        haptic("selection");
        props.onClick?.();
      }}
      aria-label={ariaLabel}
      className={className}
    >
      ‹
    </button>
  );
}
