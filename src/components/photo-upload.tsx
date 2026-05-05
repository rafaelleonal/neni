"use client";

import { useRef, useState } from "react";

import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";
import { upload } from "@vercel/blob/client";

import { CheckIcon, PlusIcon } from "@/components/neni-icons";
import {
  ProductPlaceholder,
  type ProductTone,
} from "@/components/product-placeholder";

const MAX_BYTES = 3 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,image/heic";

export type PhotoUploadProps = {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  tone?: ProductTone;
  aspect?: "square" | "4/3";
};

export function PhotoUpload({
  value,
  onChange,
  folder = "products",
  tone = "warm",
  aspect = "4/3",
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openPicker() {
    if (uploading) return;
    haptic("light");
    inputRef.current?.click();
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError("El archivo es muy grande. Máx 3 MB.");
      haptic("error");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const path = `${folder}/${Date.now()}-${file.name}`;
      const blob = await upload(path, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        contentType: file.type,
      });
      haptic("success");
      onChange(blob.url);
    } catch (err) {
      console.error("[photo-upload] error:", err);
      setError("No pudimos subir la foto. Intenta de nuevo.");
      haptic("error");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    if (uploading) return;
    haptic("light");
    onChange(null);
  }

  const aspectClass = aspect === "square" ? "aspect-square" : "aspect-[4/3]";

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={handleFile}
        className="hidden"
      />

      <button
        type="button"
        onClick={openPicker}
        disabled={uploading}
        className={cn(
          "border-td-line hover:border-td-mute relative grid w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed bg-white transition-colors disabled:cursor-wait",
          aspectClass
        )}
      >
        {value ? (
          <img
            src={value}
            alt="Foto del producto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0">
            <ProductPlaceholder h="100%" label="" tone={tone} />
          </div>
        )}

        <div
          className={cn(
            "bg-td-ink/85 text-td-bg relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold",
            uploading && "animate-pulse"
          )}
        >
          {uploading ? (
            <>
              <span className="bg-td-bg/30 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Subiendo…
            </>
          ) : value ? (
            <>
              <CheckIcon size={14} stroke="var(--td-bg)" />
              Cambiar foto
            </>
          ) : (
            <>
              <PlusIcon size={14} stroke="var(--td-bg)" />
              Agregar foto
            </>
          )}
        </div>
      </button>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-td-mute text-xs">JPG, PNG, WebP o HEIC. Máx 5 MB.</p>
        {value && !uploading && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-td-mute text-xs font-medium underline-offset-4 hover:text-[#9C3F12] hover:underline"
          >
            Quitar foto
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-[#9C3F12]">{error}</p>
      )}
    </div>
  );
}
