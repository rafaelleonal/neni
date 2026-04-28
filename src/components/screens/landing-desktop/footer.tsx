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
    <div className="px-6 md:px-12 lg:px-[72px] pt-12 md:pt-16 lg:pt-[64px] pb-8 md:pb-[32px] border-t border-td-line bg-td-bg">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 mb-12 lg:mb-[56px]">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <NeniLogo size={32} />
          <div className="text-[14px] text-td-mute mt-4 leading-[1.5] max-w-[280px]">
            La plataforma de venta hecha para nenis mexicanas. De Tijuana a
            Mérida.
          </div>
          <div className="mt-[20px] flex gap-2">
            {SOCIAL.map((tag) => (
              <div
                key={tag}
                className="w-[36px] h-[36px] rounded-full bg-white border border-td-line grid place-items-center font-mono text-[11px] font-bold text-td-ink"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
        {FOOTER_COLS.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] tracking-[0.6px] uppercase text-td-ink font-bold font-mono mb-4">
              {col.title}
            </div>
            <div className="flex flex-col gap-[10px]">
              {col.links.map((link) => (
                <span key={link} className="text-[13.5px] text-td-mute">
                  {link}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-td-line flex flex-col md:flex-row gap-4 md:gap-0 justify-between md:items-center text-td-mute text-[12.5px]">
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
