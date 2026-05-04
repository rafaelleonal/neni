import { NextResponse } from "next/server";
import { z } from "zod";

import { db, products } from "@/db";
import { getCurrentStore } from "@/lib/seller";

const bodySchema = z.object({
  name: z.string().min(1).max(60),
  price: z.number().positive(),
  description: z.string().max(240).optional().nullable(),
  stock: z.enum(["Disponible", "Agotado"]).optional(),
  visible: z.boolean().optional(),
});

export async function POST(req: Request) {
  const { store } = await getCurrentStore();

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_BODY", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const id = crypto.randomUUID();
  const [created] = await db
    .insert(products)
    .values({
      id,
      storeId: store.id,
      name: parsed.data.name,
      price: parsed.data.price.toFixed(2),
      description: parsed.data.description ?? null,
      stock: parsed.data.stock ?? "Disponible",
      visible: parsed.data.visible ?? true,
    })
    .returning();

  return NextResponse.json({ ok: true, product: created }, { status: 201 });
}
