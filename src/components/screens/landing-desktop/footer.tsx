import { NeniLogo } from "@/components/neni-logo";

const FOOTER_COLS = [
  {
    title: "Producto",
    links: ["Cómo funciona", "Precios", "Plantillas", "Integraciones", "API"],
  },
  {
    title: "Casos",
    links: [
      "Comida y bebidas",
      "Skincare y belleza",
      "Ropa y moda",
      "Hecho a mano",
      "Servicios",
    ],
  },
  {
    title: "Recursos",
    links: ["Centro de ayuda", "Academia Neni", "Blog", "Comunidad", "Eventos"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Carreras", "Prensa", "Legal", "Contacto"],
  },
];

const SOCIAL = ["IG", "TT", "YT", "WA"];

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="border-td-line bg-td-bg border-t px-6 pt-12 pb-8 md:px-12 md:pt-16 md:pb-[32px] lg:px-[72px] lg:pt-[64px]">
      <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:mb-[56px] lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <NeniLogo size={32} />
          <div className="text-td-mute mt-4 max-w-[280px] text-[14px] leading-[1.5]">
            La plataforma de venta hecha para nenis mexicanas. De Tijuana a
            Mérida.
          </div>
          <div className="mt-[20px] flex gap-2">
            {SOCIAL.map((tag) => (
              <div
                key={tag}
                className="border-td-line text-td-ink grid h-[36px] w-[36px] place-items-center rounded-full border bg-white font-mono text-[11px] font-bold"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div className="text-td-ink mb-4 font-mono text-[11px] font-bold tracking-[0.6px] uppercase">
              {col.title}
            </div>
            <div className="flex flex-col gap-[10px]">
              {col.links.map((link) => (
                <span key={link} className="text-td-mute text-[13.5px]">
                  {link}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-td-line text-td-mute flex flex-col justify-between gap-4 border-t pt-6 text-[12.5px] md:flex-row md:items-center md:gap-0">
        <div>© {year} Neni · Hecho en CDMX con 🌶️</div>
        <div className="flex flex-wrap gap-3 md:gap-6">
          <span>Privacidad</span>
          <span>Términos</span>
          <span>Cookies</span>
          <span>Estado del servicio</span>
        </div>
        <div className="font-mono text-[11px]">🇲🇽 Español (MX) ▾</div>
      </div>
    </div>
  );
}
