import VisionPage from "@/components/pages/VisionPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "ar", path: "/vision", title: "رؤية جديان", description: "رؤية جديان ورسالتها وقيمها: أن نصبح النقطة الثابتة التي تبني عليها الشركات السعودية خططها للنمو." });

export default function Page() {
  return <VisionPage locale="ar" />;
}
