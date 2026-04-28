import { ArrowIcon } from "@/components/neni-icons";

export function FinalCta() {
  return (
    <div className="px-6 md:px-12 lg:px-[72px] pb-12 md:pb-16 lg:pb-[80px]">
      <div className="px-6 md:px-12 lg:px-[56px] py-16 md:py-20 lg:py-[80px] rounded-3xl lg:rounded-[28px] bg-td-accent text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_24px,rgba(255,255,255,0.04)_24px_48px)]" />
        <div className="relative">
          <div className="text-[12px] tracking-[2px] uppercase opacity-80 mb-4 font-mono">
            Tu turno
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[96px] font-semibold m-0 tracking-[-2px] md:tracking-[-3px] lg:tracking-[-4px] leading-[0.95] max-w-[900px] mx-auto">
            Si vendes algo,
            <br />
            tienes que estar aquí.
          </h2>
          <div className="text-base md:text-[18px] opacity-85 mt-6 max-w-[560px] mx-auto leading-[1.4]">
            15 minutos para abrir tu tienda. Cero pretextos. Cero código. Cero
            mensualidad.
          </div>
          <div className="mt-9 inline-flex flex-col md:flex-row gap-3 md:items-center p-[6px] rounded-3xl md:rounded-full bg-[rgba(255,255,255,0.12)]">
            <div className="px-[22px] py-[14px] bg-white text-td-accent rounded-full text-[16px] font-semibold flex items-center justify-center gap-[10px]">
              Crear mi tienda <ArrowIcon size={18} stroke="var(--td-accent)" />
            </div>
            <div className="px-4 pb-2 md:pb-0 text-[14px] opacity-90 text-center">
              Sin tarjeta · Sin contratos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
