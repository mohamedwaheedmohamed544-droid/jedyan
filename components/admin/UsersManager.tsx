"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/auth";
import { createUserAction, deleteUserAction, changePasswordAction } from "@/app/(admin)/admin/actions";

type Row = { id: string; email: string; name: string; role: string; created_at: string };

export default function UsersManager({ users, me }: { users: Row[]; me: User }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", role: "editor", password: "" });
  const [msg, setMsg] = useState("");
  const [pw, setPw] = useState<{ id: string; value: string } | null>(null);

  return (
    <>
      <div className="a-head">
        <div>
          <h1>المستخدمون</h1>
          <p>من يستطيع الدخول إلى لوحة التحكم. «مدير» يضيف ويحذف المستخدمين، و«محرّر» يعدّل المحتوى فقط.</p>
        </div>
      </div>

      {msg && <p className="a-error" style={{ marginBottom: 12 }}>{msg}</p>}

      <div className="a-list" style={{ marginBottom: 20 }}>
        {users.map((u) => (
          <div key={u.id} className="a-item">
            <div>
              <b>{u.name} {u.id === me.id && <span className="a-pill muted">أنت</span>}</b>
              <div className="a-sub mono">{u.email}</div>
            </div>
            <span className="a-spacer" />
            <span className="a-pill muted">{u.role === "admin" ? "مدير" : "محرّر"}</span>
            <button className="a-btn ghost sm" onClick={() => setPw(pw?.id === u.id ? null : { id: u.id, value: "" })}>تغيير كلمة المرور</button>
            {me.role === "admin" && u.id !== me.id && (
              <button className="a-btn danger sm" onClick={async () => { if (confirm("حذف المستخدم؟")) { const r = await deleteUserAction(u.id); if (r?.error) setMsg(r.error); router.refresh(); } }}>حذف</button>
            )}
            {pw?.id === u.id && (
              <div className="a-row" style={{ width: "100%", marginTop: 10 }}>
                <input className="a-input" type="password" dir="ltr" placeholder="كلمة مرور جديدة (8 أحرف على الأقل)" value={pw.value} onChange={(e) => setPw({ id: u.id, value: e.target.value })} style={{ maxWidth: 320 }} />
                <button className="a-btn sm" onClick={async () => { const r = await changePasswordAction({ userId: u.id, password: pw.value }); setMsg(r?.error || "تم تحديث كلمة المرور."); setPw(null); }}>حفظ</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {me.role === "admin" && (
        <div className="a-card">
          <h2 style={{ fontSize: 17, marginBottom: 12 }}>إضافة مستخدم</h2>
          <div className="a-inline">
            <div className="a-field"><label htmlFor="un">الاسم</label><input id="un" className="a-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div className="a-field"><label htmlFor="ue">البريد</label><input id="ue" className="a-input" dir="ltr" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="a-field"><label htmlFor="ur">الصلاحية</label>
              <select id="ur" className="a-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="editor">محرّر</option>
                <option value="admin">مدير</option>
              </select>
            </div>
            <div className="a-field"><label htmlFor="up">كلمة المرور</label><input id="up" className="a-input" dir="ltr" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          </div>
          <button className="a-btn" onClick={async () => { const r = await createUserAction(form); if (r?.error) setMsg(r.error); else { setMsg(""); setForm({ name: "", email: "", role: "editor", password: "" }); router.refresh(); } }}>إضافة</button>
        </div>
      )}
    </>
  );
}
