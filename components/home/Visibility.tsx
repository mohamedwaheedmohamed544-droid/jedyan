"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { useInView } from "@/lib/hooks";
import { ui } from "@/lib/ui";
import s from "./Visibility.module.css";

/* Illustrative sample only — shapes the concept, never presented as Jedyan performance. */
const STATUS = [
  { en: "Received", ar: "مستلم", v: 128 },
  { en: "Picking", ar: "انتقاء", v: 64 },
  { en: "Packed", ar: "مغلّف", v: 47 },
  { en: "Dispatched", ar: "مُرسل", v: 212 },
  { en: "Delivered", ar: "مُسلّم", v: 540 },
];
const STOCK = [
  { en: "Available", ar: "متاح", v: 82, c: "#ff6e06" },
  { en: "Reserved", ar: "محجوز", v: 12, c: "#ffa66b" },
  { en: "Returned", ar: "مرتجع", v: 4, c: "#8b8a8f" },
  { en: "Damaged", ar: "تالف", v: 2, c: "#5d5d60" },
];
const SPARK = [42, 48, 45, 53, 51, 58, 55, 61, 64, 60, 67, 71];

function useCount(target: number, run: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(target); return; }
    let raf = 0; const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, ms]);
  return v;
}

function Count({ n, run }: { n: number; run: boolean }) {
  return <>{useCount(n, run).toLocaleString("en-US")}</>;
}

export default function Visibility({ locale, eyebrow = "08 · TECHNOLOGY & VISIBILITY", b }: { locale: Locale; eyebrow?: string; b?: Record<string, unknown> }) {
  const L = locale;
  const { visibility } = useSite();
  const [ref, inView] = useInView<HTMLDivElement>("-10% 0px", true);
  const max = Math.max(...SPARK), min = Math.min(...SPARK);
  const pts = SPARK.map((v, i) => `${(i / (SPARK.length - 1)) * 280},${70 - ((v - min) / (max - min)) * 56}`).join(" ");

  return (
    <section className={`section dark ${s.section}`} aria-labelledby="vis-title">
      <div className="wrap split">
        <div className={s.copy}>
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, eyebrow)}</p>
          <h2 id="vis-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {px(b, "title", L, L === "ar" ? "ما لا يمكن رؤيته، لا يمكن إدارته." : "What cannot be seen cannot be managed.")}
          </h2>
          <p className="lead muted" data-reveal style={{ ["--d" as string]: 140 }}>
            {px(b, "lead", L, L === "ar" ? "نستخدم أنظمة تشغيل وتقارير تجعل حالة المخزون والطلب معلومة قبل أن تُطلب." : "We use operating systems and reporting that make stock and order status known before anyone asks.")}
          </p>
          <ul className={s.list}>
            {visibility.map((v, i) => (
              <li key={v.en} data-reveal style={{ ["--d" as string]: 180 + i * 60 }}>
                <span className="mono">{v.en}</span>
                <strong>{v.label[L]}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref} className={`${s.board} ${inView ? s.live : ""}`} data-reveal>
          <div className={s.boardHead}>
            <span className="mono">OPERATIONS OVERVIEW</span>
            <span className={s.tag}>{ui("illustrative", L)}</span>
          </div>

          <div className={s.block}>
            <span className={s.k}>{L === "ar" ? "حالة الطلبات" : "Order status"}</span>
            <div className={s.status}>
              {STATUS.map((x, i) => (
                <div key={x.en} style={{ ["--i" as string]: i }}>
                  <span className={`num ${s.big}`}><Count n={x.v} run={inView} /></span>
                  <span className={s.small}>{L === "ar" ? x.ar : x.en}</span>
                  <span className={s.flowbar}><i /></span>
                </div>
              ))}
            </div>
          </div>

          <div className={s.two}>
            <div className={s.block}>
              <span className={s.k}>{L === "ar" ? "حالة المخزون" : "Inventory status"}</span>
              <div className={s.stack} aria-hidden="true">
                {STOCK.map((x) => <i key={x.en} style={{ flexGrow: x.v, background: x.c }} />)}
              </div>
              <ul className={s.legend}>
                {STOCK.map((x) => (
                  <li key={x.en}><i style={{ background: x.c }} />{L === "ar" ? x.ar : x.en}<span className="num">{x.v}%</span></li>
                ))}
              </ul>
            </div>
            <div className={s.block}>
              <span className={s.k}>{L === "ar" ? "التسليم — آخر 12 أسبوعًا" : "Delivery — last 12 weeks"}</span>
              <svg viewBox="0 0 280 76" className={s.spark} aria-hidden="true">
                <line x1="0" y1="72" x2="280" y2="72" stroke="rgba(255,255,255,.1)" />
                <line x1="0" y1="42" x2="280" y2="42" stroke="rgba(255,255,255,.06)" />
                <polygon points={`0,76 ${pts} 280,76`} fill="rgba(255,110,6,.12)" />
                <polyline points={pts} fill="none" stroke="#ff6e06" strokeWidth="2" strokeLinejoin="round" className={s.sparkLine} pathLength={1} />
                <circle cx="280" cy={70 - ((SPARK[SPARK.length - 1] - min) / (max - min)) * 56} r="4" fill="#ff6e06" />
              </svg>
            </div>
          </div>

          <div className={s.alert} role="note">
            <span className={s.sev} aria-hidden="true" />
            <div>
              <strong>{L === "ar" ? "استثناء · عنوان تسليم غير مكتمل" : "Exception · incomplete delivery address"}</strong>
              <p>{L === "ar" ? "رُصد الانحراف، أُبلغ العميل، والإجراء التصحيحي قيد التنفيذ." : "Deviation detected, client notified, corrective action in progress."}</p>
            </div>
            <span className="mono">EXC-0412</span>
          </div>
        </div>
      </div>
    </section>
  );
}
