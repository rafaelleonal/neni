import type { ProductTone } from "@/lib/tokens";
import { cn } from "@/lib/utils";

import { ProductPlaceholder } from "@/components/product-placeholder";

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
    <div className="px-6 pb-16 md:px-12 md:pb-20 lg:px-[72px] lg:pb-[100px]">
      <div className="mb-10 lg:mb-[48px]">
        <div className="text-td-mute mb-3 font-mono text-[12px] tracking-[1.5px] uppercase">
          Quien ya vende
        </div>
        <h2 className="m-0 max-w-[880px] text-4xl leading-[1] font-semibold tracking-[-1.5px] md:text-5xl lg:text-[56px] lg:tracking-[-2px]">
          Mexicanas que ya
          <br />
          cambiaron su historia.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <article className="bg-td-ink text-td-bg relative flex min-h-[400px] flex-col rounded-3xl p-8 md:col-span-2 md:min-h-[480px] md:p-10 lg:col-span-1 lg:rounded-[24px] lg:p-[40px]">
          <div className="text-td-accent font-mono text-[96px] leading-[0.6]">
            “
          </div>
          <div className="mt-3 text-2xl leading-[1.25] font-medium tracking-[-0.6px] text-pretty md:text-[28px]">
            Antes vendía por DM y se me iban los pedidos. Hoy mi WhatsApp suena
            solito y me triplicó las ventas en tres meses.
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            <div className="grid h-[52px] w-[52px] place-items-center rounded-full bg-[linear-gradient(135deg,#E63978,#C9562C)] font-mono text-[16px] font-bold">
              MS
            </div>
            <div>
              <div className="text-[15px] font-semibold">
                Mari · Mari Skincare
              </div>
              <div className="text-[12px] opacity-60">
                CDMX · vende desde marzo 2025
              </div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-[11px] tracking-[0.6px] uppercase opacity-50">
                Ventas/mes
              </div>
              <div className="text-td-accent font-mono text-[22px] font-semibold">
                $48,200
              </div>
            </div>
          </div>
        </article>

        <article className="text-td-ink relative flex min-h-[400px] flex-col rounded-3xl bg-[#FFE9DC] p-7 md:min-h-[480px] lg:rounded-[24px] lg:p-[28px]">
          <div className="font-mono text-[13px] font-semibold tracking-[0.3px] text-[#C9562C] uppercase">
            Taquería
          </div>
          <div className="mt-3 text-[19px] leading-[1.35] font-medium text-pretty">
            Yo no le sé a las computadoras. Mi sobrina me ayudó a subir la carta
            y ya. Ahora me llegan pedidos hasta de la otra colonia.
          </div>
          <div className="mt-auto">
            <div className="mb-4 flex gap-1">
              {DON_MEMO_TONES.map((tone) => (
                <div key={tone} className="flex-1">
                  <ProductPlaceholder h={50} label="" tone={tone} />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-[#C9562C] font-mono font-bold text-white">
                DM
              </div>
              <div>
                <div className="text-[13px] font-semibold">Don Memo</div>
                <div className="text-td-mute text-[11px]">
                  Tacos Don Memo · Puebla
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="border-td-line flex min-h-[400px] flex-col rounded-3xl border bg-white p-7 md:min-h-[480px] lg:rounded-[24px] lg:p-[28px]">
          <div className="text-td-accent font-mono text-[13px] font-semibold tracking-[0.3px] uppercase">
            Pastelería casera
          </div>
          <div className="mt-3 text-[19px] leading-[1.35] font-medium text-pretty">
            En noviembre vendí 142 roscas de reyes desde mi cocina. Sin Neni
            hubieran sido como 30.
          </div>

          <div className="bg-td-bg mt-5 rounded-[12px] p-3.5">
            <div className="text-td-mute mb-2 font-mono text-[10px] tracking-[0.5px] uppercase">
              Pedidos · últimos 6 meses
            </div>
            <div className="flex h-[60px] items-end gap-1">
              {CHART_DATA.map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 rounded-[3px]",
                    i === CHART_DATA.length - 1 ? "bg-td-accent" : "bg-td-ink"
                  )}
                  style={{ height: `${(h / 142) * 100}%` }}
                />
              ))}
            </div>
            <div className="text-td-mute mt-1.5 flex justify-between font-mono text-[9px]">
              <span>JUN</span>
              <span>NOV</span>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-[10px] pt-5">
            <div className="grid h-[40px] w-[40px] place-items-center rounded-full bg-[#E63978] font-mono font-bold text-white">
              LR
            </div>
            <div>
              <div className="text-[13px] font-semibold">Lupita Ramos</div>
              <div className="text-td-mute text-[11px]">
                Postres Lupita · Mty
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="bg-td-bg border-td-line mt-6 grid grid-cols-2 gap-6 rounded-2xl border border-dashed px-6 py-6 md:px-10 md:py-8 lg:grid-cols-4 lg:rounded-[20px]">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={cn(
              "lg:border-td-line lg:border-l lg:pl-6",
              i === 0 && "lg:border-l-0 lg:pl-0"
            )}
          >
            <div className="font-mono text-3xl font-semibold tracking-[-1.4px] md:text-4xl lg:text-[36px]">
              {stat.value}
            </div>
            <div className="text-td-mute mt-1 text-[12px]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
