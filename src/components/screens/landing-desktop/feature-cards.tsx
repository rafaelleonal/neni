import { CardIcon, LinkIcon, WaIcon } from "@/components/neni-icons";

export function FeatureCards() {
  return (
    <div className="px-6 pb-12 md:px-12 md:pb-16 lg:px-[72px] lg:pb-[80px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="bg-td-accent relative min-h-[400px] overflow-hidden rounded-3xl p-8 text-white md:col-span-2 md:min-h-[360px] lg:col-span-1 lg:rounded-[24px] lg:p-[32px]">
          <WaIcon size={48} />
          <div className="mt-6 max-w-[360px] text-3xl leading-[1.05] font-semibold tracking-[-1.2px] md:text-4xl lg:text-[36px]">
            Cada pedido llega a tu WhatsApp.
          </div>
          <div className="mt-3 max-w-[360px] text-[14px] leading-[1.5] opacity-90">
            Con el ticket, la dirección y el método de pago. Un botón para
            aceptar, otro para marcar en camino.
          </div>
          <div className="text-td-ink absolute right-6 bottom-6 w-[200px] rotate-[3deg] rounded-[12px] bg-white p-3 text-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] md:w-[240px]">
            <div className="text-td-accent text-[9px] font-bold tracking-[0.4px] uppercase">
              Pedido #4821
            </div>
            <div className="mt-0.5 font-semibold">Marisol Hernández</div>
            <div className="text-td-mute mt-1.5 font-mono text-[10px]">
              3 productos · $200.00
            </div>
            <div className="mt-2 flex gap-1">
              <div className="bg-td-accent flex-1 rounded-[4px] p-1 text-center text-[10px] font-semibold text-white">
                Aceptar
              </div>
              <div className="rounded-[4px] bg-[#F0F0F0] px-2 py-1 text-[10px]">
                ✕
              </div>
            </div>
          </div>
        </div>

        <div className="border-td-line flex min-h-[280px] flex-col rounded-3xl border bg-white p-7 md:min-h-0 lg:rounded-[24px] lg:p-[28px]">
          <CardIcon size={36} />
          <div className="mt-5 text-xl leading-[1.15] font-semibold tracking-[-0.6px] md:text-2xl lg:text-[22px]">
            OXXO, SPEI, tarjeta y efectivo.
          </div>
          <div className="text-td-mute mt-2.5 text-[13px] leading-[1.5]">
            Conecta Mercado Pago, Stripe o Conekta en un clic. Sin comisión en
            efectivo.
          </div>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {["Mercado Pago", "Stripe", "Conekta", "Clip"].map((x) => (
              <div
                key={x}
                className="bg-td-bg border-td-line text-td-mute rounded-full border px-2.5 py-1 font-mono text-[11px]"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-td-ink text-td-bg flex min-h-[280px] flex-col rounded-3xl p-7 md:min-h-0 lg:rounded-[24px] lg:p-[28px]">
          <LinkIcon size={36} />
          <div className="mt-5 text-xl leading-[1.15] font-semibold tracking-[-0.6px] md:text-2xl lg:text-[22px]">
            Tu propio link para compartir.
          </div>
          <div className="mt-2.5 text-[13px] leading-[1.5] opacity-70">
            Ponlo en tu bio de Instagram, en tu WhatsApp Business o imprímelo en
            una tarjeta.
          </div>
          <div className="mt-auto pt-6">
            <div className="rounded-[10px] border border-dashed border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.08)] px-3.5 py-2.5 font-mono text-[13px]">
              neni.mx/
              <b className="text-td-accent">mitienda</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
