import { BottomTabBar, type TabItem } from "@/components/bottom-tab-bar";
import { PhoneScreen } from "@/components/phone-screen";
import { ProductPlaceholder } from "@/components/product-placeholder";
import {
  ArrowIcon,
  BagIcon,
  ChartIcon,
  PkgIcon,
  PlusIcon,
  SearchIcon,
  StoreIcon,
} from "@/components/neni-icons";
import { SELLER_PRODUCTS } from "@/lib/mocks";

const NAV: TabItem[] = [
  { icon: <ChartIcon size={20} />, label: "Inicio" },
  { icon: <BagIcon size={20} />, label: "Pedidos" },
  { icon: <StoreIcon size={20} />, label: "Tienda" },
  { icon: <PkgIcon size={20} />, label: "Productos", active: true },
];

export function Editor() {
  return (
    <PhoneScreen
      paddingBottom={100}
      homeIndicatorPlacement="floating-compact"
    >
      <div className="flex items-center gap-3 pt-[4px] px-[20px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="flex-1">
          <div className="text-[18px] font-semibold">Productos</div>
          <div className="text-td-mute text-[11.5px]">
            5 productos · 4 visibles
          </div>
        </div>
        <div className="grid place-items-center border border-td-line w-[36px] h-[36px] rounded-[10px] bg-white">
          <SearchIcon size={16} />
        </div>
      </div>

      <div className="pt-[4px] px-[20px] pb-[16px]">
        <div className="flex items-center gap-3 bg-td-ink text-td-bg rounded-[16px] py-[14px] px-[16px]">
          <div className="grid place-items-center bg-td-accent w-[38px] h-[38px] rounded-[10px]">
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

      <div className="flex gap-1.5 overflow-auto no-scrollbar px-[20px] pb-[12px]">
        {["Todos · 5", "Tacos · 3", "Bebidas · 1", "Agotados · 1"].map((c, i) => (
          <div
            key={c}
            className="border border-td-line py-[6px] px-[12px] rounded-full text-[12.5px] font-medium whitespace-nowrap shrink-0"
            style={{
              background: i === 0 ? "var(--td-ink)" : "#fff",
              color: i === 0 ? "var(--td-bg)" : "var(--td-ink)",
            }}
          >
            {c}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 px-[20px]">
        {SELLER_PRODUCTS.map((p, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border border-td-line bg-white rounded-[14px] p-[10px]"
            style={{
              opacity: p.visible ? 1 : 0.6,
            }}
          >
            <div className="w-[56px] h-[56px] shrink-0">
              <ProductPlaceholder h={56} label="" tone={p.tone} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold">{p.name}</div>
              <div className="flex items-center gap-2 mt-[3px]">
                <span className="text-td-ink text-[13px] font-mono">
                  ${p.price.toFixed(2)}
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.3px] uppercase py-[2px] px-[6px] rounded-full"
                  style={{
                    background: p.stock === "Agotado" ? "#FCE4D6" : "var(--td-line)",
                    color: p.stock === "Agotado" ? "#9C3F12" : "var(--td-mute)",
                  }}
                >
                  {p.stock}
                </span>
              </div>
            </div>
            <div
              className="w-[36px] h-[22px] rounded-full relative shrink-0"
              style={{
                background: p.visible ? "var(--td-accent)" : "var(--td-line)",
              }}
            >
              <div
                className="absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white"
                style={{
                  left: p.visible ? 16 : 2,
                  transition: "left .15s",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid place-items-center bg-td-ink text-td-bg absolute bottom-[110px] right-[20px] w-[56px] h-[56px] rounded-full shadow-[0_12px_30px_-8px_rgba(0,0,0,0.3)]">
        <PlusIcon size={22} stroke="var(--td-bg)" sw={2.2} />
      </div>

      <BottomTabBar items={NAV} />
    </PhoneScreen>
  );
}
