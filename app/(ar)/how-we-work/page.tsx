import HowWeWorkPage from "@/components/pages/HowWeWorkPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/how-we-work", title: "كيف نعمل", description: "رحلة تشغيل التجارة من الاستلام حتى التقارير، ورحلة العميل من التشخيص إلى التوسع، وإيقاع تشغيلي متفق عليه." });

export default function Page() {
  return <HowWeWorkPage locale="ar" />;
}
