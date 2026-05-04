import type { ProductTone } from "@/components/product-placeholder";

const TONES: ProductTone[] = ["warm", "sand", "cream"];

/**
 * Tono determinista derivado del id de producto. Mismo id → mismo tono entre
 * renders y entre listas/editor.
 */
export function toneFromId(id: string): ProductTone {
  if (id.length === 0) return TONES[0]!;
  const code = id.charCodeAt(0) + id.charCodeAt(id.length - 1);
  return TONES[code % TONES.length]!;
}
