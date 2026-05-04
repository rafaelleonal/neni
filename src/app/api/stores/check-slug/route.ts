import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db, stores } from "@/db";
import { toSlug } from "@/lib/utils";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = url.searchParams.get("name") ?? url.searchParams.get("slug") ?? "";
  const slug = toSlug(raw);
  if (!slug) {
    return NextResponse.json({ slug: "", available: false });
  }
  const taken = await db.query.stores.findFirst({
    where: eq(stores.slug, slug),
  });
  return NextResponse.json({ slug, available: !taken });
}
