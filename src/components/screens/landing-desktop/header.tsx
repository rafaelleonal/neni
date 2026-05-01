import Link from "next/link";

import { Button } from "@/components/ui/button";
import { NeniLogo } from "@/components/neni-logo";

export function LandingHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-7 lg:px-[72px] lg:py-[28px]">
      <NeniLogo size={36} />
      <div className="text-td-mute hidden gap-[36px] text-[14px] lg:flex">
        <span>Cómo funciona</span>
        <span>Precios</span>
        <span>Historias</span>
        <span>Ayuda</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-td-mute hidden text-[14px] md:inline">
          Entrar
        </span>
        <Button asChild size="sm" className="md:hidden">
          <Link href="/onboarding">Crear</Link>
        </Button>
        <Button asChild className="hidden md:inline-flex">
          <Link href="/onboarding">Crear tienda gratis</Link>
        </Button>
      </div>
    </div>
  );
}
