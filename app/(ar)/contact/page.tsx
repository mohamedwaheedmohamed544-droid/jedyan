import ContactPage from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/contact", title: "تواصل معنا — ابدأ من تشخيص عمليتك", description: "أرسل شكل طلبك وأصنافك وقنواتك، ونعود إليك بتصوّر تشغيلي أولي. info@jedyan.sa" });

export default function Page() {
  return <ContactPage locale="ar" />;
}
