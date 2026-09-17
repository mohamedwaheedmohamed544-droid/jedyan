import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { messages } from "@/content/site";
import { ui } from "@/lib/ui";
import Arrow from "@/components/ui/Arrow";
import Blades from "@/components/ui/Blades";
import Magnetic from "@/components/ui/Magnetic";
import Lines from "@/components/ui/Lines";
import s from "./Closing.module.css";

export default function Closing({ locale }: { locale: Locale }) {
  const L = locale;
  return (
    <section className={`graphite ${s.section}`} aria-labelledby="close-title">
      <Blades className={s.blades} />
      <div className={`wrap ${s.inner}`}>
        <p className="eyebrow" data-reveal>10 · READINESS</p>
        <Lines as="h2" className={s.title} lines={[L === "ar" ? "جاهزيةٌ" : "Readiness", L === "ar" ? "تُبنى عليها الأعمال." : "businesses are built on."]} />
        <p className={s.promise} data-reveal style={{ ["--d" as string]: 300 }}>{messages.promise[L]}</p>
        <div className={s.cta} data-reveal style={{ ["--d" as string]: 420 }}>
          <p className={s.ctaText}>{L === "ar" ? "لنبدأ من تشخيص عمليتك." : "Let's start by diagnosing your operation."}</p>
          <div className={s.btns}>
            <Magnetic><Link href={localePath(L, "/contact")} className="btn">{ui("diagnose", L)} <Arrow /></Link></Magnetic>
            <Link href={localePath(L, "/contact")} className={`btn btn--ghost ${s.ghost}`}>{ui("sendDetails", L)}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
