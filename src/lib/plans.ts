export type PlanId = "free" | "pro";

export type PlanInfo = {
  id: PlanId;
  name: string;
  tagline: string;
  priceMxn: number;
  priceMxnYear: number | null;
  onlineCommissionPct: number;
  features: string[];
  cta: string;
  highlight?: boolean;
};

export const PLANS: Record<PlanId, PlanInfo> = {
  free: {
    id: "free",
    name: "Empezando",
    tagline: "Todo lo que necesitas para arrancar.",
    priceMxn: 0,
    priceMxnYear: null,
    onlineCommissionPct: 3,
    features: [
      "Hasta 20 productos",
      "Hasta 30 pedidos al mes",
      "Solo efectivo contra entrega",
      "WhatsApp para ti cuando llegue un pedido",
      "Tu link público neni.mx/tunegocio",
      "1 foto por producto",
    ],
    cta: "Plan actual",
  },
  pro: {
    id: "pro",
    name: "Vendiendo",
    tagline: "Sin límites para crecer.",
    priceMxn: 129,
    priceMxnYear: 1290,
    onlineCommissionPct: 1.5,
    features: [
      "Productos ilimitados",
      "Pedidos ilimitados",
      "Cobra por tarjeta, OXXO y SPEI",
      "WhatsApp automático a tus clientes",
      "Variantes (talla, color, sabor)",
      "Stock real por producto",
      "Hasta 5 fotos por producto",
      "Cupones y descuentos",
      "Plantillas de WhatsApp",
      "Sin marca de neni en tu tienda",
    ],
    cta: "Cambiar a Pro",
    highlight: true,
  },
};

export const PLAN_LIST: ReadonlyArray<PlanInfo> = [PLANS.free, PLANS.pro];

export const PLAN_LIMITS: Record<
  PlanId,
  { maxProducts: number; maxOrdersPerMonth: number; maxPhotosPerProduct: number }
> = {
  free: {
    maxProducts: 20,
    maxOrdersPerMonth: 30,
    maxPhotosPerProduct: 1,
  },
  pro: {
    maxProducts: Infinity,
    maxOrdersPerMonth: Infinity,
    maxPhotosPerProduct: 5,
  },
};

export function showsBranding(plan: PlanId): boolean {
  return plan === "free";
}
