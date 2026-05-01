import { cn } from "@/lib/utils";

export type Category =
  | "comida"
  | "ropa"
  | "belleza"
  | "hogar"
  | "servicios"
  | "otro";

const CATEGORIES: { id: Category; label: string; sub: string }[] = [
  { id: "comida", label: "Comida", sub: "Restaurantes, postres" },
  { id: "ropa", label: "Ropa", sub: "Moda, accesorios" },
  { id: "belleza", label: "Belleza", sub: "Skincare, maquillaje" },
  { id: "hogar", label: "Hogar", sub: "Decoración, muebles" },
  { id: "servicios", label: "Servicios", sub: "Citas, reservas" },
  { id: "otro", label: "Otro", sub: "Cualquier otra cosa" },
];

type StepCategoryProps = {
  value: Category | null;
  onChange: (value: Category) => void;
};

export function StepCategory({ value, onChange }: StepCategoryProps) {
  return (
    <div>
      <h1 className="text-3xl leading-tight font-semibold tracking-[-1px] md:text-4xl">
        ¿Qué vendes?
      </h1>
      <p className="text-td-mute mt-3 text-base leading-relaxed">
        Esto nos ayuda a sugerirte plantillas y configuraciones.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const selected = value === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                "flex min-h-[88px] flex-col items-start justify-between rounded-2xl px-4 py-4 text-left transition-colors",
                selected
                  ? "bg-td-ink text-td-bg border-td-ink border-2"
                  : "border-td-line text-td-ink hover:bg-td-bg border bg-white"
              )}
            >
              <div className="text-base font-semibold">{cat.label}</div>
              <div
                className={cn(
                  "text-xs",
                  selected ? "opacity-60" : "text-td-mute"
                )}
              >
                {cat.sub}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
