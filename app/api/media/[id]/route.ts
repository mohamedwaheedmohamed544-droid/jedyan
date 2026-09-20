import { initDb, one } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await initDb();
  const row = await one<{ mime: string; bytes: Buffer | Uint8Array }>("select mime, bytes from media where id = ?", [id]);
  if (!row) return new Response("Not found", { status: 404 });
  const body = Buffer.isBuffer(row.bytes) ? row.bytes : Buffer.from(row.bytes as Uint8Array);
  return new Response(new Uint8Array(body), {
    headers: { "Content-Type": row.mime, "Cache-Control": "public, max-age=31536000, immutable", "Content-Length": String(body.length) },
  });
}
