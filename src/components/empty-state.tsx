import type { ReactNode } from "react";

import Link from "next/link";

import { ArrowIcon } from "@/components/neni-icons";

export type EmptyStateCta = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export type EmptyStateProps = {
  title: string;
  sub: string;
  illus: ReactNode;
  cta?: EmptyStateCta;
};

export function EmptyState({ title, sub, illus, cta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
        <circle
          cx="80"
          cy="80"
          r="78"
          fill="none"
          stroke="var(--td-line)"
          strokeDasharray="4 6"
        />
        {illus}
      </svg>
      <h2 className="text-[22px] font-semibold tracking-[-0.6px]">{title}</h2>
      <p className="text-td-mute max-w-[260px] text-sm leading-relaxed">
        {sub}
      </p>
      {cta &&
        (cta.href ? (
          <Link
            href={cta.href}
            className="bg-td-ink text-td-bg mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
          >
            {cta.label} <ArrowIcon size={14} stroke="var(--td-bg)" />
          </Link>
        ) : (
          <button
            type="button"
            onClick={cta.onClick}
            className="bg-td-ink text-td-bg mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-transform active:scale-[0.98]"
          >
            {cta.label} <ArrowIcon size={14} stroke="var(--td-bg)" />
          </button>
        ))}
    </div>
  );
}

export const EMPTY_PRODUCTS_ILLUS = (
  <g>
    <rect x="40" y="40" width="80" height="80" rx="14" fill="#E9E3D4" />
    <path
      d="M80 68 V92 M68 80 H92"
      stroke="var(--td-mute)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </g>
);

export const EMPTY_ORDERS_ILLUS = (
  <g>
    <path
      d="M50 50 L110 50 L100 110 L60 110 Z"
      fill="none"
      stroke="#141311"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <path
      d="M70 50 a10 10 0 0 1 20 0"
      fill="none"
      stroke="#141311"
      strokeWidth="2.5"
    />
    <circle cx="80" cy="80" r="14" fill="var(--td-accent)" />
    <path
      d="M74 80 L78 84 L86 76"
      stroke="#fff"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </g>
);

export const EMPTY_PRODUCTS_DEFAULTS: EmptyStateProps = {
  title: "Aún no tienes productos",
  sub: "Agrega tu primer producto para empezar a recibir pedidos.",
  illus: EMPTY_PRODUCTS_ILLUS,
  cta: { label: "Agregar producto" },
};

export const EMPTY_ORDERS_DEFAULTS: EmptyStateProps = {
  title: "Sin pedidos todavía",
  sub: "Cuando alguien compre en tu tienda, sus pedidos aparecerán aquí.",
  illus: EMPTY_ORDERS_ILLUS,
  cta: { label: "Compartir mi link" },
};
