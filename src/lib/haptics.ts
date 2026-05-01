"use client";

import { useEffect } from "react";

/**
 * Haptic feedback helper based on the browser Vibration API.
 *
 * Notes:
 * - Works on Android Chrome / Firefox / Edge.
 * - **iOS Safari does NOT support `navigator.vibrate()`** (Apple removed it in
 *   2017). Calls there are silent no-ops.
 * - Always best-effort: if the API is missing the call simply does nothing.
 */

export type HapticPattern =
  | "selection"
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "error";

const PATTERNS: Record<HapticPattern, number | number[]> = {
  selection: 5,
  light: 10,
  medium: 20,
  heavy: 35,
  success: [10, 50, 30],
  error: [60, 80, 60],
};

export function haptic(pattern: HapticPattern = "light"): void {
  if (typeof window === "undefined") return;
  const v = window.navigator.vibrate;
  if (typeof v !== "function") return;
  try {
    window.navigator.vibrate(PATTERNS[pattern]);
  } catch {
    // Ignore — some browsers throw when vibration is disabled by user setting.
  }
}

/**
 * Fire a haptic pulse once when the component mounts. Useful for "you just
 * arrived at a success screen" moments.
 */
export function HapticOnMount({
  pattern = "success",
}: {
  pattern?: HapticPattern;
}) {
  useEffect(() => {
    haptic(pattern);
  }, [pattern]);
  return null;
}
