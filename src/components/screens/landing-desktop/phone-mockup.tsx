import { PlusIcon, WaIcon } from "@/components/neni-icons";
import { ProductPlaceholder } from "@/components/product-placeholder";

import { PAYMENT_BADGES, PHONE_PRODUCTS } from "./constants";

export function PhoneMockup() {
  return (
    <div className="relative flex h-auto items-start justify-center lg:block lg:h-[780px]">
      <div className="bg-td-accent absolute top-[60px] right-[20px] hidden h-[420px] w-[420px] rounded-full opacity-[0.14] blur-[2px] lg:block" />
      <div className="absolute bottom-[40px] left-[80px] hidden h-[220px] w-[220px] rounded-full bg-[#E9E3D4] lg:block" />

      <div className="relative h-[620px] w-[300px] overflow-hidden rounded-[44px] border-[10px] border-[#1A1A1A] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] md:h-[700px] md:w-[340px] lg:absolute lg:top-[20px] lg:left-[120px]">
        <div className="relative h-[90px] bg-[linear-gradient(135deg,#E63978_0%,#C9562C_100%)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_16px,rgba(255,255,255,0.08)_16px_32px)]" />
        </div>

        <div className="relative -mt-[26px] px-[18px]">
          <div className="grid h-[56px] w-[56px] place-items-center rounded-[14px] border-[3px] border-white bg-white font-mono text-[17px] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            MS
          </div>
          <div className="mt-[10px]">
            <div className="flex items-center gap-2">
              <div className="text-[17px] font-semibold tracking-[-0.4px]">
                Mari Skincare
              </div>
              <div className="bg-td-accent rounded-full px-[6px] py-[2px] text-[9px] font-semibold tracking-[0.3px] text-white">
                ABIERTO
              </div>
            </div>
            <div className="text-td-mute mt-[2px] text-[11px]">
              ⭐ 4.9 (184) · Entrega 1–2 días · CDMX
            </div>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden px-[18px] pt-[14px] pb-[10px]">
          {["Todos", "Rostro", "Cuerpo", "Labios"].map((c, i) => (
            <div
              key={c}
              className="border-td-line rounded-full border px-[10px] py-[5px] text-[11px] font-medium whitespace-nowrap"
              style={{
                background: i === 0 ? "#141311" : "#fff",
                color: i === 0 ? "#FAF8F4" : "#141311",
              }}
            >
              {c}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 px-[18px] pb-[18px]">
          {PHONE_PRODUCTS.map((product) => (
            <div
              key={product.name}
              className="border-td-line overflow-hidden rounded-[10px] border bg-white"
            >
              <div className="relative">
                <ProductPlaceholder
                  h={92}
                  label={product.name.toLowerCase()}
                  tone={product.tone}
                />
                {product.tag && (
                  <div className="absolute top-[6px] left-[6px] rounded-full bg-[rgba(20,19,17,0.9)] px-[6px] py-[2px] text-[8.5px] font-semibold tracking-[0.3px] text-white">
                    {product.tag.toUpperCase()}
                  </div>
                )}
                <div className="absolute right-[6px] bottom-[6px] grid h-[22px] w-[22px] place-items-center rounded-full bg-[#141311] text-[#FAF8F4]">
                  <PlusIcon size={11} />
                </div>
              </div>
              <div className="p-[8px]">
                <div className="text-[11px] font-medium">{product.name}</div>
                <div className="mt-[2px] font-mono text-[11px]">
                  ${product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-td-accent absolute right-[16px] bottom-[16px] left-[16px] flex items-center gap-2.5 rounded-[14px] px-[14px] py-[10px] text-white">
          <div className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-[rgba(255,255,255,0.25)] text-[11px] font-bold">
            2
          </div>
          <div className="flex-1 text-[12px] font-semibold">Ver pedido</div>
          <div className="font-mono text-[13px] font-semibold">$790</div>
        </div>
      </div>

      <div className="border-td-line absolute top-[70px] right-0 hidden w-[280px] rotate-[3deg] rounded-[16px] border bg-white p-[14px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18)] lg:block">
        <div className="mb-[8px] flex items-center gap-2">
          <div className="bg-td-accent grid h-[26px] w-[26px] place-items-center rounded-full text-white">
            <WaIcon size={14} />
          </div>
          <div className="text-[12px] font-semibold">Neni · Pedidos</div>
          <div className="text-td-mute ml-auto text-[10px]">ahora</div>
        </div>
        <div className="text-td-accent mb-[4px] text-[11px] font-bold tracking-[0.3px] uppercase">
          🛒 Nuevo pedido · #4821
        </div>
        <div className="text-td-ink text-[12.5px] font-semibold">
          Marisol Hernández
        </div>
        <div className="text-td-mute mt-[2px] mb-[8px] text-[11px]">
          +52 55 2847 1902
        </div>
        <div className="border-td-line border-t pt-[8px] font-mono text-[11px] leading-[1.6]">
          <div className="flex justify-between">
            <span>2× Serum Vit C</span>
            <span>$680</span>
          </div>
          <div className="flex justify-between">
            <span>1× Tónico rosas</span>
            <span>$110</span>
          </div>
        </div>
        <div className="border-td-line mt-[6px] flex justify-between border-t pt-[6px] font-mono text-[13px] font-bold">
          <span>Total</span>
          <span>$790</span>
        </div>
      </div>

      <div className="bg-td-ink text-td-bg absolute bottom-[120px] left-0 hidden -rotate-[5deg] rounded-[16px] px-[18px] py-[14px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] lg:block">
        <div className="text-[10px] tracking-[0.6px] uppercase opacity-[0.6]">
          Hoy
        </div>
        <div className="mt-[2px] font-mono text-[28px] font-semibold tracking-[-1.2px]">
          +$2,840
        </div>
        <svg width="100" height="20" viewBox="0 0 100 20" className="mt-[4px]">
          <path
            d="M0 16 L14 12 L28 14 L42 8 L56 10 L70 5 L84 7 L100 2"
            stroke="var(--td-accent)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="border-td-line absolute right-[40px] bottom-[80px] hidden w-[210px] rotate-[4deg] flex-col gap-1.5 rounded-[14px] border bg-white p-[14px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] lg:flex">
        <div className="text-td-mute text-[10px] font-semibold tracking-[0.6px] uppercase">
          Acepta pagos
        </div>
        <div className="flex gap-1">
          {PAYMENT_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex-1 rounded-[4px] py-[4px] text-center font-mono text-[9px] font-bold tracking-[0.3px] text-white"
              style={{
                background: badge.color,
              }}
            >
              {badge.label}
            </div>
          ))}
        </div>
        <div className="text-td-mute mt-[2px] text-[11px]">
          Efectivo contra entrega también ✓
        </div>
      </div>
    </div>
  );
}
