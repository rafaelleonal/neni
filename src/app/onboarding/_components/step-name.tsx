import { toSlug } from "@/lib/utils";

import { LinkIcon } from "@/components/neni-icons";

type StepNameProps = {
  value: string;
  onChange: (value: string) => void;
};

export function StepName({ value, onChange }: StepNameProps) {
  const slug = toSlug(value) || "tunegocio";
  const hasValue = value.trim().length > 0;

  return (
    <div>
      <h1 className="text-3xl leading-tight font-semibold tracking-[-1px] md:text-4xl">
        ¿Cómo se llama tu negocio?
      </h1>
      <p className="text-td-mute mt-3 text-base leading-relaxed">
        Será el nombre de tu tienda y de tu link público.
      </p>

      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tacos Don Memo"
        maxLength={40}
        className="border-td-ink mt-7 w-full rounded-2xl border-2 bg-white px-4 py-4 text-lg font-medium outline-none"
      />

      <div className="border-td-line mt-3 flex items-center gap-2 rounded-xl border border-dashed bg-white px-4 py-3 font-mono text-sm">
        <LinkIcon size={13} stroke="var(--td-mute)" />
        <span className="text-td-mute">neni.mx/</span>
        <span className="font-medium">{slug}</span>
        {hasValue && (
          <span className="text-td-accent ml-auto font-sans text-xs font-semibold">
            ✓ disponible
          </span>
        )}
      </div>
    </div>
  );
}
