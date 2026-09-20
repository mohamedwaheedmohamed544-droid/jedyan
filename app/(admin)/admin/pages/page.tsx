import { guard } from "@/lib/guard";
import { getPages } from "@/lib/content";
import PagesManager from "@/components/admin/PagesManager";

export const dynamic = "force-dynamic";

export default async function PagesList() {
  await guard();
  const pages = await getPages();
  return <PagesManager pages={pages} />;
}
