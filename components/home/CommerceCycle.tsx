"use client";
import { useEffect, useState, type CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { useInView } from "@/lib/hooks";
import s from "./CommerceCycle.module.css";

/* stations laid out as a loop: top row runs forward, bottom row returns */
const ORDER_TOP = [0, 1, 2, 3];
const ORDER_BOTTOM = [7, 6, 5, 4];

export default function CommerceCycle({ locale, b }: { locale: Locale; b?: Record<string, unknown> }) {
  const L = locale;
  const { cycle } = useSite();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>("-15% 0px");

  useEffect(() => {
    if (!inView || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % cycle.length), 2800);
    return () => window.clearInterval(id);
  }, [inView, hold]);

  const station = (i: number) => (
    <button
      key={cycle[i].en}
      type="button"
      className={`${s.station} ${i === active ? s.on : ""}`}
      style={{ "--k": i } as CSSProperties}
      onMouseEnter={() => { setHold(true); setActive(i); }}
      onFocus={() => { setHold(true); setActive(i); }}
      onClick={() => { setHold(true); setActive(i); }}
      aria-pressed={i === active}
    >
      <span className="mono">{String(i + 1).padStart(2, "0")} · {cycle[i].en}</span>
      <strong>{cycle[i].label[L]}</strong>
    </button>
  );

  return (
    <section className={`section paper ${s.section}`} aria-labelledby="cycle-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, "02 · COMMERCE OPERATIONS CYCLE")}</p>
          <h2 id="cycle-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {px(b, "title", L, L === "ar" ? "الطلب لا يبدأ من المستودع — لكنه لا يكتمل بدونه." : "Demand does not start in the warehouse — but it cannot be completed without it.")}
          </h2>
          <p className="lead" data-reveal style={{ ["--d" as string]: 160 }}>
            {px(b, "lead", L, L === "ar" ? "لا نُدير خدمات منفصلة؛ بل نربط طلب السوق بالمخزون والتنفيذ والتوزيع والمرتجعات والبيانات ضمن دورة تشغيل واحدة." : "We connect market demand to inventory, fulfillment, distribution, returns and data in one operating cycle.")}
          </p>
        </div>

        <div ref={ref} className={s.loop} data-reveal onMouseLeave={() => setHold(false)} style={{ "--a": active } as CSSProperties}>
          <span className={s.outline} aria-hidden="true" />
          <div className={s.row}>{ORDER_TOP.map(station)}</div>
          <div className={s.center} aria-live="polite">
            <span className={s.centerEn}>{cycle[active].en}</span>
            <p key={active}>{cycle[active].note[L]}</p>
          </div>
          <div className={s.row}>{ORDER_BOTTOM.map(station)}</div>
        </div>

        <p className={s.closing} data-reveal>
          {px(b, "closing", L, L === "ar" ? "البيانات تُغلق دورة التشغيل، وتهيّئ القرار للطلب التالي." : "Data closes the operating cycle and prepares the decision for the next order.")}
        </p>
      </div>
    </section>
  );
}
