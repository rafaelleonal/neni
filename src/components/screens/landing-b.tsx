import { ArrowIcon } from "@/components/neni-icons";
import { NeniLogo, NeniMark } from "@/components/neni-logo";
import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";

const STATS: { value: string; label: string; accent?: boolean }[] = [
  { value: "$0", label: "mensualidad" },
  { value: "2 min", label: "para abrir", accent: true },
  { value: "4.2k", label: "nenis vendiendo" },
  { value: "100%", label: "por whatsapp" },
];

export function LandingB() {
  return (
    <PhoneScreen
      background="var(--td-ink)"
      color="var(--td-bg)"
      statusBar="dark"
      homeIndicator="dark"
    >
      <div className="flex items-center justify-between px-[20px] pt-[4px]">
        <NeniLogo size={32} color="var(--td-bg)" />
        <div className="bg-td-accent rounded-full px-[14px] py-[7px] text-[13px] font-semibold text-white">
          Crear tienda
        </div>
      </div>

      <div className="px-[20px] pt-[60px] pb-[30px]">
        <h1 className="m-0 text-[78px] leading-[0.92] font-semibold tracking-[-3.5px]">
          Vende
          <br />
          como
          <br />
          <span className="text-td-accent">neni.</span>
        </h1>
        <p className="mt-[24px] mb-0 max-w-[300px] text-[16px] leading-[1.45] opacity-[0.65]">
          Tu catálogo. Tu link. Pedidos directo a tu WhatsApp. Sin mensualidad,
          sin código, sin pretextos.
        </p>
      </div>

      <div className="relative px-[40px] pt-[20px] pb-[30px]">
        <div className="bg-td-bg text-td-ink -rotate-[2deg] rounded-[24px] p-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
          <div className="mb-[10px] flex items-center gap-2">
            <NeniMark size={24} bg="var(--td-ink)" color="var(--td-bg)" />
            <div className="text-[12px] font-semibold">
              neni.mx/mariskincare
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <ProductPlaceholder h={70} label="serum vit c" tone="sand" />
            <ProductPlaceholder h={70} label="crema noche" tone="clay" />
          </div>
        </div>
        <div className="bg-td-accent absolute top-[8px] right-[24px] rotate-[8deg] rounded-[12px] px-[12px] py-[8px] text-[12px] font-semibold text-white shadow-[0_10px_20px_rgba(31,170,89,0.4)]">
          🛒 Nuevo pedido
          <br />
          <span className="font-mono text-[11px] opacity-[0.85]">$340.00</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[20px] px-[20px] pt-[20px] pb-[30px]">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div
              className="font-mono text-[44px] font-semibold tracking-[-2px]"
              style={{
                color: stat.accent ? "var(--td-accent)" : "inherit",
              }}
            >
              {stat.value}
            </div>
            <div className="text-[11.5px] tracking-[0.5px] uppercase opacity-[0.6]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="px-[20px] pt-[20px] pb-[40px]">
        <div className="bg-td-bg text-td-ink flex items-center justify-between rounded-[16px] px-[20px] py-[18px]">
          <div>
            <div className="text-td-mute text-[11.5px] tracking-[0.5px] uppercase">
              Empieza ahora
            </div>
            <div className="mt-[2px] text-[18px] font-semibold">
              Crear mi tienda
            </div>
          </div>
          <div className="bg-td-accent grid h-[44px] w-[44px] place-items-center rounded-full text-white">
            <ArrowIcon size={18} stroke="#fff" />
          </div>
        </div>
      </div>
    </PhoneScreen>
  );
}
