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
