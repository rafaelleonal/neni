"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { haptic } from "@/lib/haptics";
import {
  PAYMENT_LIST,
  PAYMENTS,
  type PaymentId,
  type PaymentInfo,
} from "@/lib/payments";
import { type Storefront } from "@/lib/storefront";
import { cn, formatPhone, formatPrice } from "@/lib/utils";

import { BackButton } from "@/components/ui/back-button";
import { ArrowIcon } from "@/components/neni-icons";

export function CheckoutPage({ store }: { store: Storefront }) {
  const router = useRouter();
  const cart = useCart(store.slug);

  // Sólo mostramos métodos que la tienda tiene activados.
  const availableMethods = useMemo(
    () => PAYMENT_LIST.filter((m) => store.payments.includes(m.id)),
    [store.payments]
  );
  const defaultPayment = availableMethods[0]?.id ?? "cash";

  const [payment, setPayment] = useState<PaymentId>(defaultPayment);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [locationLink, setLocationLink] = useState("");
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [notes, setNotes] = useState("");
  const [acceptedLegal, setAcceptedLegal] = useState(false);

  const phoneDigits = phoneRaw.replace(/\D/g, "").slice(0, 10);
  const phoneValid = phoneDigits.length === 10;
  const nameValid = name.trim().length > 0;
  const addressValid = addressLine.trim().length > 0;
  const formValid =
    nameValid && phoneValid && addressValid && acceptedLegal;

  const lineItems = useMemo(() => {
    return cart.items
      .map((item) => {
        const product = store.products.find((p) => p.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
  }, [cart.items, store.products]);

  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;
  const totalCount = lineItems.reduce((sum, item) => sum + item.qty, 0);

  async function handleSubmit() {
    if (submitting || lineItems.length === 0 || !formValid) return;
    haptic("medium");
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storeSlug: store.slug,
        customerName: name.trim(),
        customerPhone: `+521${phoneDigits}`,
        address: addressLine.trim(),
        locationLink: locationLink.trim() || null,
        notes: notes.trim() || null,
        payment,
        items: lineItems.map((item) => ({
          productId: item.productId,
          qty: item.qty,
        })),
      }),
    });
    if (!res.ok) {
      setSubmitting(false);
      haptic("error");
      setError("No pudimos crear el pedido. Intenta de nuevo.");
      return;
    }
    const json = (await res.json()) as { ok: true; orderId: string };
    cart.clear();
    router.push(`/${store.slug}/pedido/${json.orderId}`);
  }

  function handleShareLocation() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("error");
      return;
    }
    haptic("selection");
    setLocationStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        setLocationLink(link);
        setLocationStatus("ok");
        haptic("success");
      },
      () => {
        setLocationStatus("error");
        haptic("error");
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 }
    );
  }

  function handleQty(productId: string, nextQty: number) {
    haptic("selection");
    cart.setQty(productId, nextQty);
  }

  function handleAdd(productId: string) {
    haptic("selection");
    cart.add(productId);
  }

  function handlePayment(id: PaymentId) {
    haptic("selection");
    setPayment(id);
  }

  // Mientras estamos creando el pedido (o navegando al tracking), no mostramos
  // el empty-cart aunque el cart ya se haya limpiado — evita el flash.
  if (cart.hydrated && lineItems.length === 0 && !submitting) {
    return <EmptyCart store={store} />;
  }

  return (
    <main className="bg-td-bg min-h-dvh pb-32">
      <Header store={store} count={totalCount} />

      <div className="mx-auto grid max-w-md gap-4 px-5 pt-6 pb-6 md:max-w-3xl md:px-8 lg:max-w-5xl lg:grid-cols-[1fr_360px] lg:px-10 lg:pt-8">
        <div className="flex flex-col gap-4">
          <Section title="Tu pedido">
            <div className="border-td-line flex flex-col gap-2.5 rounded-2xl border bg-white p-4">
              {lineItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <button
                    type="button"
                    aria-label={`Quitar 1 ${item.product.name}`}
                    onClick={() => handleQty(item.productId, item.qty - 1)}
                    className="border-td-line text-td-mute hover:text-td-ink hover:bg-td-bg grid h-7 w-7 shrink-0 place-items-center rounded-full border text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="text-td-ink w-6 text-center font-mono">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Agregar 1 ${item.product.name}`}
                    onClick={() => handleAdd(item.productId)}
                    className="border-td-line text-td-mute hover:text-td-ink hover:bg-td-bg grid h-7 w-7 shrink-0 place-items-center rounded-full border text-lg leading-none"
                  >
                    +
                  </button>
                  <span className="flex-1 truncate">{item.product.name}</span>
                  <span className="font-mono">
                    {formatPrice(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
              <div className="bg-td-line my-1 h-px" />
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow
                label="Envío"
                value={shipping === 0 ? "Gratis" : formatPrice(shipping)}
              />
              <div className="mt-1 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
            </div>
          </Section>

          <Section title="Tus datos">
            <div className="border-td-line flex flex-col gap-3 rounded-2xl border bg-white p-4">
              <Field label="Nombre">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sofía Pérez"
                  maxLength={60}
                  autoComplete="name"
                  className="border-td-line focus:border-td-ink w-full rounded-xl border bg-white px-3 py-2.5 text-sm transition-colors outline-none"
                />
              </Field>
              <Field label="WhatsApp">
                <div className="border-td-line focus-within:border-td-ink flex items-center gap-2 rounded-xl border bg-white px-3 py-2.5 transition-colors">
                  <span className="border-td-line flex items-center gap-1.5 border-r pr-2">
                    <span aria-hidden className="text-base leading-none">
                      🇲🇽
                    </span>
                    <span className="font-mono text-sm">+52</span>
                  </span>
                  <input
                    value={formatPhone(phoneDigits)}
                    onChange={(e) => setPhoneRaw(e.target.value)}
                    placeholder="55 1234 5678"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </Field>
              <Field label="Dirección de entrega">
                <textarea
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Calle, número, colonia, referencia"
                  maxLength={160}
                  rows={2}
                  autoComplete="street-address"
                  className="border-td-line focus:border-td-ink w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm leading-snug transition-colors outline-none"
                />
              </Field>
              <LocationField
                value={locationLink}
                onChange={(v) => {
                  setLocationLink(v);
                  setLocationStatus(v ? "ok" : "idle");
                }}
                status={locationStatus}
                onShare={handleShareLocation}
              />
              <Field label="Notas (opcional)">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Sin cebolla, tocar timbre, etc."
                  maxLength={240}
                  rows={2}
                  className="border-td-line focus:border-td-ink w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm leading-snug transition-colors outline-none"
                />
              </Field>
            </div>
          </Section>
        </div>

        <Section
          title="Método de pago"
          className="lg:sticky lg:top-6 lg:self-start"
        >
          <div className="flex flex-col gap-2">
            {availableMethods.map((method) => (
              <PayMethodRow
                key={method.id}
                method={method}
                selected={payment === method.id}
                onSelect={() => handlePayment(method.id)}
              />
            ))}
            {availableMethods.length === 1 && (
              <p className="text-td-mute mt-1 px-1 text-[11px]">
                Esta tienda sólo acepta este método por ahora.
              </p>
            )}
          </div>

          <label className="text-td-mute mt-4 flex cursor-pointer items-start gap-2.5 text-[11.5px] leading-snug">
            <input
              type="checkbox"
              checked={acceptedLegal}
              onChange={(e) => setAcceptedLegal(e.target.checked)}
              className="border-td-line accent-td-ink mt-0.5 h-4 w-4 shrink-0 rounded"
            />
            <span>
              Acepto que {store.name} use mis datos para procesar este pedido.
              Más info en el{" "}
              <Link
                href="/privacidad"
                target="_blank"
                className="text-td-ink font-medium underline-offset-4 hover:underline"
              >
                Aviso de privacidad
              </Link>
              .
            </span>
          </label>
        </Section>
      </div>

      <PayCta
        method={payment}
        total={total}
        disabled={submitting || lineItems.length === 0 || !formValid}
        submitting={submitting}
        error={error}
        onClick={handleSubmit}
      />
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-td-mute mb-1 block text-[11px] font-semibold tracking-[0.4px] uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function LocationField({
  value,
  onChange,
  status,
  onShare,
}: {
  value: string;
  onChange: (v: string) => void;
  status: "idle" | "loading" | "ok" | "error";
  onShare: () => void;
}) {
  return (
    <div className="block">
      <span className="text-td-mute mb-1 block text-[11px] font-semibold tracking-[0.4px] uppercase">
        Ubicación (opcional)
      </span>
      <div className="flex flex-col gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Pega un link de Google Maps o usa el botón"
          inputMode="url"
          className="border-td-line focus:border-td-ink w-full rounded-xl border bg-white px-3 py-2.5 text-sm transition-colors outline-none"
        />
        <button
          type="button"
          onClick={onShare}
          disabled={status === "loading"}
          className={cn(
            "flex items-center justify-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-medium transition-colors",
            status === "ok"
              ? "border-td-accent bg-td-accent/10 text-td-ink"
              : status === "error"
                ? "border-[#9C3F12] bg-[#FCE4D6] text-[#9C3F12]"
                : "border-td-line text-td-ink hover:bg-td-bg bg-white"
          )}
        >
          <span aria-hidden>📍</span>
          {status === "loading"
            ? "Obteniendo ubicación…"
            : status === "ok"
              ? "Ubicación compartida"
              : status === "error"
                ? "No pudimos obtener la ubicación"
                : "Compartir mi ubicación"}
        </button>
        <p className="text-td-mute text-[11px] leading-snug">
          Ayuda a la tienda a encontrarte más rápido. Puedes usar el botón o
          pegar un link de Google Maps.
        </p>
      </div>
    </div>
  );
}

function Header({ store, count }: { store: Storefront; count: number }) {
  return (
    <header className="border-b-td-line border-b">
      <div className="mx-auto flex max-w-md items-center gap-3 px-5 pt-5 pb-4 md:max-w-3xl md:px-8 lg:max-w-5xl lg:px-10">
        <BackButton href={`/${store.slug}`} ariaLabel={`Regresar a ${store.name}`} />
        <div className="flex-1 text-base font-semibold lg:text-lg">
          Confirmar pedido
        </div>
        {count > 0 && (
          <div className="text-td-mute font-mono text-xs">
            {count} {count === 1 ? "item" : "items"}
          </div>
        )}
      </div>
    </header>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="text-td-mute mb-2.5 text-[11px] font-semibold tracking-[1.4px] uppercase">
        {title}
      </div>
      {children}
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-td-mute flex justify-between text-[12.5px]">
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function PayMethodRow({
  method,
  selected,
  onSelect,
}: {
  method: PaymentInfo;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      className={cn(
        "flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 text-left transition-colors",
        selected ? "border-td-ink border-2" : "border-td-line border"
      )}
    >
      <div
        className="grid h-8 w-11 shrink-0 place-items-center rounded-md font-mono text-[11px] font-bold tracking-[0.5px] text-white"
        style={{ background: method.color }}
      >
        {method.badge}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{method.label}</div>
        <div className="text-td-mute mt-0.5 truncate text-[11.5px]">
          {method.sub}
        </div>
      </div>
      {method.highlight && (
        <span className="bg-td-bg text-td-mute rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase">
          {method.highlight}
        </span>
      )}
      <span
        className={cn(
          "relative grid h-[18px] w-[18px] place-items-center rounded-full border-2",
          selected ? "border-td-ink bg-td-ink" : "border-td-line bg-white"
        )}
      >
        {selected && (
          <span className="bg-td-bg absolute inset-1 rounded-full" />
        )}
      </span>
    </button>
  );
}

function PayCta({
  method,
  total,
  disabled,
  submitting,
  error,
  onClick,
}: {
  method: PaymentId;
  total: number;
  disabled: boolean;
  submitting: boolean;
  error: string | null;
  onClick: () => void;
}) {
  return (
    <div className="fixed right-4 bottom-8 left-4 mx-auto max-w-md md:max-w-lg">
      {error && (
        <p className="mb-2 rounded-xl bg-[#FCE4D6] px-3 py-2 text-center text-sm font-medium text-[#9C3F12]">
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "bg-td-ink text-td-bg flex w-full items-center gap-3 rounded-2xl px-4 py-4 transition-transform active:scale-[0.99]",
          disabled && "opacity-60"
        )}
      >
        <div className="flex-1 text-left">
          <div className="text-[11px] tracking-[0.4px] uppercase opacity-60">
            {submitting
              ? "Creando pedido…"
              : `Pagar con ${PAYMENTS[method].shortLabel}`}
          </div>
          <div className="font-mono text-[17px] font-semibold">
            {formatPrice(total)}
          </div>
        </div>
        <ArrowIcon size={18} stroke="var(--td-bg)" />
      </button>
    </div>
  );
}

function EmptyCart({ store }: { store: Storefront }) {
  return (
    <main className="bg-td-bg flex min-h-dvh flex-col">
      <Header store={store} count={0} />
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-5 py-12 text-center">
        <div className="text-4xl">🛒</div>
        <h1 className="text-xl font-semibold">Tu carrito está vacío</h1>
        <p className="text-td-mute max-w-xs text-sm">
          Agrega productos desde la tienda y los verás aquí.
        </p>
        <Link
          href={`/${store.slug}`}
          className="bg-td-ink text-td-bg mt-2 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
        >
          Volver a la tienda <ArrowIcon size={14} stroke="var(--td-bg)" />
        </Link>
      </div>
    </main>
  );
}
