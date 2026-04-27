import { PhoneScreen } from "@/components/phone-screen";
import { ArrowIcon } from "@/components/neni-icons";
import { CHECKOUT_ITEMS, PAYMENT_METHODS } from "@/lib/mocks";

type PayMethodProps = {
  id: string;
  title: string;
  sub: string;
  badge?: string;
  color: string;
  selected?: boolean;
};

function PayMethod({ id, title, sub, badge, selected, color }: PayMethodProps) {
  return (
    <div
      className="flex items-center gap-3 bg-white rounded-[14px] py-[14px] px-[14px]"
      style={{
        border: `${selected ? 2 : 1}px solid ${selected ? "var(--td-ink)" : "var(--td-line)"}`,
        margin: selected ? "-1px 0" : 0,
      }}
    >
      <div
        className="grid place-items-center shrink-0 w-[44px] h-[32px] rounded-[6px] text-white font-mono text-[11px] font-bold tracking-[0.5px]"
        style={{
          background: color,
        }}
      >
        {id}
      </div>
      <div className="flex-1">
        <div className="text-[14px] font-semibold">{title}</div>
        <div className="text-td-mute text-[11.5px] mt-[2px]">
          {sub}
        </div>
      </div>
      {badge && (
        <div className="bg-td-bg text-td-mute py-[2px] px-[7px] rounded-full text-[9.5px] font-bold tracking-[0.4px] uppercase">
          {badge}
        </div>
      )}
      <div
        className="w-[18px] h-[18px] rounded-full relative"
        style={{
          border: `2px solid ${selected ? "var(--td-ink)" : "var(--td-line)"}`,
          background: selected ? "var(--td-ink)" : "#fff",
        }}
      >
        {selected && (
          <div className="bg-td-bg absolute inset-[3px] rounded-full" />
        )}
      </div>
    </div>
  );
}

export function Checkout() {
  return (
    <PhoneScreen
      paddingBottom={120}
      homeIndicatorPlacement="floating"
    >
      <div className="flex items-center gap-3 pt-[4px] px-[20px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="flex-1 text-[17px] font-semibold">
          Confirmar pedido
        </div>
        <div className="text-td-mute text-[12px] font-mono">
          3 items
        </div>
      </div>

      <div className="pt-[12px] px-[20px] pb-[4px]">
        <div className="text-td-mute text-[11px] font-semibold tracking-[1.4px] uppercase mb-[10px]">
          Tu pedido
        </div>
        <div className="flex flex-col gap-2.5 border border-td-line bg-white rounded-[14px] p-[14px]">
          {CHECKOUT_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 text-[14px]"
            >
              <span className="text-td-mute font-mono w-[24px]">
                {item.qty}×
              </span>
              <span className="flex-1">{item.name}</span>
              <span className="font-mono">
                ${item.price}
              </span>
            </div>
          ))}
          <div className="bg-td-line h-[1px] my-[4px]" />
          <div className="flex justify-between text-td-mute text-[12.5px]">
            <span>Subtotal</span>
            <span className="font-mono">
              $200.00
            </span>
          </div>
          <div className="flex justify-between text-td-mute text-[12.5px]">
            <span>Envío</span>
            <span className="font-mono">$0.00</span>
          </div>
          <div className="flex justify-between text-[16px] font-semibold mt-[4px]">
            <span>Total</span>
            <span className="font-mono">
              $200.00
            </span>
          </div>
        </div>
      </div>

      <div className="pt-[20px] px-[20px] pb-[4px]">
        <div className="text-td-mute text-[11px] font-semibold tracking-[1.4px] uppercase mb-[10px]">
          Entrega
        </div>
        <div className="flex items-center gap-3 border border-td-line bg-white rounded-[14px] p-[14px]">
          <div className="grid place-items-center shrink-0 bg-td-bg w-[36px] h-[36px] rounded-[10px]">
            📍
          </div>
          <div className="flex-1">
            <div className="text-[13.5px] font-semibold">
              Orizaba 114, Roma Nte.
            </div>
            <div className="text-td-mute text-[11.5px]">
              Depto 3B · 30–45 min
            </div>
          </div>
          <div className="text-td-mute text-[12px]">Cambiar</div>
        </div>
      </div>

      <div className="pt-[20px] px-[20px] pb-[4px]">
        <div className="text-td-mute text-[11px] font-semibold tracking-[1.4px] uppercase mb-[10px]">
          Método de pago
        </div>
        <div className="flex flex-col gap-2">
          {PAYMENT_METHODS.map((m, i) => (
            <PayMethod
              key={m.id}
              id={m.id}
              title={m.title}
              sub={m.sub}
              badge={m.badge}
              color={m.color}
              selected={i === 0}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 bg-td-ink text-td-bg absolute bottom-[34px] left-[16px] right-[16px] rounded-[16px] py-[14px] px-[16px]">
        <div className="flex-1">
          <div className="text-[11px] opacity-[0.6] tracking-[0.4px] uppercase">
            Pagar con tarjeta
          </div>
          <div className="text-[17px] font-semibold font-mono">
            $200.00
          </div>
        </div>
        <ArrowIcon size={18} stroke="var(--td-bg)" />
      </div>
    </PhoneScreen>
  );
}
