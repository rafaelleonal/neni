import type { ReactNode } from "react";
import { PhoneScreen } from "@/components/phone-screen";
import { ArrowIcon } from "@/components/neni-icons";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  sub: string;
  cta: string;
  illus: ReactNode;
  headerLabel?: string;
};

export function EmptyState({ title, sub, cta, illus, headerLabel }: Props) {
  return (
    <PhoneScreen homeIndicatorPlacement="floating">
      <div className="flex items-center gap-3 pt-[4px] px-[20px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        {headerLabel && (
          <div className="text-[17px] font-semibold">{headerLabel}</div>
        )}
      </div>

      <div className="flex flex-col items-center text-center py-[100px] px-[32px] gap-[16px]">
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
        <h2 className="text-[22px] font-semibold m-0 tracking-[-0.6px]">
          {title}
        </h2>
        <p className="text-td-mute text-[14px] m-0 leading-[1.5] max-w-[260px]">
          {sub}
        </p>
        <div className="mt-[8px]">
          <Button size="lg">
            {cta} <ArrowIcon size={16} />
          </Button>
        </div>
      </div>
    </PhoneScreen>
  );
}

export const EMPTY_PRODUCTS: Props = {
  headerLabel: "Productos",
  title: "Aún no tienes productos",
  sub: "Agrega tu primer producto para empezar a recibir pedidos.",
  cta: "Agregar producto",
  illus: (
    <g>
      <rect x="40" y="40" width="80" height="80" rx="14" fill="#E9E3D4" />
      <path
        d="M80 68 V92 M68 80 H92"
        stroke="var(--td-mute)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  ),
};

export const EMPTY_ORDERS: Props = {
  headerLabel: "Pedidos",
  title: "Sin pedidos todavía",
  sub: "Cuando alguien compre en tu tienda, sus pedidos aparecerán aquí.",
  cta: "Compartir mi link",
  illus: (
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
  ),
};
