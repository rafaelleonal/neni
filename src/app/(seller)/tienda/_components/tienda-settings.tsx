"use client";

import { useRef, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { haptic } from "@/lib/haptics";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  ArrowIcon,
  CheckIcon,
  LinkIcon,
  WaIcon,
} from "@/components/neni-icons";

type PaymentId = "card" | "oxxo" | "spei" | "cash";

type StoreInitial = {
  name: string;
  slug: string;
  description: string;
  isOpen: boolean;
  categories: string[];
  payments: string[];
};

const PAYMENT_METHODS: ReadonlyArray<{
  id: PaymentId;
  label: string;
  sub: string;
  badge: string;
  color: string;
  available: boolean;
}> = [
  {
    id: "cash",
    label: "Efectivo contra entrega",
    sub: "Cobras al entregar el pedido",
    badge: "$$",
    color: "#1FAA59",
    available: true,
  },
  {
    id: "card",
    label: "Tarjeta",
    sub: "Visa, Mastercard, AMEX",
    badge: "TC",
    color: "#1A1A1A",
    available: false,
  },
  {
    id: "oxxo",
    label: "OXXO",
    sub: "Pago en efectivo en cualquier tienda",
    badge: "OXX",
    color: "#D8232A",
    available: false,
  },
  {
    id: "spei",
    label: "SPEI",
    sub: "Transferencia bancaria sin comisión",
    badge: "SPI",
    color: "#2E5BFF",
    available: false,
  },
];

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

  async function handleToggleOpen() {
    if (togglingOpen) return;
    const next = !isOpen;
    setIsOpen(next); // optimistic
    setTogglingOpen(true);
    haptic("medium");
    setError(null);
    const res = await fetch("/api/stores/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOpen: next }),
    });
    setTogglingOpen(false);
    if (!res.ok) {
      setIsOpen(!next); // revert
      haptic("error");
      setError("No pudimos actualizar el estado. Intenta de nuevo.");
      return;
    }
    router.refresh();
  }

  async function handleSave() {
    if (!dirty || !formValid || savingForm) return;
    setSavingForm(true);
    setError(null);
    haptic("medium");
    const res = await fetch("/api/stores/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        description: trimmedDesc || null,
      }),
    });
    setSavingForm(false);
    if (!res.ok) {
      haptic("error");
      setError("No pudimos guardar los cambios. Intenta de nuevo.");
      return;
    }
    router.refresh();
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
      // clipboard puede fallar — abre en nueva tab como fallback.
      window.open(`/${initial.slug}`, "_blank");
    }
  }

  async function persistCategories(next: string[]) {
    const previous = categories;
    setCategories(next); // optimistic
    setError(null);
    const res = await fetch("/api/stores/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ categories: next }),
    });
    if (!res.ok) {
      setCategories(previous); // revert
      haptic("error");
      setError("No pudimos guardar las categorías. Intenta de nuevo.");
      return;
    }
    router.refresh();
  }

  async function handleAddCategory(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const exists = categories.some(
      (c) => c.toLowerCase() === trimmed.toLowerCase()
    );
    if (exists) {
      haptic("error");
      return;
    }
    haptic("selection");
    await persistCategories([...categories, trimmed]);
  }

  async function handleRemoveCategory(name: string) {
    haptic("selection");
    await persistCategories(categories.filter((c) => c !== name));
  }

  async function handleTogglePayment(id: PaymentId) {
    const isActive = payments.includes(id);
    // No permitir desactivar el último método activo.
    if (isActive && payments.length <= 1) {
      haptic("error");
      return;
    }
    haptic("selection");
    const next = isActive
      ? payments.filter((p) => p !== id)
      : [...payments, id];
    const previous = payments;
    setPayments(next);
    setError(null);
    const res = await fetch("/api/stores/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payments: next }),
    });
    if (!res.ok) {
      setPayments(previous);
      haptic("error");
      setError("No pudimos guardar los métodos de pago. Intenta de nuevo.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pt-6 pb-32 md:px-8 md:pt-8 lg:px-10 lg:pt-10 lg:pb-12">
      <header className="mb-6">
        <h1 className="text-xl font-semibold lg:text-2xl">Mi tienda</h1>
        <div className="text-td-mute mt-0.5 text-xs lg:text-sm">
          Lo que ven tus clientes
        </div>
      </header>

      <PublicLink
        slug={initial.slug}
        copied={copied}
        onCopy={handleCopy}
      />
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
              className="border-td-line focus:border-td-ink w-full rounded-xl border bg-white px-3 py-2.5 text-sm font-medium outline-none transition-colors"
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
              className="border-td-line focus:border-td-ink w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm leading-snug outline-none transition-colors"
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
        subtitle="Filtra los productos en tu tienda"
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
          {PAYMENT_METHODS.map((method, i) => {
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
                last={i === PAYMENT_METHODS.length - 1}
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

      {/* Sticky bottom save bar */}
      {(dirty || error) && (
        <div className="bg-td-bg/95 border-td-line fixed right-0 bottom-0 left-0 border-t backdrop-blur lg:static lg:mx-auto lg:max-w-3xl lg:border-0 lg:bg-transparent lg:px-10 lg:pb-10 lg:backdrop-blur-none">
          <div className="mx-auto w-full max-w-3xl px-5 py-3 md:px-8 lg:px-0 lg:py-0">
            {error && (
              <p className="mb-2 text-center text-sm font-medium text-[#9C3F12]">
                {error}
              </p>
            )}
            {dirty && (
              <Button
                full
                size="lg"
                type="button"
                disabled={!formValid || savingForm}
                onClick={handleSave}
              >
                {savingForm ? "Guardando…" : "Guardar cambios"}
                {!savingForm && <CheckIcon size={16} />}
              </Button>
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
      <Toggle pressed={open} disabled={disabled} onToggle={onToggle} />
    </div>
  );
}

function SettingsCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-td-line mb-4 rounded-2xl border bg-white">
      <header className="border-b-td-line border-b px-4 pt-4 pb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {subtitle && <p className="text-td-mute mt-0.5 text-xs">{subtitle}</p>}
      </header>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-td-mute mb-1.5 block text-[11px] font-semibold tracking-[0.4px] uppercase">
        {label}
      </span>
      {children}
      {hint && <p className="text-td-mute mt-1.5 text-[11px]">{hint}</p>}
    </label>
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

function Toggle({
  pressed,
  disabled,
  onToggle,
}: {
  pressed: boolean;
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={pressed}
      onClick={onToggle}
      disabled={disabled}
      className={cn(
        "relative h-6 w-10 shrink-0 rounded-full transition-colors disabled:opacity-60",
        pressed ? "bg-td-accent" : "bg-td-line"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-[left]",
          pressed ? "left-[18px]" : "left-0.5"
        )}
      />
    </button>
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
    // Mantener el input abierto para agregar más rápido. Foco se mantiene.
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
          Crea categorías para agruparlas en tu tienda. Ejemplo: "Tacos",
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
  method: (typeof PAYMENT_METHODS)[number];
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
      />
    </div>
  );
}
