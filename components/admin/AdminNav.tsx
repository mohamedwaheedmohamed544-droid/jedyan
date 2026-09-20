"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { User } from "@/lib/auth";
import { logoutAction } from "@/app/(admin)/admin/actions";

const LINKS = [
  { href: "/admin", label: "نظرة عامة", icon: "M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-16v5h7V4h-7Z" },
  { href: "/admin/pages", label: "الصفحات والأقسام", icon: "M6 2h8l4 4v16H6V2Zm8 1.5V7h3.5M8 12h8M8 16h8" },
  { href: "/admin/content", label: "المحتوى والقوائم", icon: "M4 6h16M4 12h16M4 18h10" },
  { href: "/admin/media", label: "مكتبة الصور", icon: "M3 5h18v14H3V5Zm3 9 3.5-4 3 3.5L15 10l3 4" },
  { href: "/admin/brand", label: "الهوية والتصميم", icon: "M12 3a9 9 0 1 0 0 18c1.6 0 2-1.2 1.3-2-.8-.9-.3-2 1-2H17a4 4 0 0 0 4-4c0-5-4-10-9-10Z" },
  { href: "/admin/leads", label: "طلبات العملاء", icon: "M3 5h18v14H3V5Zm0 1 9 7 9-7" },
  { href: "/admin/settings", label: "الإعدادات", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3 2-1.5-2-3.5-2.4.8a7.7 7.7 0 0 0-1.9-1.1L15.3 4h-4l-.4 2.7c-.7.3-1.3.7-1.9 1.1L6.6 7 4 10.5 6 12l-2 1.5L6.6 17l2.4-.8c.6.4 1.2.8 1.9 1.1l.4 2.7h4l.4-2.7c.7-.3 1.3-.7 1.9-1.1l2.4.8 2-3.5L20 12Z" },
  { href: "/admin/users", label: "المستخدمون", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 8a8 8 0 0 1 16 0" },
];

export default function AdminNav({ user }: { user: User }) {
  const path = usePathname() || "";
  const on = (href: string) => (href === "/admin" ? path === "/admin" : path.startsWith(href));
  return (
    <aside className="a-side">
      <div className="a-brand">
        <img src="/brand/jedyan-logo-white.png" alt="جديان" />
        <span>CMS</span>
      </div>

      <nav className="a-nav">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={on(l.href) ? "on" : ""}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={l.icon} /></svg>
            {l.label}
          </Link>
        ))}
        <p className="a-nav-title">الموقع</p>
        <a href="/" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M14 4h6v6M20 4 10 14M18 14v6H4V6h6" /></svg>
          فتح الموقع
        </a>
      </nav>

      <div className="a-side-foot">
        <div>
          <strong style={{ color: "#fff", display: "block" }}>{user.name}</strong>
          <span className="mono">{user.email}</span>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="a-btn ghost sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,.25)" }}>تسجيل الخروج</button>
        </form>
      </div>
    </aside>
  );
}
