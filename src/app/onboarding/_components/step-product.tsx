import { useRef } from "react";

import { PlusIcon } from "@/components/neni-icons";

type StepProductProps = {
  name: string;
  price: string;
  photo: string | null;
  onNameChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onPhotoChange: (dataUrl: string | null) => void;
};

export function StepProduct({
  name,
  price,
  photo,
  onNameChange,
  onPriceChange,
  onPhotoChange,
}: StepProductProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onPhotoChange(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <h1 className="text-3xl leading-tight font-semibold tracking-[-1px] md:text-4xl">
        Sube tu primer producto
      </h1>
      <p className="text-td-mute mt-3 text-base leading-relaxed">
        Después puedes agregar más, variantes y categorías.
      </p>

      <div className="mt-7 flex flex-col gap-4">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-td-mute relative flex h-40 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[repeating-linear-gradient(135deg,_#EFE9DD_0_10px,_#EFE9DDCC_10px_20px)]"
        >
          {photo ? (
            <img
              src={photo}
              alt="Producto"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white">
                <PlusIcon size={18} />
              </div>
              <div className="font-mono text-xs">tomar foto</div>
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFile}
          className="hidden"
        />

        <label className="block">
          <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
            Nombre
          </span>
          <input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Tacos al pastor"
            maxLength={60}
            className="border-td-line focus:border-td-ink w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-base font-medium transition-colors outline-none"
          />
        </label>

        <label className="block">
          <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
            Precio
          </span>
          <div className="border-td-line focus-within:border-td-ink flex items-center gap-2 rounded-2xl border-2 bg-white px-4 py-3.5 transition-colors">
            <span className="text-td-mute font-mono text-base">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) =>
                onPriceChange(e.target.value.replace(/[^0-9.]/g, ""))
              }
              placeholder="0.00"
              className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent font-mono text-base font-medium outline-none"
            />
            <span className="text-td-mute text-xs font-medium">MXN</span>
          </div>
        </label>
      </div>
    </div>
  );
}
