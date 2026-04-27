import { BottomTabBar, type TabItem } from "@/components/bottom-tab-bar";
import { PhoneScreen } from "@/components/phone-screen";
import {
  BagIcon,
  BellIcon,
  ChartIcon,
  PkgIcon,
  StoreIcon,
} from "@/components/neni-icons";
import { ORDER_STATE_STYLE, RECENT_ORDERS } from "@/lib/mocks";

const NAV: TabItem[] = [
  { icon: <ChartIcon size={20} />, label: "Inicio", active: true },
  { icon: <BagIcon size={20} />, label: "Pedidos" },
  { icon: <StoreIcon size={20} />, label: "Tienda" },
  { icon: <PkgIcon size={20} />, label: "Productos" },
];

export function Dashboard() {
  return (
    <PhoneScreen
      paddingBottom={100}
      homeIndicatorPlacement="floating-compact"
    >
      <div className="flex items-center gap-2.5 pt-[4px] px-[20px] pb-[8px]">
        <div>
          <div className="text-td-mute text-[12px]">Hola,</div>
          <div className="text-[18px] font-semibold">Memo 👋</div>
        </div>
        <div className="ml-auto flex gap-2">
          <div className="relative grid place-items-center border border-td-line w-[38px] h-[38px] rounded-[12px] bg-white">
            <BellIcon size={17} />
            <div className="bg-td-accent absolute top-[8px] right-[9px] w-[7px] h-[7px] rounded-full border-[1.5px] border-white" />
          </div>
          <div className="grid place-items-center w-[38px] h-[38px] rounded-[12px] bg-[#E9E3D4] text-[14px] font-semibold font-mono">
            TM
          </div>
        </div>
      </div>

      <div className="px-[20px] pb-[16px]">
        <div className="flex items-center gap-2.5 border border-td-line bg-white rounded-[14px] py-[10px] px-[14px]">
          <div className="bg-td-accent w-[8px] h-[8px] rounded-full shadow-[0_0_0_3px_rgba(31,170,89,0.18)]" />
          <div className="flex-1">
            <div className="text-[13px] font-semibold">
              Tu tienda está abierta
            </div>
            <div className="text-td-mute text-[11.5px]">
              neni.mx/tacosdonmemo
            </div>
          </div>
          <div className="bg-td-accent w-[40px] h-[22px] rounded-full relative shrink-0">
            <div className="absolute right-[2px] top-[2px] w-[18px] h-[18px] rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="px-[20px] pb-[16px]">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-td-ink text-td-bg rounded-[16px] p-[16px] relative overflow-hidden">
            <div className="text-[10.5px] tracking-[1.2px] uppercase opacity-[0.6]">
              HOY
            </div>
            <div className="text-[28px] font-semibold mt-[4px] tracking-[-1px] font-mono">
              $2,840
            </div>
            <div className="text-[11px] opacity-[0.6] mt-[2px]">
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
          <div className="border border-td-line bg-white rounded-[16px] p-[16px]">
            <div className="text-td-mute text-[10.5px] tracking-[1.2px] uppercase">
              PEDIDOS
            </div>
            <div className="text-[28px] font-semibold mt-[4px] tracking-[-1px] font-mono">
              14
            </div>
            <div className="text-td-mute text-[11px] mt-[2px]">
              3 nuevos
            </div>
            <div className="flex gap-0.5 mt-[14px]">
              {[5, 8, 4, 9, 6, 11, 14].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 h-[22px] rounded-[2px] self-end"
                  style={{
                    background:
                      i === 6 ? "var(--td-ink)" : "var(--td-line)",
                    transform: `scaleY(${h / 14})`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center py-[8px] px-[20px]">
        <div className="text-[15px] font-semibold">Pedidos recientes</div>
        <div className="text-td-mute ml-auto text-[13px]">
          Ver todos
        </div>
      </div>

      <div className="flex flex-col gap-2 px-[20px]">
        {RECENT_ORDERS.map((o) => {
          const s = ORDER_STATE_STYLE[o.state];
          return (
            <div
              key={o.id}
              className="flex items-center gap-3 border border-td-line bg-white rounded-[14px] py-[12px] px-[14px]"
            >
              <div className="grid place-items-center bg-td-bg text-td-mute w-[40px] h-[40px] rounded-[10px] font-mono text-[11px] font-semibold">
                {o.id.replace("#", "")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold">{o.who}</div>
                <div className="text-td-mute text-[12px]">
                  {o.items}
                </div>
              </div>
              <div className="text-right">
                <div className="text-[14px] font-semibold font-mono">
                  ${o.total}
                </div>
                <div
                  className="inline-block mt-[3px] py-[2px] px-[7px] rounded-full text-[9.5px] font-bold tracking-[0.4px] uppercase"
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
