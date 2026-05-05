"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { haptic, type HapticPattern } from "@/lib/haptics";

export async function jsonFetch<T = unknown>(
  url: string,
  init: { method: "POST" | "PATCH" | "DELETE" | "PUT"; body?: unknown }
): Promise<{
  ok: boolean;
  status: number;
  data: T | null;
  error: string | null;
}> {
  try {
    const res = await fetch(url, {
      method: init.method,
      headers: init.body ? { "Content-Type": "application/json" } : undefined,
      body: init.body ? JSON.stringify(init.body) : undefined,
    });
    const text = await res.text();
    let data: T | null = null;
    if (text) {
      try {
        data = JSON.parse(text) as T;
      } catch {
        data = null;
      }
    }
    return {
      ok: res.ok,
      status: res.status,
      data,
      error: res.ok ? null : (extractError(data) ?? `HTTP_${res.status}`),
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: err instanceof Error ? err.message : "NETWORK_ERROR",
    };
  }
}

function extractError(data: unknown): string | null {
  if (data && typeof data === "object" && "error" in data) {
    const e = (data as { error: unknown }).error;
    return typeof e === "string" ? e : null;
  }
  return null;
}

type MutationOptions = {
  refresh?: boolean;
  /** Haptic disparado al iniciar. Default "medium". */
  haptic?: HapticPattern;
};

/**
 * Standard hook for mutations (POST/PATCH/DELETE) that combine submitting,
 * error and refresh. Replaces the pattern:
 *
 * ```ts
 * const [submitting, setSubmitting] = useState(false);
 * const [error, setError] = useState<string | null>(null);
 * async function handle() {
 *   setSubmitting(true); setError(null);
 *   const res = await fetch(...);
 *   setSubmitting(false);
 *   if (!res.ok) { setError("..."); return; }
 *   router.refresh();
 * }
 * ```
 *
 * that is repeated in ~9 places. Typical usage:
 *
 * ```ts
 * const mutate = useApiMutation();
 * const onSubmit = () => mutate("/api/x", "PATCH", { foo: 1 }, {
 *   onError: () => "We couldn't save",
 * });
 * ```
 */
export function useApiMutation() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mutate<T = unknown>(
    url: string,
    method: "POST" | "PATCH" | "DELETE" | "PUT",
    body?: unknown,
    options: MutationOptions & {
      /** Devuelve un mensaje de error custom para el usuario. */
      onError?: (status: number, code: string | null) => string;
    } = {}
  ): Promise<{ ok: boolean; data: T | null }> {
    setSubmitting(true);
    setError(null);
    haptic(options.haptic ?? "medium");
    const res = await jsonFetch<T>(url, { method, body });
    setSubmitting(false);
    if (!res.ok) {
      haptic("error");
      const message = options.onError
        ? options.onError(res.status, res.error)
        : "Algo salió mal. Intenta de nuevo.";
      setError(message);
      return { ok: false, data: null };
    }
    if (options.refresh !== false) {
      router.refresh();
    }
    return { ok: true, data: res.data };
  }

  return {
    mutate,
    submitting,
    error,
    setError,
    /** Helpers para no llamar setError(null) a mano en cada onChange. */
    clearError: () => setError(null),
  };
}
