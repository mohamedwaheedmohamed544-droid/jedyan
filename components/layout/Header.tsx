"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { nav } from "@/content/site";
import { ui } from "@/lib/ui";
import Logo from "@/components/ui/Logo";
import Arrow from "@/components/ui/Arrow";
import Magnetic from "@/components/ui/Magnetic";
import s from "./Header.module.css";

const stripLocale = (p: string) => (p.startsWith("/en") ? p.slice(3) || "/" : p);

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const run = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? y / h : 0);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    run();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const base = stripLocale(pathname);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const solid = base.startsWith("/contact");
  const isActive = (href: string) => (href === "/" ? base === "/" : base.startsWith(href));

  return (
    <header className={`${s.header} ${scrolled || solid ? s.scrolled : ""} ${hidden && !open ? s.hidden : ""} ${open ? s.open : ""}`}>
      <a href="#main" className="skip-link">{ui("skip", locale)}</a>
      <div className={`wrap ${s.bar}`}>
        <Link href={localePath(locale, "/")} className={s.brand} aria-label={locale === "ar" ? "جديان — الرئيسية" : "Jedyan — Home"}>
          <Logo variant="white" className={s.logo} />
        </Link>

        <nav className={s.nav} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main navigation"}>
          <ul>
            {nav.slice(1, -1).map((item) => (
              <li key={item.href}>
                <Link href={localePath(locale, item.href)} className={`${s.link} ${isActive(item.href) ? s.active : ""}`} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.actions}>
          <Link href={localePath(other, base)} hrefLang={other} lang={other} className={s.lang} aria-label={ui("switchLangLabel", locale)}>
            {ui("switchLang", locale)}
          </Link>
          <Magnetic>
            <Link href={localePath(locale, "/contact")} className={`btn btn--sm ${s.cta}`}>
              {ui("startTalk", locale)} <Arrow />
            </Link>
          </Magnetic>
          <button className={s.burger} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            <span className="sr-only">{open ? ui("close", locale) : ui("menu", locale)}</span>
            <i /><i />
          </button>
        </div>
      </div>
      <span className={s.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <div id="mobile-menu" className={s.sheet} hidden={!open}>
        <nav className="wrap" aria-label={locale === "ar" ? "قائمة الجوال" : "Mobile menu"}>
          <ol className={s.sheetList}>
            {nav.map((item, i) => (
              <li key={item.href} style={{ ["--i" as string]: i }}>
                <Link href={localePath(locale, item.href)} className={isActive(item.href) ? s.active : ""}>
                  <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ol>
          <div className={s.sheetFoot}>
            <Link href={localePath(locale, "/contact")} className="btn">{ui("diagnose", locale)} <Arrow /></Link>
            <Link href={localePath(other, base)} hrefLang={other} className={s.lang}>{ui("switchLang", locale)}</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
