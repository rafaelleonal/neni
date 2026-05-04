import Link from "next/link";
import { HapticOnMount } from "@/lib/haptics";
import { type OrderState } from "@/lib/mocks";
import { type Storefront } from "@/lib/storefront";
import { cn, formatPrice } from "@/lib/utils";

import { CheckIcon } from "@/components/neni-icons";

export type TrackingOrder = {
  id: string;
  number: number;
  state: OrderState;
  total: string;
  customerName: string;
  notes: string | null;
  address: string | null;
  payment: string;
  createdAt: string;
  items: Array<{
    id: string;
    name: string;
    price: string;
    qty: number;
  }>;
};

type OrderTrackingPageProps = {
  store: Storefront;
  order: TrackingOrder;
};

const STATE_TITLES: Record<OrderState, string> = {
  nuevo: "Pedido recibido",
  preparando: "Preparando tu pedido",
  camino: "Va en camino",
  entregado: "Entregado",
  cancelado: "Pedido cancelado",
};

const STATE_SUBS: Record<OrderState, string> = {
  nuevo: "La tienda lo está revisando",
  preparando: "La tienda lo está preparando para ti",
  camino: "Tu pedido salió y llegará pronto",
  entregado: "¡Gracias por tu compra!",
  cancelado: "El pedido fue cancelado",
};

const TIMELINE_STEPS: Array<{ state: OrderState; title: string; sub: string }> =
  [
    { state: "nuevo", title: "Pedido recibido", sub: "La tienda lo confirmó" },
    {
      state: "preparando",
      title: "Preparando",
      sub: "La nena ya lo está armando",
    },
    { state: "camino", title: "En camino", sub: "Va para tu dirección" },
    { state: "entregado", title: "Entregado", sub: "Listo, ¡que lo disfrutes!" },
  ];

export function OrderTrackingPage({ store, order }: OrderTrackingPageProps) {
  const orderLabel = `#${order.number.toString().padStart(4, "0")}`;

  return (
    <main className="bg-td-bg min-h-dvh">
      <HapticOnMount pattern="success" />
      <Header store={store} orderLabel={orderLabel} />

      <div className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-4 pb-10 md:max-w-3xl md:px-8 lg:grid lg:max-w-5xl lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:px-10 lg:pt-6">
        <div className="flex flex-col gap-5">
          <Status order={order} />
          <Items order={order} />
          {order.notes && <NoteCard text={order.notes} />}
        </div>

        <div className="flex flex-col gap-4">
          <Timeline state={order.state} />
          <DetailsCard order={order} />
          <BackToStore store={store} />
        </div>
      </div>
    </main>
  );
}

function Header({
  store,
  orderLabel,
}: {
  store: Storefront;
  orderLabel: string;
}) {
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
          Pedido {orderLabel}
        </div>
        <div className="text-td-mute font-mono text-xs">{store.name}</div>
      </div>
    </header>
  );
}

function Status({ order }: { order: TrackingOrder }) {
  return (
    <div>
      <div className="text-td-mute text-xs tracking-[1.3px] uppercase">
        Tu pedido
      </div>
      <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.8px] md:text-3xl">
        {STATE_TITLES[order.state]}
      </h1>
      <div className="text-td-mute mt-1 text-[13.5px] md:text-sm">
        {STATE_SUBS[order.state]}
      </div>
    </div>
  );
}

function Items({ order }: { order: TrackingOrder }) {
  return (
    <div className="border-td-line rounded-2xl border bg-white">
      <div className="border-b-td-line border-b px-4 pt-3 pb-2.5">
        <div className="text-td-mute text-[11px] font-semibold tracking-[1.4px] uppercase">
          Productos
        </div>
      </div>
      <div className="divide-td-line/70 divide-y">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 px-4 py-3">
            <div className="bg-td-line text-td-ink grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold">
              {item.qty}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{item.name}</div>
              <div className="text-td-mute font-mono text-xs">
                {formatPrice(Number(item.price))} c/u
              </div>
            </div>
            <div className="font-mono text-sm font-semibold">
              {formatPrice(Number(item.price) * item.qty)}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-td-line flex items-center justify-between border-t px-4 py-3.5">
        <span className="text-base font-semibold">Total</span>
        <span className="font-mono text-lg font-semibold">
          {formatPrice(Number(order.total))}
        </span>
      </div>
    </div>
  );
}

function NoteCard({ text }: { text: string }) {
  return (
    <div className="border-td-line rounded-2xl border border-dashed bg-white px-4 py-3">
      <div className="text-td-mute text-[11px] font-semibold tracking-[1.4px] uppercase">
        Tu nota
      </div>
      <p className="text-td-ink mt-1 text-sm leading-relaxed">"{text}"</p>
    </div>
  );
}

function Timeline({ state }: { state: OrderState }) {
  // Si el pedido fue cancelado, mostramos un solo bloque rojo.
  if (state === "cancelado") {
    return (
      <div className="rounded-2xl border border-[#9C3F12] bg-[#FCE4D6] px-4 py-3 text-sm font-medium text-[#9C3F12]">
        Este pedido fue cancelado por la tienda.
      </div>
    );
  }

  const currentIndex = TIMELINE_STEPS.findIndex((s) => s.state === state);
  return (
    <div className="border-td-line rounded-2xl border bg-white px-4 py-2">
      {TIMELINE_STEPS.map((step, i) => {
        const last = i === TIMELINE_STEPS.length - 1;
        const done = i <= currentIndex;
        const active = i === currentIndex;
        return (
          <div
            key={step.state}
            className={cn(
              "flex items-start gap-3 py-3",
              !last && "border-b-td-line border-b"
            )}
          >
            <div
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                done ? "bg-td-accent" : "bg-td-line",
                active && "shadow-[0_0_0_4px_rgba(31,170,89,0.2)]"
              )}
            >
              {done && <CheckIcon size={12} stroke="#fff" sw={3} />}
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "text-[14.5px]",
                  active && "font-semibold",
                  done ? "text-td-ink" : "text-td-mute font-medium"
                )}
              >
                {step.title}
              </div>
              <div className="text-td-mute mt-0.5 text-xs">{step.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DetailsCard({ order }: { order: TrackingOrder }) {
  return (
    <div className="border-td-line rounded-2xl border bg-white">
      <div className="border-b-td-line border-b px-4 pt-3 pb-2.5">
        <div className="text-td-mute text-[11px] font-semibold tracking-[1.4px] uppercase">
          Detalles
        </div>
      </div>
      <Detail label="Cliente" value={order.customerName} />
      {order.address && <Detail label="Entrega" value={order.address} />}
      <Detail label="Pago" value={order.payment} last />
    </div>
  );
}

function Detail({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3",
        !last && "border-b-td-line border-b"
      )}
    >
      <div className="text-td-mute w-20 shrink-0 text-xs">{label}</div>
      <div className="text-td-ink flex-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function BackToStore({ store }: { store: Storefront }) {
  return (
    <Link
      href={`/${store.slug}`}
      className="border-td-line text-td-ink hover:bg-td-bg block rounded-2xl border bg-white px-4 py-3 text-center text-sm font-medium"
    >
      Volver a {store.name}
    </Link>
  );
}
