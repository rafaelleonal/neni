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
    <div className="px-6 pt-10 pb-16 md:px-12 md:pb-20 lg:px-[72px] lg:pt-[40px] lg:pb-[100px]">
      <div className="mb-10 flex flex-col gap-6 lg:mb-[48px] lg:flex-row lg:items-baseline lg:justify-between lg:gap-0">
        <div>
          <div className="text-td-mute mb-3 font-mono text-[12px] tracking-[1.5px] uppercase">
            Cómo funciona
          </div>
          <h2 className="m-0 max-w-[720px] text-4xl leading-[0.95] font-semibold tracking-[-1.5px] md:text-5xl lg:text-[64px] lg:tracking-[-2.4px]">
            De tu cocina a su carrito,
            <br />
            en <span className="text-td-accent">15 minutos.</span>
          </h2>
        </div>
        <div className="text-td-mute max-w-[280px] text-[14px] leading-[1.5] lg:pt-3">
          Sin equipo de desarrollo, sin tarjeta de crédito, sin reuniones de
          venta.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="border-td-line relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl border bg-white p-6 md:min-h-[320px] md:p-8 lg:rounded-[20px] lg:p-[32px]"
          >
            <div
              className={`font-mono text-[100px] leading-[0.85] font-semibold tracking-[-4px] md:text-[110px] lg:text-[132px] lg:tracking-[-6px] ${step.accentClass}`}
            >
              {step.n}
            </div>
            <div className="mt-6 text-xl font-semibold tracking-[-0.6px] md:text-2xl lg:text-[24px]">
              {step.title}
            </div>
            <div className="text-td-mute mt-2 text-[14px] leading-[1.5]">
              {step.desc}
            </div>
            <div className="text-td-ink mt-auto flex items-center gap-[6px] pt-5 font-mono text-[11px] tracking-[0.5px] uppercase">
              <span
                className={`h-[6px] w-[6px] rounded-full ${step.dotClass}`}
              />
              {step.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
