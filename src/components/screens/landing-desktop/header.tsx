import { NeniLogo } from "@/components/neni-logo";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <div
      className="flex items-center justify-between py-[28px] px-[72px]"
    >
      <NeniLogo size={36} />
      <div
        className="flex text-td-mute gap-[36px] text-[14px]"
      >
        <span>Cómo funciona</span>
        <span>Precios</span>
        <span>Historias</span>
        <span>Ayuda</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-td-mute text-[14px]">Entrar</span>
        <Button>Crear tienda gratis</Button>
      </div>
    </div>
  );
}
