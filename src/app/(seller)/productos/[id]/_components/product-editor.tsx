"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductTone } from "@/components/product-placeholder";

import { BackButton } from "@/components/ui/back-button";
import { ConfirmDangerButton } from "@/components/ui/confirm-danger-button";
import { FilterChip } from "@/components/ui/filter-chip";
import { SubmitBar } from "@/components/ui/submit-bar";
import { PhotoUpload } from "@/components/photo-upload";

export type EditorProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  photoUrl: string | null;
  stock: Stock;
  visible: boolean;
  tone: ProductTone;
};

type ProductEditorProps = (
  | { mode: "new"; product?: undefined }
  | { mode: "edit"; product: EditorProduct }
) & {
  availableCategories: string[];
};

type Stock = "Disponible" | "Agotado";

export function ProductEditor(props: ProductEditorProps) {
  const router = useRouter();
  const isEdit = props.mode === "edit";
  const { availableCategories } = props;

  const [name, setName] = useState(isEdit ? props.product.name : "");
  const [priceRaw, setPriceRaw] = useState(
    isEdit ? String(props.product.price) : ""
  );
  const [desc, setDesc] = useState(
    isEdit ? (props.product.description ?? "") : ""
  );
  const [category, setCategory] = useState(
    isEdit ? (props.product.category ?? "") : ""
  );
  const [stock, setStock] = useState<Stock>(
    isEdit ? props.product.stock : "Disponible"
  );
  const [visible, setVisible] = useState(isEdit ? props.product.visible : true);
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    isEdit ? props.product.photoUrl : null
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tone = isEdit ? props.product.tone : "sand";
  const price = Number(priceRaw);
  const isValid = name.trim().length > 0 && price > 0;

  async function handleSave() {
    if (!isValid || submitting) return;
    haptic("medium");
    setSubmitting(true);
    setError(null);
    const payload = {
      name: name.trim(),
      price,
      description: desc.trim() || null,
      category: category.trim() || null,
      photoUrl,
      stock,
      visible,
    };
    const res = isEdit
      ? await fetch(`/api/products/${props.product.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      : await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
    setSubmitting(false);
    if (!res.ok) {
      haptic("error");
      setError(
        isEdit
          ? "No pudimos guardar los cambios. Intenta de nuevo."
          : "No pudimos crear el producto. Intenta de nuevo."
      );
      return;
    }
    router.push("/productos");
    router.refresh();
  }

  async function handleDelete() {
    if (!isEdit || submitting) return;
    setSubmitting(true);
    setError(null);
    const res = await fetch(`/api/products/${props.product.id}`, {
      method: "DELETE",
    });
    setSubmitting(false);
    if (!res.ok) {
      setError("No pudimos eliminar el producto. Intenta de nuevo.");
      return;
    }
    router.push("/productos");
    router.refresh();
  }

  return (
    <div className="bg-td-bg min-h-dvh">
      <div className="mx-auto w-full max-w-3xl px-5 pt-4 pb-32 md:px-8 md:pt-6 lg:px-10 lg:pb-12">
        <div className="flex items-center gap-2">
          <BackButton href="/productos" />
          <h1 className="flex-1 text-lg font-semibold lg:text-xl">
            {isEdit ? "Editar producto" : "Nuevo producto"}
          </h1>
        </div>

        {/* Foto */}
        <section className="mt-6">
          <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
            Foto
          </span>
          <PhotoUpload value={photoUrl} onChange={setPhotoUrl} tone={tone} />
        </section>

        {/* Nombre */}
        <section className="mt-6">
          <label className="block">
            <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
              Nombre
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tacos al pastor"
              maxLength={60}
              className="border-td-line focus:border-td-ink w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-base font-medium outline-none transition-colors"
            />
          </label>
        </section>

        {/* Precio */}
        <section className="mt-4">
          <label className="block">
            <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
              Precio
            </span>
            <div className="border-td-line focus-within:border-td-ink flex items-center gap-2 rounded-2xl border-2 bg-white px-4 py-3.5 transition-colors">
              <span className="text-td-mute font-mono text-base">$</span>
              <input
                value={priceRaw}
                onChange={(e) =>
                  setPriceRaw(e.target.value.replace(/[^\d.]/g, ""))
                }
                inputMode="decimal"
                placeholder="0.00"
                className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent font-mono text-base font-medium outline-none"
              />
              <span className="text-td-mute text-xs font-medium">MXN</span>
            </div>
          </label>
          {price > 0 && (
            <p className="text-td-mute mt-2 text-xs">
              Se mostrará como{" "}
              <span className="text-td-ink font-mono font-semibold">
                {formatPrice(price)}
              </span>
              .
            </p>
          )}
        </section>

        {/* Descripción */}
        <section className="mt-4">
          <label className="block">
            <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
              Descripción
            </span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Cantidad, ingredientes o detalles que quieras compartir."
              maxLength={240}
              rows={3}
              className="border-td-line focus:border-td-ink w-full resize-none rounded-2xl border-2 bg-white px-4 py-3 text-sm leading-relaxed outline-none transition-colors"
            />
            <div className="text-td-mute mt-1 text-right text-xs">
              {desc.length}/240
            </div>
          </label>
        </section>

        {/* Categoría */}
        {availableCategories.length > 0 ? (
          <section className="mt-4">
            <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
              Categoría
            </span>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip
                active={category === ""}
                label="Sin categoría"
                onClick={() => {
                  haptic("selection");
                  setCategory("");
                }}
              />
              {availableCategories.map((cat) => (
                <FilterChip
                  key={cat}
                  active={category === cat}
                  label={cat}
                  onClick={() => {
                    haptic("selection");
                    setCategory(cat);
                  }}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-4">
            <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
              Categoría
            </span>
            <div className="border-td-line text-td-mute rounded-2xl border border-dashed bg-white px-4 py-3 text-xs">
              Crea categorías en{" "}
              <Link
                href="/tienda"
                className="text-td-ink font-medium underline-offset-4 hover:underline"
              >
                Mi tienda
              </Link>{" "}
              para agruparlas.
            </div>
          </section>
        )}

        {/* Stock */}
        <section className="mt-4">
          <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
            Disponibilidad
          </span>
          <div className="border-td-line flex gap-1 rounded-full border bg-white p-1">
            {(["Disponible", "Agotado"] as const).map((opt) => {
              const active = stock === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    haptic("selection");
                    setStock(opt);
                  }}
                  className={cn(
                    "flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-td-ink text-td-bg"
                      : "text-td-mute hover:text-td-ink"
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </section>

        {/* Visible */}
        <section className="border-td-line mt-4 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5">
          <div className="flex-1">
            <div className="text-sm font-semibold">Visible en mi tienda</div>
            <div className="text-td-mute text-xs">
              {visible
                ? "Tus clientes lo verán en el catálogo."
                : "Está oculto y no aparece a los clientes."}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={visible}
            aria-label={visible ? "Ocultar producto" : "Mostrar producto"}
            onClick={() => {
              haptic("selection");
              setVisible((v) => !v);
            }}
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-full transition-colors",
              visible ? "bg-td-accent" : "bg-td-line"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-6 w-6 rounded-full bg-white transition-[left] duration-150",
                visible ? "left-[22px]" : "left-0.5"
              )}
            />
          </button>
        </section>

        {/* Eliminar (sólo edición) */}
        {isEdit && (
          <section className="mt-8">
            <ConfirmDangerButton
              label="Eliminar producto"
              onConfirm={handleDelete}
              disabled={submitting}
            />
          </section>
        )}
      </div>

      <SubmitBar
        label={isEdit ? "Guardar cambios" : "Crear producto"}
        submittingLabel={isEdit ? "Guardando…" : "Creando…"}
        submitting={submitting}
        disabled={!isValid}
        error={error}
        onSubmit={handleSave}
      />
    </div>
  );
}

