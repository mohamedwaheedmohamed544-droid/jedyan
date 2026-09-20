"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { ui } from "@/lib/ui";
import Arrow from "@/components/ui/Arrow";
import Magnetic from "@/components/ui/Magnetic";
import FlowCanvas from "./FlowCanvas";
import s from "./Hero.module.css";

const TICKET_STAGES = [2, 3, 4, 5, 6]; // order → pick → pack → dispatch → delivery

export default function Hero({ locale, b }: { locale: Locale; b?: Record<string, unknown> }) {
  const L = locale;
  const { journey, messages } = useSite();
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
    const id = window.setInterval(() => setStage((v) => (v + 1) % TICKET_STAGES.length), 2600);
    return () => window.clearInterval(id);
  }, [paused]);

  const j = journey[TICKET_STAGES[stage]];

  return (
    <section className={`dark ${s.hero}`} aria-labelledby="hero-title">
      <div className={s.canvas}>
        <FlowCanvas rtl={L === "ar"} />
        <ul className={s.sources} aria-hidden="true">
          {(L === "ar" ? ["متجر إلكتروني", "تطبيق", "منصات البيع", "فروع", "طلبات B2B"] : ["Online store", "App", "Marketplaces", "Branches", "B2B orders"]).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <span className={s.hubLabel} aria-hidden="true">
          <span className="latin">JEDYAN</span> OPERATING LAYER
        </span>
      </div>

      <div className={`wrap ${s.inner}`}>
        <div className={s.copy}>
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, "COMMERCE OPERATIONS · KSA")}</p>
          <h1 id="hero-title" className={`lines ${s.title}`}>
            <span style={{ ["--i" as string]: 0 }}><span>{px(b, "line1", L, messages.bigIdea1[L])}</span></span>
            <span style={{ ["--i" as string]: 1 }}><span className="accent">{px(b, "line2", L, messages.bigIdea2[L])}</span></span>
          </h1>
          <p className={s.support} data-reveal style={{ ["--d" as string]: 350 }}>{px(b, "support", L, messages.heroSupport[L])}</p>
          <div className={s.ctas} data-reveal style={{ ["--d" as string]: 500 }}>
            <Magnetic>
              <Link href={localePath(L, String(b?.primaryHref || "/contact"))} className="btn">{px(b, "primaryLabel", L, ui("requestModel", L))} <Arrow /></Link>
            </Magnetic>
            <Link href={localePath(L, String(b?.secondaryHref || "/how-we-work"))} className={`btn btn--ghost ${s.ghost}`}>{px(b, "secondaryLabel", L, L === "ar" ? "شاهد كيف نعمل" : "See how we work")}</Link>
          </div>
        </div>

        <div className={s.ticket} role="status" aria-live="polite" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} data-reveal style={{ ["--d" as string]: 700 }}>
          <div className={s.ticketHead}>
            <span className="mono">ORDER · JD-24817</span>
            <span className={s.live}><i className="dot dot--live" /> {L === "ar" ? "مثال توضيحي" : "Illustrative"}</span>
          </div>
          <p className={s.ticketStatus} key={stage}>{j.status[L]}</p>
          <ol className={s.ticketSteps}>
            {TICKET_STAGES.map((si, i) => (
              <li key={si} className={i < stage ? s.done : i === stage ? s.now : ""}>
                <span className="mono">{journey[si].en}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <a href="#layer" className={s.scroll}>
        <span>{L === "ar" ? "ما الذي نديره" : "What we run"}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
