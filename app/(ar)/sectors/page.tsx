import SectorsPage from "@/components/pages/SectorsPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/sectors", title: "القطاعات ومن نخدم", description: "نخدم الحسابات المؤسسية والمتاجر الإلكترونية والعلامات الرقمية وبائعي المنصات، في قطاعات الأزياء والجمال والإلكترونيات والهدايا وقطع الغيار وغيرها." });

export default function Page() {
  return <SectorsPage locale="ar" />;
}
