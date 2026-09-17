import HowWeWorkPage from "@/components/pages/HowWeWorkPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/how-we-work", title: "How we work", description: "The commerce operations journey from inbound to reporting, the client journey from diagnosis to scale, and an agreed operating rhythm." });

export default function Page() {
  return <HowWeWorkPage locale="en" />;
}
