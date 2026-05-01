import { CHECKOUT_ITEMS, PAYMENT_METHODS } from "@/lib/mocks";

import { ArrowIcon } from "@/components/neni-icons";
import { PhoneScreen } from "@/components/phone-screen";

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
      className="flex items-center gap-3 rounded-[14px] bg-white px-[14px] py-[14px]"
      style={{
        border: `${selected ? 2 : 1}px solid ${selected ? "var(--td-ink)" : "var(--td-line)"}`,
        margin: selected ? "-1px 0" : 0,
      }}
    >
      <div
        className="grid h-[32px] w-[44px] shrink-0 place-items-center rounded-[6px] font-mono text-[11px] font-bold tracking-[0.5px] text-white"
        style={{
          background: color,
        }}
      >
        {id}
      </div>
      <div className="flex-1">
        <div className="text-[14px] font-semibold">{title}</div>
        <div className="text-td-mute mt-[2px] text-[11.5px]">{sub}</div>
      </div>
      {badge && (
        <div className="bg-td-bg text-td-mute rounded-full px-[7px] py-[2px] text-[9.5px] font-bold tracking-[0.4px] uppercase">
          {badge}
        </div>
      )}
      <div
        className="relative h-[18px] w-[18px] rounded-full"
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
    <PhoneScreen paddingBottom={120} homeIndicatorPlacement="floating">
      <div className="flex items-center gap-3 px-[20px] pt-[4px] pb-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="flex-1 text-[17px] font-semibold">Confirmar pedido</div>
        <div className="text-td-mute font-mono text-[12px]">3 items</div>
      </div>

      <div className="px-[20px] pt-[12px] pb-[4px]">
        <div className="text-td-mute mb-[10px] text-[11px] font-semibold tracking-[1.4px] uppercase">
          Tu pedido
        </div>
        <div className="border-td-line flex flex-col gap-2.5 rounded-[14px] border bg-white p-[14px]">
          {CHECKOUT_ITEMS.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-[14px]">
              <span className="text-td-mute w-[24px] font-mono">
                {item.qty}×
              </span>
              <span className="flex-1">{item.name}</span>
              <span className="font-mono">${item.price}</span>
            </div>
          ))}
          <div className="bg-td-line my-[4px] h-[1px]" />
          <div className="text-td-mute flex justify-between text-[12.5px]">
            <span>Subtotal</span>
            <span className="font-mono">$200.00</span>
          </div>
          <div className="text-td-mute flex justify-between text-[12.5px]">
            <span>Envío</span>
            <span className="font-mono">$0.00</span>
          </div>
          <div className="mt-[4px] flex justify-between text-[16px] font-semibold">
            <span>Total</span>
            <span className="font-mono">$200.00</span>
          </div>
        </div>
      </div>

      <div className="px-[20px] pt-[20px] pb-[4px]">
        <div className="text-td-mute mb-[10px] text-[11px] font-semibold tracking-[1.4px] uppercase">
          Entrega
        </div>
        <div className="border-td-line flex items-center gap-3 rounded-[14px] border bg-white p-[14px]">
          <div className="bg-td-bg grid h-[36px] w-[36px] shrink-0 place-items-center rounded-[10px]">
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

      <div className="px-[20px] pt-[20px] pb-[4px]">
        <div className="text-td-mute mb-[10px] text-[11px] font-semibold tracking-[1.4px] uppercase">
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

      <div className="bg-td-ink text-td-bg absolute right-[16px] bottom-[34px] left-[16px] flex items-center gap-3 rounded-[16px] px-[16px] py-[14px]">
        <div className="flex-1">
          <div className="text-[11px] tracking-[0.4px] uppercase opacity-[0.6]">
            Pagar con tarjeta
          </div>
          <div className="font-mono text-[17px] font-semibold">$200.00</div>
        </div>
        <ArrowIcon size={18} stroke="var(--td-bg)" />
      </div>
    </PhoneScreen>
  );
}
