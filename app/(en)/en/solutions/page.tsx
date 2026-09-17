import SolutionsIndex from "@/components/pages/SolutionsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/solutions", title: "Logistics solutions", description: "Six pillars, one journey: warehousing & inventory, fulfillment, commerce connect, distribution & carrier management, returns & VAS, and enterprise managed logistics." });

export default function Page() {
  return <SolutionsIndex locale="en" />;
}
