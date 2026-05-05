import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

export type Category =
  | "comida"
  | "cafeteria"
  | "panaderia"
  | "tienda-local"
  | "floreria"
  | "ropa"
  | "belleza"
  | "joyeria"
  | "hogar"
  | "servicios"
  | "otro";

const CATEGORIES: {
  id: Category;
  label: string;
  sub: string;
  comingSoon?: boolean;
}[] = [
  { id: "comida", label: "Comida casera", sub: "Tacos, postres, comidas" },
  { id: "cafeteria", label: "Cafetería", sub: "Café, bebidas, snacks" },
  { id: "panaderia", label: "Panadería", sub: "Pan, repostería" },
  { id: "tienda-local", label: "Tienda local", sub: "Abarrotes, papelería" },
  { id: "floreria", label: "Florería", sub: "Arreglos, ramos" },
  { id: "ropa", label: "Ropa", sub: "Moda, accesorios" },
  { id: "belleza", label: "Belleza", sub: "Skincare, maquillaje" },
  { id: "joyeria", label: "Joyería", sub: "Aretes, collares, anillos" },
  { id: "hogar", label: "Hogar", sub: "Decoración, manualidades" },
  {
    id: "servicios",
    label: "Servicios",
    sub: "Citas y reservas",
    comingSoon: true,
  },
  { id: "otro", label: "Otro", sub: "Cualquier otro negocio" },
];

type StepCategoryProps = {
  value: Category | null;
  onChange: (value: Category) => void;
};

export function StepCategory({ value, onChange }: StepCategoryProps) {
  return (
    <div>
      <h1 className="text-3xl leading-tight font-semibold tracking-[-1px] md:text-4xl">
        ¿Qué tipo de negocio tienes?
      </h1>
      <p className="text-td-mute mt-3 text-base leading-relaxed">
        Nos ayuda a sugerirte plantillas y a mostrar tu tienda en la categoría
        correcta.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          const selected = value === cat.id;
          const disabled = cat.comingSoon;
          return (
            <button
              key={cat.id}
              type="button"
              disabled={disabled}
              onClick={() => {
                if (disabled) return;
                haptic("selection");
                onChange(cat.id);
              }}
              className={cn(
                "relative flex min-h-[88px] flex-col items-start justify-between rounded-2xl px-4 py-4 text-left transition-colors",
                disabled && "cursor-not-allowed opacity-50",
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
              {cat.comingSoon && (
                <span className="bg-td-bg text-td-mute absolute top-2 right-2 rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase">
                  Pronto
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
