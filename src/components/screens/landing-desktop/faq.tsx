import { WaIcon } from "@/components/neni-icons";
import { cn } from "@/lib/utils";

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
    <div className="px-6 md:px-12 lg:px-[72px] pb-16 md:pb-20 lg:pb-[100px] grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-[64px]">
      <div>
        <div className="text-[12px] tracking-[1.5px] uppercase text-td-mute mb-3 font-mono">
          Preguntas frecuentes
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-[48px] font-semibold m-0 tracking-[-1px] lg:tracking-[-1.6px] leading-[1]">
          Lo que se preguntan antes de empezar.
        </h2>
        <div className="mt-7 p-5 rounded-[14px] bg-td-accent text-white">
          <div className="text-[13px] opacity-85 mb-2">
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
              "py-5 px-1 border-t border-td-line",
              i === FAQ.length - 1 && "border-b border-td-line",
            )}
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-[12px] font-mono text-td-mute w-[24px]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex-1 text-base md:text-[18px] font-medium tracking-[-0.3px]">
                {item.q}
              </div>
              <div className="text-[22px] text-td-mute font-light">
                {item.open ? "−" : "+"}
              </div>
            </div>
            {item.open && (
              <div className="pl-9 md:pl-[40px] mt-3 text-[14px] text-td-mute leading-[1.6] max-w-[620px]">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
