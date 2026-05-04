"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { haptic } from "@/lib/haptics";

import { Button } from "@/components/ui/button";
import { ArrowIcon, WaIcon } from "@/components/neni-icons";
import { NeniLogo } from "@/components/neni-logo";

function formatPhone(digits: string): string {
  // 10 dígitos MX → "55 1234 5678"
  const a = digits.slice(0, 2);
  const b = digits.slice(2, 6);
  const c = digits.slice(6, 10);
  return [a, b, c].filter(Boolean).join(" ");
}

export default function AccesoPage() {
  const router = useRouter();
  const [raw, setRaw] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const isValid = digits.length === 10;

  function onPhoneChange(value: string) {
    setRaw(value.replace(/\D/g, "").slice(0, 10));
    setError(null);
  }

  async function handleContinue() {
    if (!isValid || submitting) return;
    haptic("medium");
    setSubmitting(true);
    setError(null);
    // WhatsApp MX requiere "+521" + 10 dígitos (52 país + 1 mobile + número).
    const phone = `+521${digits}`;
    const { error: sendError } = await authClient.phoneNumber.sendOtp({
      phoneNumber: phone,
    });
    setSubmitting(false);
    if (sendError) {
      haptic("error");
      setError(
        sendError.message ??
          "No pudimos enviar el código. Verifica el número e intenta de nuevo."
      );
      return;
    }
    router.push(`/acceso/codigo?to=${encodeURIComponent(phone)}`);
  }

  function handleBack() {
    haptic("selection");
    router.back();
  }

  return (
    <main className="bg-td-bg flex min-h-dvh flex-col lg:items-center lg:justify-center">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:flex-none lg:py-10">
        <div className="flex items-center px-5 pt-4 md:px-6">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Atrás"
            className="text-td-mute -ml-2 grid h-9 w-9 place-items-center rounded-full text-2xl leading-none"
          >
            ‹
          </button>
        </div>

        <div className="flex flex-1 flex-col px-5 pt-8 pb-32 md:px-6 md:pt-10 lg:flex-none lg:pb-6">
          <div className="flex justify-center">
            <NeniLogo size={44} />
          </div>

          <h1 className="mt-10 text-center text-3xl leading-tight font-semibold tracking-[-1px] md:text-4xl">
            Bienvenida de vuelta
          </h1>
          <p className="text-td-mute mx-auto mt-3 max-w-[300px] text-center text-base leading-relaxed">
            Entra con tu WhatsApp para administrar tu tienda.
          </p>

          <label className="mt-10 block">
            <span className="text-td-mute mb-2 block text-xs font-semibold tracking-[0.4px] uppercase">
              Tu WhatsApp
            </span>
            <div className="border-td-ink flex items-center gap-3 rounded-2xl border-2 bg-white px-4 py-4">
              <span className="flex items-center gap-2 border-r border-[var(--td-line)] pr-3">
                <span aria-hidden className="text-xl leading-none">
                  🇲🇽
                </span>
                <span className="font-mono text-base font-medium">+52</span>
              </span>
              <input
                autoFocus
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={formatPhone(digits)}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="55 1234 5678"
                className="text-td-ink placeholder:text-td-mute flex-1 bg-transparent text-lg font-medium tracking-[0.4px] outline-none"
              />
            </div>
          </label>

          <div className="border-td-line mt-3 flex items-start gap-3 rounded-xl border border-dashed bg-white px-4 py-3 text-sm">
            <span
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full"
              style={{ background: "#25D366" }}
            >
              <WaIcon size={14} style={{ color: "white" }} />
            </span>
            <p className="text-td-mute leading-snug">
              Te mandaremos un código de 6 dígitos por WhatsApp para confirmar
              que eres tú.
            </p>
          </div>

          {error && (
            <p className="mt-3 text-center text-sm font-medium text-[#9C3F12]">
              {error}
            </p>
          )}

          <div className="mt-8">
            <Button
              full
              size="lg"
              type="button"
              disabled={!isValid || submitting}
              onClick={handleContinue}
            >
              {submitting ? "Enviando…" : "Continuar"}
              {!submitting && <ArrowIcon size={16} />}
            </Button>
          </div>

          <p className="text-td-mute mt-10 text-center text-sm lg:mt-8">
            ¿Aún no tienes cuenta?{" "}
            <Link
              href="/onboarding"
              className="text-td-ink font-semibold underline-offset-4 hover:underline"
            >
              Crear tienda
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
