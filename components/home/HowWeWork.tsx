"use client";
import { useEffect, useState, type CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { useInView } from "@/lib/hooks";
import s from "./HowWeWork.module.css";

export default function HowWeWork({ locale, eyebrow = "07 · HOW WE WORK", b }: { locale: Locale; eyebrow?: string; b?: Record<string, unknown> }) {
  const L = locale;
  const { clientJourney } = useSite();
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>("-20% 0px");
  useEffect(() => {
    if (!inView || hold || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((v) => (v + 1) % clientJourney.length), 3200);
    return () => window.clearInterval(id);
  }, [inView, hold]);
  const st = clientJourney[active];

  const onKey = (e: React.KeyboardEvent) => {
    const fwd = L === "ar" ? "ArrowLeft" : "ArrowRight";
    const back = L === "ar" ? "ArrowRight" : "ArrowLeft";
    if (e.key === fwd) { setHold(true); setActive((v) => Math.min(clientJourney.length - 1, v + 1)); }
    if (e.key === back) { setHold(true); setActive((v) => Math.max(0, v - 1)); }
  };

  return (
    <section className="section tint" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, eyebrow)}</p>
          <h2 id="how-title" className="h2" data-reveal style={{ ["--d" as string]: 80 }}>
            {px(b, "title", L, L === "ar" ? "من التشخيص إلى التوسّع — رحلة واحدة بست محطات." : "From diagnosis to scale — one journey, six stations.")}
          </h2>
          <p className="lead" data-reveal style={{ ["--d" as string]: 140 }}>
            {px(b, "lead", L, L === "ar" ? "لا نبدأ بالسعر. نبدأ بفهم شكل الطلب، لأن التسعير الصحيح نتيجة تشخيص صحيح." : "We start by understanding your orders — correct pricing is the result of a correct diagnosis.")}
          </p>
        </div>

        <div ref={ref} className={s.wrap} data-reveal style={{ "--a": active, "--n": clientJourney.length } as CSSProperties}>
          <div className={s.tabs} role="tablist" aria-label={L === "ar" ? "مراحل رحلة العميل" : "Client journey stages"} onKeyDown={onKey}>
            <span className={s.line} aria-hidden="true"><i /></span>
            {clientJourney.map((c, i) => (
              <button
                key={c.en}
                role="tab"
                id={`hw-tab-${i}`}
                aria-selected={i === active}
                aria-controls="hw-panel"
                tabIndex={i === active ? 0 : -1}
                className={`${s.tab} ${i <= active ? s.reached : ""} ${i === active ? s.on : ""}`}
                onClick={() => { setHold(true); setActive(i); }}
              >
                <i aria-hidden="true" />
                <span className="mono">{c.en}</span>
                <strong>{c.label[L]}</strong>
              </button>
            ))}
          </div>

          <div id="hw-panel" role="tabpanel" aria-labelledby={`hw-tab-${active}`} className={s.panel} key={active}>
            <div>
              <span className={s.k}>{L === "ar" ? "ما نقوم به" : "What we do"}</span>
              <p className={s.does}>{st.does[L]}</p>
            </div>
            <div>
              <span className={s.k}>{L === "ar" ? "سؤال العميل في هذه المرحلة" : "The client's question here"}</span>
              <p className={s.q}>«{st.question[L]}»</p>
            </div>
            <div>
              <span className={s.k}>{L === "ar" ? "الدليل الذي نقدّمه" : "The evidence we provide"}</span>
              <p className={`mono ${s.proof}`}>{st.proof}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
