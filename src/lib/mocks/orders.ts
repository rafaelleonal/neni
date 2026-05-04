export type OrderState =
  | "nuevo"
  | "preparando"
  | "camino"
  | "entregado"
  | "cancelado";

export type Order = {
  id: string;
  who: string;
  items: string;
  total: number;
  state: OrderState;
  /** Human-readable relative or absolute timestamp, e.g. "Hace 5 min" or "Ayer 18:45". */
  time: string;
};

export type OrderLineItem = {
  name: string;
  qty: number;
  price: number;
};

export type OrderDetail = Order & {
  phone: string;
  address?: string;
  notes?: string;
  payment: string;
  lines: OrderLineItem[];
};

export const RECENT_ORDERS: Order[] = [
  {
    id: "#4828",
    who: "Sofía P.",
    items: "2 productos",
    total: 165,
    state: "nuevo",
    time: "Hace 2 min",
  },
  {
    id: "#4827",
    who: "Diego R.",
    items: "1 producto",
    total: 95,
    state: "nuevo",
    time: "Hace 8 min",
  },
  {
    id: "#4826",
    who: "Lucía V.",
    items: "4 productos",
    total: 420,
    state: "nuevo",
    time: "Hace 14 min",
  },
  {
    id: "#4825",
    who: "Mariana C.",
    items: "3 productos",
    total: 285,
    state: "preparando",
    time: "Hace 22 min",
  },
  {
    id: "#4824",
    who: "Roberto S.",
    items: "2 productos",
    total: 150,
    state: "preparando",
    time: "Hace 28 min",
  },
  {
    id: "#4823",
    who: "Patricia G.",
    items: "5 productos",
    total: 540,
    state: "preparando",
    time: "Hace 35 min",
  },
  {
    id: "#4822",
    who: "Javier T.",
    items: "1 producto",
    total: 75,
    state: "preparando",
    time: "Hace 48 min",
  },
  {
    id: "#4821",
    who: "Marisol H.",
    items: "3 productos",
    total: 200,
    state: "camino",
    time: "Hoy 14:30",
  },
  {
    id: "#4820",
    who: "Carlos R.",
    items: "1 producto",
    total: 75,
    state: "camino",
    time: "Hoy 13:45",
  },
  {
    id: "#4819",
    who: "Ana L.",
    items: "5 productos",
    total: 340,
    state: "camino",
    time: "Hoy 13:10",
  },
  {
    id: "#4818",
    who: "Diego M.",
    items: "2 productos",
    total: 120,
    state: "entregado",
    time: "Hoy 12:25",
  },
  {
    id: "#4817",
    who: "Fernanda B.",
    items: "3 productos",
    total: 230,
    state: "entregado",
    time: "Hoy 11:50",
  },
  {
    id: "#4816",
    who: "Tomás N.",
    items: "2 productos",
    total: 180,
    state: "entregado",
    time: "Ayer 19:40",
  },
];

export const ORDER_STATE_STYLE: Record<
  OrderState,
  { bg: string; color: string; label: string }
> = {
  nuevo: { bg: "var(--td-accent)", color: "#fff", label: "Nuevo" },
  preparando: { bg: "#F6E3B1", color: "#6E5A1E", label: "Preparando" },
  camino: { bg: "#CFE1FF", color: "#1E3E7E", label: "En camino" },
  entregado: {
    bg: "var(--td-line)",
    color: "var(--td-mute)",
    label: "Entregado",
  },
  cancelado: { bg: "#FCE4D6", color: "#9C3F12", label: "Cancelado" },
};

/** Estados que componen el flujo lineal del pedido. `cancelado` queda fuera. */
export const ORDER_STATE_FLOW: Exclude<OrderState, "cancelado">[] = [
  "nuevo",
  "preparando",
  "camino",
  "entregado",
];

const SAMPLE_LINES: OrderLineItem[][] = [
  [
    { name: "Taco al pastor", qty: 4, price: 25 },
    { name: "Agua de horchata", qty: 1, price: 25 },
    { name: "Quesadilla", qty: 1, price: 35 },
  ],
  [{ name: "Gringa de pastor", qty: 1, price: 75 }],
  [
    { name: "Taco al pastor", qty: 8, price: 25 },
    { name: "Quesadilla", qty: 4, price: 35 },
    { name: "Agua de horchata", qty: 4, price: 25 },
  ],
  [
    { name: "Gringa de pastor", qty: 2, price: 75 },
    { name: "Taco al pastor", qty: 4, price: 25 },
    { name: "Quesadilla", qty: 1, price: 35 },
  ],
  [
    { name: "Taco al pastor", qty: 4, price: 25 },
    { name: "Agua de horchata", qty: 2, price: 25 },
  ],
];

const SAMPLE_PHONES = [
  "+52 55 1234 5678",
  "+52 55 8765 4321",
  "+52 55 4444 7777",
  "+52 55 9999 1122",
  "+52 55 3344 5566",
];

const SAMPLE_ADDRESSES = [
  "Av. Ámsterdam 142, Hipódromo",
  "Calle Tonalá 39, Roma Norte",
  "Av. Insurgentes 1100, Del Valle",
  "Calle Orizaba 87, Roma Sur",
  undefined,
];

const SAMPLE_NOTES = [
  "Sin cebolla porfa, gracias!",
  undefined,
  "Tocar el timbre dos veces",
  undefined,
  "Dejar con el portero si no estoy",
];

const SAMPLE_PAYMENTS: OrderDetail["payment"][] = [
  "Efectivo",
  "Transferencia",
  "Tarjeta",
];

export function getOrderById(rawId: string): OrderDetail | undefined {
  // Acepta tanto "4828" como "%234828" (URL-encoded "#4828").
  const normalized = decodeURIComponent(rawId).replace(/^#/, "");
  const lookup = `#${normalized}`;
  const index = RECENT_ORDERS.findIndex((o) => o.id === lookup);
  if (index === -1) return undefined;
  const base = RECENT_ORDERS[index];
  return {
    ...base,
    phone: SAMPLE_PHONES[index % SAMPLE_PHONES.length],
    address: SAMPLE_ADDRESSES[index % SAMPLE_ADDRESSES.length],
    notes: SAMPLE_NOTES[index % SAMPLE_NOTES.length],
    payment: SAMPLE_PAYMENTS[index % SAMPLE_PAYMENTS.length],
    lines: SAMPLE_LINES[index % SAMPLE_LINES.length],
  };
}
