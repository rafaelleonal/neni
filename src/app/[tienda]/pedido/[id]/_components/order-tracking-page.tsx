import Link from "next/link";
import { HapticOnMount } from "@/lib/haptics";
import { TRACKING_STEPS, type Storefront } from "@/lib/mocks";
import { cn } from "@/lib/utils";

import { CheckIcon, PhoneIcon, WaIcon } from "@/components/neni-icons";

const COURIER = {
  name: "Ramón",
  role: "Repartidor",
  initial: "R",
  vehicle: "Moto",
  rating: 4.9,
  etaMinutes: 13,
};

type OrderTrackingPageProps = {
  store: Storefront;
  orderId: string;
};

export function OrderTrackingPage({ store, orderId }: OrderTrackingPageProps) {
  return (
    <main className="bg-td-bg min-h-dvh">
      <HapticOnMount pattern="success" />
      <Header store={store} orderId={orderId} />

      <div className="mx-auto flex max-w-md flex-col gap-5 px-5 pt-4 pb-10 md:max-w-3xl md:px-8 lg:grid lg:max-w-5xl lg:grid-cols-[1.2fr_1fr] lg:gap-6 lg:px-10 lg:pt-6">
        <div className="flex flex-col gap-5">
          <Map etaMinutes={COURIER.etaMinutes} />
          <Status courier={COURIER} />
        </div>

        <div className="flex flex-col gap-4">
          <Timeline />
          <CourierCard />
          <BackToStore store={store} />
        </div>
      </div>
    </main>
  );
}

function Header({ store, orderId }: { store: Storefront; orderId: string }) {
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
          Pedido #{orderId}
        </div>
        <div className="text-td-mute font-mono text-xs">{store.name}</div>
      </div>
    </header>
  );
}

function Map({ etaMinutes }: { etaMinutes: number }) {
  return (
    <div className="relative h-[240px] overflow-hidden rounded-[16px] bg-[#E9E3D4] md:h-[300px] lg:h-[360px]">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 360 240"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0"
        aria-hidden
      >
        <path d="M0 60 L360 80" stroke="#D6CCB6" strokeWidth="10" />
        <path d="M0 140 L360 160" stroke="#D6CCB6" strokeWidth="14" />
        <path d="M80 0 L100 240" stroke="#D6CCB6" strokeWidth="10" />
        <path d="M260 0 L240 240" stroke="#D6CCB6" strokeWidth="10" />
        <path
          d="M90 180 Q150 160 180 140 Q220 120 250 80"
          stroke="#141311"
          strokeWidth="3"
          strokeDasharray="4 4"
          fill="none"
        />
        <circle cx="250" cy="80" r="8" fill="#141311" />
        <circle cx="250" cy="80" r="3" fill="#FAF8F4" />
        <circle cx="90" cy="180" r="10" fill="var(--td-accent)" />
      </svg>
      <div className="bg-td-accent absolute top-[130px] left-[170px] grid h-9 w-9 place-items-center rounded-full border-[3px] border-white text-base shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
        🛵
      </div>
      <div className="absolute top-3 right-3 rounded-full bg-[rgba(20,19,17,0.92)] px-3 py-1.5 text-xs font-semibold text-white">
        Llega en <span className="text-td-accent">{etaMinutes} min</span>
      </div>
    </div>
  );
}

function Status({ courier }: { courier: typeof COURIER }) {
  return (
    <div>
      <div className="text-td-mute text-xs tracking-[1.3px] uppercase">
        Tu pedido
      </div>
      <h1 className="mt-1 text-[26px] font-semibold tracking-[-0.8px] md:text-3xl">
        Va en camino
      </h1>
      <div className="text-td-mute mt-1 text-[13.5px] md:text-sm">
        {courier.name} está a {courier.etaMinutes} min de tu ubicación
      </div>
    </div>
  );
}

function Timeline() {
  return (
    <div className="border-td-line rounded-2xl border bg-white px-4 py-2">
      {TRACKING_STEPS.map((step, i) => {
        const last = i === TRACKING_STEPS.length - 1;
        return (
          <div
            key={i}
            className={cn(
              "flex items-start gap-3 py-3",
              !last && "border-b-td-line border-b"
            )}
          >
            <div
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                step.done ? "bg-td-accent" : "bg-td-line",
                step.active && "shadow-[0_0_0_4px_rgba(31,170,89,0.2)]"
              )}
            >
              {step.done && <CheckIcon size={12} stroke="#fff" sw={3} />}
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "text-[14.5px]",
                  step.active && "font-semibold",
                  step.done ? "text-td-ink" : "text-td-mute font-medium"
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

function CourierCard() {
  return (
    <div className="border-td-line flex items-center gap-3 rounded-2xl border bg-white p-3.5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E9E3D4] font-mono text-sm font-semibold">
        {COURIER.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold">
          {COURIER.name} · {COURIER.role}
        </div>
        <div className="text-td-mute text-[11.5px]">
          {COURIER.vehicle} · ⭐ {COURIER.rating}
        </div>
      </div>
      <a
        href="#whatsapp"
        aria-label={`Escribir a ${COURIER.name} por WhatsApp`}
        className="bg-td-accent grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform active:scale-95"
      >
        <WaIcon size={18} />
      </a>
      <a
        href={`tel:+5215555555555`}
        aria-label={`Llamar a ${COURIER.name}`}
        className="bg-td-ink grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-transform active:scale-95"
      >
        <PhoneIcon size={16} />
      </a>
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
