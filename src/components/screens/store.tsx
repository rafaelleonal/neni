import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";
import {
  MoreIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/neni-icons";
import { STORE_PRODUCTS } from "@/lib/mocks";

const STATS = [
  { label: "Rating", value: "4.9", sub: "184 reseñas" },
  { label: "Entrega", value: "1–2", sub: "días" },
  { label: "Envío", value: "Gratis", sub: ">$500" },
];

export function Store() {
  return (
    <PhoneScreen homeIndicatorPlacement="floating">
      <div className="h-[170px] mx-[14px] rounded-[22px] bg-[linear-gradient(135deg,_#E63978_0%,_#C9562C_100%)] relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0_18px,_rgba(255,255,255,0.08)_18px_36px)]" />
        <div className="flex items-end justify-between absolute bottom-[14px] left-[18px] right-[18px]">
          <div className="text-white">
            <div className="text-[10px] tracking-[1.2px] uppercase opacity-[0.85] font-semibold">
              Promo de la semana
            </div>
            <div className="text-[22px] font-semibold tracking-[-0.6px] mt-[2px] leading-[1.1]">
              20% off en cuidado
              <br />
              facial
            </div>
          </div>
          <div className="text-td-ink py-[6px] px-[10px] rounded-full bg-white text-[11px] font-bold font-mono">
            MARI20
          </div>
        </div>
        <div className="flex gap-1.5 absolute top-[12px] right-[12px]">
          <div className="grid place-items-center w-[34px] h-[34px] rounded-full bg-[rgba(255,255,255,0.25)] backdrop-blur-[8px] text-white">
            <SearchIcon size={16} />
          </div>
          <div className="grid place-items-center w-[34px] h-[34px] rounded-full bg-[rgba(255,255,255,0.25)] backdrop-blur-[8px] text-white">
            <MoreIcon size={16} />
          </div>
        </div>
      </div>

      <div className="pt-[12px] px-[20px] relative">
        <div className="grid place-items-center border-4 border-td-bg absolute top-[-30px] left-[22px] w-[68px] h-[68px] rounded-[20px] bg-white font-mono text-[22px] font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          MS
        </div>
        <div className="mt-[44px]">
          <div className="flex items-center gap-2">
            <h1 className="text-[23px] font-semibold m-0 tracking-[-0.6px]">
              Mari Skincare
            </h1>
            <div className="bg-td-accent py-[2px] px-[8px] rounded-full text-white text-[10px] font-semibold tracking-[0.3px]">
              ABIERTO
            </div>
          </div>
          <div className="text-td-mute text-[12.5px] mt-[4px]">
            Skincare natural hecho en casa · CDMX
          </div>

          <div className="grid grid-cols-3 overflow-hidden border border-td-line mt-[12px] bg-white rounded-[12px]">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-[10px] px-[8px]"
                style={{
                  borderRight:
                    i < STATS.length - 1 ? "1px solid var(--td-line)" : "none",
                }}
              >
                <div className="text-[13.5px] font-semibold tracking-[-0.3px]">
                  {stat.value}
                </div>
                <div className="text-td-mute text-[10px] mt-[1px]">
                  {stat.label} · {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-auto no-scrollbar pt-[16px] px-[20px] pb-[12px]">
        {["Todos", "Rostro", "Cuerpo", "Labios", "Kits"].map((c, i) => (
          <div
            key={c}
            className="border border-td-line py-[7px] px-[14px] rounded-full text-[13px] font-medium whitespace-nowrap shrink-0"
            style={{
              background: i === 0 ? "var(--td-ink)" : "#fff",
              color: i === 0 ? "var(--td-bg)" : "var(--td-ink)",
            }}
          >
            {c}
          </div>
        ))}
      </div>

      <div className="pt-[4px] px-[20px] pb-[12px]">
        <div className="grid overflow-hidden border border-td-line bg-white rounded-[16px] grid-cols-[1.1fr_1fr] min-h-[140px]">
          <div className="relative">
            <ProductPlaceholder h={140} label="serum vit c" tone="warm" />
            <div className="bg-td-accent absolute top-[8px] left-[8px] py-[3px] px-[8px] rounded-full text-white text-[9.5px] font-bold tracking-[0.4px]">
              TOP VENTAS
            </div>
          </div>
          <div className="flex flex-col p-[14px]">
            <div className="text-[15px] font-semibold tracking-[-0.3px]">
              Serum Vit C
            </div>
            <div className="text-td-mute text-[11.5px] mt-[2px]">
              30 ml · rostro
            </div>
            <div className="text-td-mute mt-[8px] text-[11.5px] leading-[1.4]">
              Aclara manchas y da luminosidad. Con vitamina C 15%.
            </div>
            <div className="mt-auto flex items-baseline gap-2">
              <span className="font-mono text-[16px] font-semibold">
                $340
              </span>
              <span className="text-td-mute font-mono text-[12px] line-through">
                $420
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-[6px] px-[20px] pb-[10px]">
        <div className="text-[15px] font-semibold tracking-[-0.3px]">
          Todo el catálogo
        </div>
        <div className="text-td-mute text-[11.5px]">
          24 productos
        </div>
      </div>

      <div className="grid grid-cols-2 px-[20px] pb-[140px] gap-[14px]">
        {STORE_PRODUCTS.map((p, i) => (
          <div
            key={i}
            className="border border-td-line bg-white rounded-[14px] overflow-hidden"
          >
            <div className="relative">
              <ProductPlaceholder h={120} label={p.name.toLowerCase()} tone={p.tone} />
              {p.tag && (
                <div className="absolute top-[8px] left-[8px] py-[3px] px-[8px] rounded-full bg-[rgba(20,19,17,0.9)] text-white text-[9.5px] font-semibold tracking-[0.3px]">
                  {p.tag.toUpperCase()}
                </div>
              )}
              <div className="grid place-items-center bg-td-ink text-td-bg absolute bottom-[8px] right-[8px] w-[28px] h-[28px] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
                <PlusIcon size={14} />
              </div>
            </div>
            <div className="p-[10px]">
              <div className="text-[13px] font-medium leading-[1.2]">
                {p.name}
              </div>
              <div className="text-td-mute text-[10.5px] mt-[2px]">
                {p.desc}
              </div>
              <div className="flex items-baseline gap-1.5 mt-[6px]">
                <span className="text-[13px] font-semibold font-mono">
                  ${p.price}
                </span>
                {p.old && (
                  <span className="text-td-mute text-[10.5px] line-through font-mono">
                    ${p.old}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-td-accent absolute bottom-[40px] left-[16px] right-[16px] text-white rounded-[16px] py-[12px] px-[14px] shadow-[0_12px_30px_rgba(31,170,89,0.35)]">
        <div className="grid place-items-center w-[34px] h-[34px] rounded-[10px] bg-[rgba(255,255,255,0.22)] text-[13px] font-bold">
          2
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold">Ver pedido</div>
          <div className="text-[11px] opacity-[0.85]">
            OXXO · SPEI · Tarjeta · Efectivo
          </div>
        </div>
        <div className="font-mono text-[16px] font-semibold">
          $790
        </div>
      </div>
    </PhoneScreen>
  );
}
