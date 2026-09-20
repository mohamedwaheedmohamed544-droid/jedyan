import { NextResponse } from "next/server";
import { initDb, exec, enc, uid } from "@/lib/db";
import { getSite } from "@/lib/content";

export const dynamic = "force-dynamic";

/** Public endpoint used by the diagnosis form. Stores the lead and optionally forwards it. */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      locale?: string;
      contact?: { name?: string; company?: string; email?: string; phone?: string; notes?: string };
      answers?: { q: string; a: string }[];
      website?: string; // honeypot
    };
    if (body.website) return NextResponse.json({ ok: true }); // silent drop for bots
    const c = body.contact || {};
    if (!c.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    await initDb();
    const id = uid("ld_");
    await exec(
      "insert into leads (id, status, locale, name, company, email, phone, notes, answers) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, "new", body.locale === "en" ? "en" : "ar", c.name || "", c.company || "", c.email, c.phone || "", c.notes || "", enc(body.answers || [])]
    );

    const site = await getSite();
    const hook = site.settings.integrations.leadWebhook;
    if (hook) {
      try {
        await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...body }) });
      } catch { /* the lead is already stored; forwarding is best-effort */ }
    }
    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
