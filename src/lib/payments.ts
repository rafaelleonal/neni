export type PaymentId = "card" | "oxxo" | "spei" | "cash";

export const PAYMENT_IDS: ReadonlyArray<PaymentId> = [
  "card",
  "oxxo",
  "spei",
  "cash",
];

export type PaymentInfo = {
  id: PaymentId;
  label: string;
  shortLabel: string;
  sub: string;
  badge: string;
  color: string;
  receiptLabel: string;
  available: boolean;
  highlight?: string;
};

export const PAYMENTS: Record<PaymentId, PaymentInfo> = {
  cash: {
    id: "cash",
    label: "Efectivo contra entrega",
    shortLabel: "efectivo",
    sub: "Cobras al entregar el pedido",
    badge: "$$",
    color: "#1FAA59",
    receiptLabel: "Efectivo",
    available: true,
  },
  card: {
    id: "card",
    label: "Tarjeta",
    shortLabel: "tarjeta",
    sub: "Visa, Mastercard, AMEX",
    badge: "TC",
    color: "#1A1A1A",
    receiptLabel: "Tarjeta",
    available: false,
  },
  oxxo: {
    id: "oxxo",
    label: "OXXO",
    shortLabel: "OXXO",
    sub: "Pago en efectivo en cualquier tienda",
    badge: "OXX",
    color: "#D8232A",
    receiptLabel: "OXXO",
    available: false,
    highlight: "Popular",
  },
  spei: {
    id: "spei",
    label: "SPEI",
    shortLabel: "SPEI",
    sub: "Transferencia bancaria sin comisión",
    badge: "SPI",
    color: "#2E5BFF",
    receiptLabel: "SPEI",
    available: false,
  },
};

/** List in canonical display order: cash first (only active). */
export const PAYMENT_LIST: ReadonlyArray<PaymentInfo> = [
  PAYMENTS.cash,
  PAYMENTS.card,
  PAYMENTS.oxxo,
  PAYMENTS.spei,
];

export function isPaymentId(value: string): value is PaymentId {
  return PAYMENT_IDS.includes(value as PaymentId);
}
