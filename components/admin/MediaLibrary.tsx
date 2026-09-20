"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadMediaAction, deleteMediaAction } from "@/app/(admin)/admin/actions";

type Item = { id: string; filename: string; mime: string; size: number; url: string };

export default function MediaLibrary({ items }: { items: Item[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState("");

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true); setErr("");
    for (const f of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", f);
      const r = await uploadMediaAction(fd);
      if (r.error) setErr(r.error);
    }
    setBusy(false);
    router.refresh();
  };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>مكتبة الصور</h1>
          <p>ارفع صور المستودعات والعمليات والفريق، ثم استخدمها في أي قسم داخل الصفحات.</p>
        </div>
        <label className="a-btn" style={{ cursor: "pointer" }}>
          {busy ? "جارٍ الرفع…" : "رفع ملفات"}
          <input type="file" accept="image/*,video/mp4" multiple hidden onChange={(e) => upload(e.target.files)} />
        </label>
      </div>

      {err && <p className="a-error" style={{ marginBottom: 12 }}>{err}</p>}
      <p className="a-hint" style={{ marginBottom: 14 }}>الصيغ المدعومة: PNG · JPG · WEBP · AVIF · SVG · MP4 — بحد أقصى 4 ميجابايت للملف.</p>

      <div className="a-media">
        {items.map((m) => (
          <figure key={m.id}>
            {m.mime.startsWith("video") ? <video src={m.url} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} muted /> : <img src={m.url} alt={m.filename} />}
            <figcaption>
              <span className="mono" title={m.filename}>{m.filename.length > 20 ? m.filename.slice(0, 18) + "…" : m.filename}</span>
              <span className="a-hint">{Math.round(m.size / 1024)} KB</span>
              <div className="a-row">
                <button className="a-btn ghost sm" onClick={() => { navigator.clipboard?.writeText(m.url); setCopied(m.id); }}>{copied === m.id ? "تم النسخ" : "نسخ الرابط"}</button>
                <button className="a-btn danger sm" onClick={async () => { if (confirm("حذف الملف؟")) { await deleteMediaAction(m.id); router.refresh(); } }}>حذف</button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {!items.length && <p className="a-hint">المكتبة فارغة.</p>}
    </>
  );
}
