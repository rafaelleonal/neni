import type { ReactNode } from "react";
import { PhoneScreen } from "@/components/phone-screen";
import { NeniMark } from "@/components/neni-logo";
import { CheckIcon, MoreIcon, PhoneIcon } from "@/components/neni-icons";

type BubbleSide = "bot" | "me";

type BubbleShellProps = {
  side?: BubbleSide;
  children: ReactNode;
  padded?: boolean;
};

function BubbleShell({ side = "bot", children, padded = true }: BubbleShellProps) {
  return (
    <div
      className="text-td-ink max-w-[88%] rounded-[10px] relative mb-[4px] text-[14.5px] leading-[1.35] shadow-[0_1px_0.5px_rgba(0,0,0,0.08)]"
      style={{
        alignSelf: side === "bot" ? "flex-start" : "flex-end",
        padding: padded ? "7px 10px 18px" : 0,
        background: side === "bot" ? "#fff" : "#DCF8C6",
        overflow: padded ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}

type TextBubbleProps = {
  side?: BubbleSide;
  children: ReactNode;
  time?: string;
};

function TextBubble({ side = "bot", children, time = "14:32" }: TextBubbleProps) {
  return (
    <BubbleShell side={side}>
      {children}
      <div
        className="absolute right-[8px] bottom-[4px] text-[10.5px] text-[rgba(0,0,0,0.45)]"
      >
        {time} {side === "me" ? "✓✓" : ""}
      </div>
    </BubbleShell>
  );
}

type MediaBubbleProps = {
  side?: BubbleSide;
  children: ReactNode;
};

function MediaBubble({ side = "bot", children }: MediaBubbleProps) {
  return (
    <BubbleShell side={side} padded={false}>
      {children}
    </BubbleShell>
  );
}

type TicketRow = { qty: string; name: string; amount: string };

const TICKET_ROWS: TicketRow[] = [
  { qty: "3", name: "Taco al pastor", amount: "75.00" },
  { qty: "1", name: "Gringa de pastor", amount: "75.00" },
  { qty: "2", name: "Agua de horchata", amount: "50.00" },
];

export function WhatsApp() {
  return (
    <PhoneScreen
      background="#ECE5DD"
      letterSpacing={-0.1}
      statusBar="dark"
      homeIndicatorPlacement="floating"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><circle cx='30' cy='30' r='0.6' fill='%23D7CEBF'/></svg>\")",
      }}
    >
      <div
        className="flex items-center gap-2.5 bg-[#128C7E] text-white py-[8px] px-[12px]"
      >
        <div className="text-[22px] leading-none">‹</div>
        <div
          className="grid place-items-center bg-td-accent w-[36px] h-[36px] rounded-full text-white"
        >
          <NeniMark size={22} bg="transparent" color="#fff" accent="#fff" />
        </div>
        <div className="flex-1">
          <div className="text-[15.5px] font-medium">Neni · Pedidos</div>
          <div className="text-[12px] opacity-[0.85]">bot oficial · en línea</div>
        </div>
        <PhoneIcon size={18} />
        <div className="w-[14px]" />
        <MoreIcon size={18} />
      </div>

      <div className="flex justify-center pt-[14px] pb-[8px]">
        <div
          className="bg-[rgba(225,245,254,0.92)] text-[#5A6974] py-[4px] px-[10px] rounded-[8px] text-[12px] font-medium"
        >
          HOY
        </div>
      </div>

      <div
        className="flex flex-col pt-[4px] px-[10px] pb-[120px]"
      >
        <MediaBubble side="bot">
          <div
            className="flex items-center gap-2 bg-td-accent text-white py-[10px] px-[14px]"
          >
            <div className="text-[20px]">🛒</div>
            <div className="flex-1">
              <div
                className="text-[11px] opacity-[0.85] tracking-[0.8px] uppercase font-semibold"
              >
                Nuevo pedido
              </div>
              <div
                className="font-mono text-[14px] font-semibold"
              >
                #4821 · Hace 30 s
              </div>
            </div>
            <div
              className="text-[15px] font-bold font-mono"
            >
              $200
            </div>
          </div>

          <div
            className="flex items-center gap-2.5 pt-[12px] px-[14px] pb-[10px]"
          >
            <div
              className="grid place-items-center text-td-ink w-[40px] h-[40px] rounded-full bg-[#EFE9DD] font-semibold text-[14px] font-mono"
            >
              MH
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold">
                Marisol Hernández
              </div>
              <div className="text-td-mute text-[12px]">
                +52 55 2847 1902 · 2da compra
              </div>
            </div>
            <div
              className="py-[3px] px-[8px] rounded-full bg-[#E7F5ED] text-[#1B7A43] text-[10px] font-bold tracking-[0.3px] uppercase"
            >
              Cliente
            </div>
          </div>

          <div
            className="mx-[14px] bg-[#FBF8F2] border border-[#EFE8D9] rounded-[8px] py-[10px] px-[12px] font-mono text-[12.5px]"
          >
            {TICKET_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[22px_1fr_auto] gap-[8px] py-[4px]"
                style={{
                  borderBottom:
                    i < TICKET_ROWS.length - 1 ? "1px dashed #E4DCC6" : "none",
                }}
              >
                <span className="text-td-mute">{row.qty}×</span>
                <span>{row.name}</span>
                <span>${row.amount}</span>
              </div>
            ))}
            <div
              className="flex justify-between mt-[6px] pt-[6px] border-t border-t-[#141311] font-bold text-[13.5px]"
            >
              <span>TOTAL</span>
              <span>$200.00</span>
            </div>
          </div>

          <div
            className="flex flex-col gap-1.5 pt-[10px] px-[14px] pb-[4px]"
          >
            <div
              className="flex items-center gap-2 py-[8px] px-[10px] bg-[#F6F6F6] rounded-[8px]"
            >
              <div
                className="grid place-items-center w-[26px] h-[18px] rounded-[3px] bg-[linear-gradient(135deg,#1A1F71,#2E5BFF)] text-white text-[8px] font-extrabold font-mono"
              >
                VISA
              </div>
              <div className="flex-1 text-[12.5px]">
                <span className="text-td-mute">Pagado · </span>
                <b>Tarjeta •••• 4827</b>
              </div>
              <div
                className="text-[10px] py-[2px] px-[6px] bg-[#E7F5ED] text-[#1B7A43] rounded-full font-bold tracking-[0.3px]"
              >
                OK
              </div>
            </div>

            <div
              className="grid items-center gap-2 grid-cols-[54px_1fr] py-[8px] px-[10px] bg-[#F6F6F6] rounded-[8px]"
            >
              <div
                className="w-[54px] h-[54px] rounded-[6px] bg-[#E7E1D0] relative overflow-hidden"
              >
                <svg
                  viewBox="0 0 54 54"
                  className="absolute inset-0"
                >
                  <path
                    d="M-4 30 L24 10 L58 22"
                    stroke="#D7CEBF"
                    strokeWidth="6"
                    fill="none"
                  />
                  <path
                    d="M10 -4 L18 28 L38 58"
                    stroke="#D7CEBF"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle cx="34" cy="30" r="5" fill="var(--td-accent)" />
                  <circle
                    cx="34"
                    cy="30"
                    r="10"
                    fill="var(--td-accent)"
                    opacity="0.25"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold">
                  Orizaba 114, Roma Nte.
                </div>
                <div className="text-td-mute text-[11px]">
                  Depto 3B · 1.8 km de ti
                </div>
              </div>
            </div>

            <div
              className="py-[8px] px-[10px] bg-[#FFF8E1] border border-[#F5EAB8] rounded-[8px] text-[12.5px] leading-[1.4]"
            >
              <span className="font-bold">Nota:</span> Sin cebolla en los tacos porfa 🙏
            </div>
          </div>

          <div
            className="pt-[8px] px-[14px] pb-[10px] text-[10.5px] text-[rgba(0,0,0,0.45)] text-right"
          >
            14:30 ✓✓
          </div>
        </MediaBubble>

        <MediaBubble side="bot">
          <div
            className="flex flex-col gap-1.5 p-[10px]"
          >
            <div
              className="flex items-center justify-center gap-2 bg-td-accent py-[10px] px-[12px] text-white rounded-[8px] text-[13.5px] font-semibold text-center"
            >
              <CheckIcon size={14} stroke="#fff" /> Aceptar y preparar
            </div>
            <div className="flex gap-1.5">
              <div
                className="flex-1 text-center text-td-ink py-[8px] px-[10px] bg-[#F0F0F0] rounded-[8px] text-[12.5px] font-medium"
              >
                Reagendar
              </div>
              <div
                className="flex-1 text-center py-[8px] px-[10px] bg-[#F0F0F0] text-[#C9562C] rounded-[8px] text-[12.5px] font-medium"
              >
                Rechazar
              </div>
            </div>
          </div>
          <div
            className="px-[12px] pb-[6px] text-[10.5px] text-[rgba(0,0,0,0.45)] text-right"
          >
            14:30
          </div>
        </MediaBubble>

        <TextBubble side="me" time="14:31">
          Va, ya lo preparamos 🌮
        </TextBubble>

        <TextBubble side="me" time="14:31">
          Sale en 25 min, ¿te confirmo cuando salga?
        </TextBubble>

        <MediaBubble side="bot">
          <div
            className="flex items-center gap-2.5 py-[10px] px-[12px]"
          >
            <div
              className="grid place-items-center w-[32px] h-[32px] rounded-full bg-[#FFF4E6] text-[#C9562C] text-[16px]"
            >
              ⏱
            </div>
            <div className="flex-1">
              <div className="text-[12.5px] font-semibold">
                Pedido #4821 en preparación
              </div>
              <div className="text-td-mute text-[11px]">
                Marisol fue notificada automáticamente
              </div>
            </div>
          </div>
          <div
            className="px-[12px] pb-[6px] text-[10.5px] text-[rgba(0,0,0,0.45)] text-right"
          >
            14:31
          </div>
        </MediaBubble>
      </div>

      <div
        className="flex items-center gap-1.5 absolute bottom-[34px] left-0 right-0 py-[6px] px-[8px]"
      >
        <div
          className="flex flex-1 items-center gap-2 text-td-mute bg-white rounded-[22px] py-[9px] px-[14px] text-[14px]"
        >
          <span className="text-[18px]">😊</span>
          <span className="flex-1">Mensaje</span>
          <span className="text-[16px]">📎</span>
          <span className="text-[16px]">📷</span>
        </div>
        <div
          className="grid place-items-center w-[42px] h-[42px] rounded-full bg-[#128C7E] text-white text-[18px]"
        >
          🎤
        </div>
      </div>
    </PhoneScreen>
  );
}
