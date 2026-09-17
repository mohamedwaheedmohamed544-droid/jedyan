import SolutionsIndex from "@/components/pages/SolutionsIndex";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/solutions", title: "حلولنا اللوجستية", description: "ستة محاور تبني رحلة واحدة: التخزين وإدارة المخزون، تنفيذ الطلبات، ربط التجارة الإلكترونية، التوزيع وإدارة الناقلين، المرتجعات والخدمات المضافة، والتشغيل المؤسسي المُدار." });

export default function Page() {
  return <SolutionsIndex locale="ar" />;
}
