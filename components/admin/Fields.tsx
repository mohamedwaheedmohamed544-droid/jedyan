"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useState } from "react";
import type { Field } from "@/lib/blocks";
import { uploadMediaAction } from "@/app/(admin)/admin/actions";

type Val = unknown;
type Setter = (v: Val) => void;
const isT = (v: unknown): v is { ar: string; en: string } => typeof v === "object" && v !== null && ("ar" in v || "en" in v);

export function LocalizedInput({ value, onChange, textarea, id }: { value: unknown; onChange: Setter; textarea?: boolean; id: string }) {
  const v = isT(value) ? value : { ar: typeof value === "string" ? value : "", en: "" };
  const C = textarea ? "textarea" : "input";
  return (
    <div className="a-lang">
      <div>
        <span className="a-tag">العربية</span>
        <C id={id} className={textarea ? "a-textarea" : "a-input"} value={v.ar || ""} dir="rtl" onChange={(e) => onChange({ ...v, ar: (e.target as HTMLInputElement).value })} />
      </div>
      <div>
        <span className="a-tag">ENGLISH</span>
        <C id={`${id}-en`} className={textarea ? "a-textarea" : "a-input"} value={v.en || ""} dir="ltr" onChange={(e) => onChange({ ...v, en: (e.target as HTMLInputElement).value })} />
      </div>
    </div>
  );
}

export function MediaPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [items, setItems] = useState<{ id: string; filename: string; url: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open) return;
    fetch("/api/media")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch(() => setItems([]));
  }, [open, busy]);

  const upload = async (file: File) => {
    setBusy(true); setErr("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadMediaAction(fd);
    setBusy(false);
    if (res.error) setErr(res.error);
    else if (res.url) onChange(res.url);
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div className="a-row">
        {value ? <img src={value} alt="" style={{ width: 92, height: 68, objectFit: "cover", borderRadius: 8, border: "1px solid var(--a-line)" }} /> : <span className="muted" style={{ fontSize: 13 }}>لا توجد صورة</span>}
        <button type="button" className="a-btn ghost sm" onClick={() => setOpen((o) => !o)}>{open ? "إغلاق المكتبة" : "اختر من المكتبة"}</button>
        <label className="a-btn ghost sm" style={{ cursor: "pointer" }}>
          رفع صورة
          <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
        {value && <button type="button" className="a-btn danger sm" onClick={() => onChange("")}>إزالة</button>}
      </div>
      {busy && <p className="a-hint">جارٍ الرفع…</p>}
      {err && <p className="a-error">{err}</p>}
      {open && (
        <div className="a-media">
          {items.map((m) => (
            <figure key={m.id} onClick={() => { onChange(m.url); setOpen(false); }} style={{ cursor: "pointer" }}>
              <img src={m.url} alt={m.filename} />
              <figcaption className="mono">{m.filename.slice(0, 18)}</figcaption>
            </figure>
          ))}
          {!items.length && <p className="a-hint">المكتبة فارغة — ارفع صورة أولًا.</p>}
        </div>
      )}
    </div>
  );
}

export function FieldInput({ field, value, onChange }: { field: Field; value: Val; onChange: Setter }) {
  const id = useId();
  const label = field.label.ar;

  if (field.kind === "items") {
    const list = Array.isArray(value) ? (value as Record<string, unknown>[]) : [];
    const single = field.itemFields.length === 1 && field.itemFields[0].key === "value";
    const setList = (l: unknown[]) => onChange(l);
    const blank = () => (single ? { ar: "", en: "" } : Object.fromEntries(field.itemFields.map((f) => [f.key, f.kind === "plain" || f.kind === "link" ? "" : { ar: "", en: "" }])));
    return (
      <div className="a-field">
        <span className="a-label">{label}</span>
        <div className="a-items">
          {list.map((item, i) => (
            <div key={i} className="a-subitem">
              <div className="a-row" style={{ marginBottom: 8 }}>
                <span className="mono">#{i + 1}</span>
                <span className="a-spacer" />
                <button type="button" className="a-btn ghost sm" disabled={i === 0} onClick={() => { const l = [...list]; [l[i - 1], l[i]] = [l[i], l[i - 1]]; setList(l); }}>▲</button>
                <button type="button" className="a-btn ghost sm" disabled={i === list.length - 1} onClick={() => { const l = [...list]; [l[i + 1], l[i]] = [l[i], l[i + 1]]; setList(l); }}>▼</button>
                <button type="button" className="a-btn danger sm" onClick={() => setList(list.filter((_, k) => k !== i))}>حذف</button>
              </div>
              {single ? (
                <LocalizedInput id={`${id}-${i}`} value={item} onChange={(v) => { const l = [...list]; l[i] = v as Record<string, unknown>; setList(l); }} />
              ) : (
                field.itemFields.map((f) => (
                  <FieldInput key={f.key} field={f} value={(item as Record<string, unknown>)[f.key]} onChange={(v) => { const l = [...list]; l[i] = { ...(item as object), [f.key]: v }; setList(l); }} />
                ))
              )}
            </div>
          ))}
        </div>
        <button type="button" className="a-btn ghost sm" style={{ justifySelf: "start", marginTop: 8 }} onClick={() => setList([...list, blank()])}>+ إضافة عنصر</button>
      </div>
    );
  }

  if (field.kind === "images") {
    const list = Array.isArray(value) ? (value as string[]) : [];
    return (
      <div className="a-field">
        <span className="a-label">{label}</span>
        {list.map((src, i) => (
          <div key={i} className="a-row" style={{ marginBottom: 8 }}>
            <MediaPicker value={src} onChange={(v) => { const l = [...list]; l[i] = v; onChange(l.filter(Boolean)); }} />
            <button type="button" className="a-btn danger sm" onClick={() => onChange(list.filter((_, k) => k !== i))}>حذف</button>
          </div>
        ))}
        <button type="button" className="a-btn ghost sm" style={{ justifySelf: "start" }} onClick={() => onChange([...list, ""])}>+ إضافة صورة</button>
      </div>
    );
  }

  return (
    <div className="a-field">
      <label htmlFor={id}>{label}</label>
      {field.kind === "bool" ? (
        <label className="a-check"><input id={id} type="checkbox" checked={value !== false} onChange={(e) => onChange(e.target.checked)} /> {value !== false ? "مُفعّل" : "متوقف"}</label>
      ) : field.kind === "select" ? (
        <select id={id} className="a-select" value={String(value ?? field.options[0].value)} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => <option key={o.value} value={o.value}>{o.label.ar}</option>)}
        </select>
      ) : field.kind === "image" ? (
        <MediaPicker value={String(value ?? "")} onChange={onChange} />
      ) : field.kind === "plain" || field.kind === "link" ? (
        <input id={id} className="a-input" dir="ltr" value={String(value ?? "")} placeholder={field.kind === "link" ? "/contact" : ""} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <LocalizedInput id={id} value={value} textarea={field.kind === "textarea"} onChange={onChange} />
      )}
      {"hint" in field && field.hint && <span className="a-hint">{field.hint.ar}</span>}
    </div>
  );
}

export function SaveBar({ onSave, dirty, saved, extra }: { onSave: () => void; dirty: boolean; saved: boolean; extra?: React.ReactNode }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="a-savebar">
      <button
        className="a-btn"
        disabled={!dirty || busy}
        onClick={async () => { setBusy(true); await onSave(); setBusy(false); }}
      >
        {busy ? "جارٍ الحفظ…" : "حفظ التغييرات"}
      </button>
      {saved && !dirty && <span className="a-saved">تم الحفظ ✓</span>}
      {dirty && !busy && <span className="muted" style={{ fontSize: 13 }}>لديك تغييرات غير محفوظة</span>}
      <span className="a-spacer" />
      {extra}
    </div>
  );
}
