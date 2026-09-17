import AboutPage from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/about", title: "من نحن", description: "شركة سعودية تدير ما يحدث بين الطلب ووصوله: طبقة تشغيل موحّدة للمخزون والطلب والحركة والبيانات." });

export default function Page() {
  return <AboutPage locale="ar" />;
}
