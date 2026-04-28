import { Button } from "@/components/ui/button";
import { ArrowIcon, LinkIcon } from "@/components/neni-icons";
import { PhoneMockup } from "./phone-mockup";

export function Hero() {
  return (
    <div className="grid lg:items-center pt-8 md:pt-10 lg:pt-[40px] px-6 md:px-12 lg:px-[72px] pb-12 lg:pb-[72px] grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-[48px]">
      <div>
        <h1 className="text-6xl md:text-8xl lg:text-[128px] leading-[0.88] font-semibold m-0 tracking-[-3px] md:tracking-[-4px] lg:tracking-[-6px]">
          Vende
          <br />
          como
          <br />
          <span className="text-td-accent">neni.</span>
        </h1>
        <p className="text-td-mute text-base md:text-lg lg:text-[20px] leading-[1.4] mt-8 lg:mt-[36px] mb-8 lg:mb-[36px] max-w-[460px]">
          Sube tu catálogo, comparte tu link y recibe cada pedido directo a tu
          WhatsApp. Sin mensualidad, sin código, sin pretextos.
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <Button size="lg">
            Crear mi tienda <ArrowIcon size={18} />
          </Button>
          <div className="flex items-center gap-2 border border-td-line py-3 px-[18px] rounded-full bg-white font-mono text-[14px] self-start">
            <LinkIcon size={14} stroke="var(--td-mute)" />
            <span className="text-td-mute">neni.mx/</span>
            <span className="font-medium">tunegocio</span>
            <span className="neni-blink bg-td-ink w-[2px] h-[14px]" />
          </div>
        </div>
      </div>

      <PhoneMockup />
    </div>
  );
}
