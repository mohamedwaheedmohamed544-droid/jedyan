"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings } from "@/lib/content";
import { LocalizedInput, SaveBar, MediaPicker } from "./Fields";
import { saveDocAction } from "@/app/(admin)/admin/actions";

export default function SettingsEditor({ settings: initial }: { settings: Settings }) {
  const router = useRouter();
  const [s, setS] = useState<Settings>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (patch: Partial<Settings>) => { setS({ ...s, ...patch }); setDirty(true); setSaved(false); };
  const c = s.company, seo = s.seo, integ = s.integrations;

  const plain = (label: string, value: string, on: (v: string) => void, dir: "ltr" | "rtl" = "ltr", hint?: string) => (
    <div className="a-field">
      <label>{label}</label>
      <input className="a-input" dir={dir} value={value} onChange={(e) => on(e.target.value)} />
      {hint && <span className="a-hint">{hint}</span>}
    </div>
  );

  return (
    <>
      <div className="a-head">
        <div>
          <h1>الإعدادات</h1>
          <p>بيانات الشركة والتواصل، وإعدادات محركات البحث، ووجهة الطلبات.</p>
        </div>
      </div>

      <div className="a-card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>بيانات الشركة</h2>
        <div className="a-field"><span className="a-label">اسم الشركة</span><LocalizedInput id="cn" value={c.name} onChange={(v) => set({ company: { ...c, name: v as typeof c.name } })} /></div>
        <div className="a-field"><span className="a-label">الشركة الأم</span><LocalizedInput id="cp" value={c.parent} onChange={(v) => set({ company: { ...c, parent: v as typeof c.parent } })} /></div>
        <div className="a-field"><span className="a-label">الدولة</span><LocalizedInput id="cc" value={c.country} onChange={(v) => set({ company: { ...c, country: v as typeof c.country } })} /></div>
        <div className="a-field"><span className="a-label">العنوان (اختياري)</span><LocalizedInput id="ca" value={c.address} onChange={(v) => set({ company: { ...c, address: v as typeof c.address } })} /></div>
        <div className="a-inline">
          {plain("البريد الإلكتروني", c.email, (v) => set({ company: { ...c, email: v } }))}
          {plain("الموقع الإلكتروني", c.web, (v) => set({ company: { ...c, web: v } }))}
          {plain("الهاتف (كما يظهر)", c.phoneDisplay, (v) => set({ company: { ...c, phoneDisplay: v } }))}
          {plain("الهاتف (للاتصال)", c.phoneHref, (v) => set({ company: { ...c, phoneHref: v } }), "ltr", "مثال: +966533690167")}
          {plain("إنستغرام", c.instagram, (v) => set({ company: { ...c, instagram: v } }))}
          {plain("إكس (تويتر)", c.x, (v) => set({ company: { ...c, x: v } }))}
          {plain("لينكدإن", c.linkedin, (v) => set({ company: { ...c, linkedin: v } }), "ltr", "اتركه فارغًا ليختفي من الفوتر")}
        </div>
      </div>

      <div className="a-card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>محركات البحث والمشاركة</h2>
        {plain("رابط الموقع", seo.siteUrl, (v) => set({ seo: { ...seo, siteUrl: v } }), "ltr", "يُستخدم في خريطة الموقع والروابط الأساسية")}
        <div className="a-field"><span className="a-label">اسم الموقع في العنوان</span><LocalizedInput id="ts" value={seo.titleSuffix} onChange={(v) => set({ seo: { ...seo, titleSuffix: v as typeof seo.titleSuffix } })} /></div>
        <div className="a-field"><span className="a-label">الوصف الافتراضي</span><LocalizedInput id="dd" textarea value={seo.defaultDescription} onChange={(v) => set({ seo: { ...seo, defaultDescription: v as typeof seo.defaultDescription } })} /></div>
        <div className="a-field"><span className="a-label">صورة المشاركة (Open Graph)</span><MediaPicker value={seo.ogImage} onChange={(v) => set({ seo: { ...seo, ogImage: v } })} /></div>
      </div>

      <div className="a-card">
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>الطلبات والأكواد</h2>
        {plain("البريد الذي تصله الطلبات", integ.leadEmail, (v) => set({ integrations: { ...integ, leadEmail: v } }))}
        {plain("رابط Webhook (اختياري)", integ.leadWebhook, (v) => set({ integrations: { ...integ, leadWebhook: v } }), "ltr", "لإرسال كل طلب جديد إلى نظام CRM أو Zapier")}
        <div className="a-field">
          <label>أكواد إضافية داخل &lt;head&gt; (اختياري)</label>
          <textarea className="a-textarea mono" dir="ltr" style={{ textAlign: "left" }} value={integ.headScripts} onChange={(e) => set({ integrations: { ...integ, headScripts: e.target.value } })} />
          <span className="a-hint">مثال: كود Google Analytics. يُدرج كما هو — تأكد من صحته.</span>
        </div>
      </div>

      <SaveBar dirty={dirty} saved={saved} onSave={async () => { await saveDocAction("settings", s); setDirty(false); setSaved(true); router.refresh(); }} />
    </>
  );
}
