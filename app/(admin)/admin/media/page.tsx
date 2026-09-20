import { guard } from "@/lib/guard";
import { initDb, query } from "@/lib/db";
import MediaLibrary from "@/components/admin/MediaLibrary";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await guard();
  await initDb();
  const items = await query<{ id: string; filename: string; mime: string; size: number; created_at: string }>(
    "select id, filename, mime, size, created_at from media order by created_at desc"
  );
  return <MediaLibrary items={items.map((i) => ({ ...i, url: `/api/media/${i.id}` }))} />;
}
