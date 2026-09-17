"use client";
import type { CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { journey } from "@/content/site";
import { useStickyProgress } from "@/lib/hooks";
import { ui } from "@/lib/ui";
import s from "./CommerceJourney.module.css";

/**
 * Interactive Commerce Operations Journey — scroll moves one order through nine stages.
 * The page's scroll *is* the order moving: status, stage and data update with it.
 */
export default function CommerceJourney({ locale, compactHead = false }: { locale: Locale; compactHead?: boolean }) {
  const L = locale;
  const [ref, p] = useStickyProgress<HTMLDivElement>();
  const n = journey.length;
  const idx = Math.min(n - 1, Math.floor(p * n * 0.9999));
  const st = journey[idx];
  const trackP = n > 1 ? Math.min(1, p * (n / (n - 1)) - 0.5 / (n - 1)) : 0;

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + total * ((i + 0.5) / n), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section className={`graphite ${s.section}`} aria-labelledby="journey-title" style={{ "--n": n } as CSSProperties}>
      <div ref={ref} className={s.runway}>
        <div className={s.sticky}>
          <div className={`wrap ${s.inner}`}>
            <header className={s.head}>
              <p className="eyebrow">THE COMMERCE OPERATIONS JOURNEY</p>
              <h2 id="journey-title" className={compactHead ? "h3" : "h2"}>
                {L === "ar" ? "من دخول البضاعة حتى إغلاق الطلب — رحلة تشغيل واحدة." : "From goods-in to order closure — one operating journey."}
              </h2>
            </header>

            <div className={s.stage} aria-live="polite">
              <div className={s.stageMain}>
                <span className={`mono ${s.count}`}>{String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {st.en}</span>
                <p className={s.stageName} key={`n${idx}`}>{st.label[L]}</p>
                <p className={s.stageNote} key={`t${idx}`}>{st.note[L]}</p>
              </div>
              <div className={s.panel}>
                <div className={s.panelHead}>
                  <span className="mono">ORDER · JD-24817</span>
                  <span className={s.status} key={`s${idx}`}><i className="dot" /> {st.status[L]}</span>
                </div>
                <ul className={s.fields}>
                  {st.data.map((d, i) => (
                    <li key={`${idx}-${i}`} style={{ "--i": i } as CSSProperties}>
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {d[L]}
                    </li>
                  ))}
                </ul>
                <div className={s.meter} aria-hidden="true"><span style={{ transform: `scaleX(${(idx + 1) / n})` }} /></div>
              </div>
            </div>

            <div className={s.track}>
              <div className={s.rail} aria-hidden="true">
                <span className={s.railFill} style={{ transform: `scaleX(${Math.max(0, trackP)})` }} />
                <span className={s.parcel} style={{ insetInlineStart: `${Math.max(0, trackP) * 100}%` }}>
                  <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" fill="#ff6e06" /><path d="M3 7l9 5 9-5M12 12v10" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".75" /></svg>
                </span>
              </div>
              <ol className={s.stations}>
                {journey.map((j, i) => (
                  <li key={j.en}>
                    <button type="button" onClick={() => jump(i)} className={`${i < idx ? s.done : ""} ${i === idx ? s.now : ""}`} aria-current={i === idx ? "step" : undefined}>
                      <i />
                      <span className={s.stLabel}>{j.label[L]}</span>
                      <span className={`mono ${s.stEn}`}>{j.en}</span>
                    </button>
                  </li>
                ))}
              </ol>
              <p className={`caption ${s.hint}`}>{ui("scrollHint", L)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
