import Link from "next/link";
import { guard } from "@/lib/guard";
import { getPages, getSite } from "@/lib/content";
import { query, initDb, dbKind } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Overview() {
  const user = await guard();
  await initDb();
  const pages = await getPages();
  const site = await getSite();
  const [{ n: leadsNew } = { n: 0 }] = await query<{ n: number }>("select count(*) as n from leads where status = 'new'");
  const [{ n: leadsAll } = { n: 0 }] = await query<{ n: number }>("select count(*) as n from leads");
  const [{ n: mediaCount } = { n: 0 }] = await query<{ n: number }>("select count(*) as n from media");
  const recent = await query<{ entity: string; entity_id: string; author: string; created_at: string }>(
    "select entity, entity_id, author, created_at from revisions order by created_at desc limit 6"
  );
  const leads = await query<{ id: string; name: string; company: string; created_at: string; status: string }>(
    "select id, name, company, created_at, status from leads order by created_at desc limit 5"
  );

  return (
    <>
      <div className="a-head">
        <div>
          <h1>أهلًا {user.name.split(" ")[0]} 👋</h1>
          <p>كل ما يظهر على موقع جديان تديره من هنا.</p>
        </div>
        <Link className="a-btn" href="/admin/pages">إدارة الصفحات</Link>
      </div>

      <div className="a-grid a-grid-3" style={{ marginBottom: 18 }}>
        <div className="a-card a-stat"><b>{pages.length}</b><span>صفحة على الموقع</span></div>
        <div className="a-card a-stat"><b>{site.solutions.length}</b><span>خدمة (صفحة تفصيلية لكل خدمة)</span></div>
        <div className="a-card a-stat"><b>{leadsNew}</b><span>طلب جديد لم يُفتح (من {leadsAll})</span></div>
        <div className="a-card a-stat"><b>{mediaCount}</b><span>ملف في المكتبة</span></div>
      </div>

      <div className="a-grid a-grid-2">
        <div className="a-card">
          <h2 style={{ fontSize: 17, marginBottom: 12 }}>أحدث الطلبات</h2>
          <div className="a-list">
            {leads.map((l) => (
              <Link key={l.id} href="/admin/leads" className="a-item">
                <div>
                  <b>{l.company || l.name || "طلب"}</b>
                  <div className="a-sub">{formatDate(l.created_at)}</div>
                </div>
                <span className="a-spacer" />
                <span className={`a-pill ${l.status === "new" ? "" : "ok"}`}>{l.status === "new" ? "جديد" : l.status === "open" ? "قيد المتابعة" : "مغلق"}</span>
              </Link>
            ))}
            {!leads.length && <p className="a-hint">لا توجد طلبات بعد. أي إرسال من نموذج التشخيص سيظهر هنا.</p>}
          </div>
        </div>

        <div className="a-card">
          <h2 style={{ fontSize: 17, marginBottom: 12 }}>آخر التعديلات</h2>
          <div className="a-list">
            {recent.map((r, i) => (
              <div key={i} className="a-item">
                <div>
                  <b>{r.entity === "page" ? "صفحة" : "محتوى"}: {r.entity_id}</b>
                  <div className="a-sub">{r.author || "—"} · {formatDate(r.created_at)}</div>
                </div>
              </div>
            ))}
            {!recent.length && <p className="a-hint">لا توجد تعديلات بعد.</p>}
          </div>
          <p className="a-hint" style={{ marginTop: 12 }}>قاعدة البيانات: {dbKind() === "postgres" ? "Postgres" : "SQLite"}</p>
        </div>
      </div>
    </>
  );
}
