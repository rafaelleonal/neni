import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db, stores } from "@/db";
import { eq } from "drizzle-orm";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/acceso");
  }

  // If the user already has a store, redirect to the dashboard.
  const existingStore = await db.query.stores.findFirst({
    where: eq(stores.ownerUserId, session.user.id),
  });
  if (existingStore) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
