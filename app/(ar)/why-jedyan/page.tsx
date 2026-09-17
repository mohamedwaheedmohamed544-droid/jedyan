import WhyPage from "@/components/pages/WhyPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/why-jedyan", title: "لماذا جديان", description: "ستة أسباب تجعل جديان شريك تشغيل يُعتمد عليه: السياق السعودي، الانضباط التشغيلي، المرونة، الأداء القابل للقياس، التوسع، والشراكة طويلة المدى." });

export default function Page() {
  return <WhyPage locale="ar" />;
}
