"use client";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/format";
import { useRouter } from "next/navigation";
import { setLeadStatusAction, setLeadNoteAction, deleteLeadAction } from "@/app/(admin)/admin/actions";

type Lead = {
  id: string; created_at: string; status: string; locale: string;
  name: string; company: string; email: string; phone: string; notes: string;
  answers: { q: string; a: string }[]; internal_note: string;
};

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: "جديد", cls: "" },
  open: { label: "قيد المتابعة", cls: "muted" },
  won: { label: "تحوّل لعميل", cls: "ok" },
  closed: { label: "مغلق", cls: "muted" },
};

export default function LeadsInbox({ leads: initial }: { leads: Lead[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<string | null>(null);
  const leads = useMemo(() => (filter === "all" ? initial : initial.filter((l) => l.status === filter)), [initial, filter]);

  const exportCsv = () => {
    const head = ["التاريخ", "الشركة", "الاسم", "البريد", "الهاتف", "الحالة", "الإجابات", "ملاحظات العميل", "ملاحظة داخلية"];
    const rows = initial.map((l) => [
      formatDate(l.created_at), l.company, l.name, l.email, l.phone,
      STATUS[l.status]?.label || l.status,
      l.answers.map((a) => `${a.q}: ${a.a}`).join(" | "), l.notes || "", l.internal_note || "",
    ]);
    const csv = "﻿" + [head, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = `jedyan-leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="a-head">
        <div>
          <h1>طلبات العملاء</h1>
          <p>كل طلب تشخيص يصل من الموقع يُحفظ هنا مع إجاباته.</p>
        </div>
        <div className="a-row">
          <button className="a-btn ghost" onClick={exportCsv} disabled={!initial.length}>تصدير Excel / CSV</button>
        </div>
      </div>

      <div className="a-row" style={{ marginBottom: 14 }}>
        {[["all", "الكل"], ["new", "جديد"], ["open", "قيد المتابعة"], ["won", "تحوّل لعميل"], ["closed", "مغلق"]].map(([k, l]) => (
          <button key={k} className={`a-btn ${filter === k ? "dark" : "ghost"} sm`} onClick={() => setFilter(k)}>
            {l} {k === "all" ? initial.length : initial.filter((x) => x.status === k).length}
          </button>
        ))}
      </div>

      <div className="a-sections">
        {leads.map((l) => (
          <div key={l.id} className="a-section">
            <div className="a-section-head" onClick={() => setOpen(open === l.id ? null : l.id)}>
              <div>
                <b>{l.company || l.name || l.email}</b>
                <div className="a-type">{formatDate(l.created_at)} · {l.email}</div>
              </div>
              <span className="a-spacer" />
              <span className={`a-pill ${STATUS[l.status]?.cls || ""}`}>{STATUS[l.status]?.label || l.status}</span>
              <span style={{ width: 18, textAlign: "center" }}>{open === l.id ? "–" : "+"}</span>
            </div>
            {open === l.id && (
              <div className="a-section-body">
                <div className="a-grid a-grid-2" style={{ marginBottom: 14 }}>
                  <div><span className="a-hint">الاسم</span><div>{l.name || "—"}</div></div>
                  <div><span className="a-hint">الشركة</span><div>{l.company || "—"}</div></div>
                  <div><span className="a-hint">البريد</span><div className="mono"><a href={`mailto:${l.email}`}>{l.email}</a></div></div>
                  <div><span className="a-hint">الهاتف</span><div className="mono">{l.phone ? <a href={`tel:${l.phone}`}>{l.phone}</a> : "—"}</div></div>
                </div>
                {l.answers?.length > 0 && (
                  <table className="a-table" style={{ marginBottom: 14 }}>
                    <tbody>
                      {l.answers.map((a, i) => (
                        <tr key={i}><th style={{ width: "38%" }}>{a.q}</th><td>{a.a}</td></tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {l.notes && <div className="a-field"><span className="a-label">ملاحظات العميل</span><p>{l.notes}</p></div>}
                <div className="a-field">
                  <label htmlFor={`n-${l.id}`}>ملاحظة داخلية</label>
                  <textarea id={`n-${l.id}`} className="a-textarea" defaultValue={l.internal_note || ""} onBlur={async (e) => { await setLeadNoteAction(l.id, e.target.value); router.refresh(); }} />
                </div>
                <div className="a-row">
                  {Object.entries(STATUS).map(([k, v]) => (
                    <button key={k} className={`a-btn ${l.status === k ? "dark" : "ghost"} sm`} onClick={async () => { await setLeadStatusAction(l.id, k); router.refresh(); }}>{v.label}</button>
                  ))}
                  <span className="a-spacer" />
                  <button className="a-btn danger sm" onClick={async () => { if (confirm("حذف الطلب؟")) { await deleteLeadAction(l.id); router.refresh(); } }}>حذف</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {!leads.length && <p className="a-hint">لا توجد طلبات في هذا التصنيف.</p>}
      </div>
    </>
  );
}
