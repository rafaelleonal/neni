import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price as a string with 2 decimal places.
 * @param n - The price as a number.
 * @returns The formatted price.
 */
export function formatPrice(n: number): string {
  return `$${n.toLocaleString("es-MX", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/**
 * Format a phone number as "55 1234 5678".
 * @param digits - The phone number as a string.
 * @returns The formatted phone number.
 */
export function formatPhone(digits: string): string {
  return digits
    .replace(/\D/g, "")
    .slice(0, 10)
    .replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2 $3");
}
/**
 * Convert a business name into a URL-safe slug.
 * Lowercases, removes diacritics, and strips non-alphanumeric chars.
 */
export function toSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/** "Just now" / "5 min ago" / "3 h ago" / "2 d ago" / "5 may". */
export function formatRelativeTime(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Hace un momento";
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days} d`;
  return date.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
}

/** First word of the name (before the first space). */
export function firstWord(name: string): string {
  return name.trim().split(/\s+/)[0] ?? name;
}

/** Initials of a name: "Tacos Don Memo" → "TM". */
export function nameToInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

/** URL `https://wa.me/{digits}?text=...` with correct encoding. */
export function buildWhatsappUrl(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
