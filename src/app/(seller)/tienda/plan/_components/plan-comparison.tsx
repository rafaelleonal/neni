"use client";

import { useState } from "react";

import { haptic } from "@/lib/haptics";
import { PLAN_LIST, type PlanId } from "@/lib/plans";
import { cn } from "@/lib/utils";

import { BackButton } from "@/components/ui/back-button";
import { ArrowIcon, CheckIcon } from "@/components/neni-icons";

type Billing = "monthly" | "yearly";

export function PlanComparison({ currentPlan }: { currentPlan: PlanId }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  function handleSelectPlan(planId: PlanId) {
    haptic("medium");
    if (planId === currentPlan) return;
    if (planId === "pro") {
      alert(
        "Pronto podrás cambiar a Pro. Estamos terminando la integración con tu método de pago."
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-4 pb-12 md:px-8 md:pt-6 lg:px-10">
      <div className="flex items-center gap-2">
        <BackButton href="/tienda" />
        <h1 className="flex-1 text-lg font-semibold lg:text-xl">Tu plan</h1>
      </div>

      <header className="mt-6">
        <h2 className="text-2xl font-semibold tracking-[-0.6px] md:text-3xl">
          Crece a tu ritmo
        </h2>
        <p className="text-td-mute mt-1 max-w-md text-sm leading-relaxed">
          Empieza gratis. Cuando estés vendiendo más, pasa a Pro y quita los
          límites.
        </p>
      </header>

      <div className="mt-5 inline-flex rounded-full border border-[var(--td-line)] bg-white p-1 text-xs font-semibold">
        <button
          type="button"
          onClick={() => {
            haptic("selection");
            setBilling("monthly");
          }}
          className={cn(
            "rounded-full px-3.5 py-1.5 transition-colors",
            billing === "monthly"
              ? "bg-td-ink text-td-bg"
              : "text-td-mute hover:text-td-ink"
          )}
        >
          Mensual
        </button>
        <button
          type="button"
          onClick={() => {
            haptic("selection");
            setBilling("yearly");
          }}
          className={cn(
            "rounded-full px-3.5 py-1.5 transition-colors",
            billing === "yearly"
              ? "bg-td-ink text-td-bg"
              : "text-td-mute hover:text-td-ink"
          )}
        >
          Anual <span className="text-td-accent ml-1">-2 meses</span>
        </button>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2 lg:gap-4">
        {PLAN_LIST.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            isCurrent={plan.id === currentPlan}
            onSelect={() => handleSelectPlan(plan.id)}
          />
        ))}
      </div>

      <FaqList />
    </div>
  );
}

function PlanCard({
  plan,
  billing,
  isCurrent,
  onSelect,
}: {
  plan: (typeof PLAN_LIST)[number];
  billing: Billing;
  isCurrent: boolean;
  onSelect: () => void;
}) {
  const yearly = billing === "yearly" && plan.priceMxnYear !== null;
  const displayPrice = yearly
    ? Math.round(plan.priceMxnYear! / 12)
    : plan.priceMxn;
  const showSavings = yearly && plan.priceMxnYear !== null && plan.priceMxn > 0;
  const savings = showSavings ? plan.priceMxn * 12 - plan.priceMxnYear! : 0;

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-3xl border-2 bg-white p-5 md:p-6",
        plan.highlight ? "border-td-ink" : "border-td-line"
      )}
    >
      {plan.highlight && (
        <span className="bg-td-accent absolute top-4 right-4 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] text-white uppercase">
          Recomendado
        </span>
      )}

      <div className="text-td-mute text-[11px] font-semibold tracking-[1.2px] uppercase">
        {plan.name}
      </div>

      <div className="mt-1 text-[22px] font-semibold tracking-[-0.5px]">
        {plan.tagline}
      </div>

      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-mono text-3xl font-semibold tracking-[-1px] md:text-4xl">
          ${displayPrice}
        </span>
        <span className="text-td-mute text-sm">
          {plan.priceMxn === 0 ? "siempre" : "/ mes"}
        </span>
      </div>
      {plan.priceMxn > 0 && (
        <div className="text-td-mute mt-1 text-xs">
          {yearly
            ? `Pagas $${plan.priceMxnYear} al año · ahorras $${savings}`
            : "MXN, IVA incluido. Cancela cuando quieras."}
        </div>
      )}
      {plan.priceMxn === 0 && (
        <div className="text-td-mute mt-1 text-xs">
          Sin tarjeta. Sin trampa.
        </div>
      )}

      <div className="text-td-ink mt-5 text-[11px] font-semibold tracking-[1px] uppercase">
        Comisión por pago en línea
      </div>
      <div className="mt-1 font-mono text-lg font-semibold">
        {plan.onlineCommissionPct}%{" "}
        <span className="text-td-mute text-xs font-normal">
          (efectivo siempre 0%)
        </span>
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm">
            <span className="bg-td-accent/15 text-td-accent mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
              <CheckIcon size={11} stroke="currentColor" sw={3} />
            </span>
            <span className="text-td-ink leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button
          type="button"
          onClick={onSelect}
          disabled={isCurrent}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform select-none active:scale-[0.99]",
            isCurrent
              ? "bg-td-bg text-td-mute cursor-default"
              : plan.highlight
                ? "bg-td-ink text-td-bg hover:brightness-110"
                : "border-td-line text-td-ink hover:bg-td-bg border bg-white"
          )}
        >
          {isCurrent ? "Plan actual" : plan.cta}
          {!isCurrent && <ArrowIcon size={14} />}
        </button>
      </div>
    </div>
  );
}

const FAQS: { q: string; a: string }[] = [
  {
    q: "¿Hay periodo de prueba?",
    a: "El plan Empezando es gratis para siempre. Si quieres probar Pro, lo puedes cancelar en cualquier momento — solo cobramos los días que lo usaste.",
  },
  {
    q: "¿Cuándo me conviene Pro?",
    a: "Si quieres que tus clientes reciban automáticamente avisos por WhatsApp cuando su pedido va en camino o se entrega — en gratis ese mensaje lo mandas tú a mano. También cuando vendas más de $8,500 al mes en pagos online: la comisión más baja te cubre el costo del plan.",
  },
  {
    q: "¿Puedo cambiar entre planes?",
    a: "Sí, cuando quieras. Si bajas a Empezando, mantienes tus productos y pedidos pero los nuevos no podrán pasar de los límites del plan.",
  },
  {
    q: "¿Qué pasa con mi info si cancelo?",
    a: "Tu tienda y tus pedidos siguen siendo tuyos. Te damos 90 días para exportar todo si quieres irte.",
  },
];

function FaqList() {
  return (
    <section className="mt-10">
      <h3 className="mb-3 text-base font-semibold lg:text-lg">
        Preguntas frecuentes
      </h3>
      <div className="border-td-line divide-td-line/70 divide-y rounded-2xl border bg-white">
        {FAQS.map((f) => (
          <details key={f.q} className="group px-4 py-3">
            <summary className="flex cursor-pointer items-center gap-3 text-sm font-medium">
              <span className="flex-1">{f.q}</span>
              <span className="text-td-mute transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="text-td-mute mt-2 pr-6 text-sm leading-relaxed">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
