import type { ReactNode } from "react";
import { NeniLogo } from "@/components/neni-logo";

type StoryProps = {
  children: ReactNode;
  bg?: string;
  color?: string;
};

function Story({ children, bg = "var(--td-bg)", color = "var(--td-ink)" }: StoryProps) {
  return (
    <div
      className="w-[270px] h-[480px] rounded-[20px] overflow-hidden relative tracking-[-0.3px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)]"
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
    <div
      className="flex items-start gap-[20px] p-[20px]"
    >
      <Story bg="var(--td-ink)" color="var(--td-bg)">
        <div
          className="flex flex-col h-full p-[24px]"
        >
          <NeniLogo size={28} color="var(--td-bg)" />
          <h1
            className="text-[64px] font-semibold my-auto tracking-[-2.5px] leading-[0.95]"
          >
            Vende
            <br />
            como
            <br />
            <span className="text-td-accent">neni.</span>
          </h1>
          <div
            className="text-center bg-td-accent py-[10px] px-[14px] rounded-full text-white text-[13px] font-semibold"
          >
            Empieza gratis →
          </div>
        </div>
      </Story>

      <Story bg="var(--td-bg)">
        <div
          className="flex flex-col h-full p-[24px]"
        >
          <div
            className="text-td-mute text-[11px] tracking-[1.4px] uppercase"
          >
            Mari ya vende por Neni
          </div>
          <div className="my-auto">
            <div
              className="text-td-accent text-[120px] font-semibold tracking-[-5px] font-mono leading-[0.9]"
            >
              $8K
            </div>
            <div className="text-[22px] font-medium mt-[8px]">
              en sus primeras
              <br />2 semanas.
            </div>
          </div>
          <div
            className="text-center bg-td-ink text-td-bg py-[10px] px-[14px] rounded-full text-[13px] font-semibold"
          >
            neni.mx
          </div>
        </div>
      </Story>

      <Story bg="var(--td-accent)" color="#fff">
        <div
          className="flex flex-col h-full p-[24px]"
        >
          <div
            className="self-start py-[6px] px-[10px] rounded-full bg-[rgba(255,255,255,0.2)] text-[12px] font-semibold"
          >
            Nuevo pedido
          </div>
          <div
            className="text-td-ink bg-white rounded-[14px] p-[14px] mt-[14px] text-[12px] leading-[1.4]"
          >
            <div
              className="text-td-accent text-[10px] font-bold tracking-[0.4px] uppercase"
            >
              🛒 Pedido #4821
            </div>
            <div className="font-semibold mt-[4px]">
              Marisol Hernández
            </div>
            <div className="text-td-mute text-[10px]">
              +52 55 2847 1902
            </div>
            <div
              className="border-t border-td-line mt-[6px] pt-[6px] font-mono text-[10px]"
            >
              3× Taco al pastor · $75
              <br />
              1× Gringa · $75
              <br />
              2× Horchata · $50
            </div>
            <div
              className="flex justify-between border-t border-td-line mt-[6px] pt-[6px] font-semibold text-[13px]"
            >
              <span>Total</span>
              <span className="font-mono">
                $200
              </span>
            </div>
          </div>
          <h2
            className="text-[30px] font-semibold mt-auto mb-0 leading-[1.05] tracking-[-1px]"
          >
            Tus pedidos
            <br />
            directo a
            <br />
            WhatsApp.
          </h2>
        </div>
      </Story>

      <Story bg="#E9E3D4">
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0_20px,_rgba(0,0,0,0.02)_20px_40px)]"
        />
        <div
          className="flex flex-col h-full relative p-[24px]"
        >
          <NeniLogo size={26} />
          <div className="text-center my-auto">
            <div
              className="text-td-mute text-[12px] tracking-[1px] uppercase mb-[10px]"
            >
              Tu tienda en 2 min
            </div>
            <div
              className="inline-flex items-center gap-1 border border-td-line py-[14px] px-[20px] rounded-[14px] bg-white font-mono text-[22px] font-semibold"
            >
              <span className="text-td-mute">neni.mx/</span>
              <span>tunegocio</span>
            </div>
          </div>
          <div
            className="text-center text-td-mute text-[12px]"
          >
            Sin mensualidad · Sin código · Sin pretextos
          </div>
        </div>
      </Story>
    </div>
  );
}
