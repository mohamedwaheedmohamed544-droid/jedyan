"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PageDoc, Section } from "@/lib/content";
import { BLOCKS, GROUP_LABEL, blockDef, type BlockDef } from "@/lib/blocks";
import { FieldInput, LocalizedInput, SaveBar } from "./Fields";
import { savePageAction, deletePageAction } from "@/app/(admin)/admin/actions";

const uid = () => "s_" + Math.random().toString(36).slice(2, 9);

export default function PageEditor({ page: initial }: { page: PageDoc }) {
  const router = useRouter();
  const [page, setPage] = useState<PageDoc>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState<string | null>(page.sections[0]?.id ?? null);
  const [picker, setPicker] = useState(false);
  const [tab, setTab] = useState<"sections" | "settings">("sections");

  const set = (patch: Partial<PageDoc>) => { setPage((p) => ({ ...p, ...patch })); setDirty(true); setSaved(false); };
  const setSections = (sections: Section[]) => set({ sections });
  const patchSection = (id: string, patch: Partial<Section>) => setSections(page.sections.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const move = (i: number, dir: -1 | 1) => {
    const l = [...page.sections];
    const j = i + dir;
    if (j < 0 || j >= l.length) return;
    [l[i], l[j]] = [l[j], l[i]];
    setSections(l);
  };

  const grouped = useMemo(() => {
    const g: Record<string, BlockDef[]> = {};
    for (const b of BLOCKS) (g[b.group] ||= []).push(b);
    return g;
  }, []);

  const save = async () => {
    await savePageAction(page);
    setDirty(false);
    setSaved(true);
    router.refresh();
  };

  return (
    <>
      <div className="a-head">
        <div>
          <p className="muted" style={{ fontSize: 13 }}><Link href="/admin/pages">الصفحات</Link> / {page.title.ar}</p>
          <h1>{page.title.ar || "صفحة بدون اسم"}</h1>
          <p className="mono">{page.slug}</p>
        </div>
        <div className="a-row">
          <a className="a-btn ghost" href={page.slug} target="_blank" rel="noopener noreferrer">معاينة الصفحة</a>
          <button className={`a-btn ${page.status === "published" ? "ghost" : ""}`} onClick={() => set({ status: page.status === "published" ? "draft" : "published" })}>
            {page.status === "published" ? "منشورة — اجعلها مسودة" : "مسودة — انشرها"}
          </button>
        </div>
      </div>

      <div className="a-row" style={{ marginBottom: 16 }}>
        <button className={`a-btn ${tab === "sections" ? "dark" : "ghost"} sm`} onClick={() => setTab("sections")}>الأقسام ({page.sections.length})</button>
        <button className={`a-btn ${tab === "settings" ? "dark" : "ghost"} sm`} onClick={() => setTab("settings")}>إعدادات الصفحة و SEO</button>
      </div>

      {tab === "settings" ? (
        <div className="a-card">
          <div className="a-field">
            <span className="a-label">اسم الصفحة (يظهر في القائمة)</span>
            <LocalizedInput id="ttl" value={page.title} onChange={(v) => set({ title: v as PageDoc["title"] })} />
          </div>
          <div className="a-field">
            <label htmlFor="slug">الرابط</label>
            <input id="slug" className="a-input" dir="ltr" value={page.slug} onChange={(e) => set({ slug: e.target.value.startsWith("/") ? e.target.value : "/" + e.target.value })} />
            <span className="a-hint">مثال: ‎/about — الصفحة الرئيسية تكون ‎/ فقط.</span>
          </div>
          <label className="a-check" style={{ marginBottom: 14 }}>
            <input type="checkbox" checked={page.inNav} onChange={(e) => set({ inNav: e.target.checked })} /> إظهار الصفحة في القائمة العلوية
          </label>
          <div className="a-field">
            <span className="a-label">عنوان SEO</span>
            <LocalizedInput id="seot" value={page.seo.title} onChange={(v) => set({ seo: { ...page.seo, title: v as PageDoc["seo"]["title"] } })} />
          </div>
          <div className="a-field">
            <span className="a-label">وصف SEO</span>
            <LocalizedInput id="seod" textarea value={page.seo.description} onChange={(v) => set({ seo: { ...page.seo, description: v as PageDoc["seo"]["description"] } })} />
          </div>
          <button
            className="a-btn danger"
            onClick={async () => {
              if (!confirm("حذف الصفحة نهائيًا؟")) return;
              await deletePageAction(page.id);
              router.push("/admin/pages");
            }}
          >
            حذف الصفحة
          </button>
        </div>
      ) : (
        <div className="a-sections">
          {page.sections.map((sec, i) => {
            const def = blockDef(sec.type);
            const isOpen = open === sec.id;
            return (
              <div key={sec.id} className={`a-section ${sec.visible === false ? "off" : ""}`}>
                <div className="a-section-head" onClick={() => setOpen(isOpen ? null : sec.id)}>
                  <span className="a-move" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => move(i, -1)} aria-label="أعلى">▲</button>
                    <button onClick={() => move(i, 1)} aria-label="أسفل">▼</button>
                  </span>
                  <div>
                    <b>{def?.label.ar || sec.type}</b>
                    <div className="a-type">{sec.type}</div>
                  </div>
                  <span className="a-spacer" />
                  {sec.visible === false && <span className="a-pill muted">مخفي</span>}
                  <button
                    className="a-btn ghost sm"
                    onClick={(e) => { e.stopPropagation(); patchSection(sec.id, { visible: sec.visible === false }); }}
                  >
                    {sec.visible === false ? "إظهار" : "إخفاء"}
                  </button>
                  <button
                    className="a-btn danger sm"
                    onClick={(e) => { e.stopPropagation(); if (confirm("حذف هذا القسم من الصفحة؟")) setSections(page.sections.filter((x) => x.id !== sec.id)); }}
                  >
                    حذف
                  </button>
                  <span style={{ width: 18, textAlign: "center" }}>{isOpen ? "–" : "+"}</span>
                </div>

                {isOpen && (
                  <div className="a-section-body">
                    {def?.note && <p className="a-hint" style={{ marginBottom: 10 }}>{def.note.ar}</p>}
                    {def?.collection && (
                      <p className="a-hint" style={{ marginBottom: 10 }}>
                        محتوى هذا القسم يأتي من قائمة مشتركة —{" "}
                        <Link href={`/admin/content/${def.collection}`} style={{ color: "var(--a-orange)", fontWeight: 600 }}>تحرير القائمة</Link>
                      </p>
                    )}
                    {def?.fields.map((f) => (
                      <FieldInput
                        key={f.key}
                        field={f}
                        value={sec.props?.[f.key]}
                        onChange={(v) => patchSection(sec.id, { props: { ...sec.props, [f.key]: v } })}
                      />
                    ))}
                    {!def && <p className="a-hint">نوع قسم غير معروف: {sec.type}</p>}
                  </div>
                )}
              </div>
            );
          })}

          <button className="a-btn ghost" onClick={() => setPicker((p) => !p)}>+ إضافة قسم</button>

          {picker && (
            <div className="a-card">
              {Object.entries(grouped).map(([g, list]) => (
                <div key={g} style={{ marginBottom: 14 }}>
                  <p className="a-label" style={{ marginBottom: 8 }}>{GROUP_LABEL[g as BlockDef["group"]].ar}</p>
                  <div className="a-row">
                    {list.map((b) => (
                      <button
                        key={b.type}
                        className="a-btn ghost sm"
                        onClick={() => {
                          const sec: Section = { id: uid(), type: b.type, visible: true, props: {} };
                          setSections([...page.sections, sec]);
                          setOpen(sec.id);
                          setPicker(false);
                        }}
                      >
                        {b.label.ar}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <SaveBar onSave={save} dirty={dirty} saved={saved} extra={<span className="muted" style={{ fontSize: 13 }}>التعديلات تظهر على الموقع مباشرة بعد الحفظ.</span>} />
    </>
  );
}
