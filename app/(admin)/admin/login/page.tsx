/* eslint-disable @next/next/no-img-element */
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const user = await currentUser();
  if (user) redirect("/admin");
  return (
    <div className="a-login">
      <div className="a-login-card">
        <img src="/brand/jedyan-logo-ink.png" alt="جديان" />
        <div>
          <h1 style={{ fontSize: 22 }}>لوحة تحكم الموقع</h1>
          <p className="muted" style={{ fontSize: 14 }}>سجّل الدخول لإدارة المحتوى والتصميم والطلبات.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
