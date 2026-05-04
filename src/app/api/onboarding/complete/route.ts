import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { toSlug } from "@/lib/utils";
import { auth } from "@/auth";
import { db, products, stores } from "@/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const bodySchema = z.object({
  businessName: z.string().min(1).max(60),
  category: z.string().min(1).max(40),
  productName: z.string().min(1).max(60),
  productPrice: z.number().positive(),
});

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "INVALID_BODY", issues: parsed.error.issues },
      { status: 400 }
    );
  }
  const { businessName, category, productName, productPrice } = parsed.data;

  // For now, prevent creating another store if the user already has one (1 store = 1 user).
  const existing = await db.query.stores.findFirst({
    where: eq(stores.ownerUserId, session.user.id),
  });
  if (existing) {
    return NextResponse.json(
      { error: "STORE_ALREADY_EXISTS", slug: existing.slug },
      { status: 409 }
    );
  }

  // Generate a unique slug — if it's taken, add a numeric suffix.
  const baseSlug = toSlug(businessName) || "tienda";
  let slug = baseSlug;
  for (let attempt = 1; attempt < 50; attempt++) {
    const taken = await db.query.stores.findFirst({
      where: eq(stores.slug, slug),
    });
    if (!taken) break;
    slug = `${baseSlug}-${attempt + 1}`;
  }

  const storeId = crypto.randomUUID();
  await db.insert(stores).values({
    id: storeId,
    ownerUserId: session.user.id,
    slug,
    name: businessName,
    category,
  });

  await db.insert(products).values({
    id: crypto.randomUUID(),
    storeId,
    name: productName,
    price: productPrice.toFixed(2),
  });

  return NextResponse.json({ ok: true, slug });
}
