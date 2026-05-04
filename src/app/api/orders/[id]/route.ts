import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db, orders } from "@/db";
import { getCurrentStore } from "@/lib/seller";

const patchBody = z.object({
  state: z.enum([
    "nuevo",
    "preparando",
    "camino",
    "entregado",
    "cancelado",
  ]),
});

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { store } = await getCurrentStore();

  const json = await req.json().catch(() => null);
  const parsed = patchBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_BODY", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const result = await db
    .update(orders)
    .set({ state: parsed.data.state })
    .where(and(eq(orders.id, id), eq(orders.storeId, store.id)))
    .returning();

  if (result.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, order: result[0] });
}
