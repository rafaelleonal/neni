import { NeniLogo, NeniMark } from "@/components/neni-logo";
import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { ArrowIcon } from "@/components/neni-icons";

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
      <div
        className="flex items-center justify-between pt-[4px] px-[20px]"
      >
        <NeniLogo size={32} color="var(--td-bg)" />
        <div
          className="bg-td-accent py-[7px] px-[14px] rounded-full text-white text-[13px] font-semibold"
        >
          Crear tienda
        </div>
      </div>

      <div className="pt-[60px] px-[20px] pb-[30px]">
        <h1
          className="m-0 text-[78px] leading-[0.92] font-semibold tracking-[-3.5px]"
        >
          Vende
          <br />
          como
          <br />
          <span className="text-td-accent">neni.</span>
        </h1>
        <p
          className="text-[16px] leading-[1.45] opacity-[0.65] mt-[24px] mb-0 max-w-[300px]"
        >
          Tu catálogo. Tu link. Pedidos directo a tu WhatsApp. Sin mensualidad,
          sin código, sin pretextos.
        </p>
      </div>

      <div className="pt-[20px] px-[40px] pb-[30px] relative">
        <div
          className="bg-td-bg text-td-ink rounded-[24px] p-[14px] -rotate-[2deg] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-2 mb-[10px]">
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
        <div
          className="bg-td-accent absolute right-[24px] top-[8px] py-[8px] px-[12px] text-white rounded-[12px] text-[12px] font-semibold rotate-[8deg] shadow-[0_10px_20px_rgba(31,170,89,0.4)]"
        >
          🛒 Nuevo pedido
          <br />
          <span
            className="font-mono text-[11px] opacity-[0.85]"
          >
            $340.00
          </span>
        </div>
      </div>

      <div
        className="grid grid-cols-2 pt-[20px] px-[20px] pb-[30px] gap-[20px]"
      >
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div
              className="text-[44px] font-semibold tracking-[-2px] font-mono"
              style={{
                color: stat.accent ? "var(--td-accent)" : "inherit",
              }}
            >
              {stat.value}
            </div>
            <div
              className="text-[11.5px] opacity-[0.6] tracking-[0.5px] uppercase"
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-[20px] px-[20px] pb-[40px]">
        <div
          className="flex items-center justify-between bg-td-bg text-td-ink rounded-[16px] py-[18px] px-[20px]"
        >
          <div>
            <div
              className="text-td-mute text-[11.5px] uppercase tracking-[0.5px]"
            >
              Empieza ahora
            </div>
            <div className="text-[18px] font-semibold mt-[2px]">
              Crear mi tienda
            </div>
          </div>
          <div
            className="grid place-items-center bg-td-accent w-[44px] h-[44px] rounded-full text-white"
          >
            <ArrowIcon size={18} stroke="#fff" />
          </div>
        </div>
      </div>

    </PhoneScreen>
  );
}
