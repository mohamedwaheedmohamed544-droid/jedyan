import Link from "next/link";
import { guard } from "@/lib/guard";
import { COLLECTIONS } from "@/lib/blocks";
import { getSite } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ContentHome() {
  await guard();
  const site = await getSite();
  const counts = site as unknown as Record<string, unknown[]>;
  return (
    <>
      <div className="a-head">
        <div>
          <h1>المحتوى والقوائم</h1>
          <p>هذه القوائم تُغذّي الأقسام التفاعلية في كل الصفحات — عدّلها مرة واحدة فتتغير أينما ظهرت.</p>
        </div>
      </div>
      <div className="a-list">
        {COLLECTIONS.map((c) => (
          <Link key={c.key} href={`/admin/content/${c.key}`} className="a-item">
            <div>
              <b>{c.label.ar}</b>
              <div className="a-sub">{c.note?.ar || `${Array.isArray(counts[c.key]) ? counts[c.key].length : 0} عنصر`}</div>
            </div>
            <span className="a-spacer" />
            <span className="a-pill muted mono">{c.key}</span>
            <span className="a-btn ghost sm">تحرير</span>
          </Link>
        ))}
        <Link href="/admin/content/messages" className="a-item">
          <div><b>الرسائل الأساسية للعلامة</b><div className="a-sub">الفكرة الكبرى، الجوهر، الوعد، التصنيف — تظهر في الواجهة والفوتر وصفحات عدة.</div></div>
          <span className="a-spacer" /><span className="a-btn ghost sm">تحرير</span>
        </Link>
        <Link href="/admin/content/foundation" className="a-item">
          <div><b>الرؤية والرسالة والقيم والركائز</b><div className="a-sub">تظهر في صفحة رؤية جديان وصفحة لماذا جديان.</div></div>
          <span className="a-spacer" /><span className="a-btn ghost sm">تحرير</span>
        </Link>
        <Link href="/admin/content/diagnosis" className="a-item">
          <div><b>نموذج التشخيص (أسئلة صفحة التواصل)</b><div className="a-sub">الأسئلة والخيارات التي يملؤها العميل قبل إرسال الطلب.</div></div>
          <span className="a-spacer" /><span className="a-btn ghost sm">تحرير</span>
        </Link>
        <Link href="/admin/content/whyExists" className="a-item">
          <div><b>لماذا وُجدت جديان (المشكلة / الدور / النتيجة)</b><div className="a-sub">قسم أساسي في الصفحة الرئيسية.</div></div>
          <span className="a-spacer" /><span className="a-btn ghost sm">تحرير</span>
        </Link>
      </div>
    </>
  );
}
