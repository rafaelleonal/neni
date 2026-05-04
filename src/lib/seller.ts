import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db, stores } from "@/db";
import { eq } from "drizzle-orm";

/**
 * Gets the session and `store` of the logged-in user.
 *
 * If there is no session, redirect to `/access`.
 * If there is a session but the user hasn't created a store, redirect to `/onboarding`.
 *
 * Designed to be used in any route in the `(seller)/*` group. The layout already
 * makes the same check, but calling it here eliminates any type friction
 * (we will always have `session` and `store` defined when returning).
 */
export async function getCurrentStore() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/acceso");

  const store = await db.query.stores.findFirst({
    where: eq(stores.ownerUserId, session.user.id),
  });
  if (!store) redirect("/onboarding");

  return { session, store };
}

/**
 * Utility function to get the initials of a name.
 * Example: "Tacos Don Memo" → "TM"
 */
export function nameToInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
