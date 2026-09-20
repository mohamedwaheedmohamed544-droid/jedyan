"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings, Theme } from "@/lib/content";
import { SaveBar } from "./Fields";
import { saveDocAction } from "@/app/(admin)/admin/actions";

const COLOR_LABELS: { key: keyof Theme["colors"]; label: string; note: string }[] = [
  { key: "orange", label: "اللون الأساسي (البرتقالي)", note: "الأزرار، الروابط، التمييز" },
  { key: "orangeSoft", label: "برتقالي فاتح", note: "التدرجات والرسوم" },
  { key: "tint", label: "خلفية برتقالية فاتحة", note: "خلفيات الأقسام الهادئة" },
  { key: "ink", label: "الأسود الأساسي", note: "خلفية الأقسام الداكنة" },
  { key: "ink2", label: "أسود ثانوي", note: "النصوص والبطاقات" },
  { key: "graphite", label: "الرمادي الداكن", note: "أقسام وسيطة والشعار" },
  { key: "steel", label: "رمادي النصوص الثانوية", note: "النصوص الخافتة" },
  { key: "mist", label: "رمادي الحدود", note: "الخطوط الفاصلة" },
  { key: "paper", label: "خلفية فاتحة", note: "خلفية الصفحة" },
  { key: "paper2", label: "خلفية فاتحة ثانية", note: "الحقول والحدود" },
  { key: "white", label: "الأبيض", note: "الأقسام البيضاء" },
];

const FONTS = ["IBM Plex Sans Arabic", "Noto Kufi Arabic", "Tajawal", "Cairo", "FF Shamel Family Sans"];
const LATIN = ["IBM Plex Sans", "Inter", "Helvetica Neue", "Arial"];
const SERIF = ["EB Garamond", "Georgia", "Minion Pro", "Times New Roman"];

export default function BrandEditor({ settings: initial }: { settings: Settings }) {
  const router = useRouter();
  const [s, setS] = useState<Settings>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const th = s.theme;
  const set = (theme: Theme) => { setS({ ...s, theme }); setDirty(true); setSaved(false); };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>الهوية والتصميم</h1>
          <p>ألوان الموقع وخطوطه وأحجام العناوين والحركة. كل تغيير هنا يطبّق على الموقع كله فورًا.</p>
        </div>
      </div>

      <div className="a-card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>الألوان</h2>
        <div className="a-grid a-grid-2">
          {COLOR_LABELS.map((c) => (
            <div key={c.key} className="a-row" style={{ gap: 12 }}>
              <input
                type="color"
                value={th.colors[c.key]}
                onChange={(e) => set({ ...th, colors: { ...th.colors, [c.key]: e.target.value } })}
                style={{ width: 48, height: 40, border: "1px solid var(--a-line)", borderRadius: 8, background: "#fff", padding: 2 }}
                aria-label={c.label}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{c.label}</div>
                <div className="a-hint">{c.note}</div>
              </div>
              <span className="a-spacer" />
              <input className="a-input mono" style={{ width: 110 }} value={th.colors[c.key]} onChange={(e) => set({ ...th, colors: { ...th.colors, [c.key]: e.target.value } })} />
            </div>
          ))}
        </div>
      </div>

      <div className="a-card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>الخطوط</h2>
        <div className="a-inline">
          <div className="a-field">
            <label htmlFor="fa">الخط العربي</label>
            <select id="fa" className="a-select" value={th.fonts.ar} onChange={(e) => set({ ...th, fonts: { ...th.fonts, ar: e.target.value } })}>
              {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <span className="a-hint">لاستخدام خط مرخّص (FF Shamel) أضف ملفات الخط في المشروع ثم اخترها هنا.</span>
          </div>
          <div className="a-field">
            <label htmlFor="fe">الخط اللاتيني</label>
            <select id="fe" className="a-select" value={th.fonts.en} onChange={(e) => set({ ...th, fonts: { ...th.fonts, en: e.target.value } })}>
              {LATIN.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="a-field">
            <label htmlFor="fs">خط العناوين الإنجليزية الصغيرة</label>
            <select id="fs" className="a-select" value={th.fonts.serif} onChange={(e) => set({ ...th, fonts: { ...th.fonts, serif: e.target.value } })}>
              {SERIF.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div className="a-field">
            <label htmlFor="fm">خط البيانات (Mono)</label>
            <input id="fm" className="a-input" dir="ltr" value={th.fonts.mono} onChange={(e) => set({ ...th, fonts: { ...th.fonts, mono: e.target.value } })} />
          </div>
        </div>
      </div>

      <div className="a-card" style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>الأحجام والمسافات</h2>
        <div className="a-grid a-grid-2">
          {([
            ["h1", "حجم العنوان الرئيسي (rem)", 2, 8, 0.05],
            ["h2", "حجم عناوين الأقسام (rem)", 1.5, 5, 0.05],
            ["h3", "حجم العناوين الفرعية (rem)", 1, 3, 0.05],
            ["body", "حجم النص (rem)", 0.9, 1.5, 0.01],
            ["radius", "انحناء الحواف (px)", 0, 32, 1],
            ["maxWidth", "أقصى عرض للمحتوى (px)", 1000, 1600, 10],
            ["sectionSpace", "المسافة بين الأقسام (px)", 60, 220, 2],
          ] as const).map(([key, label, min, max, step]) => (
            <div key={key} className="a-field">
              <label htmlFor={key}>{label}</label>
              <div className="a-row">
                <input id={key} type="range" min={min} max={max} step={step} value={th.scale[key]} onChange={(e) => set({ ...th, scale: { ...th.scale, [key]: Number(e.target.value) } })} style={{ flex: 1, accentColor: "var(--a-orange)" }} />
                <span className="mono" style={{ width: 54, textAlign: "end" }}>{th.scale[key]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="a-card">
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>الحركة</h2>
        <label className="a-check" style={{ marginBottom: 10 }}>
          <input type="checkbox" checked={th.motion.enabled} onChange={(e) => set({ ...th, motion: { ...th.motion, enabled: e.target.checked } })} />
          تفعيل حركة ظهور الأقسام عند التمرير
        </label>
        <label className="a-check">
          <input type="checkbox" checked={th.motion.heroCanvas} onChange={(e) => set({ ...th, motion: { ...th.motion, heroCanvas: e.target.checked } })} />
          تفعيل الرسم المتحرك في الواجهة الرئيسية
        </label>
      </div>

      <SaveBar dirty={dirty} saved={saved} onSave={async () => { await saveDocAction("settings", s); setDirty(false); setSaved(true); router.refresh(); }} />
    </>
  );
}
