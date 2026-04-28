import { ProductPlaceholder } from "@/components/product-placeholder";
import { PlusIcon, WaIcon } from "@/components/neni-icons";
import { PAYMENT_BADGES, PHONE_PRODUCTS } from "./constants";

export function PhoneMockup() {
  return (
    <div className="relative h-auto lg:h-[780px] flex justify-center items-start lg:block">
      <div className="hidden lg:block bg-td-accent absolute right-[20px] top-[60px] w-[420px] h-[420px] rounded-full opacity-[0.14] blur-[2px]" />
      <div className="hidden lg:block absolute left-[80px] bottom-[40px] w-[220px] h-[220px] rounded-full bg-[#E9E3D4]" />

      <div className="relative lg:absolute lg:left-[120px] lg:top-[20px] w-[300px] md:w-[340px] h-[620px] md:h-[700px] rounded-[44px] border-[10px] border-[#1A1A1A] bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="h-[90px] bg-[linear-gradient(135deg,#E63978_0%,#C9562C_100%)] relative">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_16px,rgba(255,255,255,0.08)_16px_32px)]" />
        </div>

        <div className="px-[18px] -mt-[26px] relative">
          <div className="grid place-items-center w-[56px] h-[56px] rounded-[14px] bg-white border-[3px] border-white font-mono text-[17px] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            MS
          </div>
          <div className="mt-[10px]">
            <div className="flex items-center gap-2">
              <div className="text-[17px] font-semibold tracking-[-0.4px]">
                Mari Skincare
              </div>
              <div className="bg-td-accent py-[2px] px-[6px] rounded-full text-white text-[9px] font-semibold tracking-[0.3px]">
                ABIERTO
              </div>
            </div>
            <div className="text-td-mute text-[11px] mt-[2px]">
              ⭐ 4.9 (184) · Entrega 1–2 días · CDMX
            </div>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden pt-[14px] px-[18px] pb-[10px]">
          {["Todos", "Rostro", "Cuerpo", "Labios"].map((c, i) => (
            <div
              key={c}
              className="border border-td-line py-[5px] px-[10px] rounded-full text-[11px] font-medium whitespace-nowrap"
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
              className="border border-td-line rounded-[10px] overflow-hidden bg-white"
            >
              <div className="relative">
                <ProductPlaceholder
                  h={92}
                  label={product.name.toLowerCase()}
                  tone={product.tone}
                />
                {product.tag && (
                  <div className="absolute top-[6px] left-[6px] py-[2px] px-[6px] rounded-full bg-[rgba(20,19,17,0.9)] text-white text-[8.5px] font-semibold tracking-[0.3px]">
                    {product.tag.toUpperCase()}
                  </div>
                )}
                <div className="grid place-items-center absolute bottom-[6px] right-[6px] w-[22px] h-[22px] rounded-full bg-[#141311] text-[#FAF8F4]">
                  <PlusIcon size={11} />
                </div>
              </div>
              <div className="p-[8px]">
                <div className="text-[11px] font-medium">{product.name}</div>
                <div className="text-[11px] font-mono mt-[2px]">
                  ${product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2.5 bg-td-accent absolute bottom-[16px] left-[16px] right-[16px] text-white rounded-[14px] py-[10px] px-[14px]">
          <div className="grid place-items-center w-[22px] h-[22px] rounded-[6px] bg-[rgba(255,255,255,0.25)] text-[11px] font-bold">
            2
          </div>
          <div className="flex-1 text-[12px] font-semibold">Ver pedido</div>
          <div className="font-mono text-[13px] font-semibold">$790</div>
        </div>
      </div>

      <div className="hidden lg:block border border-td-line absolute right-0 top-[70px] w-[280px] p-[14px] rounded-[16px] bg-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.18)] rotate-[3deg]">
        <div className="flex items-center gap-2 mb-[8px]">
          <div className="grid place-items-center bg-td-accent w-[26px] h-[26px] rounded-full text-white">
            <WaIcon size={14} />
          </div>
          <div className="text-[12px] font-semibold">Neni · Pedidos</div>
          <div className="text-td-mute ml-auto text-[10px]">ahora</div>
        </div>
        <div className="text-td-accent text-[11px] font-bold tracking-[0.3px] uppercase mb-[4px]">
          🛒 Nuevo pedido · #4821
        </div>
        <div className="text-td-ink text-[12.5px] font-semibold">
          Marisol Hernández
        </div>
        <div className="text-td-mute text-[11px] mt-[2px] mb-[8px]">
          +52 55 2847 1902
        </div>
        <div className="border-t border-td-line pt-[8px] font-mono text-[11px] leading-[1.6]">
          <div className="flex justify-between">
            <span>2× Serum Vit C</span>
            <span>$680</span>
          </div>
          <div className="flex justify-between">
            <span>1× Tónico rosas</span>
            <span>$110</span>
          </div>
        </div>
        <div className="flex justify-between border-t border-td-line mt-[6px] pt-[6px] font-bold font-mono text-[13px]">
          <span>Total</span>
          <span>$790</span>
        </div>
      </div>

      <div className="hidden lg:block bg-td-ink text-td-bg absolute left-0 bottom-[120px] py-[14px] px-[18px] rounded-[16px] -rotate-[5deg] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)]">
        <div className="text-[10px] opacity-[0.6] tracking-[0.6px] uppercase">
          Hoy
        </div>
        <div className="text-[28px] font-semibold tracking-[-1.2px] font-mono mt-[2px]">
          +$2,840
        </div>
        <svg
          width="100"
          height="20"
          viewBox="0 0 100 20"
          className="mt-[4px]"
        >
          <path
            d="M0 16 L14 12 L28 14 L42 8 L56 10 L70 5 L84 7 L100 2"
            stroke="var(--td-accent)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="hidden lg:flex flex-col gap-1.5 border border-td-line absolute right-[40px] bottom-[80px] p-[14px] rounded-[14px] bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] rotate-[4deg] w-[210px]">
        <div className="text-td-mute text-[10px] tracking-[0.6px] uppercase font-semibold">
          Acepta pagos
        </div>
        <div className="flex gap-1">
          {PAYMENT_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex-1 py-[4px] text-white text-[9px] font-bold tracking-[0.3px] text-center font-mono rounded-[4px]"
              style={{
                background: badge.color,
              }}
            >
              {badge.label}
            </div>
          ))}
        </div>
        <div className="text-td-mute text-[11px] mt-[2px]">
          Efectivo contra entrega también ✓
        </div>
      </div>
    </div>
  );
}
