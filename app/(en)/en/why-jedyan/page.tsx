import WhyPage from "@/components/pages/WhyPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/why-jedyan", title: "Why Jedyan", description: "Six reasons Jedyan is a reliable operating partner: Saudi context, operational discipline, flexibility, measurable performance, scalability and long-term partnership." });

export default function Page() {
  return <WhyPage locale="en" />;
}
