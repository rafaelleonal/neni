import { cn } from "@/lib/utils";

import { WaIcon } from "@/components/neni-icons";

type FaqItem = {
  q: string;
  a: string;
  open?: boolean;
};

const FAQ: FaqItem[] = [
  {
    q: "¿Realmente es gratis para siempre?",
    a: "Sí. No cobramos mensualidad. Solo se aplica una comisión de 2.5% cuando cobras con tarjeta — pagada por el procesador de pagos. OXXO, SPEI y efectivo son 0%.",
    open: true,
  },
  {
    q: "¿Necesito una tarjeta de crédito para registrarme?",
    a: "No. Solo necesitas tu WhatsApp.",
  },
  {
    q: "¿Cómo cobro a mis clientes?",
    a: "Conectas Mercado Pago, Stripe o Conekta en un clic. Si prefieres efectivo contra entrega, también funciona.",
  },
  {
    q: "¿Puedo usar mi propio dominio?",
    a: "Sí, en cualquier momento puedes conectar tudominio.com sin costo extra.",
  },
  {
    q: "¿Y si mi cliente quiere su factura?",
    a: "Generamos CFDI 4.0 automáticamente. Solo capturas el RFC y nosotros emitimos.",
  },
  {
    q: "¿Qué pasa si me arrepiento?",
    a: "Bajas tu tienda en 30 segundos desde Configuración. Te llevas tus datos exportados.",
  },
];

export function Faq() {
  return (
    <div className="grid grid-cols-1 gap-10 px-6 pb-16 md:px-12 md:pb-20 lg:grid-cols-[1fr_1.6fr] lg:gap-[64px] lg:px-[72px] lg:pb-[100px]">
      <div>
        <div className="text-td-mute mb-3 font-mono text-[12px] tracking-[1.5px] uppercase">
          Preguntas frecuentes
        </div>
        <h2 className="m-0 text-3xl leading-[1] font-semibold tracking-[-1px] md:text-4xl lg:text-[48px] lg:tracking-[-1.6px]">
          Lo que se preguntan antes de empezar.
        </h2>
        <div className="bg-td-accent mt-7 rounded-[14px] p-5 text-white">
          <div className="mb-2 text-[13px] opacity-85">
            ¿Necesitas ayuda en vivo?
          </div>
          <div className="flex items-center gap-[10px] text-[14px] font-semibold">
            <WaIcon size={18} />
            Escríbenos al WhatsApp
          </div>
        </div>
      </div>

      <div>
        {FAQ.map((item, i) => (
          <div
            key={item.q}
            className={cn(
              "border-td-line border-t px-1 py-5",
              i === FAQ.length - 1 && "border-td-line border-b"
            )}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-td-mute w-[24px] font-mono text-[12px]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 text-base font-medium tracking-[-0.3px] md:text-[18px]">
                {item.q}
              </div>
              <div className="text-td-mute text-[22px] font-light">
                {item.open ? "−" : "+"}
              </div>
            </div>
            {item.open && (
              <div className="text-td-mute mt-3 max-w-[620px] pl-9 text-[14px] leading-[1.6] md:pl-[40px]">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
