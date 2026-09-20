import { guard } from "@/lib/guard";
import { getSite } from "@/lib/content";
import SettingsEditor from "@/components/admin/SettingsEditor";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await guard();
  const site = await getSite();
  return <SettingsEditor settings={site.settings} />;
}
