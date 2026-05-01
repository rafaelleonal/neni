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

      <div className="border-td-line mt-7 flex flex-col gap-3 rounded-2xl border bg-white p-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-td-mute relative flex h-36 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-[repeating-linear-gradient(135deg,_#EFE9DD_0_10px,_#EFE9DDCC_10px_20px)]"
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

        <input
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Nombre del producto"
          className="border-b-td-line border-0 border-b bg-transparent px-1 py-3 text-base outline-none"
        />

        <div className="flex gap-3">
          <div className="border-td-line bg-td-bg flex flex-1 items-center gap-1 rounded-xl border px-3 py-3 font-mono text-base font-medium">
            <span className="text-td-mute">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(e) =>
                onPriceChange(e.target.value.replace(/[^0-9.]/g, ""))
              }
              placeholder="0.00"
              className="w-full bg-transparent outline-none"
            />
          </div>
          <button
            type="button"
            className="border-td-line bg-td-bg text-td-mute rounded-xl border px-3 py-3 text-sm whitespace-nowrap"
          >
            + variantes
          </button>
        </div>
      </div>
    </div>
  );
}
