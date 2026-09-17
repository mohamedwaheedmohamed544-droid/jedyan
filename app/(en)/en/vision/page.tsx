import VisionPage from "@/components/pages/VisionPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/vision", title: "Jedyan vision", description: "Jedyan's vision, mission and values: to become the fixed point Saudi companies build their growth plans on." });

export default function Page() {
  return <VisionPage locale="en" />;
}
