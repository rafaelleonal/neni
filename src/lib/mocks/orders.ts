export type OrderState = "nuevo" | "preparando" | "camino" | "entregado";

export type Order = {
  id: string;
  who: string;
  items: string;
  total: number;
  state: OrderState;
};

export const RECENT_ORDERS: Order[] = [
  { id: "#4821", who: "Marisol H.", items: "3 productos", total: 200, state: "nuevo" },
  { id: "#4820", who: "Carlos R.", items: "1 producto", total: 75, state: "preparando" },
  { id: "#4819", who: "Ana L.", items: "5 productos", total: 340, state: "camino" },
  { id: "#4818", who: "Diego M.", items: "2 productos", total: 120, state: "entregado" },
];

export const ORDER_STATE_STYLE: Record<OrderState, { bg: string; color: string }> = {
  nuevo: { bg: "var(--td-accent)", color: "#fff" },
  preparando: { bg: "#F6E3B1", color: "#6E5A1E" },
  camino: { bg: "#CFE1FF", color: "#1E3E7E" },
  entregado: { bg: "var(--td-line)", color: "var(--td-mute)" },
};
