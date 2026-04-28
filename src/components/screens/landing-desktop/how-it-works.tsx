type Step = {
  n: string;
  title: string;
  desc: string;
  time: string;
  accentClass: string;
  dotClass: string;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Sube tu catálogo",
    desc: "Foto, nombre, precio. Si tienes Excel o Instagram, lo importamos por ti.",
    time: "5 min",
    accentClass: "text-[#E63978]",
    dotClass: "bg-[#E63978]",
  },
  {
    n: "02",
    title: "Comparte tu link",
    desc: "Tu propio neni.mx/tunegocio. Pégalo en bio de Instagram, en stories o impreso en una tarjeta.",
    time: "2 min",
    accentClass: "text-td-accent",
    dotClass: "bg-td-accent",
  },
  {
    n: "03",
    title: "Cobra y entrega",
    desc: "Cada pedido cae en tu WhatsApp con todo: ticket, dirección, pago confirmado. Tú solo prepara.",
    time: "continuo",
    accentClass: "text-[#C9562C]",
    dotClass: "bg-[#C9562C]",
  },
];

export function HowItWorks() {
  return (
    <div className="px-6 md:px-12 lg:px-[72px] pt-10 lg:pt-[40px] pb-16 md:pb-20 lg:pb-[100px]">
      <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-6 lg:gap-0 mb-10 lg:mb-[48px]">
        <div>
          <div className="text-[12px] tracking-[1.5px] uppercase text-td-mute mb-3 font-mono">
            Cómo funciona
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-semibold m-0 tracking-[-1.5px] lg:tracking-[-2.4px] leading-[0.95] max-w-[720px]">
            De tu cocina a su carrito,
            <br />
            en <span className="text-td-accent">15 minutos.</span>
          </h2>
        </div>
        <div className="text-[14px] text-td-mute max-w-[280px] leading-[1.5] lg:pt-3">
          Sin equipo de desarrollo, sin tarjeta de crédito, sin reuniones de
          venta.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="p-6 md:p-8 lg:p-[32px] rounded-2xl lg:rounded-[20px] bg-white border border-td-line min-h-[280px] md:min-h-[320px] flex flex-col relative overflow-hidden"
          >
            <div
              className={`text-[100px] md:text-[110px] lg:text-[132px] font-semibold tracking-[-4px] lg:tracking-[-6px] leading-[0.85] font-mono ${step.accentClass}`}
            >
              {step.n}
            </div>
            <div className="text-xl md:text-2xl lg:text-[24px] font-semibold mt-6 tracking-[-0.6px]">
              {step.title}
            </div>
            <div className="text-[14px] text-td-mute mt-2 leading-[1.5]">
              {step.desc}
            </div>
            <div className="mt-auto pt-5 text-[11px] font-mono tracking-[0.5px] uppercase text-td-ink flex items-center gap-[6px]">
              <span
                className={`w-[6px] h-[6px] rounded-full ${step.dotClass}`}
              />
              {step.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
