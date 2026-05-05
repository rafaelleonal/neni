export type OrderState =
  | "nuevo"
  | "preparando"
  | "camino"
  | "entregado"
  | "cancelado";

/** States that make up the linear flow of the order. `cancelado` is excluded. */
export type ActiveOrderState = Exclude<OrderState, "cancelado">;

export type OrderStateInfo = {
  label: string;
  bg: string;
  color: string;
  buyerTitle: string;
  buyerSub: string;
  sellerNextAction: string | null;
  timelineTitle: string;
  timelineSub: string;
};

export const ORDER_STATES: Record<OrderState, OrderStateInfo> = {
  nuevo: {
    label: "Nuevo",
    bg: "var(--td-accent)",
    color: "#fff",
    buyerTitle: "Pedido recibido",
    buyerSub: "La tienda lo está revisando",
    sellerNextAction: "Marcar como preparando",
    timelineTitle: "Pedido recibido",
    timelineSub: "La tienda lo confirmó",
  },
  preparando: {
    label: "Preparando",
    bg: "#F6E3B1",
    color: "#6E5A1E",
    buyerTitle: "Preparando tu pedido",
    buyerSub: "La tienda lo está preparando para ti",
    sellerNextAction: "Marcar en camino",
    timelineTitle: "Preparando",
    timelineSub: "La nena ya lo está armando",
  },
  camino: {
    label: "En camino",
    bg: "#CFE1FF",
    color: "#1E3E7E",
    buyerTitle: "Va en camino",
    buyerSub: "Tu pedido salió y llegará pronto",
    sellerNextAction: "Marcar como entregado",
    timelineTitle: "En camino",
    timelineSub: "Va para tu dirección",
  },
  entregado: {
    label: "Entregado",
    bg: "var(--td-line)",
    color: "var(--td-mute)",
    buyerTitle: "Entregado",
    buyerSub: "¡Gracias por tu compra!",
    sellerNextAction: null,
    timelineTitle: "Entregado",
    timelineSub: "Listo, ¡que lo disfrutes!",
  },
  cancelado: {
    label: "Cancelado",
    bg: "#FCE4D6",
    color: "#9C3F12",
    buyerTitle: "Pedido cancelado",
    buyerSub: "El pedido fue cancelado",
    sellerNextAction: null,
    timelineTitle: "Cancelado",
    timelineSub: "El pedido fue cancelado",
  },
};

export const ORDER_STATE_FLOW: ReadonlyArray<ActiveOrderState> = [
  "nuevo",
  "preparando",
  "camino",
  "entregado",
];

export function isActiveState(state: OrderState): state is ActiveOrderState {
  return state !== "cancelado";
}

export function formatOrderNumber(n: number, withHash = true): string {
  const padded = n.toString().padStart(4, "0");
  return withHash ? `#${padded}` : padded;
}
