import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/neni-icons";

import { PLAN_FEATURES } from "./constants";

export function Pricing() {
  return (
    <div className="px-6 pb-12 md:px-12 md:pb-16 lg:px-[72px] lg:pb-[80px]">
      <div className="bg-td-ink text-td-bg relative grid grid-cols-1 gap-10 overflow-hidden rounded-3xl px-8 py-12 md:px-12 md:py-16 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-[48px] lg:rounded-[28px] lg:px-[56px] lg:py-[64px]">
        <div>
          <div className="mb-3 text-[12px] tracking-[1.5px] text-[rgba(255,255,255,0.5)] uppercase">
            Precio
          </div>
          <div className="text-6xl leading-[1] font-semibold tracking-[-2px] md:text-8xl md:tracking-[-3px] lg:text-[92px] lg:tracking-[-4px]">
            $0
            <span className="text-2xl font-medium text-[rgba(255,255,255,0.5)] md:text-3xl lg:text-[32px]">
              {" "}
              / mes
            </span>
          </div>
          <div className="mt-4 max-w-[440px] text-[15px] leading-[1.5] text-[rgba(255,255,255,0.7)]">
            Gratis para siempre. Solo pagas 2.5% cuando cobras con tarjeta.
            OXXO, SPEI y efectivo, 0% comisión.
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link href="/onboarding">Crear mi tienda ahora</Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-td-bg border-[rgba(255,255,255,0.2)]"
            >
              Ver demo
            </Button>
          </div>
        </div>
        <div>
          {PLAN_FEATURES.map((feature, i) => (
            <div
              key={feature}
              className="flex items-center gap-3 py-3 text-[14px]"
              style={{
                borderBottom:
                  i < PLAN_FEATURES.length - 1
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "none",
              }}
            >
              <CheckIcon size={16} stroke="var(--td-accent)" />
              {feature}
            </div>
          ))}
        </div>
        <div className="bg-td-accent absolute -top-[80px] -right-[80px] h-[280px] w-[280px] rounded-full opacity-[0.15]" />
      </div>
    </div>
  );
}
