import SectorsPage from "@/components/pages/SectorsPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/sectors", title: "Sectors & clients", description: "We serve enterprise accounts, e-commerce, digital brands and marketplace sellers across fashion, beauty, electronics, gifts, spare parts and more." });

export default function Page() {
  return <SectorsPage locale="en" />;
}
