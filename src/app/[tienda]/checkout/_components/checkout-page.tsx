"use client";

import { useMemo, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { haptic } from "@/lib/haptics";
import { type Storefront } from "@/lib/mocks";
import { cn, formatPrice } from "@/lib/utils";

import { ArrowIcon } from "@/components/neni-icons";

type PaymentMethod = {
  id: "card" | "oxxo" | "spei" | "cash";
  title: string;
  sub: string;
  badge?: string;
  color: string;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "card",
    title: "Tarjeta",
    sub: "Visa, Mastercard, AMEX · Mercado Pago",
    color: "#1A1A1A",
  },
  {
    id: "oxxo",
    title: "OXXO",
    sub: "Paga en efectivo en cualquier OXXO",
    badge: "Popular",
    color: "#D8232A",
  },
  {
    id: "spei",
    title: "SPEI",
    sub: "Transferencia bancaria · sin comisión",
    color: "#2E5BFF",
  },
  {
    id: "cash",
    title: "Efectivo contra entrega",
    sub: "Paga al recibir",
    color: "#1FAA59",
  },
];

const PAYMENT_LABEL_FOR_CTA: Record<PaymentMethod["id"], string> = {
  card: "tarjeta",
  oxxo: "OXXO",
  spei: "SPEI",
  cash: "efectivo",
};

const PAYMENT_BADGES: Record<PaymentMethod["id"], string> = {
  card: "TC",
  oxxo: "OXX",
  spei: "SPI",
  cash: "$$",
};

export function CheckoutPage({ store }: { store: Storefront }) {
  const router = useRouter();
  const cart = useCart(store.slug);
  const [payment, setPayment] = useState<PaymentMethod["id"]>("card");
  const [submitting, setSubmitting] = useState(false);
  const [address] = useState({
    line: "Orizaba 114, Roma Nte.",
    detail: "Depto 3B · 30–45 min",
  });

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

  function handleSubmit() {
    if (submitting || lineItems.length === 0) return;
    haptic("medium");
    setSubmitting(true);
    const orderId = Date.now().toString().slice(-4);
    cart.clear();
    router.push(`/${store.slug}/pedido/${orderId}`);
  }

  function handleQty(productId: string, nextQty: number) {
    haptic("selection");
    cart.setQty(productId, nextQty);
  }

  function handleAdd(productId: string) {
    haptic("selection");
    cart.add(productId);
  }

  function handlePayment(id: PaymentMethod["id"]) {
    haptic("selection");
    setPayment(id);
  }

  if (cart.hydrated && lineItems.length === 0) {
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

          <Section title="Entrega">
            <button
              type="button"
              className="border-td-line hover:border-td-mute flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 text-left transition-colors"
            >
              <div className="bg-td-bg grid h-9 w-9 shrink-0 place-items-center rounded-xl text-base">
                📍
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{address.line}</div>
                <div className="text-td-mute text-xs">{address.detail}</div>
              </div>
              <span className="text-td-mute text-xs">Cambiar</span>
            </button>
          </Section>
        </div>

        <Section
          title="Método de pago"
          className="lg:sticky lg:top-6 lg:self-start"
        >
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map((method) => (
              <PayMethodRow
                key={method.id}
                method={method}
                selected={payment === method.id}
                onSelect={() => handlePayment(method.id)}
              />
            ))}
          </div>
        </Section>
      </div>

      <PayCta
        method={payment}
        total={total}
        disabled={submitting || lineItems.length === 0}
        onClick={handleSubmit}
      />
    </main>
  );
}

function Header({ store, count }: { store: Storefront; count: number }) {
  return (
    <header className="border-b-td-line border-b">
      <div className="mx-auto flex max-w-md items-center gap-3 px-5 pt-5 pb-4 md:max-w-3xl md:px-8 lg:max-w-5xl lg:px-10">
        <Link
          href={`/${store.slug}`}
          aria-label={`Regresar a ${store.name}`}
          className="text-td-mute hover:text-td-ink -ml-2 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none"
        >
          ‹
        </Link>
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
  method: PaymentMethod;
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
        {PAYMENT_BADGES[method.id]}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">{method.title}</div>
        <div className="text-td-mute mt-0.5 truncate text-[11.5px]">
          {method.sub}
        </div>
      </div>
      {method.badge && (
        <span className="bg-td-bg text-td-mute rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase">
          {method.badge}
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
  onClick,
}: {
  method: PaymentMethod["id"];
  total: number;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="fixed right-4 bottom-8 left-4 mx-auto max-w-md md:max-w-lg">
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
            Pagar con {PAYMENT_LABEL_FOR_CTA[method]}
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
