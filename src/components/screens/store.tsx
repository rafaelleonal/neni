import { STORE_PRODUCTS } from "@/lib/mocks";

import { MoreIcon, PlusIcon, SearchIcon } from "@/components/neni-icons";
import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";

const STATS = [
  { label: "Rating", value: "4.9", sub: "184 reseñas" },
  { label: "Entrega", value: "1–2", sub: "días" },
  { label: "Envío", value: "Gratis", sub: ">$500" },
];

export function Store() {
  return (
    <PhoneScreen homeIndicatorPlacement="floating">
      <div className="relative mx-[14px] h-[170px] overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,_#E63978_0%,_#C9562C_100%)]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0_18px,_rgba(255,255,255,0.08)_18px_36px)]" />
        <div className="absolute right-[18px] bottom-[14px] left-[18px] flex items-end justify-between">
          <div className="text-white">
            <div className="text-[10px] font-semibold tracking-[1.2px] uppercase opacity-[0.85]">
              Promo de la semana
            </div>
            <div className="mt-[2px] text-[22px] leading-[1.1] font-semibold tracking-[-0.6px]">
              20% off en cuidado
              <br />
              facial
            </div>
          </div>
          <div className="text-td-ink rounded-full bg-white px-[10px] py-[6px] font-mono text-[11px] font-bold">
            MARI20
          </div>
        </div>
        <div className="absolute top-[12px] right-[12px] flex gap-1.5">
          <div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(255,255,255,0.25)] text-white backdrop-blur-[8px]">
            <SearchIcon size={16} />
          </div>
          <div className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(255,255,255,0.25)] text-white backdrop-blur-[8px]">
            <MoreIcon size={16} />
          </div>
        </div>
      </div>

      <div className="relative px-[20px] pt-[12px]">
        <div className="border-td-bg absolute top-[-30px] left-[22px] grid h-[68px] w-[68px] place-items-center rounded-[20px] border-4 bg-white font-mono text-[22px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          MS
        </div>
        <div className="mt-[44px]">
          <div className="flex items-center gap-2">
            <h1 className="m-0 text-[23px] font-semibold tracking-[-0.6px]">
              Mari Skincare
            </h1>
            <div className="bg-td-accent rounded-full px-[8px] py-[2px] text-[10px] font-semibold tracking-[0.3px] text-white">
              ABIERTO
            </div>
          </div>
          <div className="text-td-mute mt-[4px] text-[12.5px]">
            Skincare natural hecho en casa · CDMX
          </div>

          <div className="border-td-line mt-[12px] grid grid-cols-3 overflow-hidden rounded-[12px] border bg-white">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="px-[8px] py-[10px] text-center"
                style={{
                  borderRight:
                    i < STATS.length - 1 ? "1px solid var(--td-line)" : "none",
                }}
              >
                <div className="text-[13.5px] font-semibold tracking-[-0.3px]">
                  {stat.value}
                </div>
                <div className="text-td-mute mt-[1px] text-[10px]">
                  {stat.label} · {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-auto px-[20px] pt-[16px] pb-[12px]">
        {["Todos", "Rostro", "Cuerpo", "Labios", "Kits"].map((c, i) => (
          <div
            key={c}
            className="border-td-line shrink-0 rounded-full border px-[14px] py-[7px] text-[13px] font-medium whitespace-nowrap"
            style={{
              background: i === 0 ? "var(--td-ink)" : "#fff",
              color: i === 0 ? "var(--td-bg)" : "var(--td-ink)",
            }}
          >
            {c}
          </div>
        ))}
      </div>

      <div className="px-[20px] pt-[4px] pb-[12px]">
        <div className="border-td-line grid min-h-[140px] grid-cols-[1.1fr_1fr] overflow-hidden rounded-[16px] border bg-white">
          <div className="relative">
            <ProductPlaceholder h={140} label="serum vit c" tone="warm" />
            <div className="bg-td-accent absolute top-[8px] left-[8px] rounded-full px-[8px] py-[3px] text-[9.5px] font-bold tracking-[0.4px] text-white">
              TOP VENTAS
            </div>
          </div>
          <div className="flex flex-col p-[14px]">
            <div className="text-[15px] font-semibold tracking-[-0.3px]">
              Serum Vit C
            </div>
            <div className="text-td-mute mt-[2px] text-[11.5px]">
              30 ml · rostro
            </div>
            <div className="text-td-mute mt-[8px] text-[11.5px] leading-[1.4]">
              Aclara manchas y da luminosidad. Con vitamina C 15%.
            </div>
            <div className="mt-auto flex items-baseline gap-2">
              <span className="font-mono text-[16px] font-semibold">$340</span>
              <span className="text-td-mute font-mono text-[12px] line-through">
                $420
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-baseline justify-between px-[20px] pt-[6px] pb-[10px]">
        <div className="text-[15px] font-semibold tracking-[-0.3px]">
          Todo el catálogo
        </div>
        <div className="text-td-mute text-[11.5px]">24 productos</div>
      </div>

      <div className="grid grid-cols-2 gap-[14px] px-[20px] pb-[140px]">
        {STORE_PRODUCTS.map((p, i) => (
          <div
            key={i}
            className="border-td-line overflow-hidden rounded-[14px] border bg-white"
          >
            <div className="relative">
              <ProductPlaceholder
                h={120}
                label={p.name.toLowerCase()}
                tone={p.tone}
              />
              {p.tag && (
                <div className="absolute top-[8px] left-[8px] rounded-full bg-[rgba(20,19,17,0.9)] px-[8px] py-[3px] text-[9.5px] font-semibold tracking-[0.3px] text-white">
                  {p.tag.toUpperCase()}
                </div>
              )}
              <div className="bg-td-ink text-td-bg absolute right-[8px] bottom-[8px] grid h-[28px] w-[28px] place-items-center rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                <PlusIcon size={14} />
              </div>
            </div>
            <div className="p-[10px]">
              <div className="text-[13px] leading-[1.2] font-medium">
                {p.name}
              </div>
              <div className="text-td-mute mt-[2px] text-[10.5px]">
                {p.desc}
              </div>
              <div className="mt-[6px] flex items-baseline gap-1.5">
                <span className="font-mono text-[13px] font-semibold">
                  ${p.price}
                </span>
                {p.old && (
                  <span className="text-td-mute font-mono text-[10.5px] line-through">
                    ${p.old}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-td-accent absolute right-[16px] bottom-[40px] left-[16px] flex items-center gap-3 rounded-[16px] px-[14px] py-[12px] text-white shadow-[0_12px_30px_rgba(31,170,89,0.35)]">
        <div className="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-[rgba(255,255,255,0.22)] text-[13px] font-bold">
          2
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold">Ver pedido</div>
          <div className="text-[11px] opacity-[0.85]">
            OXXO · SPEI · Tarjeta · Efectivo
          </div>
        </div>
        <div className="font-mono text-[16px] font-semibold">$790</div>
      </div>
    </PhoneScreen>
  );
}
