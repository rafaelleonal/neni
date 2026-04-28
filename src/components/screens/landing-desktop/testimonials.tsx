import { ProductPlaceholder } from "@/components/product-placeholder";
import type { ProductTone } from "@/lib/tokens";
import { cn } from "@/lib/utils";

const DON_MEMO_TONES: ProductTone[] = ["warm", "sand", "cream", "clay"];

const CHART_DATA = [12, 24, 38, 56, 89, 142];

const STATS = [
  { value: "8,400+", label: "Tiendas activas" },
  { value: "$24M", label: "Vendido por nenis en 2025" },
  { value: "32 estados", label: "Cobertura nacional" },
  { value: "4.9/5", label: "Satisfacción promedio" },
];

export function Testimonials() {
  return (
    <div className="px-6 md:px-12 lg:px-[72px] pb-16 md:pb-20 lg:pb-[100px]">
      <div className="mb-10 lg:mb-[48px]">
        <div className="text-[12px] tracking-[1.5px] uppercase text-td-mute mb-3 font-mono">
          Quien ya vende
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-[56px] font-semibold m-0 tracking-[-1.5px] lg:tracking-[-2px] leading-[1] max-w-[880px]">
          Mexicanas que ya
          <br />
          cambiaron su historia.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] gap-4">
        <article className="md:col-span-2 lg:col-span-1 p-8 md:p-10 lg:p-[40px] rounded-3xl lg:rounded-[24px] bg-td-ink text-td-bg flex flex-col relative min-h-[400px] md:min-h-[480px]">
          <div className="text-[96px] leading-[0.6] text-td-accent font-mono">
            “
          </div>
          <div className="text-2xl md:text-[28px] leading-[1.25] font-medium tracking-[-0.6px] mt-3 text-pretty">
            Antes vendía por DM y se me iban los pedidos. Hoy mi WhatsApp suena
            solito y me triplicó las ventas en tres meses.
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            <div className="w-[52px] h-[52px] rounded-full bg-[linear-gradient(135deg,#E63978,#C9562C)] grid place-items-center font-mono font-bold text-[16px]">
              MS
            </div>
            <div>
              <div className="font-semibold text-[15px]">
                Mari · Mari Skincare
              </div>
              <div className="text-[12px] opacity-60">
                CDMX · vende desde marzo 2025
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[11px] opacity-50 tracking-[0.6px] uppercase">
                Ventas/mes
              </div>
              <div className="font-mono text-[22px] font-semibold text-td-accent">
                $48,200
              </div>
            </div>
          </div>
        </article>

        <article className="p-7 lg:p-[28px] rounded-3xl lg:rounded-[24px] bg-[#FFE9DC] text-td-ink flex flex-col min-h-[400px] md:min-h-[480px] relative">
          <div className="text-[13px] font-semibold text-[#C9562C] tracking-[0.3px] uppercase font-mono">
            Taquería
          </div>
          <div className="text-[19px] leading-[1.35] font-medium mt-3 text-pretty">
            Yo no le sé a las computadoras. Mi sobrina me ayudó a subir la carta
            y ya. Ahora me llegan pedidos hasta de la otra colonia.
          </div>
          <div className="mt-auto">
            <div className="flex gap-1 mb-4">
              {DON_MEMO_TONES.map((tone) => (
                <div key={tone} className="flex-1">
                  <ProductPlaceholder h={50} label="" tone={tone} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="w-[40px] h-[40px] rounded-full bg-[#C9562C] text-white grid place-items-center font-mono font-bold">
                DM
              </div>
              <div>
                <div className="text-[13px] font-semibold">Don Memo</div>
                <div className="text-[11px] text-td-mute">
                  Tacos Don Memo · Puebla
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="p-7 lg:p-[28px] rounded-3xl lg:rounded-[24px] bg-white border border-td-line flex flex-col min-h-[400px] md:min-h-[480px]">
          <div className="text-[13px] font-semibold text-td-accent tracking-[0.3px] uppercase font-mono">
            Pastelería casera
          </div>
          <div className="text-[19px] leading-[1.35] font-medium mt-3 text-pretty">
            En noviembre vendí 142 roscas de reyes desde mi cocina. Sin Neni
            hubieran sido como 30.
          </div>

          <div className="mt-5 p-3.5 bg-td-bg rounded-[12px]">
            <div className="text-[10px] tracking-[0.5px] uppercase text-td-mute font-mono mb-2">
              Pedidos · últimos 6 meses
            </div>
            <div className="flex items-end gap-1 h-[60px]">
              {CHART_DATA.map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-[3px]",
                    i === CHART_DATA.length - 1 ? "bg-td-accent" : "bg-td-ink",
                  )}
                  style={{ height: `${(h / 142) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1.5 text-[9px] text-td-mute font-mono">
              <span>JUN</span>
              <span>NOV</span>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-[10px] pt-5">
            <div className="w-[40px] h-[40px] rounded-full bg-[#E63978] text-white grid place-items-center font-mono font-bold">
              LR
            </div>
            <div>
              <div className="text-[13px] font-semibold">Lupita Ramos</div>
              <div className="text-[11px] text-td-mute">
                Postres Lupita · Mty
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-6 px-6 md:px-10 py-6 md:py-8 rounded-2xl lg:rounded-[20px] bg-td-bg border border-dashed border-td-line grid grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "lg:border-l lg:border-td-line lg:pl-6",
              i === 0 && "lg:border-l-0 lg:pl-0",
            )}
          >
            <div className="text-3xl md:text-4xl lg:text-[36px] font-semibold tracking-[-1.4px] font-mono">
              {stat.value}
            </div>
            <div className="text-[12px] text-td-mute mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
