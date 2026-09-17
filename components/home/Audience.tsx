import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { segments, sectors, sectorRule } from "@/content/site";
import s from "./Audience.module.css";

export function WhoWeServe({ locale, withHead = true, numbered = true }: { locale: Locale; withHead?: boolean; numbered?: boolean }) {
  const L = locale;
  return (
    <section className="section paper" aria-labelledby="serve-title">
      <div className="wrap split">
        <div className={s.headCol}>
          <p className="eyebrow" data-reveal>{numbered ? "05 · " : ""}WHO WE SERVE</p>
          <h2 id="serve-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {L === "ar" ? "نخدم شركات تُقاس بقدرتها على التنفيذ." : "We serve companies measured by their ability to execute."}
          </h2>
          {withHead && (
            <p className="lead muted" data-reveal style={{ ["--d" as string]: 140 }}>
              {L === "ar"
                ? "لكل شريحة نموذج تشغيلي مختلف؛ لذلك نصمّم الحل وفق طبيعة الطلب والقنوات والحجم ومستوى التعقيد — لا وفق قالب واحد للجميع."
                : "Each segment runs a different operating model, so we design around order profile, channels, volume and complexity — not one template for all."}
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

export function Sectors({ locale, link = true, numbered = true }: { locale: Locale; link?: boolean; numbered?: boolean }) {
  const L = locale;
  return (
    <section className="section white" aria-labelledby="sectors-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>{numbered ? "06 · " : ""}SECTORS WE OPERATE FOR</p>
          <h2 id="sectors-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {L === "ar" ? "القطاع لا يغيّر المبدأ — يغيّر التفاصيل." : "The sector doesn't change the principle — it changes the details."}
          </h2>
          <p className="lead muted" data-reveal style={{ ["--d" as string]: 140 }}>{sectorRule[L]}</p>
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
