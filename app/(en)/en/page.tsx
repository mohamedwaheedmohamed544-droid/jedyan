import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  locale: "en",
  path: "/",
  title: "We move business — Commerce Operations",
  description: "Jedyan Logistics is a Saudi commerce operations partner — warehousing & inventory, fulfillment, commerce connect, distribution & carrier management, and returns, under one operating accountability.",
});

export default function Page() {
  return <HomePage locale="en" />;
}
