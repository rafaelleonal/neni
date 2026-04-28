import { NeniLogo } from "@/components/neni-logo";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <div className="flex items-center justify-between py-6 px-6 md:py-7 md:px-12 lg:py-[28px] lg:px-[72px]">
      <NeniLogo size={36} />
      <div className="hidden lg:flex text-td-mute gap-[36px] text-[14px]">
        <span>Cómo funciona</span>
        <span>Precios</span>
        <span>Historias</span>
        <span>Ayuda</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-td-mute text-[14px]">Entrar</span>
        <Button size="sm" className="md:hidden">
          Crear
        </Button>
        <Button className="hidden md:inline-flex">Crear tienda gratis</Button>
      </div>
    </div>
  );
}
