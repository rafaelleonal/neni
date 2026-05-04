import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db, products } from "@/db";
import { getCurrentStore } from "@/lib/seller";

const patchBody = z.object({
  name: z.string().min(1).max(60).optional(),
  price: z.number().positive().optional(),
  description: z.string().max(240).nullable().optional(),
  stock: z.enum(["Disponible", "Agotado"]).optional(),
  visible: z.boolean().optional(),
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

  const updates: Record<string, unknown> = { updatedAt: new Date() };
  if (parsed.data.name !== undefined) updates.name = parsed.data.name;
  if (parsed.data.price !== undefined)
    updates.price = parsed.data.price.toFixed(2);
  if (parsed.data.description !== undefined)
    updates.description = parsed.data.description;
  if (parsed.data.stock !== undefined) updates.stock = parsed.data.stock;
  if (parsed.data.visible !== undefined) updates.visible = parsed.data.visible;

  const result = await db
    .update(products)
    .set(updates)
    .where(and(eq(products.id, id), eq(products.storeId, store.id)))
    .returning();

  if (result.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, product: result[0] });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const { store } = await getCurrentStore();

  const result = await db
    .delete(products)
    .where(and(eq(products.id, id), eq(products.storeId, store.id)))
    .returning({ id: products.id });

  if (result.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
