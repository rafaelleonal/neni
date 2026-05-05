import { ORDER_STATES, type OrderState } from "@/lib/order-states";

export type OrderStateBadgeProps = {
  state: OrderState;
};

export function OrderStateBadge({ state }: OrderStateBadgeProps) {
  const info = ORDER_STATES[state];
  return (
    <span
      className="shrink-0 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase"
      style={{ background: info.bg, color: info.color }}
    >
      {info.label}
    </span>
  );
}
