import type { ReactNode } from "react";
import { PhoneScreen } from "@/components/phone-screen";
import { ArrowIcon, LinkIcon, PlusIcon } from "@/components/neni-icons";
import { Button } from "@/components/ui/button";

type StepProps = {
  n: number;
  total: number;
  title: string;
  sub: string;
  cta?: string;
  children: ReactNode;
};

function Step({ n, total, title, sub, children, cta = "Continuar" }: StepProps) {
  return (
    <PhoneScreen
      height={844}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        className="flex items-center gap-3 py-[8px] px-[20px]"
      >
        <div className="text-td-mute text-[22px]">‹</div>
        <div
          className="flex-1 overflow-hidden bg-td-line h-[4px] rounded-full"
        >
          <div
            className="bg-td-accent h-full"
            style={{
              width: `${(n / total) * 100}%`,
            }}
          />
        </div>
        <div
          className="text-td-mute text-[12px] font-mono"
        >
          {n}/{total}
        </div>
      </div>
      <div className="pt-[32px] px-[20px] pb-[20px] flex-1">
        <h1
          className="m-0 text-[30px] font-semibold leading-[1.1] tracking-[-1px]"
        >
          {title}
        </h1>
        <p
          className="text-td-mute mt-[10px] mx-0 mb-[26px] text-[15px] leading-[1.45]"
        >
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
    <div
      className="flex items-start gap-[24px]"
    >
      <div
        className="rounded-[44px] overflow-hidden border-[10px] border-[#1A1A1A]"
      >
        <Step
          n={1}
          total={3}
          title="¿Cómo se llama tu negocio?"
          sub="Será el nombre de tu tienda y de tu link público."
        >
          <div
            className="border-2 border-td-ink bg-white rounded-[14px] p-[14px] text-[18px] font-medium"
          >
            Tacos Don Memo
            <span
              className="neni-blink bg-td-ink inline-block w-[2px] h-[20px] align-middle ml-[2px]"
            />
          </div>
          <div
            className="flex items-center gap-1.5 border border-dashed border-td-line mt-[14px] py-[10px] px-[14px] bg-white rounded-[12px] font-mono text-[13px]"
          >
            <LinkIcon size={13} stroke="var(--td-mute)" />
            <span className="text-td-mute">neni.mx/</span>
            <span className="font-medium">tacosdonmemo</span>
            <span
              className="text-td-accent ml-auto text-[11px] font-sans font-semibold"
            >
              ✓ disponible
            </span>
          </div>
        </Step>
      </div>

      <div
        className="rounded-[44px] overflow-hidden border-[10px] border-[#1A1A1A]"
      >
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
                className="flex flex-col justify-between rounded-[14px] py-[14px] px-[12px] min-h-[78px]"
                style={{
                  background: cat.selected ? "var(--td-ink)" : "#fff",
                  color: cat.selected ? "var(--td-bg)" : "var(--td-ink)",
                  border: cat.selected ? "2px solid var(--td-ink)" : "1px solid var(--td-line)",
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

      <div
        className="rounded-[44px] overflow-hidden border-[10px] border-[#1A1A1A]"
      >
        <Step
          n={3}
          total={3}
          title="Sube tu primer producto"
          sub="Después puedes agregar más, variantes y categorías."
          cta="Crear mi tienda"
        >
          <div
            className="flex flex-col gap-2.5 border border-td-line bg-white rounded-[14px] p-[12px]"
          >
            <div
              className="flex flex-col items-center justify-center gap-1.5 text-td-mute h-[130px] bg-[repeating-linear-gradient(135deg,_#EFE9DD_0_10px,_#EFE9DDCC_10px_20px)] rounded-[10px]"
            >
              <div
                className="grid place-items-center w-[36px] h-[36px] rounded-full bg-white"
              >
                <PlusIcon size={18} />
              </div>
              <div
                className="text-[12px] font-mono"
              >
                tomar foto
              </div>
            </div>
            <input
              defaultValue="Taco al pastor"
              className="border-0 border-b border-b-td-line py-[10px] px-[2px] text-[16px] outline-none bg-transparent"
              style={{ fontFamily: "inherit" }}
            />
            <div className="flex gap-2.5">
              <div
                className="flex-1 bg-td-bg border border-td-line py-[10px] px-[12px] rounded-[10px] font-mono text-[15px] font-medium"
              >
                $25.00
              </div>
              <div
                className="bg-td-bg border border-td-line text-td-mute py-[10px] px-[12px] rounded-[10px] text-[13px]"
              >
                + variantes
              </div>
            </div>
          </div>
        </Step>
      </div>
    </div>
  );
}
