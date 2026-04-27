import Link from "next/link";
import {
  DCArtboard,
  DCSection,
  DesignCanvas,
} from "@/components/design-canvas";
import { PhoneFrame } from "@/components/phone-frame";
import { NeniLogo, NeniMark } from "@/components/neni-logo";
import { LandingMobile } from "@/components/screens/landing-mobile";
import { LandingB } from "@/components/screens/landing-b";
import { LandingDesktop } from "@/components/screens/landing-desktop";
import { Onboarding } from "@/components/screens/onboarding";
import { Dashboard } from "@/components/screens/dashboard";
import { Editor } from "@/components/screens/editor";
import { WhatsApp } from "@/components/screens/whatsapp";
import { Store } from "@/components/screens/store";
import { Checkout } from "@/components/screens/checkout";
import { Tracking } from "@/components/screens/tracking";
import { Analytics } from "@/components/screens/analytics";
import {
  EMPTY_ORDERS,
  EMPTY_PRODUCTS,
  EmptyState,
} from "@/components/screens/empty-state";
import { Stories } from "@/components/screens/stories";

const LOGO_EXPLORATIONS = [
  { variant: "v1" as const, label: "Monograma sello", desc: "redondo, con carácter editorial" },
  { variant: "v2" as const, label: "n geométrica", desc: "pata + arco + pata · minimalista" },
  { variant: "v3" as const, label: "Wordmark editorial", desc: "sin icono forzado · solo tipografía" },
];

export default function ShowcasePage() {
  return (
    <main>
      <DesignCanvas title="Neni · Constructor de tiendas para México">
        <DCSection
          id="brand"
          title="Marca · Neni"
          subtitle="Tres direcciones de logo. Wordmark editorial (v3) es la dirección default — menos AI-feel, más elegante."
        >
          <DCArtboard label="3 direcciones">
            <div
              className="grid border border-td-line w-[960px] h-[420px] bg-[#FAF8F4] grid-cols-[1fr_1fr_1fr] rounded-[16px] overflow-hidden"
            >
              {LOGO_EXPLORATIONS.map((logo, i) => (
                <div
                  key={logo.variant}
                  className="flex flex-col items-start justify-between p-[28px]"
                  style={{
                    borderRight:
                      i < LOGO_EXPLORATIONS.length - 1
                        ? "1px solid #E8E3DA"
                        : "none",
                    background: logo.variant === "v3" ? "#fff" : "transparent",
                  }}
                >
                  <div
                    className="text-[10px] tracking-[1.2px] uppercase font-mono font-semibold"
                    style={{
                      color: logo.variant === "v3" ? "var(--td-accent)" : "#6B6760",
                    }}
                  >
                    {logo.variant}
                    {logo.variant === "v3" && " · activa"}
                  </div>
                  <div
                    className="grid place-items-center flex-1 w-full"
                  >
                    <NeniLogo size={80} variant={logo.variant} />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold tracking-[-0.3px]">
                      {logo.label}
                    </div>
                    <div className="text-[12px] text-[#6B6760] mt-[2px]">
                      {logo.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DCArtboard>

          <DCArtboard label="Activa · v3">
            <div
              className="flex flex-col items-center justify-center border border-td-line w-[520px] h-[520px] bg-[#FAF8F4] rounded-[16px] gap-[40px]"
            >
              <NeniLogo size={120} />
              <div className="h-px w-[280px] bg-[#E8E3DA]" />
              <div className="flex items-center gap-6">
                <NeniLogo size={56} />
                <NeniLogo size={36} />
                <NeniMark size={48} />
                <NeniMark size={32} />
              </div>
              <div className="text-[11px] text-[#6B6760] tracking-[0.6px] uppercase font-mono">
                wordmark · isotipo · marca compacta
              </div>
            </div>
          </DCArtboard>

          <DCArtboard label="Sobre fondo oscuro">
            <div
              className="flex flex-col items-center justify-center w-[520px] h-[520px] bg-[#141311] rounded-[16px] gap-[40px]"
            >
              <NeniLogo size={120} color="#FAF8F4" />
              <div className="h-px w-[280px] bg-[rgba(255,255,255,0.1)]" />
              <div className="flex items-center gap-6">
                <NeniMark size={48} bg="#FAF8F4" color="#141311" />
                <NeniMark size={48} bg="var(--td-accent)" color="#fff" accent="#fff" />
                <NeniMark size={48} bg="transparent" color="#FAF8F4" />
              </div>
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="landings"
          title="Landing · Desktop"
          subtitle="Vista web en 1440 con hero expresivo y elementos flotantes"
        >
          <DCArtboard label="Desktop · 1440">
            <div className="border border-td-line rounded-[16px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.15)]">
              <LandingDesktop />
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="landings-mobile"
          title="Landing · Mobile"
          subtitle="Dos variaciones: minimal warm y manifiesto oscuro"
        >
          <DCArtboard label="A · Minimal warm">
            <PhoneFrame>
              <LandingMobile />
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard label="B · Manifiesto oscuro">
            <PhoneFrame>
              <LandingB />
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="onboarding"
          title="Onboarding · 3 pasos"
          subtitle="Nombre → categoría → primer producto"
        >
          <DCArtboard label="Storyboard">
            <Onboarding />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="seller"
          title="Vendedor · App"
          subtitle="Dashboard, editor de productos y pedido en WhatsApp"
        >
          <DCArtboard label="Dashboard">
            <PhoneFrame>
              <Dashboard />
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard label="Editor de productos">
            <PhoneFrame>
              <Editor />
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard label="Pedido en WhatsApp">
            <PhoneFrame>
              <WhatsApp />
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="buyer"
          title="Comprador · Tienda, checkout y tracking"
          subtitle="Lo que ve el cliente final"
        >
          <DCArtboard label="Tienda">
            <PhoneFrame>
              <Store />
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard label="Checkout · OXXO/SPEI/Tarjeta">
            <PhoneFrame>
              <Checkout />
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard label="Tu pedido va en camino">
            <PhoneFrame>
              <Tracking />
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="analytics"
          title="Analíticas · Pensadas para vendedores informales"
          subtitle="Menos gráficas, más respuestas: qué vender más, qué reponer, cuándo vender"
        >
          <DCArtboard label="Mis números">
            <div className="border border-td-line rounded-[16px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(0,0,0,0.12)]">
              <Analytics />
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="empty"
          title="Empty states · Primera vez"
          subtitle="Cuando aún no hay productos o pedidos"
        >
          <DCArtboard label="Sin productos">
            <PhoneFrame>
              <EmptyState {...EMPTY_PRODUCTS} />
            </PhoneFrame>
          </DCArtboard>
          <DCArtboard label="Sin pedidos">
            <PhoneFrame>
              <EmptyState {...EMPTY_ORDERS} />
            </PhoneFrame>
          </DCArtboard>
        </DCSection>

        <DCSection
          id="social"
          title="Anuncios sociales · 9:16"
          subtitle="Material para Instagram y TikTok"
        >
          <DCArtboard label="Stories · 4 variaciones">
            <Stories />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <nav className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <Link
          href="/"
          className="rounded-full bg-td-ink px-4 py-2 text-xs font-medium text-td-bg shadow-lg hover:brightness-110"
        >
          ← Landing
        </Link>
      </nav>
    </main>
  );
}

export const metadata = {
  title: "Neni · Design canvas",
  description: "Todas las pantallas del producto Neni en un canvas",
};
