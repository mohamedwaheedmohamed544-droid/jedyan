"use client";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { ui } from "@/lib/ui";
import Arrow from "@/components/ui/Arrow";
import Blades from "@/components/ui/Blades";
import Magnetic from "@/components/ui/Magnetic";
import Lines from "@/components/ui/Lines";
import s from "./Closing.module.css";

export default function Closing({ locale, b }: { locale: Locale; b?: Record<string, unknown> }) {
  const L = locale;
  const { messages } = useSite();
  return (
    <section className={`graphite ${s.section}`} aria-labelledby="close-title">
      <Blades className={s.blades} />
      <div className={`wrap ${s.inner}`}>
        <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, "10 · READINESS")}</p>
        <Lines as="h2" className={s.title} lines={[px(b, "titleLine1", L, L === "ar" ? "جاهزيةٌ" : "Readiness"), px(b, "titleLine2", L, L === "ar" ? "تُبنى عليها الأعمال." : "businesses are built on.")]} />
        <p className={s.promise} data-reveal style={{ ["--d" as string]: 300 }}>{px(b, "promise", L, messages.promise[L])}</p>
        <div className={s.cta} data-reveal style={{ ["--d" as string]: 420 }}>
          <p className={s.ctaText}>{px(b, "ctaText", L, L === "ar" ? "لنبدأ من تشخيص عمليتك." : "Let's start by diagnosing your operation.")}</p>
          <div className={s.btns}>
            <Magnetic><Link href={localePath(L, "/contact")} className="btn">{px(b, "primaryLabel", L, ui("diagnose", L))} <Arrow /></Link></Magnetic>
            <Link href={localePath(L, "/contact")} className={`btn btn--ghost ${s.ghost}`}>{px(b, "secondaryLabel", L, ui("sendDetails", L))}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
