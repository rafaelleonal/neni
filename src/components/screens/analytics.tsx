import type { ReactNode } from "react";

import { LOYAL_CLIENTS, PAYMENT_SPLIT } from "@/lib/mocks";
import type { ProductTone } from "@/lib/tokens";

import {
  BagIcon,
  ChartIcon,
  MoreIcon,
  PkgIcon,
  StoreIcon,
  WaIcon,
} from "@/components/neni-icons";
import { NeniLogo } from "@/components/neni-logo";
import { ProductPlaceholder } from "@/components/product-placeholder";

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

const HOURS = [
  1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 4, 5, 8, 12, 9, 6, 4, 5, 7, 10, 14, 11, 6, 3,
];

type ProductRow = {
  name: string;
  sold: number;
  revenue: number;
  tone: ProductTone;
  stock?: string;
  warn?: boolean;
};

const BEST_PRODUCTS: ProductRow[] = [
  {
    name: "Taco al pastor",
    sold: 42,
    revenue: 1050,
    tone: "warm",
    stock: "Te quedan 18",
  },
  {
    name: "Gringa de pastor",
    sold: 28,
    revenue: 2100,
    tone: "sand",
    stock: "Te quedan 6",
  },
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
    <div className="bg-td-bg text-td-ink flex h-[760px] w-[1200px] tracking-[-0.2px]">
      <div className="bg-td-ink text-td-bg flex w-[220px] flex-col gap-1 px-[16px] py-[22px]">
        <div className="px-[8px] pt-[4px] pb-[20px]">
          <NeniLogo size={26} color="var(--td-bg)" />
        </div>
        {SIDEBAR_NAV.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5 rounded-[8px] px-[12px] py-[9px] text-[13.5px]"
            style={{
              background: item.active
                ? "rgba(255,255,255,0.08)"
                : "transparent",
              color: item.active ? "var(--td-bg)" : "rgba(255,255,255,0.65)",
            }}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
        <div className="mt-auto rounded-[12px] bg-[rgba(255,255,255,0.05)] p-[12px]">
          <div className="flex items-center gap-2">
            <div className="grid h-[30px] w-[30px] place-items-center rounded-[8px] bg-[#E9E3D4] font-mono text-[11px] font-bold text-[#141311]">
              TM
            </div>
            <div>
              <div className="text-[12px] font-semibold">Tacos Don Memo</div>
              <div className="text-[10px] opacity-[0.6]">Plan gratis</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-[28px] py-[22px]">
        <div className="mb-[20px] flex items-baseline gap-[14px]">
          <div className="text-[24px] font-semibold tracking-[-0.6px]">
            Esta semana vendiste
          </div>
          <div className="font-mono text-[32px] font-semibold tracking-[-1.2px]">
            $18,420
          </div>
          <div className="text-td-accent text-[13px] font-semibold">
            $3,280 más que la anterior
          </div>
          <div className="ml-auto flex gap-1.5">
            {["Semana", "Mes", "Año"].map((p, i) => (
              <div
                key={p}
                className="border-td-line rounded-full border px-[12px] py-[6px] text-[12px] font-medium"
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

        <div className="mb-[12px] grid grid-cols-[1.3fr_1fr] gap-[12px]">
          <div className="bg-td-ink text-td-bg relative overflow-hidden rounded-[16px] p-[20px]">
            <div className="text-[12px] tracking-[0.6px] uppercase opacity-[0.6]">
              Tu mejor día
            </div>
            <div className="mt-[4px] text-[40px] font-semibold tracking-[-1.4px]">
              Sábado
            </div>
            <div className="mt-[2px] text-[14px] opacity-[0.8]">
              Vendiste <b className="font-mono">$3,800</b> · 26 pedidos
            </div>
            <div className="mt-[18px]">
              <div className="mb-[8px] text-[11px] opacity-[0.5]">
                TUS HORAS PICO · SÁBADO
              </div>
              <div className="flex h-[54px] items-end gap-0.5">
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
              <div className="mt-[4px] flex justify-between font-mono text-[10px] opacity-[0.5]">
                <span>00h</span>
                <span>06h</span>
                <span>12h</span>
                <span>18h</span>
                <span>23h</span>
              </div>
            </div>
          </div>

          <div className="border-td-line flex flex-col rounded-[16px] border bg-white p-[20px]">
            <div className="text-td-accent text-[12px] font-semibold tracking-[0.6px] uppercase">
              Tip de la semana
            </div>
            <div className="mt-[8px] text-[20px] leading-[1.25] font-semibold tracking-[-0.4px]">
              Los jueves por la tarde pocos te compran. Prueba una promo 2×1 de
              5 a 8pm.
            </div>
            <div className="bg-td-bg mt-auto flex items-center gap-2 rounded-[10px] px-[14px] py-[10px] text-[13px]">
              <span className="text-td-mute font-mono">JUE 17–20h</span>
              <span className="text-td-ink ml-auto font-semibold">
                Crear promo →
              </span>
            </div>
          </div>
        </div>

        <div className="mb-[12px] grid grid-cols-2 gap-[12px]">
          <div className="border-td-line rounded-[16px] border bg-white p-[20px]">
            <div className="mb-[4px] flex items-baseline gap-2">
              <div className="text-[15px] font-semibold">Lo que más vuela</div>
              <div className="text-td-mute text-[11px]">repón estos</div>
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
                  <div className="h-[36px] w-[36px]">
                    <ProductPlaceholder h={36} label="" tone={p.tone} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold">{p.name}</div>
                    <div
                      className="mt-[2px] text-[11px]"
                      style={{
                        color: p.warn ? "#C9562C" : "var(--td-mute)",
                        fontWeight: p.warn ? 600 : 400,
                      }}
                    >
                      {p.stock}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[13px] font-semibold">
                      ${p.revenue}
                    </div>
                    <div className="text-td-mute font-mono text-[11px]">
                      {p.sold} vendidos
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-td-line rounded-[16px] border bg-white p-[20px]">
            <div className="mb-[4px] flex items-baseline gap-2">
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
                  <div className="h-[36px] w-[36px]">
                    <ProductPlaceholder h={36} label="" tone={p.tone} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold">{p.name}</div>
                    <div className="text-td-mute mt-[2px] text-[11px]">
                      {p.sold === 0
                        ? "Nadie lo ha comprado"
                        : `Solo ${p.sold} ${p.sold === 1 ? "venta" : "ventas"}`}
                    </div>
                  </div>
                  <div className="bg-td-bg text-td-mute rounded-full px-[8px] py-[4px] text-[11px]">
                    Ajustar
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[1.2fr_1fr] gap-[12px]">
          <div className="border-td-line rounded-[16px] border bg-white p-[20px]">
            <div className="mb-[4px] text-[15px] font-semibold">
              Tus clientes fieles
            </div>
            <div className="text-td-mute mb-[12px] text-[11px]">
              Mándales un WhatsApp, regresan con una promito
            </div>
            <div className="grid grid-cols-2 gap-2">
              {LOYAL_CLIENTS.map((client, i) => (
                <div
                  key={client.name}
                  className="bg-td-bg border-td-line flex items-center gap-2.5 rounded-[10px] border px-[12px] py-[10px]"
                >
                  <div
                    className="grid h-[32px] w-[32px] place-items-center rounded-full font-mono text-[12px] font-semibold"
                    style={{
                      background: CLIENT_BG_COLORS[i],
                    }}
                  >
                    {client.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold">
                      {client.name}
                    </div>
                    <div className="text-td-mute font-mono text-[10.5px]">
                      {client.orderCount} pedidos · {client.totalSpent}
                    </div>
                  </div>
                  <div className="bg-td-accent grid h-[26px] w-[26px] place-items-center rounded-full text-white">
                    <WaIcon size={13} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-td-line rounded-[16px] border bg-white p-[20px]">
            <div className="mb-[4px] text-[15px] font-semibold">
              Cómo te pagan
            </div>
            <div className="text-td-mute mb-[16px] text-[11px]">
              La mitad paga con tarjeta
            </div>
            {PAYMENT_SPLIT.map((row) => (
              <div key={row.method} className="mb-[10px]">
                <div className="mb-[4px] flex items-baseline justify-between text-[12.5px]">
                  <span className="font-medium">{row.method}</span>
                  <span className="text-td-mute font-mono">
                    {row.amount} · {row.percent}%
                  </span>
                </div>
                <div className="bg-td-line h-[6px] overflow-hidden rounded-full">
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
