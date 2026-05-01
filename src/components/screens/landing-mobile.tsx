import { Button } from "@/components/ui/button";
import {
  ArrowIcon,
  CardIcon,
  LinkIcon,
  StoreIcon,
  WaIcon,
} from "@/components/neni-icons";
import { NeniLogo } from "@/components/neni-logo";
import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";

const FEATURES = [
  {
    icon: <WaIcon size={16} />,
    title: "Pedidos por WhatsApp",
    sub: "Cada venta llega a tu chat con todos los detalles.",
  },
  {
    icon: <CardIcon size={16} />,
    title: "OXXO, SPEI y tarjeta",
    sub: "Conecta Mercado Pago, Stripe o Conekta en un clic.",
  },
  {
    icon: <StoreIcon size={16} />,
    title: "Catálogo con fotos",
    sub: "Sube productos, variantes y precios sin complicarte.",
  },
  {
    icon: <LinkIcon size={16} />,
    title: "Tu propio link",
    sub: "neni.mx/tunegocio — compártelo donde quieras.",
  },
];

export function LandingMobile() {
  return (
    <PhoneScreen>
      <div className="flex items-center justify-between px-[20px] pt-[4px]">
        <NeniLogo size={28} />
        <div className="flex items-center gap-2">
          <span className="text-td-mute text-[13.5px]">Entrar</span>
          <Button size="sm">Crear tienda</Button>
        </div>
      </div>

      <div className="px-[20px] pt-[40px] pb-[24px]">
        <h1 className="m-0 text-[44px] leading-[1.02] font-semibold tracking-[-1.6px]">
          Tu tienda en línea,
          <br />
          <span className="text-td-mute">lista en</span>
          <span className="bg-td-accent ml-[8px] inline-block -translate-y-[4px] rounded-[6px] px-[8px] font-mono text-[36px] font-medium text-white">
            2 min
          </span>
        </h1>
        <p className="text-td-mute mt-[20px] mb-[24px] max-w-[320px] text-[16px] leading-[1.5]">
          Sube tus productos, comparte tu link y recibe pedidos por WhatsApp.
          Sin mensualidad.
        </p>

        <div className="flex gap-2.5">
          <Button size="lg" full className="flex-1">
            Empezar gratis <ArrowIcon size={16} />
          </Button>
        </div>

        <div className="border-td-line mt-[20px] flex items-center gap-2 rounded-[12px] border border-dashed bg-white px-[14px] py-[10px] font-mono text-[13px]">
          <LinkIcon size={14} stroke="var(--td-mute)" />
          <span className="text-td-mute">neni.mx/</span>
          <span className="text-td-ink font-medium">tunegocio</span>
          <span className="neni-blink bg-td-ink ml-auto h-[14px] w-[6px]" />
        </div>
      </div>

      <div className="px-[20px] pt-[16px] pb-[8px]">
        <div className="border-td-line rounded-[20px] border bg-white p-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.02),_0_20px_40px_-20px_rgba(0,0,0,0.12)]">
          <div className="mb-[12px] flex items-center gap-2.5">
            <div className="h-[32px] w-[32px] rounded-[8px] bg-[#E9E3D4]" />
            <div>
              <div className="text-[13px] font-semibold">Tacos Don Memo</div>
              <div className="text-td-mute text-[11px]">
                Abierto · Entrega en 30 min
              </div>
            </div>
            <span className="text-td-accent ml-auto" aria-hidden>
              <WaIcon size={18} />
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <ProductPlaceholder h={88} label="tacos al pastor" tone="warm" />
              <div className="mt-[6px] text-[12px] font-medium">
                Taco al pastor
              </div>
              <div className="text-td-mute text-[11px]">$25.00</div>
            </div>
            <div>
              <ProductPlaceholder h={88} label="gringa" tone="sand" />
              <div className="mt-[6px] text-[12px] font-medium">Gringa</div>
              <div className="text-td-mute text-[11px]">$75.00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[20px] pt-[40px] pb-[20px]">
        <div className="text-td-mute mb-[14px] text-[11px] font-semibold tracking-[1.5px] uppercase">
          ¿Qué incluye?
        </div>
        <div className="flex flex-col">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="flex gap-3.5 py-[16px]"
              style={{
                borderBottom:
                  i < FEATURES.length - 1 ? "1px solid var(--td-line)" : "none",
              }}
            >
              <div className="bg-td-bg border-td-line text-td-ink grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[10px] border">
                {feature.icon}
              </div>
              <div className="flex-1">
                <div className="mb-[3px] text-[15px] font-semibold">
                  {feature.title}
                </div>
                <div className="text-td-mute text-[13px] leading-[1.4]">
                  {feature.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[20px] pt-[24px] pb-[20px]">
        <div className="bg-td-ink text-td-bg relative overflow-hidden rounded-[22px] p-[22px]">
          <div className="mb-[8px] text-[11px] tracking-[1.5px] text-[rgba(255,255,255,0.5)] uppercase">
            Gratis para siempre
          </div>
          <div className="mb-[14px] flex items-baseline gap-1">
            <span className="text-[44px] font-semibold tracking-[-2px]">
              $0
            </span>
            <span className="text-[14px] text-[rgba(255,255,255,0.5)]">
              / mes
            </span>
          </div>
          <div className="mb-[18px] text-[13px] leading-[1.5] text-[rgba(255,255,255,0.7)]">
            Solo pagas 2.5% cuando cobras con tarjeta. OXXO, SPEI y WhatsApp, 0%
            comisión.
          </div>
          <Button variant="accent" full>
            Crear mi tienda
          </Button>
          <div className="bg-td-accent absolute -top-[40px] -right-[40px] h-[160px] w-[160px] rounded-full opacity-[0.12]" />
        </div>
      </div>

      <div className="flex items-center justify-between px-[20px] pt-[16px] pb-[32px]">
        <NeniLogo size={20} color="var(--td-mute)" showWord={false} />
        <div className="text-td-mute font-mono text-[11px]">hecho en mx</div>
      </div>
    </PhoneScreen>
  );
}
