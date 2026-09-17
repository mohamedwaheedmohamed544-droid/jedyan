"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { operatingElements, operatingLayers, messages } from "@/content/site";
import { useInView } from "@/lib/hooks";
import s from "./OperatingLayer.module.css";

const R = 190;
const C = 260;

export default function OperatingLayer({ locale }: { locale: Locale }) {
  const L = locale;
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>("-20% 0px");

  useEffect(() => {
    if (!inView || touched || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % operatingElements.length), 2400);
    return () => window.clearInterval(id);
  }, [inView, touched]);

  const pts = operatingElements.map((_, i) => {
    const a = (Math.PI * 2 * i) / operatingElements.length - Math.PI / 2;
    return { x: C + Math.cos(a) * R, y: C + Math.sin(a) * R };
  });
  const el = operatingElements[active];

  return (
    <section id="layer" className={`section white ${s.section}`} aria-labelledby="layer-title">
      <div className="wrap split">
        <div className={s.copy}>
          <p className="eyebrow" data-reveal>01 · OPERATING LAYER</p>
          <h2 id="layer-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>{messages.oneStatement[L]}</h2>
          <p className="lead muted" data-reveal style={{ ["--d" as string]: 160 }}>
            {L === "ar"
              ? "القيمة ليست في توفر كل خدمة على حدة، بل في ترابطها وإدارتها تحت مسؤولية تشغيلية واحدة."
              : "The value isn't in each service on its own — it's in connecting them and running them under one operating accountability."}
          </p>

          <ol className={s.layers}>
            {operatingLayers.map((ly, i) => (
              <li key={ly.en} data-reveal style={{ ["--d" as string]: 200 + i * 80 }}>
                <span className="mono">{String(i + 1).padStart(2, "0")} · {ly.en}</span>
                <strong>{ly.label[L]}</strong>
                <span className={s.items}>{ly.items[L]}</span>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref} className={s.diagramWrap} data-reveal>
          <svg viewBox="0 0 520 520" className={s.diagram} role="img" aria-label={L === "ar" ? "طبقة تشغيل جديان تربط ستة عناصر" : "The Jedyan operating layer connecting six elements"}>
            <defs>
              <radialGradient id="ol-core" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#ff6e06" stopOpacity=".22" />
                <stop offset="1" stopColor="#ff6e06" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={C} cy={C} r={R} className={s.orbit} />
            <circle cx={C} cy={C} r={R} className={s.orbitFlow} pathLength={100} />
            {pts.map((p, i) => (
              <line key={i} x1={C} y1={C} x2={p.x} y2={p.y} className={`${s.spoke} ${i === active ? s.spokeOn : ""}`} />
            ))}
            <circle cx={C} cy={C} r="120" fill="url(#ol-core)" />
            <circle cx={C} cy={C} r="78" className={s.core} />
            <text x={C} y={C - 8} textAnchor="middle" className={s.coreT1}>{L === "ar" ? "جديان" : "JEDYAN"}</text>
            <text x={C} y={C + 18} textAnchor="middle" className={s.coreT2}>OPERATING LAYER</text>
            {pts.map((p, i) => (
              <g
                key={operatingElements[i].key}
                className={`${s.node} ${i === active ? s.nodeOn : ""}`}
                transform={`translate(${p.x} ${p.y})`}
                tabIndex={0}
                role="button"
                aria-pressed={i === active}
                aria-label={operatingElements[i].label[L]}
                onMouseEnter={() => { setTouched(true); setActive(i); }}
                onFocus={() => { setTouched(true); setActive(i); }}
                onClick={() => { setTouched(true); setActive(i); }}
              >
                <circle r="40" />
                <text y="5" textAnchor="middle">{operatingElements[i].label[L]}</text>
              </g>
            ))}
          </svg>
          <div className={s.note} aria-live="polite">
            <span className="mono">{el.en}</span>
            <p>{el.note[L]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
