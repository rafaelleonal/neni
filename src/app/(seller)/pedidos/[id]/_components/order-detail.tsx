"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";
import {
  ORDER_STATE_FLOW,
  ORDER_STATE_STYLE,
  type OrderDetail,
  type OrderState,
} from "@/lib/mocks";
import { cn, formatPrice } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ArrowIcon, CheckIcon, WaIcon } from "@/components/neni-icons";

const NEXT_LABEL: Record<OrderState, string | null> = {
  nuevo: "Marcar como preparando",
  preparando: "Marcar en camino",
  camino: "Marcar como entregado",
  entregado: null,
  cancelado: null,
};

type ActiveState = Exclude<OrderState, "cancelado">;

function isActive(state: OrderState): state is ActiveState {
  return state !== "cancelado";
}

export function OrderDetailPage({
  order,
  storeName,
  orderId,
}: {
  order: OrderDetail;
  storeName: string;
  orderId: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<OrderState>(order.state);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const subtotal = order.lines.reduce((sum, l) => sum + l.qty * l.price, 0);
  const stateStyle = ORDER_STATE_STYLE[state];
  const nextLabel = NEXT_LABEL[state];
  const stepIndex = isActive(state) ? ORDER_STATE_FLOW.indexOf(state) : -1;
  const canCancel = state === "nuevo" || state === "preparando";

  async function patchState(next: OrderState) {
    setError(null);
    const previous = state;
    setState(next); // optimistic
    setSubmitting(true);
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state: next }),
    });
    setSubmitting(false);
    if (!res.ok) {
      setState(previous); // revert
      haptic("error");
      setError("No pudimos actualizar el pedido. Intenta de nuevo.");
      return false;
    }
    router.refresh();
    return true;
  }

  async function handleAdvance() {
    if (!nextLabel || submitting) return;
    const next = ORDER_STATE_FLOW[stepIndex + 1];
    if (!next) return;
    haptic(next === "entregado" ? "success" : "medium");
    await patchState(next);
  }

  async function handleCancel() {
    if (submitting) return;
    if (!confirmCancel) {
      haptic("light");
      setConfirmCancel(true);
      return;
    }
    haptic("error");
    setConfirmCancel(false);
    await patchState("cancelado");
  }

  function handleBack() {
    haptic("selection");
    router.push("/pedidos");
  }

  function handleWhatsapp() {
    haptic("light");
    const firstName = order.who.split(/\s+/)[0] ?? order.who;
    const text = encodeURIComponent(
      `Hola ${firstName}, soy de ${storeName}. Te escribo sobre tu pedido ${order.id}.`
    );
    const phone = order.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  }

  return (
    <div className="bg-td-bg min-h-dvh">
      <div className="mx-auto w-full max-w-3xl px-5 pt-4 pb-40 md:px-8 md:pt-6 lg:px-10 lg:pb-12">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Atrás"
            className="text-td-mute -ml-2 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none"
          >
            ‹
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-lg font-semibold lg:text-xl">
                {order.id}
              </h1>
              <span
                className="rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase"
                style={{ background: stateStyle.bg, color: stateStyle.color }}
              >
                {stateStyle.label}
              </span>
            </div>
            <div className="text-td-mute mt-0.5 text-xs">{order.time}</div>
          </div>
        </div>

        {/* Stepper */}
        <Stepper state={state} />

        {/* Cliente */}
        <section className="border-td-line mt-5 rounded-2xl border bg-white p-4">
          <div className="text-td-mute text-xs font-semibold tracking-[0.4px] uppercase">
            Cliente
          </div>
          <div className="mt-2 flex items-start gap-3">
            <div className="bg-td-line text-td-ink grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold">
              {initials(order.who)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base font-semibold">{order.who}</div>
              <div className="text-td-mute mt-0.5 text-sm">{order.phone}</div>
              {order.address && (
                <div className="text-td-mute mt-1 text-sm">{order.address}</div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleWhatsapp}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.99]"
            style={{ background: "#25D366" }}
          >
            <WaIcon size={16} style={{ color: "white" }} />
            Contactar por WhatsApp
          </button>
        </section>

        {/* Notas */}
        {order.notes && (
          <section className="mt-3 rounded-2xl border border-dashed border-[var(--td-line)] bg-white px-4 py-3">
            <div className="text-td-mute text-xs font-semibold tracking-[0.4px] uppercase">
              Nota del cliente
            </div>
            <p className="text-td-ink mt-1 text-sm leading-relaxed">
              "{order.notes}"
            </p>
          </section>
        )}

        {/* Productos */}
        <section className="mt-5">
          <div className="text-td-mute mb-2 text-xs font-semibold tracking-[0.4px] uppercase">
            Productos
          </div>
          <div className="border-td-line divide-td-line/70 divide-y rounded-2xl border bg-white">
            {order.lines.map((line, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="bg-td-line text-td-ink grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold">
                  {line.qty}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {line.name}
                  </div>
                  <div className="text-td-mute font-mono text-xs">
                    {formatPrice(line.price)} c/u
                  </div>
                </div>
                <div className="font-mono text-sm font-semibold">
                  {formatPrice(line.qty * line.price)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Totales */}
        <section className="mt-3">
          <div className="border-td-line rounded-2xl border bg-white px-4 py-4">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Pago" value={order.payment} mono={false} />
            <div className="border-td-line mt-3 flex items-center justify-between border-t pt-3">
              <span className="text-base font-semibold">Total</span>
              <span className="font-mono text-lg font-semibold">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </section>

        {/* Cancelar (sólo nuevo / preparando) */}
        {canCancel && (
          <section className="mt-6">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className={cn(
                "w-full rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-colors disabled:opacity-60",
                confirmCancel
                  ? "border-[#9C3F12] bg-[#FCE4D6] text-[#9C3F12]"
                  : "border-td-line text-td-mute hover:border-[#9C3F12] hover:text-[#9C3F12]"
              )}
            >
              {confirmCancel
                ? "Toca de nuevo para confirmar"
                : "Cancelar pedido"}
            </button>
          </section>
        )}
      </div>

      {/* Sticky bottom action */}
      {nextLabel && (
        <div className="bg-td-bg/95 border-td-line fixed right-0 bottom-0 left-0 border-t backdrop-blur lg:static lg:mx-auto lg:max-w-3xl lg:border-0 lg:bg-transparent lg:px-10 lg:pb-10 lg:backdrop-blur-none">
          <div className="mx-auto w-full max-w-3xl px-5 py-3 md:px-8 lg:px-0 lg:py-0">
            {error && (
              <p className="mb-2 text-center text-sm font-medium text-[#9C3F12]">
                {error}
              </p>
            )}
            <Button
              full
              size="lg"
              type="button"
              disabled={submitting}
              onClick={handleAdvance}
            >
              {submitting ? "Guardando…" : nextLabel}
              {!submitting &&
                (state === "camino" ? (
                  <CheckIcon size={16} />
                ) : (
                  <ArrowIcon size={16} />
                ))}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  mono = true,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className="text-td-mute">{label}</span>
      <span
        className={cn("text-td-ink font-medium", mono && "font-mono text-sm")}
      >
        {value}
      </span>
    </div>
  );
}

function Stepper({ state }: { state: OrderState }) {
  const currentIndex = isActive(state) ? ORDER_STATE_FLOW.indexOf(state) : -1;
  return (
    <div className="mt-5 flex items-center gap-1">
      {ORDER_STATE_FLOW.map((s, i) => {
        const reached = i <= currentIndex;
        const style = ORDER_STATE_STYLE[s];
        return (
          <div key={s} className="flex flex-1 items-center gap-1">
            <div
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                reached ? "" : "bg-td-line"
              )}
              style={reached ? { background: style.bg } : undefined}
            />
            <span
              className={cn(
                "text-[10px] font-semibold tracking-[0.3px] uppercase",
                reached ? "text-td-ink" : "text-td-mute"
              )}
            >
              {style.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function initials(name: string): string {
  const parts = name.replace(/\./g, "").trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}
