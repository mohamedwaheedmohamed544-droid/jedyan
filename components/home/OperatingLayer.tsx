"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { useInView } from "@/lib/hooks";
import JourneyIcon3D from "./JourneyIcon3D";
import s from "./OperatingLayer.module.css";

const R = 190;
const C = 260;
/** which diagram elements each layer drives (by index) and each layer's default icon */
const LAYER_ELS = [[0], [1, 2], [3, 4], [5]];
const LAYER_ICON = ["inventory", "order", "dispatch", "data"];

type Iconic = { icon?: string; image?: string };

export default function OperatingLayer({ locale, b }: { locale: Locale; b?: Record<string, unknown> }) {
  const L = locale;
  const { operatingElements, operatingLayers, messages } = useSite();
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>("-20% 0px");
  const pick = (i: number) => { setTouched(true); setActive(i); };
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => { e.currentTarget.style.setProperty("--ry", "0deg"); e.currentTarget.style.setProperty("--rx", "0deg"); };
  const onKey = (e: React.KeyboardEvent<SVGGElement>, i: number) => {
    const n = operatingElements.length;
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + n) % n;
    pick(next);
    (e.currentTarget.parentElement?.querySelectorAll<SVGGElement>("[data-node]")[next])?.focus();
  };
  const glyph = (it: Iconic, fallback: string, size: number, x = 0, y = 0) =>
    it.image ? <image href={it.image} x={x} y={y} width={size} height={size} preserveAspectRatio="xMidYMid meet" /> : <JourneyIcon3D stage={fallback} icon={it.icon} x={x} y={y} width={size} height={size} />;

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
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, "01 · OPERATING LAYER")}</p>
          <h2 id="layer-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>{px(b, "title", L, messages.oneStatement[L])}</h2>
          <p className="lead muted" data-reveal style={{ ["--d" as string]: 160 }}>
            {px(b, "lead", L, L === "ar" ? "القيمة ليست في توفر كل خدمة على حدة، بل في ترابطها وإدارتها تحت مسؤولية تشغيلية واحدة." : "The value is in connecting the services and running them under one operating accountability.")}
          </p>

          <ol className={s.layers}>
            {operatingLayers.map((ly, i) => (
              <li
                key={ly.en}
                data-reveal
                style={{ ["--d" as string]: 200 + i * 80 }}
                className={(LAYER_ELS[i] ?? []).includes(active) ? s.layerOn : ""}
                onMouseEnter={() => (LAYER_ELS[i] ? pick(LAYER_ELS[i][0]) : undefined)}
              >
                <span className={s.layerIcon}>
                  {ly.image ? <img src={ly.image} alt="" /> : <JourneyIcon3D stage={LAYER_ICON[i] ?? ""} icon={ly.icon} />}
                </span>
                <span className="mono">{String(i + 1).padStart(2, "0")} · {ly.en}</span>
                <strong>{ly.label[L]}</strong>
                <span className={s.items}>{ly.items[L]}</span>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref} className={s.diagramWrap} data-reveal onPointerMove={tilt} onPointerLeave={untilt}>
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
            <circle key={`p${active}`} r="4.5" className={s.pulse}>
              <animateMotion dur="1.4s" repeatCount="indefinite" path={`M${C},${C} L${pts[active].x},${pts[active].y}`} />
            </circle>
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
                data-node
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
              >
                <circle r="54" />
                <g className={s.nodeIcon}>{glyph(operatingElements[i], operatingElements[i].key, 42, -21, -33)}</g>
                <text y="22" textAnchor="middle">{operatingElements[i].label[L]}</text>
              </g>
            ))}
          </svg>
          <div className={s.note} aria-live="polite">
            <div className={s.noteIcon} key={`ni${active}`}>
              {el.image ? <img src={el.image} alt="" /> : <JourneyIcon3D stage={el.key} icon={el.icon} />}
            </div>
            <span className="mono">{el.en}</span>
            <p>{el.note[L]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
