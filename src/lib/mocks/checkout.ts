export type CheckoutItem = {
  qty: number;
  name: string;
  price: number;
};

export const CHECKOUT_ITEMS: CheckoutItem[] = [
  { qty: 3, name: "Taco al pastor", price: 75 },
  { qty: 1, name: "Gringa de pastor", price: 75 },
  { qty: 2, name: "Agua de horchata", price: 50 },
];

export type PaymentMethod = {
  id: string;
  title: string;
  sub: string;
  badge?: string;
  color: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "TC",
    title: "Tarjeta",
    sub: "Visa, Mastercard, AMEX · Mercado Pago",
    color: "#1A1A1A",
  },
  {
    id: "OXX",
    title: "OXXO",
    sub: "Paga en efectivo en cualquier OXXO",
    badge: "Popular",
    color: "#D8232A",
  },
  {
    id: "SPI",
    title: "SPEI",
    sub: "Transferencia bancaria · sin comisión",
    color: "#2E5BFF",
  },
  {
    id: "$$",
    title: "Efectivo contra entrega",
    sub: "Paga al recibir",
    color: "#1FAA59",
  },
];
