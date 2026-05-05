import { NextResponse } from "next/server";
import { notifyBuyerStateChange } from "@/lib/notifications";
import { getCurrentStore } from "@/lib/seller";
import { db, orders } from "@/db";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const patchBody = z.object({
  state: z.enum(["nuevo", "preparando", "camino", "entregado", "cancelado"]),
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

  const [updated] = await db
    .update(orders)
    .set({ state: parsed.data.state })
    .where(and(eq(orders.id, id), eq(orders.storeId, store.id)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  void notifyBuyerStateChange({
    buyerPhone: updated.customerPhone,
    storeName: store.name,
    storeSlug: store.slug,
    orderId: updated.id,
    orderNumber: updated.number,
    state: parsed.data.state,
    plan: store.plan,
  }).catch((err) => {
    console.warn("[orders:notify-buyer] background failure:", err);
  });

  return NextResponse.json({ ok: true, order: updated });
}
