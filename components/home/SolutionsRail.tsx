"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { solutions } from "@/content/site";
import { useMediaQuery, useStickyProgress } from "@/lib/hooks";
import { ui } from "@/lib/ui";
import Glyph from "@/components/solutions/Glyph";
import Arrow from "@/components/ui/Arrow";
import s from "./SolutionsRail.module.css";

export default function SolutionsRail({ locale }: { locale: Locale }) {
  const L = locale;
  const desktop = useMediaQuery("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  const [runway, p] = useStickyProgress<HTMLDivElement>();
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setDist(Math.max(0, el.scrollWidth - el.clientWidth)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sign = L === "ar" ? 1 : -1;
  const style = desktop ? ({ "--runway": `${dist}px` } as CSSProperties) : undefined;
  const active = Math.min(solutions.length - 1, Math.round(p * (solutions.length - 1)));

  return (
    <section className={`white ${s.section}`} aria-labelledby="sol-title">
      <div ref={runway} className={desktop ? s.runway : ""} style={style}>
        <div className={desktop ? s.sticky : s.static}>
          <div className={`wrap ${s.head}`}>
            <div>
              <p className="eyebrow" data-reveal>04 · OUR SOLUTIONS</p>
              <h2 id="sol-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
                {L === "ar" ? "ستة محاور تبني رحلة واحدة." : "Six pillars, one journey."}
              </h2>
              <p className="lead muted" data-reveal style={{ ["--d" as string]: 140 }}>
                {L === "ar" ? "العميل لا يشتري ستة عقود — يشتري نتيجة واحدة مصمّمة من ستة محاور." : "Clients don't buy six contracts — they buy one outcome designed from six pillars."}
              </p>
            </div>
            <div className={s.counter} aria-hidden="true">
              <span className="mono">{String(active + 1).padStart(2, "0")}</span>
              <span className={s.bar}><i style={{ transform: `scaleX(${desktop ? Math.max(0.02, p) : 1})` }} /></span>
              <span className="mono">06</span>
            </div>
          </div>

          <div ref={track} className={s.track} style={desktop ? { transform: `translate3d(${sign * p * dist}px,0,0)` } : undefined} tabIndex={desktop ? -1 : 0} aria-label={L === "ar" ? "الحلول" : "Solutions"}>
            {solutions.map((x, i) => (
              <article key={x.slug} className={`${s.panel} ${i === active && desktop ? s.panelOn : ""}`}>
                <div className={s.panelTop}>
                  <span className={s.n}>{x.n}</span>
                  <Glyph type={x.visual} className={s.glyph} />
                </div>
                <span className="mono">{x.en.toUpperCase()}</span>
                <h3 className={s.title}>{x.title[L]}</h3>
                <p className={s.headline}>{x.headline[L]}</p>
                <ul className={s.scope}>
                  {x.scope.slice(0, 4).map((sc, k) => <li key={k}>{sc[L]}</li>)}
                </ul>
                <Link href={localePath(L, `/solutions/${x.slug}`)} className="link-arrow">
                  {ui("explore", L)} <span><Arrow className="" /></span>
                  <span className="sr-only">: {x.title[L]}</span>
                </Link>
              </article>
            ))}
            <div className={s.endCap}>
              <p>{L === "ar" ? "لست متأكدًا من أين تبدأ؟" : "Not sure where to start?"}</p>
              <Link href={localePath(L, "/contact")} className="btn">{ui("diagnose", L)} <Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
