import { CardIcon, LinkIcon, WaIcon } from "@/components/neni-icons";

export function FeatureCards() {
  return (
    <div className="px-6 md:px-12 lg:px-[72px] pb-12 md:pb-16 lg:pb-[80px]">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="md:col-span-2 lg:col-span-1 bg-td-accent text-white rounded-3xl lg:rounded-[24px] p-8 lg:p-[32px] relative overflow-hidden min-h-[400px] md:min-h-[360px]">
          <WaIcon size={48} />
          <div className="text-3xl md:text-4xl lg:text-[36px] font-semibold mt-6 leading-[1.05] tracking-[-1.2px] max-w-[360px]">
            Cada pedido llega a tu WhatsApp.
          </div>
          <div className="text-[14px] opacity-90 mt-3 max-w-[360px] leading-[1.5]">
            Con el ticket, la dirección y el método de pago. Un botón para
            aceptar, otro para marcar en camino.
          </div>
          <div className="text-td-ink absolute bottom-6 right-6 w-[200px] md:w-[240px] bg-white rounded-[12px] p-3 text-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] rotate-[3deg]">
            <div className="text-td-accent font-bold text-[9px] tracking-[0.4px] uppercase">
              Pedido #4821
            </div>
            <div className="font-semibold mt-0.5">Marisol Hernández</div>
            <div className="text-td-mute font-mono mt-1.5 text-[10px]">
              3 productos · $200.00
            </div>
            <div className="flex gap-1 mt-2">
              <div className="flex-1 text-center bg-td-accent p-1 text-white rounded-[4px] text-[10px] font-semibold">
                Aceptar
              </div>
              <div className="py-1 px-2 bg-[#F0F0F0] rounded-[4px] text-[10px]">
                ✕
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col border border-td-line bg-white rounded-3xl lg:rounded-[24px] p-7 lg:p-[28px] min-h-[280px] md:min-h-0">
          <CardIcon size={36} />
          <div className="text-xl md:text-2xl lg:text-[22px] font-semibold mt-5 leading-[1.15] tracking-[-0.6px]">
            OXXO, SPEI, tarjeta y efectivo.
          </div>
          <div className="text-td-mute text-[13px] mt-2.5 leading-[1.5]">
            Conecta Mercado Pago, Stripe o Conekta en un clic. Sin comisión en
            efectivo.
          </div>
          <div className="flex flex-wrap gap-1.5 mt-auto pt-6">
            {["Mercado Pago", "Stripe", "Conekta", "Clip"].map((x) => (
              <div
                key={x}
                className="bg-td-bg border border-td-line text-td-mute py-1 px-2.5 rounded-full text-[11px] font-mono"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-td-ink text-td-bg rounded-3xl lg:rounded-[24px] p-7 lg:p-[28px] min-h-[280px] md:min-h-0">
          <LinkIcon size={36} />
          <div className="text-xl md:text-2xl lg:text-[22px] font-semibold mt-5 leading-[1.15] tracking-[-0.6px]">
            Tu propio link para compartir.
          </div>
          <div className="text-[13px] opacity-70 mt-2.5 leading-[1.5]">
            Ponlo en tu bio de Instagram, en tu WhatsApp Business o imprímelo
            en una tarjeta.
          </div>
          <div className="mt-auto pt-6">
            <div className="py-2.5 px-3.5 rounded-[10px] bg-[rgba(255,255,255,0.08)] border border-dashed border-[rgba(255,255,255,0.2)] font-mono text-[13px]">
              neni.mx/
              <b className="text-td-accent">mitienda</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
