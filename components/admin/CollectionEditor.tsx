"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CollectionDef } from "@/lib/blocks";
import { FieldInput, SaveBar } from "./Fields";
import { saveDocAction, resetDocAction } from "@/app/(admin)/admin/actions";

type Item = Record<string, unknown>;
const label = (it: Item, key: string) => {
  const v = it[key];
  if (typeof v === "string") return v;
  if (v && typeof v === "object") return (v as Record<string, string>).ar || (v as Record<string, string>).en || "";
  return "";
};

export default function CollectionEditor({ def, items: initial }: { def: CollectionDef; items: Item[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const set = (l: Item[]) => { setItems(l); setDirty(true); setSaved(false); };
  const move = (i: number, d: -1 | 1) => {
    const l = [...items];
    const j = i + d;
    if (j < 0 || j >= l.length) return;
    [l[i], l[j]] = [l[j], l[i]];
    set(l);
  };
  const blank = () => Object.fromEntries(def.fields.map((f) => [f.key, f.kind === "plain" || f.kind === "link" || f.kind === "select" || f.kind === "image" ? "" : f.kind === "items" ? [] : { ar: "", en: "" }]));

  return (
    <>
      <div className="a-head">
        <div>
          <p className="muted" style={{ fontSize: 13 }}><Link href="/admin/content">المحتوى</Link> / {def.label.ar}</p>
          <h1>{def.label.ar}</h1>
          {def.note && <p>{def.note.ar}</p>}
        </div>
        <button
          className="a-btn ghost"
          onClick={async () => { if (confirm("استعادة النص الأصلي لهذه القائمة؟")) { await resetDocAction(def.key); router.refresh(); } }}
        >
          استعادة الأصل
        </button>
      </div>

      <div className="a-sections">
        {items.map((it, i) => (
          <div key={i} className="a-section">
            <div className="a-section-head" onClick={() => setOpen(open === i ? null : i)}>
              <span className="a-move" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => move(i, -1)} aria-label="أعلى">▲</button>
                <button onClick={() => move(i, 1)} aria-label="أسفل">▼</button>
              </span>
              <div>
                <b>{label(it, def.itemLabelKey) || `عنصر ${i + 1}`}</b>
                {typeof it.slug === "string" && <div className="a-type">/solutions/{it.slug}</div>}
              </div>
              <span className="a-spacer" />
              <button className="a-btn danger sm" onClick={(e) => { e.stopPropagation(); if (confirm("حذف هذا العنصر؟")) set(items.filter((_, k) => k !== i)); }}>حذف</button>
              <span style={{ width: 18, textAlign: "center" }}>{open === i ? "–" : "+"}</span>
            </div>
            {open === i && (
              <div className="a-section-body">
                {def.fields.map((f) => (
                  <FieldInput key={f.key} field={f} value={it[f.key]} onChange={(v) => { const l = [...items]; l[i] = { ...it, [f.key]: v }; set(l); }} />
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="a-btn ghost" onClick={() => { set([...items, blank()]); setOpen(items.length); }}>+ إضافة عنصر</button>
      </div>

      <SaveBar
        dirty={dirty}
        saved={saved}
        onSave={async () => { await saveDocAction(def.key, items); setDirty(false); setSaved(true); router.refresh(); }}
      />
    </>
  );
}
