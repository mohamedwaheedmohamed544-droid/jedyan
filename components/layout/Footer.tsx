import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { company, nav, solutions, messages } from "@/content/site";
import { ui } from "@/lib/ui";
import Logo from "@/components/ui/Logo";
import s from "./Footer.module.css";

export default function Footer({ locale }: { locale: Locale }) {
  const L = locale;
  return (
    <footer className={`dark ${s.footer}`}>
      <div className={`wrap ${s.top}`}>
        <div className={s.brandCol}>
          <Logo variant="white" className={s.logo} />
          <p className={s.name}>{company.name[L]}</p>
          <p className="muted">{company.parent[L]}</p>
          <p className="muted">{company.country[L]}</p>
          <p className={s.essence}>{messages.essence[L]}</p>
        </div>

        <div>
          <h2 className={s.h}>{ui("siteLinks", L)}</h2>
          <ul className={s.list}>
            {nav.map((n) => (
              <li key={n.href}><Link href={localePath(L, n.href)}>{n.label[L]}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={s.h}>{L === "ar" ? "حلولنا" : "Solutions"}</h2>
          <ul className={s.list}>
            {solutions.map((x) => (
              <li key={x.slug}><Link href={localePath(L, `/solutions/${x.slug}`)}>{x.title[L]}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={s.h}>{ui("reach", L)}</h2>
          <ul className={s.list}>
            <li><span className="muted">{L === "ar" ? "الموقع" : "Web"}</span> <a href={`https://${company.web}`} className="latin">{company.web}</a></li>
            <li><span className="muted">{L === "ar" ? "البريد" : "Email"}</span> <a href={`mailto:${company.email}`} className="latin">{company.email}</a></li>
            <li><span className="muted">{L === "ar" ? "الهاتف" : "Phone"}</span> <a href={`tel:${company.phoneHref}`} className="num" dir="ltr">{company.phoneDisplay}</a></li>
          </ul>
          <div className={s.social}>
            <a href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram — jedyan.sa">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
            </a>
            <a href={company.x} target="_blank" rel="noopener noreferrer" aria-label="X — jedyan_sa">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5Z" /></svg>
            </a>
          </div>
        </div>
      </div>
      <div className={`wrap ${s.bottom}`}>
        <p className="muted">© 2026 {company.name[L]} — {ui("rights", L)}</p>
        <p className="muted latin">JEDYAN LOGISTICS · COMMERCE OPERATIONS</p>
      </div>
    </footer>
  );
}
