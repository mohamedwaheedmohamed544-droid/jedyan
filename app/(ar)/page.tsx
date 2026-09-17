import HomePage from "@/components/pages/HomePage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  locale: "ar",
  path: "/",
  title: "نُحرّك الأعمال — منظومة تشغيل التجارة",
  description: "جديان للخدمات اللوجستية: شريك منظومة تشغيل التجارة في السعودية — التخزين وإدارة المخزون، تنفيذ الطلبات، ربط التجارة الإلكترونية، التوزيع وإدارة الناقلين، والمرتجعات، تحت مسؤولية تشغيلية واحدة.",
});

export default function Page() {
  return <HomePage locale="ar" />;
}
