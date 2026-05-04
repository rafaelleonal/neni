import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db, stores } from "@/db";
import { getCurrentStore } from "@/lib/seller";

const PAYMENT_IDS = ["card", "oxxo", "spei", "cash"] as const;

const patchBody = z.object({
  name: z.string().min(1).max(60).optional(),
  description: z.string().max(160).nullable().optional(),
  isOpen: z.boolean().optional(),
  categories: z.array(z.string().min(1).max(40)).max(20).optional(),
  payments: z.array(z.enum(PAYMENT_IDS)).min(1).optional(),
});

export async function PATCH(req: Request) {
  const { store } = await getCurrentStore();

  const json = await req.json().catch(() => null);
  const parsed = patchBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_BODY", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (parsed.data.name !== undefined) updates.name = parsed.data.name.trim();
  if (parsed.data.description !== undefined) {
    updates.description = parsed.data.description?.trim() || null;
  }
  if (parsed.data.isOpen !== undefined) updates.isOpen = parsed.data.isOpen;
  if (parsed.data.categories !== undefined) {
    // Trim, dedupe (case-insensitive), preserve order.
    const seen = new Set<string>();
    const cleaned: string[] = [];
    for (const raw of parsed.data.categories) {
      const trimmed = raw.trim();
      const key = trimmed.toLowerCase();
      if (trimmed.length === 0 || seen.has(key)) continue;
      seen.add(key);
      cleaned.push(trimmed);
    }
    updates.categories = cleaned;
  }
  if (parsed.data.payments !== undefined) {
    updates.payments = parsed.data.payments;
  }

  const result = await db
    .update(stores)
    .set(updates)
    .where(eq(stores.id, store.id))
    .returning();

  return NextResponse.json({ ok: true, store: result[0] });
}
