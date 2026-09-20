"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SaveBar } from "./Fields";
import { saveDocAction, resetDocAction } from "@/app/(admin)/admin/actions";

/** Structured editor for nested content blobs (messages, foundation, diagnosis…). */
export default function JsonEditor({ dataKey, title, note, value }: { dataKey: string; title: string; note?: string; value: unknown }) {
  const router = useRouter();
  const [text, setText] = useState(() => JSON.stringify(value, null, 2));
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      <div className="a-head">
        <div>
          <p className="muted" style={{ fontSize: 13 }}><Link href="/admin/content">المحتوى</Link> / {title}</p>
          <h1>{title}</h1>
          {note && <p>{note}</p>}
        </div>
        <button className="a-btn ghost" onClick={async () => { if (confirm("استعادة النص الأصلي؟")) { await resetDocAction(dataKey); router.refresh(); } }}>استعادة الأصل</button>
      </div>

      <div className="a-card">
        <p className="a-hint" style={{ marginBottom: 10 }}>
          عدّل النص بين علامات الاقتباس فقط: <code className="mono">&quot;ar&quot;</code> للعربية و <code className="mono">&quot;en&quot;</code> للإنجليزية. لا تحذف الأقواس أو الفواصل.
        </p>
        {error && <p className="a-error" style={{ marginBottom: 10 }}>{error}</p>}
        <textarea
          className="a-textarea mono"
          style={{ minHeight: "60vh", direction: "ltr", textAlign: "left", fontSize: 13 }}
          value={text}
          onChange={(e) => { setText(e.target.value); setDirty(true); setSaved(false); setError(""); }}
        />
      </div>

      <SaveBar
        dirty={dirty}
        saved={saved}
        onSave={async () => {
          try {
            const parsed = JSON.parse(text);
            await saveDocAction(dataKey, parsed);
            setDirty(false); setSaved(true); setError("");
            router.refresh();
          } catch {
            setError("صيغة غير صحيحة — تأكد من الأقواس والفواصل ثم احفظ مرة أخرى.");
          }
        }}
      />
    </>
  );
}
