import { guard } from "@/lib/guard";
import { getSite } from "@/lib/content";
import BrandEditor from "@/components/admin/BrandEditor";

export const dynamic = "force-dynamic";

export default async function BrandPage() {
  await guard();
  const site = await getSite();
  return <BrandEditor settings={site.settings} />;
}
