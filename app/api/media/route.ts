import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { initDb, query } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await initDb();
  const rows = await query<{ id: string; filename: string; mime: string; size: number; created_at: string }>(
    "select id, filename, mime, size, created_at from media order by created_at desc"
  );
  return NextResponse.json({ items: rows.map((r) => ({ ...r, url: `/api/media/${r.id}` })) });
}
