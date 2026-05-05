"use client";

import { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { haptic } from "@/lib/haptics";
import { PAYMENT_LIST, type PaymentId } from "@/lib/payments";
import { cn } from "@/lib/utils";

import { Field, SettingsCard } from "@/components/ui/form";
import { Toggle } from "@/components/ui/toggle";
import {
  ArrowIcon,
  CheckIcon,
  LinkIcon,
  WaIcon,
} from "@/components/neni-icons";

type StoreInitial = {
  name: string;
  slug: string;
  description: string;
  isOpen: boolean;
  categories: string[];
  payments: string[];
};

export function TiendaSettings({ initial }: { initial: StoreInitial }) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [description, setDescription] = useState(initial.description);
  const [isOpen, setIsOpen] = useState(initial.isOpen);
  const [categories, setCategories] = useState<string[]>(initial.categories);
  const [payments, setPayments] = useState<string[]>(initial.payments);
  const [savingForm, setSavingForm] = useState(false);
  const [togglingOpen, setTogglingOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const trimmedName = name.trim();
  const trimmedDesc = description.trim();
  const dirty =
    trimmedName !== initial.name.trim() ||
    trimmedDesc !== initial.description.trim();
  const formValid = trimmedName.length > 0;

  async function patchStore(
    body: object,
    onRevert: () => void,
    errorMessage: string
  ): Promise<boolean> {
    setError(null);
    const res = await fetch("/api/stores/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      onRevert();
      haptic("error");
      setError(errorMessage);
      return false;
    }
    router.refresh();
    return true;
  }

  async function handleToggleOpen() {
    if (togglingOpen) return;
    const next = !isOpen;
    setIsOpen(next);
    setTogglingOpen(true);
    haptic("medium");
    await patchStore(
      { isOpen: next },
      () => setIsOpen(!next),
      "No pudimos actualizar el estado. Intenta de nuevo."
    );
    setTogglingOpen(false);
  }

  async function handleSave() {
    if (!dirty || !formValid || savingForm) return;
    setSavingForm(true);
    haptic("medium");
    await patchStore(
      { name: trimmedName, description: trimmedDesc || null },
      () => {},
      "No pudimos guardar los cambios. Intenta de nuevo."
    );
    setSavingForm(false);
  }

  async function handleAddCategory(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
      haptic("error");
      return;
    }
    const previous = categories;
    const next = [...categories, trimmed];
    setCategories(next);
    haptic("selection");
    await patchStore(
      { categories: next },
      () => setCategories(previous),
      "No pudimos guardar las categorías. Intenta de nuevo."
    );
  }

  async function handleRemoveCategory(name: string) {
    const previous = categories;
    const next = categories.filter((c) => c !== name);
    setCategories(next);
    haptic("selection");
    await patchStore(
      { categories: next },
      () => setCategories(previous),
      "No pudimos guardar las categorías. Intenta de nuevo."
    );
  }

  async function handleTogglePayment(id: PaymentId) {
    const isActive = payments.includes(id);
    if (isActive && payments.length <= 1) {
      haptic("error");
      return;
    }
    const previous = payments;
    const next = isActive
      ? payments.filter((p) => p !== id)
      : [...payments, id];
    setPayments(next);
    haptic("selection");
    await patchStore(
      { payments: next },
      () => setPayments(previous),
      "No pudimos guardar los métodos de pago. Intenta de nuevo."
    );
  }

  async function handleSignOut() {
    if (signingOut) return;
    haptic("medium");
    setSigningOut(true);
    await authClient.signOut();
    router.push("/acceso");
    router.refresh();
  }

  async function handleCopy() {
    const url = `${window.location.origin}/${initial.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      haptic("success");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.open(`/${initial.slug}`, "_blank");
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-32 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <header className="mb-6">
        <h1 className="text-xl font-semibold lg:text-2xl">Mi tienda</h1>
        <div className="text-td-mute mt-0.5 text-xs lg:text-sm">
          Lo que ven tus clientes
        </div>
      </header>

      <PublicLink slug={initial.slug} copied={copied} onCopy={handleCopy} />
      <StatusCard
        open={isOpen}
        disabled={togglingOpen}
        onToggle={handleToggleOpen}
      />

      <SettingsCard title="Información" subtitle="Cómo se ve tu tienda">
        <div className="flex flex-col gap-4 px-4 pt-4 pb-4">
          <Field label="Nombre">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(null);
              }}
              maxLength={60}
              placeholder="Tacos Don Memo"
              className="border-td-line focus:border-td-ink w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-medium transition-colors outline-none"
            />
          </Field>
          <Field
            label="Descripción"
            hint="Una línea corta que describa qué vendes."
          >
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError(null);
              }}
              maxLength={160}
              rows={2}
              placeholder="Tacos al pastor de la mejor cocina del barrio"
              className="border-td-line focus:border-td-ink w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm leading-snug transition-colors outline-none"
            />
            <div className="text-td-mute mt-1 text-right text-[11px]">
              {description.length}/160
            </div>
          </Field>
          <ReadonlyRow
            label="Tu link"
            value={`neni.mx/${initial.slug}`}
            hint="El link no se puede cambiar para no romper los enlaces que ya compartiste."
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="Categorías"
        subtitle="Filtra los productos de tu catálogo"
      >
        <CategoriesEditor
          categories={categories}
          onAdd={handleAddCategory}
          onRemove={handleRemoveCategory}
        />
      </SettingsCard>

      <SettingsCard
        title="Métodos de pago"
        subtitle="Activa los que quieras aceptar"
      >
        <div className="flex flex-col">
          {PAYMENT_LIST.map((method, i) => {
            const isActive = payments.includes(method.id);
            const isLastActive = isActive && payments.length === 1;
            return (
              <PaymentRow
                key={method.id}
                method={method}
                active={isActive}
                disabled={!method.available}
                cantDeactivate={isLastActive}
                onToggle={() => handleTogglePayment(method.id)}
                last={i === PAYMENT_LIST.length - 1}
              />
            );
          })}
        </div>
      </SettingsCard>

      <SettingsCard title="Sesión">
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          className="text-td-mute hover:bg-td-bg flex items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors hover:text-[#9C3F12] disabled:opacity-60"
        >
          <span className="flex-1">
            {signingOut ? "Cerrando sesión…" : "Cerrar sesión"}
          </span>
          <ArrowIcon size={14} stroke="currentColor" />
        </button>
      </SettingsCard>

      {(dirty || error) && (
        <div className="bg-td-bg/95 border-td-line fixed right-0 bottom-0 left-0 border-t backdrop-blur lg:static lg:mx-auto lg:max-w-3xl lg:border-0 lg:bg-transparent lg:px-10 lg:pb-10 lg:backdrop-blur-none">
          <div className="mx-auto w-full max-w-3xl px-5 py-3 md:px-8 lg:px-0 lg:py-0">
            {error && (
              <p className="mb-2 text-center text-sm font-medium text-[#9C3F12]">
                {error}
              </p>
            )}
            {dirty && (
              <button
                type="button"
                disabled={!formValid || savingForm}
                onClick={handleSave}
                className="bg-td-ink text-td-bg flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold tracking-[-0.1px] transition-transform select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                {savingForm ? "Guardando…" : "Guardar cambios"}
                {!savingForm && <CheckIcon size={16} />}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function PublicLink({
  slug,
  copied,
  onCopy,
}: {
  slug: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="bg-td-ink text-td-bg mb-4 flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="bg-td-accent grid h-10 w-10 shrink-0 place-items-center rounded-xl">
          <LinkIcon size={18} stroke="#fff" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold tracking-[1.2px] uppercase opacity-60">
            Tu link público
          </div>
          <div className="truncate font-mono text-sm">
            neni.mx/<span className="text-td-accent font-bold">{slug}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          href={`/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ver tienda"
          className="text-td-bg flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/15 sm:flex-none"
        >
          Ver tienda <ArrowIcon size={14} stroke="currentColor" />
        </Link>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copiar link"
          className="bg-td-accent flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-white sm:flex-none"
        >
          {copied ? (
            <>
              <CheckIcon size={14} stroke="currentColor" /> Copiado
            </>
          ) : (
            <>
              <WaIcon size={14} /> Compartir
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function StatusCard({
  open,
  disabled,
  onToggle,
}: {
  open: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-td-line mb-4 flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5">
      <div
        className={cn(
          "h-2.5 w-2.5 rounded-full transition-colors",
          open
            ? "bg-td-accent shadow-[0_0_0_3px_rgba(31,170,89,0.18)]"
            : "bg-td-mute"
        )}
      />
      <div className="flex-1">
        <div className="text-sm font-semibold">
          {open ? "Tu tienda está abierta" : "Tu tienda está cerrada"}
        </div>
        <div className="text-td-mute text-xs">
          {open
            ? "Los clientes pueden hacer pedidos"
            : "Nadie puede hacer pedidos hasta que la abras"}
        </div>
      </div>
      <Toggle
        pressed={open}
        disabled={disabled}
        onToggle={onToggle}
        ariaLabel={open ? "Cerrar tienda" : "Abrir tienda"}
      />
    </div>
  );
}

function ReadonlyRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="text-td-mute mb-1.5 text-[11px] font-semibold tracking-[0.4px] uppercase">
        {label}
      </div>
      <div className="border-td-line bg-td-bg/40 text-td-mute flex items-center justify-between rounded-xl border border-dashed px-3 py-2.5 font-mono text-sm">
        {value}
      </div>
      {hint && <p className="text-td-mute mt-1.5 text-[11px]">{hint}</p>}
    </div>
  );
}

function CategoriesEditor({
  categories,
  onAdd,
  onRemove,
}: {
  categories: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function startAdding() {
    setAdding(true);
    setDraft("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function cancelAdding() {
    setAdding(false);
    setDraft("");
  }

  function commit() {
    const value = draft.trim();
    if (!value) {
      cancelAdding();
      return;
    }
    onAdd(value);
    setDraft("");
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  return (
    <div className="px-4 pt-3 pb-4">
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <span
            key={cat}
            className="border-td-line flex items-center gap-1.5 rounded-full border bg-white py-1 pr-1 pl-3 text-[13px] font-medium"
          >
            <span>{cat}</span>
            <button
              type="button"
              onClick={() => onRemove(cat)}
              aria-label={`Eliminar categoría ${cat}`}
              className="text-td-mute hover:bg-td-line hover:text-td-ink grid h-5 w-5 place-items-center rounded-full text-xs leading-none transition-colors"
            >
              ×
            </button>
          </span>
        ))}
        {adding ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              } else if (e.key === "Escape") {
                e.preventDefault();
                cancelAdding();
              }
            }}
            onBlur={commit}
            placeholder="Nombre"
            maxLength={40}
            className="border-td-ink bg-td-bg w-32 rounded-full border-2 px-3 py-1 text-[13px] font-medium outline-none"
          />
        ) : (
          <button
            type="button"
            onClick={startAdding}
            className="border-td-line text-td-mute hover:text-td-ink hover:border-td-mute rounded-full border border-dashed px-3 py-1 text-[13px] font-medium transition-colors"
          >
            + agregar
          </button>
        )}
      </div>
      {categories.length === 0 && !adding && (
        <p className="text-td-mute mt-2 text-[11px]">
          Crea categorías para agrupar tus productos. Ejemplo: "Tacos",
          "Bebidas", "Postres".
        </p>
      )}
    </div>
  );
}

function PaymentRow({
  method,
  active,
  disabled,
  cantDeactivate,
  onToggle,
  last,
}: {
  method: (typeof PAYMENT_LIST)[number];
  active: boolean;
  disabled: boolean;
  cantDeactivate: boolean;
  onToggle: () => void;
  last: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        !last && "border-b-td-line border-b",
        disabled && "opacity-60"
      )}
    >
      <div
        className="grid h-9 w-11 shrink-0 place-items-center rounded-md font-mono text-[11px] font-bold tracking-[0.5px] text-white"
        style={{ background: method.color }}
      >
        {method.badge}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{method.label}</span>
          {disabled && (
            <span className="bg-td-bg text-td-mute rounded-full px-2 py-0.5 text-[9.5px] font-bold tracking-[0.4px] uppercase">
              Próximamente
            </span>
          )}
        </div>
        <div className="text-td-mute mt-0.5 truncate text-xs">{method.sub}</div>
      </div>
      <Toggle
        pressed={active}
        disabled={disabled || cantDeactivate}
        onToggle={onToggle}
        ariaLabel={`Activar ${method.label}`}
      />
    </div>
  );
}
