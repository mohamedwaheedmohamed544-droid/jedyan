import AboutPage from "@/components/pages/AboutPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ locale: "en", path: "/about", title: "About Jedyan", description: "A Saudi company running everything between an order and its arrival: one operating layer for inventory, orders, movement and data." });

export default function Page() {
  return <AboutPage locale="en" />;
}
