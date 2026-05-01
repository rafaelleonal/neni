import { ArrowIcon } from "@/components/neni-icons";

export function FinalCta() {
  return (
    <div className="px-6 pb-12 md:px-12 md:pb-16 lg:px-[72px] lg:pb-[80px]">
      <div className="bg-td-accent relative overflow-hidden rounded-3xl px-6 py-16 text-center text-white md:px-12 md:py-20 lg:rounded-[28px] lg:px-[56px] lg:py-[80px]">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0_24px,rgba(255,255,255,0.04)_24px_48px)]" />
        <div className="relative">
          <div className="mb-4 font-mono text-[12px] tracking-[2px] uppercase opacity-80">
            Tu turno
          </div>
          <h2 className="m-0 mx-auto max-w-[900px] text-5xl leading-[0.95] font-semibold tracking-[-2px] md:text-7xl md:tracking-[-3px] lg:text-[96px] lg:tracking-[-4px]">
            Si vendes algo,
            <br />
            tienes que estar aquí.
          </h2>
          <div className="mx-auto mt-6 max-w-[560px] text-base leading-[1.4] opacity-85 md:text-[18px]">
            15 minutos para abrir tu tienda. Cero pretextos. Cero código. Cero
            mensualidad.
          </div>
          <div className="mt-9 inline-flex flex-col gap-3 rounded-3xl bg-[rgba(255,255,255,0.12)] p-[6px] md:flex-row md:items-center md:rounded-full">
            <div className="text-td-accent flex items-center justify-center gap-[10px] rounded-full bg-white px-[22px] py-[14px] text-[16px] font-semibold">
              Crear mi tienda <ArrowIcon size={18} stroke="var(--td-accent)" />
            </div>
            <div className="px-4 pb-2 text-center text-[14px] opacity-90 md:pb-0">
              Sin tarjeta · Sin contratos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
