import { CardIcon, LinkIcon, WaIcon } from "@/components/neni-icons";

export function FeatureCards() {
  return (
    <div className="px-[72px] pb-[80px]">
      <div
        className="grid gap-4 grid-cols-[1.4fr_1fr_1fr]"
      >
        <div
          className="bg-td-accent text-white rounded-[24px] p-[32px] relative overflow-hidden min-h-[360px]"
        >
          <WaIcon size={48} />
          <div
            className="text-[36px] font-semibold mt-[24px] leading-[1.05] tracking-[-1.2px] max-w-[360px]"
          >
            Cada pedido llega a tu WhatsApp.
          </div>
          <div
            className="text-[14px] opacity-[0.9] mt-[12px] max-w-[360px] leading-[1.5]"
          >
            Con el ticket, la dirección y el método de pago. Un botón para
            aceptar, otro para marcar en camino.
          </div>
          <div
            className="text-td-ink absolute bottom-[24px] right-[24px] w-[240px] bg-white rounded-[12px] p-[12px] text-[11px] shadow-[0_10px_30px_rgba(0,0,0,0.15)] rotate-[3deg]"
          >
            <div
              className="text-td-accent font-bold text-[9px] tracking-[0.4px] uppercase"
            >
              Pedido #4821
            </div>
            <div className="font-semibold mt-[2px]">
              Marisol Hernández
            </div>
            <div
              className="text-td-mute font-mono mt-[6px] text-[10px]"
            >
              3 productos · $200.00
            </div>
            <div className="flex gap-1 mt-[8px]">
              <div
                className="flex-1 text-center bg-td-accent p-[4px] text-white rounded-[4px] text-[10px] font-semibold"
              >
                Aceptar
              </div>
              <div
                className="py-[4px] px-[8px] bg-[#F0F0F0] rounded-[4px] text-[10px]"
              >
                ✕
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col border border-td-line bg-white rounded-[24px] p-[28px]"
        >
          <CardIcon size={36} />
          <div
            className="text-[22px] font-semibold mt-[20px] leading-[1.15] tracking-[-0.6px]"
          >
            OXXO, SPEI, tarjeta y efectivo.
          </div>
          <div
            className="text-td-mute text-[13px] mt-[10px] leading-[1.5]"
          >
            Conecta Mercado Pago, Stripe o Conekta en un clic. Sin comisión en
            efectivo.
          </div>
          <div
            className="flex flex-wrap gap-1.5 mt-auto"
          >
            {["Mercado Pago", "Stripe", "Conekta", "Clip"].map((x) => (
              <div
                key={x}
                className="bg-td-bg border border-td-line text-td-mute py-[5px] px-[10px] rounded-full text-[11px] font-mono"
              >
                {x}
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col bg-td-ink text-td-bg rounded-[24px] p-[28px]"
        >
          <LinkIcon size={36} />
          <div
            className="text-[22px] font-semibold mt-[20px] leading-[1.15] tracking-[-0.6px]"
          >
            Tu propio link para compartir.
          </div>
          <div
            className="text-[13px] opacity-[0.7] mt-[10px] leading-[1.5]"
          >
            Ponlo en tu bio de Instagram, en tu WhatsApp Business o imprímelo
            en una tarjeta.
          </div>
          <div
            className="mt-auto py-[10px] px-[14px] rounded-[10px] bg-[rgba(255,255,255,0.08)] border border-dashed border-[rgba(255,255,255,0.2)] font-mono text-[13px]"
          >
            neni.mx/
            <b className="text-td-accent">mitienda</b>
          </div>
        </div>
      </div>
    </div>
  );
}
