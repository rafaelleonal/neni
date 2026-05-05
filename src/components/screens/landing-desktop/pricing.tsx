import Link from "next/link";

import { PLAN_LIST } from "@/lib/plans";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ArrowIcon, CheckIcon } from "@/components/neni-icons";

export function Pricing() {
  return (
    <div className="px-6 pb-12 md:px-12 md:pb-16 lg:px-[72px] lg:pb-[80px]">
      <div className="bg-td-ink text-td-bg relative overflow-hidden rounded-3xl px-6 py-10 md:px-10 md:py-14 lg:rounded-[28px] lg:px-[56px] lg:py-[64px]">
        <div className="relative">
          <div className="mb-3 text-[12px] tracking-[1.5px] text-[rgba(255,255,255,0.5)] uppercase">
            Precios
          </div>
          <h2 className="max-w-[680px] text-4xl leading-[1] font-semibold tracking-[-1.5px] md:text-5xl lg:text-[56px] lg:tracking-[-2px]">
            Empieza gratis.
            <br />
            Crece cuando estés lista.
          </h2>
          <p className="mt-4 max-w-[520px] text-[15px] leading-[1.5] text-[rgba(255,255,255,0.7)]">
            Sin tarjeta para empezar. Sube a Pro solo cuando estés vendiendo
            más — la comisión más baja paga el plan.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          {PLAN_LIST.map((plan) => {
            const isFree = plan.priceMxn === 0;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border-2 p-6 md:p-7",
                  plan.highlight
                    ? "bg-td-bg text-td-ink border-td-bg"
                    : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)]"
                )}
              >
                {plan.highlight && (
                  <span className="bg-td-accent absolute top-5 right-5 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] text-white uppercase">
                    Recomendado
                  </span>
                )}

                <div
                  className={cn(
                    "text-[11px] font-semibold tracking-[1.2px] uppercase",
                    plan.highlight ? "text-td-mute" : "text-white/50"
                  )}
                >
                  {plan.name}
                </div>

                <div
                  className={cn(
                    "mt-1 text-[18px] font-semibold tracking-[-0.4px] md:text-[20px]",
                    plan.highlight ? "text-td-ink" : "text-white"
                  )}
                >
                  {plan.tagline}
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "font-mono text-4xl font-semibold tracking-[-1.5px] md:text-5xl",
                      plan.highlight ? "text-td-ink" : "text-white"
                    )}
                  >
                    ${plan.priceMxn}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlight ? "text-td-mute" : "text-white/50"
                    )}
                  >
                    {isFree ? "siempre" : "/ mes"}
                  </span>
                </div>
                <div
                  className={cn(
                    "mt-1 text-xs",
                    plan.highlight ? "text-td-mute" : "text-white/50"
                  )}
                >
                  {isFree
                    ? "Sin tarjeta. Sin trampa."
                    : `o $${plan.priceMxnYear} al año (2 meses gratis)`}
                </div>

                <div
                  className={cn(
                    "mt-5 text-[11px] font-semibold tracking-[1px] uppercase",
                    plan.highlight ? "text-td-mute" : "text-white/50"
                  )}
                >
                  Comisión por pago en línea
                </div>
                <div
                  className={cn(
                    "mt-1 font-mono text-base font-semibold",
                    plan.highlight ? "text-td-ink" : "text-white"
                  )}
                >
                  {plan.onlineCommissionPct}%{" "}
                  <span
                    className={cn(
                      "text-xs font-normal",
                      plan.highlight ? "text-td-mute" : "text-white/50"
                    )}
                  >
                    (efectivo siempre 0%)
                  </span>
                </div>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-[13px]"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full",
                          plan.highlight
                            ? "bg-td-accent/15 text-td-accent"
                            : "bg-white/10 text-white"
                        )}
                      >
                        <CheckIcon size={9} stroke="currentColor" sw={3} />
                      </span>
                      <span
                        className={cn(
                          "leading-snug",
                          plan.highlight ? "text-td-ink" : "text-white/90"
                        )}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button
                    asChild
                    full
                    size="lg"
                    variant={plan.highlight ? "primary" : "white"}
                  >
                    <Link href="/onboarding">
                      {isFree ? "Empezar gratis" : "Probar Pro"}
                      <ArrowIcon size={16} />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-td-accent absolute -top-[80px] -right-[80px] h-[280px] w-[280px] rounded-full opacity-[0.15]" />
      </div>
    </div>
  );
}
