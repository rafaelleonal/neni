import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { ArrowIcon, LinkIcon, PlusIcon } from "@/components/neni-icons";
import { PhoneScreen } from "@/components/phone-screen";

type StepProps = {
  n: number;
  total: number;
  title: string;
  sub: string;
  cta?: string;
  children: ReactNode;
};

function Step({
  n,
  total,
  title,
  sub,
  children,
  cta = "Continuar",
}: StepProps) {
  return (
    <PhoneScreen
      height={844}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex items-center gap-3 px-[20px] py-[8px]">
        <div className="text-td-mute text-[22px]">‹</div>
        <div className="bg-td-line h-[4px] flex-1 overflow-hidden rounded-full">
          <div
            className="bg-td-accent h-full"
            style={{
              width: `${(n / total) * 100}%`,
            }}
          />
        </div>
        <div className="text-td-mute font-mono text-[12px]">
          {n}/{total}
        </div>
      </div>
      <div className="flex-1 px-[20px] pt-[32px] pb-[20px]">
        <h1 className="m-0 text-[30px] leading-[1.1] font-semibold tracking-[-1px]">
          {title}
        </h1>
        <p className="text-td-mute mx-0 mt-[10px] mb-[26px] text-[15px] leading-[1.45]">
          {sub}
        </p>
        {children}
      </div>
      <div className="px-[20px] pb-[24px]">
        <Button full size="lg">
          {cta} <ArrowIcon size={16} />
        </Button>
      </div>
    </PhoneScreen>
  );
}

const CATEGORIES = [
  { label: "Comida", sub: "Restaurantes, postres", selected: true },
  { label: "Ropa", sub: "Moda, accesorios" },
  { label: "Belleza", sub: "Skincare, maquillaje" },
  { label: "Hogar", sub: "Decoración, muebles" },
  { label: "Servicios", sub: "Citas, reservas" },
  { label: "Otro", sub: "Cualquier otra cosa" },
];

export function Onboarding() {
  return (
    <div className="flex items-start gap-[24px]">
      <div className="overflow-hidden rounded-[44px] border-[10px] border-[#1A1A1A]">
        <Step
          n={1}
          total={3}
          title="¿Cómo se llama tu negocio?"
          sub="Será el nombre de tu tienda y de tu link público."
        >
          <div className="border-td-ink rounded-[14px] border-2 bg-white p-[14px] text-[18px] font-medium">
            Tacos Don Memo
            <span className="neni-blink bg-td-ink ml-[2px] inline-block h-[20px] w-[2px] align-middle" />
          </div>
          <div className="border-td-line mt-[14px] flex items-center gap-1.5 rounded-[12px] border border-dashed bg-white px-[14px] py-[10px] font-mono text-[13px]">
            <LinkIcon size={13} stroke="var(--td-mute)" />
            <span className="text-td-mute">neni.mx/</span>
            <span className="font-medium">tacosdonmemo</span>
            <span className="text-td-accent ml-auto font-sans text-[11px] font-semibold">
              ✓ disponible
            </span>
          </div>
        </Step>
      </div>

      <div className="overflow-hidden rounded-[44px] border-[10px] border-[#1A1A1A]">
        <Step
          n={2}
          total={3}
          title="¿Qué vendes?"
          sub="Esto nos ayuda a sugerirte plantillas y configuraciones."
        >
          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="flex min-h-[78px] flex-col justify-between rounded-[14px] px-[12px] py-[14px]"
                style={{
                  background: cat.selected ? "var(--td-ink)" : "#fff",
                  color: cat.selected ? "var(--td-bg)" : "var(--td-ink)",
                  border: cat.selected
                    ? "2px solid var(--td-ink)"
                    : "1px solid var(--td-line)",
                }}
              >
                <div className="text-[15px] font-semibold">{cat.label}</div>
                <div
                  className="text-[11px]"
                  style={{
                    opacity: cat.selected ? 0.6 : 1,
                    color: cat.selected ? "inherit" : "var(--td-mute)",
                  }}
                >
                  {cat.sub}
                </div>
              </div>
            ))}
          </div>
        </Step>
      </div>

      <div className="overflow-hidden rounded-[44px] border-[10px] border-[#1A1A1A]">
        <Step
          n={3}
          total={3}
          title="Sube tu primer producto"
          sub="Después puedes agregar más, variantes y categorías."
          cta="Crear mi tienda"
        >
          <div className="border-td-line flex flex-col gap-2.5 rounded-[14px] border bg-white p-[12px]">
            <div className="text-td-mute flex h-[130px] flex-col items-center justify-center gap-1.5 rounded-[10px] bg-[repeating-linear-gradient(135deg,_#EFE9DD_0_10px,_#EFE9DDCC_10px_20px)]">
              <div className="grid h-[36px] w-[36px] place-items-center rounded-full bg-white">
                <PlusIcon size={18} />
              </div>
              <div className="font-mono text-[12px]">tomar foto</div>
            </div>
            <input
              defaultValue="Taco al pastor"
              className="border-b-td-line border-0 border-b bg-transparent px-[2px] py-[10px] text-[16px] outline-none"
              style={{ fontFamily: "inherit" }}
            />
            <div className="flex gap-2.5">
              <div className="bg-td-bg border-td-line flex-1 rounded-[10px] border px-[12px] py-[10px] font-mono text-[15px] font-medium">
                $25.00
              </div>
              <div className="bg-td-bg border-td-line text-td-mute rounded-[10px] border px-[12px] py-[10px] text-[13px]">
                + variantes
              </div>
            </div>
          </div>
        </Step>
      </div>
    </div>
  );
}
