"use client";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import s from "./Audience.module.css";

export function WhoWeServe({ locale, withHead = true, numbered = true, b }: { locale: Locale; withHead?: boolean; numbered?: boolean; b?: Record<string, unknown> }) {
  const L = locale;
  const { segments } = useSite();
  return (
    <section className="section paper" aria-labelledby="serve-title">
      <div className="wrap split">
        <div className={s.headCol}>
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, `${numbered ? "05 · " : ""}WHO WE SERVE`)}</p>
          <h2 id="serve-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {px(b, "title", L, L === "ar" ? "نخدم شركات تُقاس بقدرتها على التنفيذ." : "We serve companies measured by their ability to execute.")}
          </h2>
          {withHead && (
            <p className="lead muted" data-reveal style={{ ["--d" as string]: 140 }}>
              {px(b, "lead", L, L === "ar" ? "لكل شريحة نموذج تشغيلي مختلف؛ لذلك نصمّم الحل وفق طبيعة الطلب والقنوات والحجم ومستوى التعقيد." : "Each segment runs a different operating model, so we design around order profile, channels, volume and complexity.")}
            </p>
          )}
        </div>
        <ul className={s.segments}>
          {segments.map((x, i) => (
            <li key={x.en} data-reveal style={{ ["--d" as string]: i * 60 }}>
              <span className={s.segEn}>{x.en}</span>
              <strong>{x.label[L]}</strong>
              <span className={s.need}>{x.need[L]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Sectors({ locale, link = true, numbered = true, b }: { locale: Locale; link?: boolean; numbered?: boolean; b?: Record<string, unknown> }) {
  const L = locale;
  const { sectors, sectorRule } = useSite();
  return (
    <section className="section white" aria-labelledby="sectors-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, `${numbered ? "06 · " : ""}SECTORS WE OPERATE FOR`)}</p>
          <h2 id="sectors-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {px(b, "title", L, L === "ar" ? "القطاع لا يغيّر المبدأ — يغيّر التفاصيل." : "The sector does not change the principle — it changes the details.")}
          </h2>
          <p className="lead muted" data-reveal style={{ ["--d" as string]: 140 }}>{px(b, "lead", L, sectorRule[L])}</p>
        </div>
        <ul className={s.sectors}>
          {sectors.map((x, i) => (
            <li key={x.en} data-reveal style={{ ["--d" as string]: i * 50 }}>
              <span className={s.secEn}>{x.en}</span>
              <strong>{x.label[L]}</strong>
              <span className={s.profile}>
                {x.profile[L].split(" · ").map((t) => <span key={t}>{t}</span>)}
              </span>
            </li>
          ))}
        </ul>
        {link && (
          <p className={s.more} data-reveal>
            <Link href={localePath(L, "/sectors")} className="link-arrow">{L === "ar" ? "كيف نصمّم التشغيل لكل قطاع" : "How we design operations per sector"} <span>→</span></Link>
          </p>
        )}
      </div>
    </section>
  );
}
