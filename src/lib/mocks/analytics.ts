export type LoyalClient = {
  name: string;
  orderCount: number;
  totalSpent: string;
};

export const LOYAL_CLIENTS: LoyalClient[] = [
  { name: "Marisol H.", orderCount: 8, totalSpent: "$1,620" },
  { name: "Carlos R.", orderCount: 6, totalSpent: "$940" },
  { name: "Ana L.", orderCount: 5, totalSpent: "$1,130" },
  { name: "Diego M.", orderCount: 4, totalSpent: "$780" },
];

export type PaymentSplitRow = {
  method: string;
  percent: number;
  color: string;
  amount: string;
};

export const PAYMENT_SPLIT: PaymentSplitRow[] = [
  { method: "Tarjeta", percent: 48, color: "var(--td-ink)", amount: "$8,842" },
  { method: "OXXO", percent: 24, color: "#D8232A", amount: "$4,420" },
  { method: "SPEI", percent: 18, color: "#2E5BFF", amount: "$3,316" },
  { method: "Efectivo", percent: 10, color: "var(--td-accent)", amount: "$1,842" },
];
