import ContactPage from "@/components/pages/ContactPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/contact", title: "Contact — start with a diagnosis", description: "Share your order profile, SKUs and channels and we'll come back with an initial operating model. info@jedyan.sa" });

export default function Page() {
  return <ContactPage locale="en" />;
}
