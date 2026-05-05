import { getCurrentStore } from "@/lib/seller";

import { PlanComparison } from "./_components/plan-comparison";

export default async function PlanPage() {
  const { store } = await getCurrentStore();
  return <PlanComparison currentPlan={store.plan} />;
}
