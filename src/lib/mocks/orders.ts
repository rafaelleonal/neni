export type OrderState = "nuevo" | "preparando" | "camino" | "entregado";

export type Order = {
  id: string;
  who: string;
  items: string;
  total: number;
  state: OrderState;
  /** Human-readable relative or absolute timestamp, e.g. "Hace 5 min" or "Ayer 18:45". */
  time: string;
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
};
