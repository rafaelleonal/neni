"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { haptic } from "@/lib/haptics";
import { cn, formatPrice } from "@/lib/utils";
import type { ProductTone } from "@/components/product-placeholder";

import { Button } from "@/components/ui/button";
import { CheckIcon, PlusIcon } from "@/components/neni-icons";
import { ProductPlaceholder } from "@/components/product-placeholder";

export type EditorProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: Stock;
  visible: boolean;
  tone: ProductTone;
};

type ProductEditorProps =
  | { mode: "new"; product?: undefined }
  | { mode: "edit"; product: EditorProduct };

type Stock = "Disponible" | "Agotado";

export function ProductEditor(props: ProductEditorProps) {
  const router = useRouter();
  const isEdit = props.mode === "edit";

  const [name, setName] = useState(isEdit ? props.product.name : "");
  const [priceRaw, setPriceRaw] = useState(
    isEdit ? String(props.product.price) : ""
  );
  const [desc, setDesc] = useState(
    isEdit ? (props.product.description ?? "") : ""
  );
  const [stock, setStock] = useState<Stock>(
    isEdit ? props.product.stock : "Disponible"
  );
  const [visible, setVisible] = useState(isEdit ? props.product.visible : true);
  const [confirmDelete, setConfirmDelete] = useState(false);
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
    if (!confirmDelete) {
      haptic("light");
      setConfirmDelete(true);
      return;
    }
    haptic("error");
    setSubmitting(true);
    setError(null);
    const res = await fetch(`/api/products/${props.product.id}`, {
      method: "DELETE",
    });
    setSubmitting(false);
    if (!res.ok) {
      setError("No pudimos eliminar el producto. Intenta de nuevo.");
      setConfirmDelete(false);
      return;
    }
    router.push("/productos");
    router.refresh();
  }

  function handleBack() {
    haptic("selection");
    router.push("/productos");
  }

  return (
    <div className="bg-td-bg min-h-dvh">
      <div className="mx-auto w-full max-w-3xl px-5 pt-4 pb-32 md:px-8 md:pt-6 lg:px-10 lg:pb-12">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Atrás"
            className="text-td-mute -ml-2 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none"
          >
            ‹
          </button>
          <h1 className="flex-1 text-lg font-semibold lg:text-xl">
            {isEdit ? "Editar producto" : "Nuevo producto"}
          </h1>
        </div>

        {/* Foto */}
        <section className="mt-6">
          <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
            Foto
          </span>
          <button
            type="button"
            onClick={() => haptic("light")}
            className="border-td-line hover:border-td-mute relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-2xl border-2 border-dashed bg-white transition-colors"
          >
            <div className="absolute inset-0">
              <ProductPlaceholder h="100%" label="" tone={tone} />
            </div>
            <div className="bg-td-ink/85 text-td-bg relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold">
              <PlusIcon size={14} stroke="var(--td-bg)" />
              {isEdit ? "Cambiar foto" : "Agregar foto"}
            </div>
          </button>
          <p className="text-td-mute mt-2 text-xs">
            JPG o PNG, máx 5 MB. Cuadrada se ve mejor.
          </p>
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
            <button
              type="button"
              onClick={handleDelete}
              disabled={submitting}
              className={cn(
                "w-full rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold transition-colors disabled:opacity-60",
                confirmDelete
                  ? "border-[#9C3F12] bg-[#FCE4D6] text-[#9C3F12]"
                  : "border-td-line text-td-mute hover:border-[#9C3F12] hover:text-[#9C3F12]"
              )}
            >
              {confirmDelete
                ? "Toca de nuevo para confirmar"
                : "Eliminar producto"}
            </button>
          </section>
        )}
      </div>

      {/* Sticky bottom bar */}
      <div className="bg-td-bg/95 border-td-line fixed right-0 bottom-0 left-0 border-t backdrop-blur lg:static lg:mx-auto lg:max-w-3xl lg:border-0 lg:bg-transparent lg:px-10 lg:pb-10 lg:backdrop-blur-none">
        <div className="mx-auto w-full max-w-3xl px-5 py-3 md:px-8 lg:px-0 lg:py-0">
          {error && (
            <p className="mb-2 text-center text-sm font-medium text-[#9C3F12]">
              {error}
            </p>
          )}
          <Button
            full
            size="lg"
            type="button"
            disabled={!isValid || submitting}
            onClick={handleSave}
          >
            {submitting
              ? isEdit
                ? "Guardando…"
                : "Creando…"
              : isEdit
                ? "Guardar cambios"
                : "Crear producto"}
            {!submitting && <CheckIcon size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
