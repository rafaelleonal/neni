import { ORDER_STATE_STYLE, RECENT_ORDERS } from "@/lib/mocks";

import { BottomTabBar, type TabItem } from "@/components/bottom-tab-bar";
import {
  BagIcon,
  BellIcon,
  ChartIcon,
  PkgIcon,
  StoreIcon,
} from "@/components/neni-icons";
import { PhoneScreen } from "@/components/phone-screen";

const NAV: TabItem[] = [
  { icon: <ChartIcon size={20} />, label: "Inicio", active: true },
  { icon: <BagIcon size={20} />, label: "Pedidos" },
  { icon: <StoreIcon size={20} />, label: "Tienda" },
  { icon: <PkgIcon size={20} />, label: "Productos" },
];

export function Dashboard() {
  return (
    <PhoneScreen paddingBottom={100} homeIndicatorPlacement="floating-compact">
      <div className="flex items-center gap-2.5 px-[20px] pt-[4px] pb-[8px]">
        <div>
          <div className="text-td-mute text-[12px]">Hola,</div>
          <div className="text-[18px] font-semibold">Memo 👋</div>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="border-td-line relative grid h-[38px] w-[38px] place-items-center rounded-[12px] border bg-white">
            <BellIcon size={17} />
            <div className="bg-td-accent absolute top-[8px] right-[9px] h-[7px] w-[7px] rounded-full border-[1.5px] border-white" />
          </div>
          <div className="grid h-[38px] w-[38px] place-items-center rounded-[12px] bg-[#E9E3D4] font-mono text-[14px] font-semibold">
            TM
          </div>
        </div>
      </div>

      <div className="px-[20px] pb-[16px]">
        <div className="border-td-line flex items-center gap-2.5 rounded-[14px] border bg-white px-[14px] py-[10px]">
          <div className="bg-td-accent h-[8px] w-[8px] rounded-full shadow-[0_0_0_3px_rgba(31,170,89,0.18)]" />
          <div className="flex-1">
            <div className="text-[13px] font-semibold">
              Tu tienda está abierta
            </div>
            <div className="text-td-mute text-[11.5px]">
              neni.mx/tacosdonmemo
            </div>
          </div>
          <div className="bg-td-accent relative h-[22px] w-[40px] shrink-0 rounded-full">
            <div className="absolute top-[2px] right-[2px] h-[18px] w-[18px] rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="px-[20px] pb-[16px]">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-td-ink text-td-bg relative overflow-hidden rounded-[16px] p-[16px]">
            <div className="text-[10.5px] tracking-[1.2px] uppercase opacity-[0.6]">
              HOY
            </div>
            <div className="mt-[4px] font-mono text-[28px] font-semibold tracking-[-1px]">
              $2,840
            </div>
            <div className="mt-[2px] text-[11px] opacity-[0.6]">
              ↑ 18% vs ayer
            </div>
            <svg
              width="100%"
              height="24"
              viewBox="0 0 100 24"
              className="mt-[10px]"
            >
              <path
                d="M0 18 L14 14 L28 16 L42 10 L56 12 L70 6 L84 8 L100 2"
                stroke="var(--td-accent)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
          <div className="border-td-line rounded-[16px] border bg-white p-[16px]">
            <div className="text-td-mute text-[10.5px] tracking-[1.2px] uppercase">
              PEDIDOS
            </div>
            <div className="mt-[4px] font-mono text-[28px] font-semibold tracking-[-1px]">
              14
            </div>
            <div className="text-td-mute mt-[2px] text-[11px]">3 nuevos</div>
            <div className="mt-[14px] flex gap-0.5">
              {[5, 8, 4, 9, 6, 11, 14].map((h, i) => (
                <div
                  key={i}
                  className="h-[22px] flex-1 self-end rounded-[2px]"
                  style={{
                    background: i === 6 ? "var(--td-ink)" : "var(--td-line)",
                    transform: `scaleY(${h / 14})`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center px-[20px] py-[8px]">
        <div className="text-[15px] font-semibold">Pedidos recientes</div>
        <div className="text-td-mute ml-auto text-[13px]">Ver todos</div>
      </div>

      <div className="flex flex-col gap-2 px-[20px]">
        {RECENT_ORDERS.map((o) => {
          const s = ORDER_STATE_STYLE[o.state];
          return (
            <div
              key={o.id}
              className="border-td-line flex items-center gap-3 rounded-[14px] border bg-white px-[14px] py-[12px]"
            >
              <div className="bg-td-bg text-td-mute grid h-[40px] w-[40px] place-items-center rounded-[10px] font-mono text-[11px] font-semibold">
                {o.id.replace("#", "")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold">{o.who}</div>
                <div className="text-td-mute text-[12px]">{o.items}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[14px] font-semibold">
                  ${o.total}
                </div>
                <div
                  className="mt-[3px] inline-block rounded-full px-[7px] py-[2px] text-[9.5px] font-bold tracking-[0.4px] uppercase"
                  style={{
                    background: s.bg,
                    color: s.color,
                  }}
                >
                  {o.state}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <BottomTabBar items={NAV} />
    </PhoneScreen>
  );
}
