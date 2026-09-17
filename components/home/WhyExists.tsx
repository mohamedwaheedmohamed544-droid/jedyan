"use client";
import type { Locale } from "@/content/types";
import { whyExists } from "@/content/site";
import { useTravelProgress } from "@/lib/hooks";
import s from "./WhyExists.module.css";

const N = 7;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// tangled: crossing, unordered.  ordered: converge on one point, leave as parallel lanes.
const tangled = Array.from({ length: N }, (_, i) => {
  const r = (k: number) => (Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
  const f = (k: number) => Math.abs(r(k));
  return [0, 20 + f(1) * 260, 120 + f(2) * 120, f(3) * 300, 300 + f(4) * 120, f(5) * 300, 600, 20 + f(6) * 260];
});
const ordered = Array.from({ length: N }, (_, i) => {
  const y = 30 + (i * 240) / (N - 1);
  return [0, y, 210, y, 250, 150, 600, 60 + (i * 180) / (N - 1)];
});

export default function WhyExists({ locale }: { locale: Locale }) {
  const L = locale;
  const [ref, p] = useTravelProgress<HTMLDivElement>();
  // map travel 0.25..0.6 → 0..1
  const t = ease(Math.min(1, Math.max(0, (p - 0.22) / 0.36)));
  const phase = t < 0.33 ? 0 : t < 0.8 ? 1 : 2;

  const steps = [
    { en: "THE PROBLEM", label: L === "ar" ? "المشكلة" : "The problem", text: whyExists.problem[L] },
    { en: "OUR ROLE", label: L === "ar" ? "الدور" : "Our role", text: whyExists.role[L] },
    { en: "THE OUTCOME", label: L === "ar" ? "النتيجة" : "The outcome", text: whyExists.outcome[L] },
  ];

  return (
    <section className={`section dark ${s.section}`} aria-labelledby="why-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>03 · WHY JEDYAN EXISTS</p>
          <h2 id="why-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>{whyExists.title[L]}</h2>
        </div>

        <div ref={ref} className={s.grid}>
          <div className={s.visual} aria-hidden="true">
            <svg viewBox="0 0 600 300" preserveAspectRatio="xMidYMid meet">
              {tangled.map((a, i) => {
                const b = ordered[i];
                const v = a.map((x, k) => lerp(x, b[k], t));
                const d = `M${v[0]} ${v[1]} C${v[2]} ${v[3]} ${v[4]} ${v[5]} ${v[6]} ${v[7]}`;
                const hot = i === 3;
                return (
                  <path key={i} d={d} fill="none" stroke={hot ? "#ff6e06" : `rgba(255,255,255,${0.18 + t * 0.2})`} strokeWidth={hot ? 2.4 : 1.4} strokeLinecap="round" />
                );
              })}
              <circle cx="250" cy="150" r={3 + t * 5} fill="#ff6e06" opacity={t} />
            </svg>
            <div className={s.captions}>
              <span className={t < 0.5 ? s.capOn : ""}>{L === "ar" ? "مسؤوليات موزّعة" : "Scattered accountability"}</span>
              <span className={t >= 0.5 ? s.capOn : ""}>{L === "ar" ? "طبقة تشغيل واحدة" : "One operating layer"}</span>
            </div>
          </div>

          <ol className={s.steps}>
            {steps.map((st, i) => (
              <li key={st.en} className={i === phase ? s.on : i < phase ? s.past : ""}>
                <span className="mono">{st.en}</span>
                <h3>{st.label}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <p className={s.line} data-reveal>{whyExists.line[L]}</p>
      </div>
    </section>
  );
}
