import type { ReactNode } from "react";

import { CheckIcon, MoreIcon, PhoneIcon } from "@/components/neni-icons";
import { NeniMark } from "@/components/neni-logo";
import { PhoneScreen } from "@/components/phone-screen";

type BubbleSide = "bot" | "me";

type BubbleShellProps = {
  side?: BubbleSide;
  children: ReactNode;
  padded?: boolean;
};

function BubbleShell({
  side = "bot",
  children,
  padded = true,
}: BubbleShellProps) {
  return (
    <div
      className="text-td-ink relative mb-[4px] max-w-[88%] rounded-[10px] text-[14.5px] leading-[1.35] shadow-[0_1px_0.5px_rgba(0,0,0,0.08)]"
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

function TextBubble({
  side = "bot",
  children,
  time = "14:32",
}: TextBubbleProps) {
  return (
    <BubbleShell side={side}>
      {children}
      <div className="absolute right-[8px] bottom-[4px] text-[10.5px] text-[rgba(0,0,0,0.45)]">
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
      <div className="flex items-center gap-2.5 bg-[#128C7E] px-[12px] py-[8px] text-white">
        <div className="text-[22px] leading-none">‹</div>
        <div className="bg-td-accent grid h-[36px] w-[36px] place-items-center rounded-full text-white">
          <NeniMark size={22} bg="transparent" color="#fff" accent="#fff" />
        </div>
        <div className="flex-1">
          <div className="text-[15.5px] font-medium">Neni · Pedidos</div>
          <div className="text-[12px] opacity-[0.85]">
            bot oficial · en línea
          </div>
        </div>
        <PhoneIcon size={18} />
        <div className="w-[14px]" />
        <MoreIcon size={18} />
      </div>

      <div className="flex justify-center pt-[14px] pb-[8px]">
        <div className="rounded-[8px] bg-[rgba(225,245,254,0.92)] px-[10px] py-[4px] text-[12px] font-medium text-[#5A6974]">
          HOY
        </div>
      </div>

      <div className="flex flex-col px-[10px] pt-[4px] pb-[120px]">
        <MediaBubble side="bot">
          <div className="bg-td-accent flex items-center gap-2 px-[14px] py-[10px] text-white">
            <div className="text-[20px]">🛒</div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold tracking-[0.8px] uppercase opacity-[0.85]">
                Nuevo pedido
              </div>
              <div className="font-mono text-[14px] font-semibold">
                #4821 · Hace 30 s
              </div>
            </div>
            <div className="font-mono text-[15px] font-bold">$200</div>
          </div>

          <div className="flex items-center gap-2.5 px-[14px] pt-[12px] pb-[10px]">
            <div className="text-td-ink grid h-[40px] w-[40px] place-items-center rounded-full bg-[#EFE9DD] font-mono text-[14px] font-semibold">
              MH
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold">Marisol Hernández</div>
              <div className="text-td-mute text-[12px]">
                +52 55 2847 1902 · 2da compra
              </div>
            </div>
            <div className="rounded-full bg-[#E7F5ED] px-[8px] py-[3px] text-[10px] font-bold tracking-[0.3px] text-[#1B7A43] uppercase">
              Cliente
            </div>
          </div>

          <div className="mx-[14px] rounded-[8px] border border-[#EFE8D9] bg-[#FBF8F2] px-[12px] py-[10px] font-mono text-[12.5px]">
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
            <div className="mt-[6px] flex justify-between border-t border-t-[#141311] pt-[6px] text-[13.5px] font-bold">
              <span>TOTAL</span>
              <span>$200.00</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 px-[14px] pt-[10px] pb-[4px]">
            <div className="flex items-center gap-2 rounded-[8px] bg-[#F6F6F6] px-[10px] py-[8px]">
              <div className="grid h-[18px] w-[26px] place-items-center rounded-[3px] bg-[linear-gradient(135deg,#1A1F71,#2E5BFF)] font-mono text-[8px] font-extrabold text-white">
                VISA
              </div>
              <div className="flex-1 text-[12.5px]">
                <span className="text-td-mute">Pagado · </span>
                <b>Tarjeta •••• 4827</b>
              </div>
              <div className="rounded-full bg-[#E7F5ED] px-[6px] py-[2px] text-[10px] font-bold tracking-[0.3px] text-[#1B7A43]">
                OK
              </div>
            </div>

            <div className="grid grid-cols-[54px_1fr] items-center gap-2 rounded-[8px] bg-[#F6F6F6] px-[10px] py-[8px]">
              <div className="relative h-[54px] w-[54px] overflow-hidden rounded-[6px] bg-[#E7E1D0]">
                <svg viewBox="0 0 54 54" className="absolute inset-0">
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

            <div className="rounded-[8px] border border-[#F5EAB8] bg-[#FFF8E1] px-[10px] py-[8px] text-[12.5px] leading-[1.4]">
              <span className="font-bold">Nota:</span> Sin cebolla en los tacos
              porfa 🙏
            </div>
          </div>

          <div className="px-[14px] pt-[8px] pb-[10px] text-right text-[10.5px] text-[rgba(0,0,0,0.45)]">
            14:30 ✓✓
          </div>
        </MediaBubble>

        <MediaBubble side="bot">
          <div className="flex flex-col gap-1.5 p-[10px]">
            <div className="bg-td-accent flex items-center justify-center gap-2 rounded-[8px] px-[12px] py-[10px] text-center text-[13.5px] font-semibold text-white">
              <CheckIcon size={14} stroke="#fff" /> Aceptar y preparar
            </div>
            <div className="flex gap-1.5">
              <div className="text-td-ink flex-1 rounded-[8px] bg-[#F0F0F0] px-[10px] py-[8px] text-center text-[12.5px] font-medium">
                Reagendar
              </div>
              <div className="flex-1 rounded-[8px] bg-[#F0F0F0] px-[10px] py-[8px] text-center text-[12.5px] font-medium text-[#C9562C]">
                Rechazar
              </div>
            </div>
          </div>
          <div className="px-[12px] pb-[6px] text-right text-[10.5px] text-[rgba(0,0,0,0.45)]">
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
          <div className="flex items-center gap-2.5 px-[12px] py-[10px]">
            <div className="grid h-[32px] w-[32px] place-items-center rounded-full bg-[#FFF4E6] text-[16px] text-[#C9562C]">
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
          <div className="px-[12px] pb-[6px] text-right text-[10.5px] text-[rgba(0,0,0,0.45)]">
            14:31
          </div>
        </MediaBubble>
      </div>

      <div className="absolute right-0 bottom-[34px] left-0 flex items-center gap-1.5 px-[8px] py-[6px]">
        <div className="text-td-mute flex flex-1 items-center gap-2 rounded-[22px] bg-white px-[14px] py-[9px] text-[14px]">
          <span className="text-[18px]">😊</span>
          <span className="flex-1">Mensaje</span>
          <span className="text-[16px]">📎</span>
          <span className="text-[16px]">📷</span>
        </div>
        <div className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[#128C7E] text-[18px] text-white">
          🎤
        </div>
      </div>
    </PhoneScreen>
  );
}
