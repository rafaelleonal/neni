import { NeniLogo } from "@/components/neni-logo";

export function LandingFooter() {
  return (
    <div
      className="flex items-center justify-between border-t border-td-line text-td-mute pt-[40px] px-[72px] pb-[32px] text-[13px]"
    >
      <NeniLogo size={24} />
      <div>© 2026 Neni · Hecho en México 🇲🇽</div>
      <div className="flex gap-[24px]">
        <span>Privacidad</span>
        <span>Términos</span>
        <span>Contacto</span>
      </div>
    </div>
  );
}
