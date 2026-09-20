"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PageDoc } from "@/lib/content";
import { createPageAction, reorderPagesAction } from "@/app/(admin)/admin/actions";

export default function PagesManager({ pages: initial }: { pages: PageDoc[] }) {
  const router = useRouter();
  const [pages, setPages] = useState(initial);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ titleAr: "", titleEn: "", slug: "", template: "standard" });
  const [busy, setBusy] = useState(false);

  const move = async (i: number, dir: -1 | 1) => {
    const l = [...pages];
    const j = i + dir;
    if (j < 0 || j >= l.length) return;
    [l[i], l[j]] = [l[j], l[i]];
    setPages(l);
    await reorderPagesAction(l.map((p) => p.id));
    router.refresh();
  };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>الصفحات والأقسام</h1>
          <p>رتّب الصفحات، عدّل أقسامها، أو أضف صفحة جديدة. الترتيب هنا هو ترتيب القائمة العلوية.</p>
        </div>
        <button className="a-btn" onClick={() => setAdding((a) => !a)}>{adding ? "إلغاء" : "+ صفحة جديدة"}</button>
      </div>

      {adding && (
        <div className="a-card" style={{ marginBottom: 18 }}>
          <div className="a-inline">
            <div className="a-field"><label htmlFor="ta">اسم الصفحة (عربي)</label><input id="ta" className="a-input" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} /></div>
            <div className="a-field"><label htmlFor="te">اسم الصفحة (إنجليزي)</label><input id="te" className="a-input" dir="ltr" value={form.titleEn} onChange={(e) => setForm({ ...form, titleEn: e.target.value })} /></div>
          </div>
          <div className="a-inline">
            <div className="a-field"><label htmlFor="sl">الرابط</label><input id="sl" className="a-input" dir="ltr" placeholder="services/new-page" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div className="a-field">
              <label htmlFor="tp">القالب</label>
              <select id="tp" className="a-select" value={form.template} onChange={(e) => setForm({ ...form, template: e.target.value })}>
                <option value="standard">قالب قياسي (واجهة + نص + دعوة تواصل)</option>
                <option value="service">قالب خدمة (واجهة + شبكة + صورة ونص + دعوة)</option>
                <option value="blank">صفحة فارغة</option>
              </select>
            </div>
          </div>
          <button
            className="a-btn"
            disabled={busy || !form.titleAr || !form.slug}
            onClick={async () => { setBusy(true); await createPageAction(form); }}
          >
            إنشاء الصفحة
          </button>
        </div>
      )}

      <div className="a-list">
        {pages.map((p, i) => (
          <div key={p.id} className="a-item">
            <span className="a-move">
              <button onClick={() => move(i, -1)} aria-label="أعلى">▲</button>
              <button onClick={() => move(i, 1)} aria-label="أسفل">▼</button>
            </span>
            <div>
              <b>{p.title.ar}</b>
              <div className="a-sub mono">{p.slug} · {p.sections.length} قسم</div>
            </div>
            <span className="a-spacer" />
            {p.inNav && <span className="a-pill muted">في القائمة</span>}
            <span className={`a-pill ${p.status === "published" ? "ok" : ""}`}>{p.status === "published" ? "منشورة" : "مسودة"}</span>
            <a className="a-btn ghost sm" href={p.slug} target="_blank" rel="noopener noreferrer">معاينة</a>
            <Link className="a-btn sm" href={`/admin/pages/${p.id}`}>تحرير</Link>
          </div>
        ))}
      </div>

      <p className="a-hint" style={{ marginTop: 16 }}>
        صفحات الخدمات التفصيلية (‎/solutions/…) تُدار من <Link href="/admin/content/solutions" style={{ color: "var(--a-orange)" }}>المحتوى ← الحلول</Link>.
      </p>
    </>
  );
}
