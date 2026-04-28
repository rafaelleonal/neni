import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/neni-icons";
import { PLAN_FEATURES } from "./constants";

export function Pricing() {
  return (
    <div className="px-6 md:px-12 lg:px-[72px] pb-12 md:pb-16 lg:pb-[80px]">
      <div className="grid lg:items-center bg-td-ink text-td-bg rounded-3xl lg:rounded-[28px] py-12 md:py-16 lg:py-[64px] px-8 md:px-12 lg:px-[56px] relative overflow-hidden grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-[48px]">
        <div>
          <div className="text-[12px] tracking-[1.5px] uppercase text-[rgba(255,255,255,0.5)] mb-3">
            Precio
          </div>
          <div className="text-6xl md:text-8xl lg:text-[92px] font-semibold tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] leading-[1]">
            $0
            <span className="text-2xl md:text-3xl lg:text-[32px] text-[rgba(255,255,255,0.5)] font-medium">
              {" "}/ mes
            </span>
          </div>
          <div className="text-[15px] text-[rgba(255,255,255,0.7)] mt-4 max-w-[440px] leading-[1.5]">
            Gratis para siempre. Solo pagas 2.5% cuando cobras con tarjeta.
            OXXO, SPEI y efectivo, 0% comisión.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-7">
            <Button variant="accent" size="lg">
              Crear mi tienda ahora
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
        <div className="bg-td-accent absolute -right-[80px] -top-[80px] w-[280px] h-[280px] rounded-full opacity-[0.15]" />
      </div>
    </div>
  );
}
