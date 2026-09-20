"use client";
import { useActionState } from "react";
import { loginAction } from "@/app/(admin)/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null as { error?: string } | null);
  return (
    <form action={action} style={{ display: "grid", gap: 12 }}>
      {state?.error && <p className="a-error">{state.error}</p>}
      <div className="a-field">
        <label htmlFor="email">البريد الإلكتروني</label>
        <input id="email" name="email" type="email" className="a-input" dir="ltr" autoComplete="username" required />
      </div>
      <div className="a-field">
        <label htmlFor="password">كلمة المرور</label>
        <input id="password" name="password" type="password" className="a-input" dir="ltr" autoComplete="current-password" required />
      </div>
      <button className="a-btn" disabled={pending}>{pending ? "جارٍ الدخول…" : "دخول"}</button>
    </form>
  );
}
