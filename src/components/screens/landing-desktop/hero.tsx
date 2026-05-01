import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowIcon, LinkIcon } from "@/components/neni-icons";

import { PhoneMockup } from "./phone-mockup";

export function Hero() {
  return (
    <div className="grid grid-cols-1 gap-12 px-6 pt-8 pb-12 md:px-12 md:pt-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-[48px] lg:px-[72px] lg:pt-[40px] lg:pb-[72px]">
      <div>
        <h1 className="m-0 text-6xl leading-[0.88] font-semibold tracking-[-3px] md:text-8xl md:tracking-[-4px] lg:text-[128px] lg:tracking-[-6px]">
          Vende
          <br />
          como
          <br />
          <span className="text-td-accent">neni.</span>
        </h1>
        <p className="text-td-mute mt-8 mb-8 max-w-[460px] text-base leading-[1.4] md:text-lg lg:mt-[36px] lg:mb-[36px] lg:text-[20px]">
          Sube tu catálogo, comparte tu link y recibe cada pedido directo a tu
          WhatsApp. Sin mensualidad, sin código, sin pretextos.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <Link href="/onboarding">
              Crear mi tienda <ArrowIcon size={18} />
            </Link>
          </Button>
          <div className="border-td-line flex items-center gap-2 self-start rounded-full border bg-white px-[18px] py-3 font-mono text-[14px]">
            <LinkIcon size={14} stroke="var(--td-mute)" />
            <span className="text-td-mute">neni.mx/</span>
            <span className="font-medium">tunegocio</span>
            <span className="neni-blink bg-td-ink h-[14px] w-[2px]" />
          </div>
        </div>
      </div>

      <PhoneMockup />
    </div>
  );
}
