import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Deployment diagnostics. Never throws, never prints a secret — it only reports
 * which environment variables are present and whether the database answers.
 * Open  https://<site>/api/health  after a deploy.
 */
export async function GET() {
  const pick = (k: string) => (process.env[k] ? "set" : "missing");
  const raw =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NETLIFY_DATABASE_URL || "";

  const out: Record<string, unknown> = {
    ok: false,
    platform: process.env.NETLIFY ? "netlify" : process.env.VERCEL ? "vercel" : "node",
    node: process.version,
    env: {
      DATABASE_URL: pick("DATABASE_URL"),
      POSTGRES_URL: pick("POSTGRES_URL"),
      NETLIFY_DATABASE_URL: pick("NETLIFY_DATABASE_URL"),
      ADMIN_EMAIL: pick("ADMIN_EMAIL"),
      ADMIN_PASSWORD: pick("ADMIN_PASSWORD"),
    },
    databaseUrl: raw
      ? { scheme: raw.split(":")[0], host: (raw.split("@")[1] || "").split(/[:/?]/)[0] || "?", sslmode: /sslmode=([^&]+)/.exec(raw)?.[1] || "none" }
      : null,
  };

  if (!raw) {
    out.error =
      "No database URL. Add DATABASE_URL in the site's environment variables (All scopes / All deploy contexts) and redeploy.";
    return NextResponse.json(out, { status: 500 });
  }
  if (!/^postgres(ql)?:\/\//.test(raw)) {
    out.error = "The database URL must start with postgres:// or postgresql://.";
    return NextResponse.json(out, { status: 500 });
  }

  try {
    const { initDb, query, dbKind } = await import("@/lib/db");
    await initDb();
    const rows = await query<{ n: number }>("select count(*) as n from pages");
    out.ok = true;
    out.driver = dbKind();
    out.pages = Number(rows[0]?.n ?? 0);
    const { getSite } = await import("@/lib/content");
    const site = await getSite();
    out.seeded = !!site;
    return NextResponse.json(out);
  } catch (e) {
    out.error = e instanceof Error ? e.message : String(e);
    out.stage = "database";
    return NextResponse.json(out, { status: 500 });
  }
}
