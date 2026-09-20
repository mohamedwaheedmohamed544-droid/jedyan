"use client";
import type { Locale } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import s from "./WhyJedyan.module.css";

export default function WhyJedyan({ locale, eyebrow = "09 · WHY JEDYAN", b }: { locale: Locale; eyebrow?: string; b?: Record<string, unknown> }) {
  const L = locale;
  const { reasons } = useSite();
  return (
    <section className="section white" aria-labelledby="whyj-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, eyebrow)}</p>
          <h2 id="whyj-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {px(b, "title", L, L === "ar" ? "ستة أسباب تجعل جديان شريك تشغيل يُعتمد عليه." : "Six reasons Jedyan is an operating partner you can rely on.")}
          </h2>
        </div>
        <ul className={s.grid}>
          {reasons.map((r, i) => (
            <li key={r.en} className={s.item} data-reveal style={{ ["--d" as string]: i * 70 }}>
              <svg className={s.mark} viewBox="0 0 120 16" aria-hidden="true">
                <g className={s.flip}><path d="M2 8 C 40 3, 80 2, 118 1 L 118 15 C 80 14, 40 13, 2 8 Z" /></g>
              </svg>
              <span className={s.en}>{r.en}</span>
              <h3>{r.label[L]}</h3>
              <p>{r.text[L]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
