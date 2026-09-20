import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import Arrow from "./Arrow";
import Magnetic from "./Magnetic";

export default function CtaBand({ locale, title, text, cta, tone = "graphite" }: { locale: Locale; title: string; text?: string; cta: string; tone?: "graphite" | "dark" | "tint" }) {
  return (
    <section className={`${tone} section--tight cta-band`}>
      <div className="wrap cta-band__inner">
        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          <h2 className="h2" data-reveal>{title}</h2>
          {text && <p className="lead" style={{ opacity: 0.8 }} data-reveal>{text}</p>}
        </div>
        <div data-reveal>
          <Magnetic><Link href={localePath(locale, "/contact")} className="btn">{cta} <Arrow /></Link></Magnetic>
        </div>
      </div>
    </section>
  );
}
