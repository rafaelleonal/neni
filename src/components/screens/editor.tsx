import { SELLER_PRODUCTS } from "@/lib/mocks";

import { BottomTabBar, type TabItem } from "@/components/bottom-tab-bar";
import {
  ArrowIcon,
  BagIcon,
  ChartIcon,
  PkgIcon,
  PlusIcon,
  SearchIcon,
  StoreIcon,
} from "@/components/neni-icons";
import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";

const NAV: TabItem[] = [
  { icon: <ChartIcon size={20} />, label: "Inicio" },
  { icon: <BagIcon size={20} />, label: "Pedidos" },
  { icon: <StoreIcon size={20} />, label: "Tienda" },
  { icon: <PkgIcon size={20} />, label: "Productos", active: true },
];

export function Editor() {
  return (
    <PhoneScreen paddingBottom={100} homeIndicatorPlacement="floating-compact">
      <div className="flex items-center gap-3 px-[20px] pt-[4px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="flex-1">
          <div className="text-[18px] font-semibold">Productos</div>
          <div className="text-td-mute text-[11.5px]">
            5 productos · 4 visibles
          </div>
        </div>
        <div className="border-td-line grid h-[36px] w-[36px] place-items-center rounded-[10px] border bg-white">
          <SearchIcon size={16} />
        </div>
      </div>

      <div className="px-[20px] pt-[4px] pb-[16px]">
        <div className="bg-td-ink text-td-bg flex items-center gap-3 rounded-[16px] px-[16px] py-[14px]">
          <div className="bg-td-accent grid h-[38px] w-[38px] place-items-center rounded-[10px]">
            <PlusIcon size={18} stroke="#fff" />
          </div>
          <div className="flex-1">
            <div className="text-[14px] font-semibold">Agregar producto</div>
            <div className="text-[11.5px] opacity-[0.6]">
              Foto, precio, variantes
            </div>
          </div>
          <ArrowIcon size={16} stroke="rgba(255,255,255,0.6)" />
        </div>
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-auto px-[20px] pb-[12px]">
        {["Todos · 5", "Tacos · 3", "Bebidas · 1", "Agotados · 1"].map(
          (c, i) => (
            <div
              key={c}
              className="border-td-line shrink-0 rounded-full border px-[12px] py-[6px] text-[12.5px] font-medium whitespace-nowrap"
              style={{
                background: i === 0 ? "var(--td-ink)" : "#fff",
                color: i === 0 ? "var(--td-bg)" : "var(--td-ink)",
              }}
            >
              {c}
            </div>
          )
        )}
      </div>

      <div className="flex flex-col gap-2 px-[20px]">
        {SELLER_PRODUCTS.map((p, i) => (
          <div
            key={i}
            className="border-td-line flex items-center gap-3 rounded-[14px] border bg-white p-[10px]"
            style={{
              opacity: p.visible ? 1 : 0.6,
            }}
          >
            <div className="h-[56px] w-[56px] shrink-0">
              <ProductPlaceholder h={56} label="" tone={p.tone} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold">{p.name}</div>
              <div className="mt-[3px] flex items-center gap-2">
                <span className="text-td-ink font-mono text-[13px]">
                  ${p.price.toFixed(2)}
                </span>
                <span
                  className="rounded-full px-[6px] py-[2px] text-[10px] font-semibold tracking-[0.3px] uppercase"
                  style={{
                    background:
                      p.stock === "Agotado" ? "#FCE4D6" : "var(--td-line)",
                    color: p.stock === "Agotado" ? "#9C3F12" : "var(--td-mute)",
                  }}
                >
                  {p.stock}
                </span>
              </div>
            </div>
            <div
              className="relative h-[22px] w-[36px] shrink-0 rounded-full"
              style={{
                background: p.visible ? "var(--td-accent)" : "var(--td-line)",
              }}
            >
              <div
                className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white"
                style={{
                  left: p.visible ? 16 : 2,
                  transition: "left .15s",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-td-ink text-td-bg absolute right-[20px] bottom-[110px] grid h-[56px] w-[56px] place-items-center rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3)]">
        <PlusIcon size={22} stroke="var(--td-bg)" sw={2.2} />
      </div>

      <BottomTabBar items={NAV} />
    </PhoneScreen>
  );
}
