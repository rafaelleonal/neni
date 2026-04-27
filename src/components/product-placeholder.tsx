import { PRODUCT_TONES, type ProductTone } from "@/lib/tokens";

export type { ProductTone };

type Props = {
  h?: number;
  label?: string;
  tone?: ProductTone;
  className?: string;
};

export function ProductPlaceholder({
  h = 120,
  label = "producto",
  tone = "warm",
  className,
}: Props) {
  const t = PRODUCT_TONES[tone];
  const stripe = `repeating-linear-gradient(135deg, ${t.bg} 0 10px, ${t.bg}CC 10px 20px)`;

  return (
    <div
      className={`w-full rounded-[10px] flex items-end p-[8px] font-mono text-[9px] tracking-[0.4px] ${className ?? ""}`}
      style={{
        height: h,
        background: stripe,
        color: t.ink,
      }}
    >
      {label}
    </div>
  );
}
