"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const isValid = digits.length === 10;

  function onPhoneChange(value: string) {
    setRaw(value.replace(/\D/g, "").slice(0, 10));
  }

  function handleContinue() {
    if (!isValid) return;
    haptic("medium");
    // TODO: pedir OTP por WhatsApp. Por ahora, simulamos sesión iniciada.
    console.log("Login con WhatsApp:", `+52${digits}`);
    router.push("/dashboard");
  }

  function handleGoogle() {
    haptic("light");
    // TODO: integrar OAuth Google.
    console.log("Login con Google");
    router.push("/dashboard");
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

          <div className="mt-8">
            <Button
              full
              size="lg"
              type="button"
              disabled={!isValid}
              onClick={handleContinue}
            >
              Continuar
              <ArrowIcon size={16} />
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="bg-td-line h-px flex-1" />
            <span className="text-td-mute text-xs">o</span>
            <span className="bg-td-line h-px flex-1" />
          </div>

          <Button
            full
            size="lg"
            variant="white"
            type="button"
            onClick={handleGoogle}
          >
            <GoogleGlyph />
            Continuar con Google
          </Button>

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

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.61z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.81 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.32A9 9 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.71a5.41 5.41 0 0 1 0-3.42V4.97H.96a9 9 0 0 0 0 8.06l3.01-2.32z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.97l3.01 2.32C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
