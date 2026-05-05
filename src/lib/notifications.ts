import "server-only";

import type { OrderState } from "@/lib/mocks";
import { sendWhatsapp } from "@/lib/twilio";

/**
 * Notificaciones por WhatsApp para los flujos de pedido. Todas son
 * "best-effort": si Twilio falla por límite, número no vinculado al sandbox,
 * número inválido, etc., loggeamos el error y seguimos. La operación principal
 * (crear pedido, mover estado) NUNCA debe romperse por una notificación.
 */

function appUrl(): string {
  return (
    process.env.BETTER_AUTH_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

function paddedNumber(n: number): string {
  return `#${n.toString().padStart(4, "0")}`;
}

function formatMoney(n: number): string {
  return `$${n.toFixed(2)}`;
}

async function safeSend(to: string, body: string, debugTag: string) {
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev) {
    // Imprime el mensaje en consola siempre — útil cuando el sandbox de Twilio
    // está topado (5/día) o el destinatario no hizo "join".
    const lines = body.split("\n");
    const width = Math.max(40, ...lines.map((l) => l.length));
    const top = "─".repeat(width + 2);
    console.log(
      `\n  ┌${top}┐\n` +
        `  │ WHATSAPP [${debugTag}] → ${to}`.padEnd(width + 4) +
        `│\n` +
        `  ├${top}┤\n` +
        lines
          .map((l) => `  │ ${l.padEnd(width)} │`)
          .join("\n") +
        `\n  └${top}┘\n`
    );
  }

  try {
    await sendWhatsapp(to, body);
  } catch (err) {
    // Loggeamos sin propagar — el flujo no debe romperse por la notif.
    if (!isDev) {
      console.warn(
        `[notifications:${debugTag}] no se pudo enviar a ${to}:`,
        err instanceof Error ? err.message : err
      );
    }
    // En dev ya tienes el body en consola, no necesitas más ruido.
  }
}

// ─── Notif al seller cuando llega un pedido nuevo ────────────────────────

export type SellerNewOrderArgs = {
  sellerPhone: string;
  storeName: string;
  orderNumber: number;
  customerName: string;
  total: number;
  payment: string;
};

export async function notifySellerNewOrder({
  sellerPhone,
  storeName,
  orderNumber,
  customerName,
  total,
  payment,
}: SellerNewOrderArgs): Promise<void> {
  const orderLabel = paddedNumber(orderNumber);
  const link = `${appUrl()}/pedidos/${orderNumber.toString().padStart(4, "0")}`;
  const body =
    `Nuevo pedido ${orderLabel} en ${storeName}\n` +
    `${customerName} — ${formatMoney(total)} (${payment})\n` +
    `Atender: ${link}`;
  await safeSend(sellerPhone, body, "new-order");
}

// ─── Notif al comprador cuando el seller mueve el estado ─────────────────

const BUYER_BODIES: Record<OrderState, (storeName: string) => string> = {
  nuevo: (storeName) => `${storeName} recibió tu pedido y lo está revisando.`,
  preparando: (storeName) =>
    `${storeName} ya está preparando tu pedido 🛍️`,
  camino: (storeName) =>
    `Tu pedido va en camino. ${storeName} salió a entregártelo.`,
  entregado: (storeName) =>
    `¡Tu pedido fue entregado! Gracias por comprar en ${storeName} 💛`,
  cancelado: (storeName) =>
    `${storeName} canceló tu pedido. Si tienes dudas, escríbele directo.`,
};

export type BuyerStateArgs = {
  buyerPhone: string;
  storeName: string;
  storeSlug: string;
  orderId: string;
  orderNumber: number;
  state: OrderState;
};

export async function notifyBuyerStateChange({
  buyerPhone,
  storeName,
  storeSlug,
  orderId,
  orderNumber,
  state,
}: BuyerStateArgs): Promise<void> {
  const greeting = `Hola, sobre tu pedido ${paddedNumber(orderNumber)}:`;
  const detail = BUYER_BODIES[state](storeName);
  const link = `${appUrl()}/${storeSlug}/pedido/${orderId}`;
  const body = `${greeting}\n${detail}\nVer: ${link}`;
  await safeSend(buyerPhone, body, `state-${state}`);
}
