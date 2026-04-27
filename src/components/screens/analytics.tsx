import type { ReactNode } from "react";
import { NeniLogo } from "@/components/neni-logo";
import { ProductPlaceholder } from "@/components/product-placeholder";
import type { ProductTone } from "@/lib/tokens";
import {
  BagIcon,
  ChartIcon,
  MoreIcon,
  PkgIcon,
  StoreIcon,
  WaIcon,
} from "@/components/neni-icons";
import { LOYAL_CLIENTS, PAYMENT_SPLIT } from "@/lib/mocks";

type SidebarItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const SIDEBAR_NAV: SidebarItem[] = [
  { label: "Inicio", icon: <ChartIcon size={16} /> },
  { label: "Mis números", icon: <ChartIcon size={16} />, active: true },
  { label: "Pedidos", icon: <BagIcon size={16} /> },
  { label: "Productos", icon: <PkgIcon size={16} /> },
  { label: "Tienda", icon: <StoreIcon size={16} /> },
  { label: "Clientes", icon: <MoreIcon size={16} /> },
];

const HOURS = [1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 8, 12, 9, 6, 4, 5, 7, 10, 14, 11, 6, 3];

type ProductRow = {
  name: string;
  sold: number;
  revenue: number;
  tone: ProductTone;
  stock?: string;
  warn?: boolean;
};

const BEST_PRODUCTS: ProductRow[] = [
  { name: "Taco al pastor", sold: 42, revenue: 1050, tone: "warm", stock: "Te quedan 18" },
  { name: "Gringa de pastor", sold: 28, revenue: 2100, tone: "sand", stock: "Te quedan 6" },
  {
    name: "Alambre clásico",
    sold: 12,
    revenue: 1680,
    tone: "clay",
    stock: "AGOTADO",
    warn: true,
  },
];

const SLOW_PRODUCTS: ProductRow[] = [
  { name: "Taco de canasta", sold: 2, revenue: 30, tone: "cream" },
  { name: "Ensalada verde", sold: 1, revenue: 45, tone: "warm" },
  { name: "Flan casero", sold: 0, revenue: 0, tone: "clay" },
];

const CLIENT_BG_COLORS = ["#EFE9DD", "#E6DFD1", "#F4EEDF", "#E9E3D4"];

export function Analytics() {
  return (
    <div
      className="flex bg-td-bg text-td-ink w-[1200px] h-[760px] tracking-[-0.2px]"
    >
      <div
        className="flex flex-col gap-1 bg-td-ink text-td-bg w-[220px] py-[22px] px-[16px]"
      >
        <div className="pt-[4px] px-[8px] pb-[20px]">
          <NeniLogo size={26} color="var(--td-bg)" />
        </div>
        {SIDEBAR_NAV.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5 py-[9px] px-[12px] rounded-[8px] text-[13.5px]"
            style={{
              background: item.active ? "rgba(255,255,255,0.08)" : "transparent",
              color: item.active ? "var(--td-bg)" : "rgba(255,255,255,0.65)",
            }}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
        <div
          className="mt-auto p-[12px] bg-[rgba(255,255,255,0.05)] rounded-[12px]"
        >
          <div className="flex items-center gap-2">
            <div
              className="grid place-items-center w-[30px] h-[30px] rounded-[8px] bg-[#E9E3D4] text-[#141311] text-[11px] font-bold font-mono"
            >
              TM
            </div>
            <div>
              <div className="text-[12px] font-semibold">Tacos Don Memo</div>
              <div className="text-[10px] opacity-[0.6]">Plan gratis</div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto py-[22px] px-[28px]"
      >
        <div
          className="flex items-baseline mb-[20px] gap-[14px]"
        >
          <div className="text-[24px] font-semibold tracking-[-0.6px]">
            Esta semana vendiste
          </div>
          <div
            className="text-[32px] font-semibold tracking-[-1.2px] font-mono"
          >
            $18,420
          </div>
          <div
            className="text-td-accent text-[13px] font-semibold"
          >
            $3,280 más que la anterior
          </div>
          <div className="flex gap-1.5 ml-auto">
            {["Semana", "Mes", "Año"].map((p, i) => (
              <div
                key={p}
                className="border border-td-line py-[6px] px-[12px] rounded-full text-[12px] font-medium"
                style={{
                  background: i === 0 ? "var(--td-ink)" : "#fff",
                  color: i === 0 ? "var(--td-bg)" : "var(--td-ink)",
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-[1.3fr_1fr] gap-[12px] mb-[12px]"
        >
          <div
            className="bg-td-ink text-td-bg rounded-[16px] p-[20px] relative overflow-hidden"
          >
            <div
              className="text-[12px] opacity-[0.6] tracking-[0.6px] uppercase"
            >
              Tu mejor día
            </div>
            <div
              className="text-[40px] font-semibold tracking-[-1.4px] mt-[4px]"
            >
              Sábado
            </div>
            <div className="text-[14px] opacity-[0.8] mt-[2px]">
              Vendiste{" "}
              <b className="font-mono">
                $3,800
              </b>{" "}
              · 26 pedidos
            </div>
            <div className="mt-[18px]">
              <div className="text-[11px] opacity-[0.5] mb-[8px]">
                TUS HORAS PICO · SÁBADO
              </div>
              <div
                className="flex items-end gap-0.5 h-[54px]"
              >
                {HOURS.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[2px]"
                    style={{
                      height: `${(v / 14) * 100}%`,
                      background:
                        v >= 10 ? "var(--td-accent)" : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
              <div
                className="flex justify-between text-[10px] opacity-[0.5] mt-[4px] font-mono"
              >
                <span>00h</span>
                <span>06h</span>
                <span>12h</span>
                <span>18h</span>
                <span>23h</span>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col border border-td-line bg-white rounded-[16px] p-[20px]"
          >
            <div
              className="text-td-accent text-[12px] tracking-[0.6px] uppercase font-semibold"
            >
              Tip de la semana
            </div>
            <div
              className="text-[20px] font-semibold leading-[1.25] tracking-[-0.4px] mt-[8px]"
            >
              Los jueves por la tarde pocos te compran. Prueba una promo 2×1 de 5 a 8pm.
            </div>
            <div
              className="flex items-center gap-2 bg-td-bg mt-auto py-[10px] px-[14px] rounded-[10px] text-[13px]"
            >
              <span
                className="text-td-mute font-mono"
              >
                JUE 17–20h
              </span>
              <span
                className="text-td-ink ml-auto font-semibold"
              >
                Crear promo →
              </span>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-[12px] mb-[12px]"
        >
          <div
            className="border border-td-line bg-white rounded-[16px] p-[20px]"
          >
            <div
              className="flex items-baseline gap-2 mb-[4px]"
            >
              <div className="text-[15px] font-semibold">Lo que más vuela</div>
              <div className="text-td-mute text-[11px]">
                repón estos
              </div>
            </div>
            <div className="mt-[12px]">
              {BEST_PRODUCTS.map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 py-[10px]"
                  style={{
                    borderBottom:
                      i < BEST_PRODUCTS.length - 1
                        ? "1px solid var(--td-line)"
                        : "none",
                  }}
                >
                  <div className="w-[36px] h-[36px]">
                    <ProductPlaceholder h={36} label="" tone={p.tone} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold">{p.name}</div>
                    <div
                      className="text-[11px] mt-[2px]"
                      style={{
                        color: p.warn ? "#C9562C" : "var(--td-mute)",
                        fontWeight: p.warn ? 600 : 400,
                      }}
                    >
                      {p.stock}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-[13px] font-semibold font-mono"
                    >
                      ${p.revenue}
                    </div>
                    <div
                      className="text-td-mute text-[11px] font-mono"
                    >
                      {p.sold} vendidos
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="border border-td-line bg-white rounded-[16px] p-[20px]"
          >
            <div
              className="flex items-baseline gap-2 mb-[4px]"
            >
              <div className="text-[15px] font-semibold">
                Lo que no está jalando
              </div>
              <div className="text-td-mute text-[11px]">
                considera bajarle el precio o quitar
              </div>
            </div>
            <div className="mt-[12px]">
              {SLOW_PRODUCTS.map((p, i) => (
                <div
                  key={p.name}
                  className="flex items-center gap-3 py-[10px]"
                  style={{
                    borderBottom:
                      i < SLOW_PRODUCTS.length - 1
                        ? "1px solid var(--td-line)"
                        : "none",
                    opacity: p.sold === 0 ? 0.6 : 1,
                  }}
                >
                  <div className="w-[36px] h-[36px]">
                    <ProductPlaceholder h={36} label="" tone={p.tone} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold">{p.name}</div>
                    <div
                      className="text-td-mute text-[11px] mt-[2px]"
                    >
                      {p.sold === 0
                        ? "Nadie lo ha comprado"
                        : `Solo ${p.sold} ${p.sold === 1 ? "venta" : "ventas"}`}
                    </div>
                  </div>
                  <div
                    className="bg-td-bg text-td-mute text-[11px] py-[4px] px-[8px] rounded-full"
                  >
                    Ajustar
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-[1.2fr_1fr] gap-[12px]"
        >
          <div
            className="border border-td-line bg-white rounded-[16px] p-[20px]"
          >
            <div className="text-[15px] font-semibold mb-[4px]">
              Tus clientes fieles
            </div>
            <div
              className="text-td-mute text-[11px] mb-[12px]"
            >
              Mándales un WhatsApp, regresan con una promito
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LOYAL_CLIENTS.map((client, i) => (
                <div
                  key={client.name}
                  className="flex items-center gap-2.5 bg-td-bg border border-td-line py-[10px] px-[12px] rounded-[10px]"
                >
                  <div
                    className="grid place-items-center w-[32px] h-[32px] rounded-full text-[12px] font-semibold font-mono"
                    style={{
                      background: CLIENT_BG_COLORS[i],
                    }}
                  >
                    {client.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-semibold">{client.name}</div>
                    <div
                      className="text-td-mute text-[10.5px] font-mono"
                    >
                      {client.orderCount} pedidos · {client.totalSpent}
                    </div>
                  </div>
                  <div
                    className="grid place-items-center bg-td-accent w-[26px] h-[26px] rounded-full text-white"
                  >
                    <WaIcon size={13} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="border border-td-line bg-white rounded-[16px] p-[20px]"
          >
            <div className="text-[15px] font-semibold mb-[4px]">
              Cómo te pagan
            </div>
            <div
              className="text-td-mute text-[11px] mb-[16px]"
            >
              La mitad paga con tarjeta
            </div>
            {PAYMENT_SPLIT.map((row) => (
              <div key={row.method} className="mb-[10px]">
                <div
                  className="flex items-baseline justify-between text-[12.5px] mb-[4px]"
                >
                  <span className="font-medium">{row.method}</span>
                  <span
                    className="text-td-mute font-mono"
                  >
                    {row.amount} · {row.percent}%
                  </span>
                </div>
                <div
                  className="overflow-hidden bg-td-line h-[6px] rounded-full"
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${row.percent}%`,
                      background: row.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
