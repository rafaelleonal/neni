"use client";

import { useState } from "react";

import Link from "next/link";
import { haptic } from "@/lib/haptics";
import { getStorefront } from "@/lib/mocks";
import { cn } from "@/lib/utils";

import {
  ArrowIcon,
  CheckIcon,
  LinkIcon,
  WaIcon,
} from "@/components/neni-icons";

const SELLER_SLUG = "tacosdonmemo";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Tarjeta",
    sub: "Visa, Mastercard, AMEX · Mercado Pago",
  },
  { id: "oxxo", label: "OXXO", sub: "Pago en efectivo en cualquier tienda" },
  { id: "spei", label: "SPEI", sub: "Transferencia bancaria sin comisión" },
  { id: "cash", label: "Efectivo contra entrega", sub: "Cobras al entregar" },
];

export default function TiendaPage() {
  const store = getStorefront(SELLER_SLUG);
  const [open, setOpen] = useState(true);
  const [payments, setPayments] = useState<Record<string, boolean>>({
    card: true,
    oxxo: true,
    spei: true,
    cash: true,
  });

  if (!store) return null;

  function togglePayment(id: string) {
    haptic("selection");
    setPayments((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleOpen() {
    haptic("selection");
    setOpen(!open);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-8 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <header className="mb-6">
        <h1 className="text-xl font-semibold lg:text-2xl">Mi tienda</h1>
        <div className="text-td-mute mt-0.5 text-xs lg:text-sm">
          Lo que ven tus clientes
        </div>
      </header>

      <PublicLink slug={store.slug} name={store.name} />
      <StatusCard open={open} onToggle={toggleOpen} />

      <SettingsCard title="Información">
        <Row label="Nombre" value={store.name} />
        <Row label="Descripción" value={store.description} />
        <Row label="Ubicación" value={store.location} />
        <Row
          label="Iniciales"
          value={store.initials}
          subValue="Se muestran cuando no tienes logo"
          last
        />
      </SettingsCard>

      <SettingsCard
        title="Categorías"
        subtitle="Las que ven tus clientes al filtrar"
      >
        <div className="flex flex-wrap gap-1.5 px-4 pt-3 pb-4">
          {store.categories.map((c) => (
            <span
              key={c}
              className="border-td-line text-td-ink rounded-full border bg-white px-3 py-1 text-[13px] font-medium"
            >
              {c}
            </span>
          ))}
          <button
            type="button"
            className="text-td-mute hover:text-td-ink border-td-line rounded-full border border-dashed px-3 py-1 text-[13px] font-medium"
          >
            + agregar
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Métodos de pago"
        subtitle="Activa los que quieras aceptar"
      >
        {PAYMENT_METHODS.map((m, i) => (
          <PaymentRow
            key={m.id}
            label={m.label}
            sub={m.sub}
            enabled={payments[m.id]}
            onToggle={() => togglePayment(m.id)}
            last={i === PAYMENT_METHODS.length - 1}
          />
        ))}
      </SettingsCard>

      {store.promo && (
        <SettingsCard
          title="Promo activa"
          subtitle="Banner principal de tu tienda"
        >
          <div className="px-4 pt-3 pb-4">
            <div
              className="relative overflow-hidden rounded-xl px-4 py-5 text-white"
              style={{ background: store.promo.gradient }}
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,_transparent_0_18px,_rgba(255,255,255,0.08)_18px_36px)]" />
              <div className="relative">
                <div className="text-[10px] font-semibold tracking-[1.2px] uppercase opacity-85">
                  {store.promo.label}
                </div>
                <div className="mt-1 text-lg leading-tight font-semibold">
                  {store.promo.title}
                </div>
                <div className="text-td-ink mt-2 inline-block rounded-full bg-white px-2.5 py-1 font-mono text-[11px] font-bold">
                  {store.promo.code}
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="border-td-line text-td-ink hover:bg-td-bg flex-1 rounded-xl border bg-white px-3 py-2 text-sm font-medium"
              >
                Editar
              </button>
              <button
                type="button"
                className="text-td-mute hover:text-td-ink hover:border-td-mute border-td-line flex-1 rounded-xl border bg-white px-3 py-2 text-sm font-medium"
              >
                Quitar
              </button>
            </div>
          </div>
        </SettingsCard>
      )}
    </div>
  );
}

function PublicLink({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="bg-td-ink text-td-bg mb-4 flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="bg-td-accent grid h-10 w-10 shrink-0 place-items-center rounded-xl">
          <LinkIcon size={18} stroke="#fff" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold tracking-[1.2px] uppercase opacity-60">
            Tu link público
          </div>
          <div className="truncate font-mono text-sm">
            neni.mx/<span className="text-td-accent font-bold">{slug}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver tienda de ${name}`}
          className="text-td-bg flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15 sm:flex-none"
        >
          Ver tienda <ArrowIcon size={14} stroke="currentColor" />
        </Link>
        <button
          type="button"
          aria-label="Compartir por WhatsApp"
          className="bg-td-accent flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-white sm:flex-none"
        >
          <WaIcon size={14} /> Compartir
        </button>
      </div>
    </div>
  );
}

function StatusCard({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-td-line mb-4 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5">
      <div
        className={cn(
          "h-2.5 w-2.5 rounded-full transition-colors",
          open
            ? "bg-td-accent shadow-[0_0_0_3px_rgba(31,170,89,0.18)]"
            : "bg-td-mute"
        )}
      />
      <div className="flex-1">
        <div className="text-sm font-semibold">
          {open ? "Tu tienda está abierta" : "Tu tienda está cerrada"}
        </div>
        <div className="text-td-mute text-xs">
          {open
            ? "Los clientes pueden hacer pedidos"
            : "Nadie puede hacer pedidos hasta que la abras"}
        </div>
      </div>
      <Toggle pressed={open} onToggle={onToggle} />
    </div>
  );
}

function SettingsCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-td-line mb-4 rounded-2xl border bg-white">
      <header className="border-b-td-line border-b px-4 pt-4 pb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && <p className="text-td-mute mt-0.5 text-xs">{subtitle}</p>}
      </header>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function Row({
  label,
  value,
  subValue,
  last,
}: {
  label: string;
  value: string;
  subValue?: string;
  last?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "hover:bg-td-bg flex items-center gap-3 px-4 py-3 text-left transition-colors",
        !last && "border-b-td-line border-b"
      )}
    >
      <div className="flex-1">
        <div className="text-td-mute text-xs">{label}</div>
        <div className="mt-0.5 text-sm font-medium">{value}</div>
        {subValue && (
          <div className="text-td-mute mt-0.5 text-[11px]">{subValue}</div>
        )}
      </div>
      <ArrowIcon size={14} stroke="var(--td-mute)" />
    </button>
  );
}

function PaymentRow({
  label,
  sub,
  enabled,
  onToggle,
  last,
}: {
  label: string;
  sub: string;
  enabled: boolean;
  onToggle: () => void;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        !last && "border-b-td-line border-b"
      )}
    >
      <div
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors",
          enabled ? "bg-td-accent text-white" : "bg-td-line text-td-mute"
        )}
      >
        <CheckIcon size={14} stroke="currentColor" sw={2.4} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-td-mute mt-0.5 truncate text-xs">{sub}</div>
      </div>
      <Toggle pressed={enabled} onToggle={onToggle} />
    </div>
  );
}

function Toggle({
  pressed,
  onToggle,
}: {
  pressed: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={onToggle}
      className={cn(
        "relative h-6 w-10 shrink-0 rounded-full transition-colors",
        pressed ? "bg-td-accent" : "bg-td-line"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left]",
          pressed ? "left-[18px]" : "left-0.5"
        )}
      />
    </button>
  );
}
