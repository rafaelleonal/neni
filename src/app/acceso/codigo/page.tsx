"use client";

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { haptic } from "@/lib/haptics";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/neni-icons";
import { NeniLogo } from "@/components/neni-logo";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function AccesoCodigoPage() {
  return (
    <Suspense fallback={null}>
      <AccesoCodigoContent />
    </Suspense>
  );
}

function AccesoCodigoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams?.get("to") ?? "";

  const [digits, setDigits] = useState<string[]>(() =>
    Array(OTP_LENGTH).fill("")
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!phone) {
      router.replace("/acceso");
    }
  }, [phone, router]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setInterval(() => setResendIn((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendIn]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const code = digits.join("");
  const isValid = code.length === OTP_LENGTH && /^\d{6}$/.test(code);

  function setDigit(index: number, value: string) {
    setError(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function handleChange(index: number, raw: string) {
    const clean = raw.replace(/\D/g, "");
    if (clean.length === 0) {
      setDigit(index, "");
      return;
    }
    // Si pegaron varios dígitos, repartirlos entre los slots restantes.
    if (clean.length > 1) {
      const chunk = clean.slice(0, OTP_LENGTH - index).split("");
      setDigits((prev) => {
        const next = [...prev];
        chunk.forEach((d, i) => {
          next[index + i] = d;
        });
        return next;
      });
      const lastFilled = Math.min(index + chunk.length, OTP_LENGTH - 1);
      inputsRef.current[lastFilled]?.focus();
      return;
    }
    setDigit(index, clean);
    haptic("selection");
    if (index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && digits[index] === "" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
      setDigit(index - 1, "");
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (text.length === 0) return;
    e.preventDefault();
    const chunk = text.slice(0, OTP_LENGTH).split("");
    setDigits(() => {
      const next = Array(OTP_LENGTH).fill("");
      chunk.forEach((d, i) => {
        next[i] = d;
      });
      return next;
    });
    const lastFilled = Math.min(chunk.length, OTP_LENGTH) - 1;
    inputsRef.current[lastFilled]?.focus();
  }

  async function handleSubmit() {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError(null);
    const { error: verifyError } = await authClient.phoneNumber.verify({
      phoneNumber: phone,
      code,
    });
    setSubmitting(false);
    if (verifyError) {
      haptic("error");
      setError(
        verifyError.message === "INVALID_OTP" ||
          verifyError.code === "INVALID_OTP"
          ? "Código incorrecto. Intenta de nuevo."
          : verifyError.message === "OTP_EXPIRED" ||
              verifyError.code === "OTP_EXPIRED"
            ? "El código expiró. Pide uno nuevo."
            : (verifyError.message ?? "No pudimos verificar el código.")
      );
      setDigits(Array(OTP_LENGTH).fill(""));
      inputsRef.current[0]?.focus();
      return;
    }
    haptic("success");
    // El (seller)/layout decidirá si va a /dashboard o /onboarding.
    router.push("/dashboard");
  }

  async function handleResend() {
    if (resendIn > 0 || submitting) return;
    haptic("light");
    setError(null);
    const { error: sendError } = await authClient.phoneNumber.sendOtp({
      phoneNumber: phone,
    });
    if (sendError) {
      haptic("error");
      setError(
        sendError.message ?? "No pudimos reenviar el código. Intenta más tarde."
      );
      return;
    }
    setResendIn(RESEND_SECONDS);
  }

  return (
    <main className="bg-td-bg flex min-h-dvh flex-col lg:items-center lg:justify-center">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col lg:flex-none lg:py-10">
        <div className="flex items-center px-5 pt-4 md:px-6">
          <BackButton href="/acceso" />
        </div>

        <div className="flex flex-1 flex-col px-5 pt-8 pb-32 md:px-6 md:pt-10 lg:flex-none lg:pb-6">
          <div className="flex justify-center">
            <NeniLogo size={40} />
          </div>

          <h1 className="mt-10 text-center text-3xl leading-tight font-semibold tracking-[-1px] md:text-4xl">
            Ingresa el código
          </h1>
          <p className="text-td-mute mx-auto mt-3 max-w-[300px] text-center text-base leading-relaxed">
            Te mandamos un código de 6 dígitos a{" "}
            <span className="text-td-ink font-medium">{phone}</span>.
          </p>

          <div className="mt-10 flex justify-center gap-2">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                value={d}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                aria-label={`Dígito ${i + 1}`}
                className={
                  "border-td-line focus:border-td-ink h-14 w-12 rounded-2xl border-2 bg-white text-center font-mono text-xl font-semibold outline-none transition-colors md:h-16 md:w-14"
                }
              />
            ))}
          </div>

          {error && (
            <p className="mt-4 text-center text-sm font-medium text-[#9C3F12]">
              {error}
            </p>
          )}

          <div className="text-td-mute mt-6 text-center text-sm">
            {resendIn > 0 ? (
              <>Reenviar en {String(resendIn).padStart(2, "0")} s</>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-td-ink font-semibold underline-offset-4 hover:underline"
              >
                Reenviar código
              </button>
            )}
          </div>

          <div className="mt-8">
            <Button
              full
              size="lg"
              type="button"
              disabled={!isValid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Verificando…" : "Continuar"}
              {!submitting && <ArrowIcon size={16} />}
            </Button>
          </div>

          <p className="text-td-mute mt-8 text-center text-sm">
            ¿Número equivocado?{" "}
            <Link
              href="/acceso"
              className="text-td-ink font-semibold underline-offset-4 hover:underline"
            >
              Cambiar número
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
