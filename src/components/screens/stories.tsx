import type { ReactNode } from "react";

import { NeniLogo } from "@/components/neni-logo";

type StoryProps = {
  children: ReactNode;
  bg?: string;
  color?: string;
};

function Story({
  children,
  bg = "var(--td-bg)",
  color = "var(--td-ink)",
}: StoryProps) {
  return (
    <div
      className="relative h-[480px] w-[270px] overflow-hidden rounded-[20px] tracking-[-0.3px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]"
      style={{
        background: bg,
        color,
      }}
    >
      {children}
    </div>
  );
}

export function Stories() {
  return (
    <div className="flex items-start gap-[20px] p-[20px]">
      <Story bg="var(--td-ink)" color="var(--td-bg)">
        <div className="flex h-full flex-col p-[24px]">
          <NeniLogo size={28} color="var(--td-bg)" />
          <h1 className="my-auto text-[64px] leading-[0.95] font-semibold tracking-[-2.5px]">
            Vende
            <br />
            como
            <br />
            <span className="text-td-accent">neni.</span>
          </h1>
          <div className="bg-td-accent rounded-full px-[14px] py-[10px] text-center text-[13px] font-semibold text-white">
            Empieza gratis →
          </div>
        </div>
      </Story>

      <Story bg="var(--td-bg)">
        <div className="flex h-full flex-col p-[24px]">
          <div className="text-td-mute text-[11px] tracking-[1.4px] uppercase">
            Mari ya vende por Neni
          </div>
          <div className="my-auto">
            <div className="text-td-accent font-mono text-[120px] leading-[0.9] font-semibold tracking-[-5px]">
              $8K
            </div>
            <div className="mt-[8px] text-[22px] font-medium">
              en sus primeras
              <br />2 semanas.
            </div>
          </div>
          <div className="bg-td-ink text-td-bg rounded-full px-[14px] py-[10px] text-center text-[13px] font-semibold">
            neni.mx
          </div>
        </div>
      </Story>

      <Story bg="var(--td-accent)" color="#fff">
        <div className="flex h-full flex-col p-[24px]">
          <div className="self-start rounded-full bg-[rgba(255,255,255,0.2)] px-[10px] py-[6px] text-[12px] font-semibold">
            Nuevo pedido
          </div>
          <div className="text-td-ink mt-[14px] rounded-[14px] bg-white p-[14px] text-[12px] leading-[1.4]">
            <div className="text-td-accent text-[10px] font-bold tracking-[0.4px] uppercase">
              🛒 Pedido #4821
            </div>
            <div className="mt-[4px] font-semibold">Marisol Hernández</div>
            <div className="text-td-mute text-[10px]">+52 55 2847 1902</div>
            <div className="border-td-line mt-[6px] border-t pt-[6px] font-mono text-[10px]">
              3× Taco al pastor · $75
              <br />
              1× Gringa · $75
              <br />
              2× Horchata · $50
            </div>
            <div className="border-td-line mt-[6px] flex justify-between border-t pt-[6px] text-[13px] font-semibold">
              <span>Total</span>
              <span className="font-mono">$200</span>
            </div>
          </div>
          <h2 className="mt-auto mb-0 text-[30px] leading-[1.05] font-semibold tracking-[-1px]">
            Tus pedidos
            <br />
            directo a
            <br />
            WhatsApp.
          </h2>
        </div>
      </Story>

      <Story bg="#E9E3D4">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0_20px,_rgba(0,0,0,0.02)_20px_40px)]" />
        <div className="relative flex h-full flex-col p-[24px]">
          <NeniLogo size={26} />
          <div className="my-auto text-center">
            <div className="text-td-mute mb-[10px] text-[12px] tracking-[1px] uppercase">
              Tu tienda en 2 min
            </div>
            <div className="border-td-line inline-flex items-center gap-1 rounded-[14px] border bg-white px-[20px] py-[14px] font-mono text-[22px] font-semibold">
              <span className="text-td-mute">neni.mx/</span>
              <span>tunegocio</span>
            </div>
          </div>
          <div className="text-td-mute text-center text-[12px]">
            Sin mensualidad · Sin código · Sin pretextos
          </div>
        </div>
      </Story>
    </div>
  );
}
