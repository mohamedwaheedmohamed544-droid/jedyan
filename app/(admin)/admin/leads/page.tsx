import { guard } from "@/lib/guard";
import { initDb, query, dec } from "@/lib/db";
import LeadsInbox from "@/components/admin/LeadsInbox";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await guard();
  await initDb();
  const rows = await query<{ id: string; created_at: string; status: string; locale: string; name: string; company: string; email: string; phone: string; notes: string; answers: unknown; internal_note: string }>(
    "select * from leads order by created_at desc limit 500"
  );
  const leads = rows.map((r) => ({ ...r, answers: dec<{ q: string; a: string }[]>(r.answers, []) }));
  return <LeadsInbox leads={leads} />;
}
