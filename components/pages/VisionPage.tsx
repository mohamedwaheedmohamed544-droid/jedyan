import type { Locale } from "@/content/types";
import { foundation, messages } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { ui } from "@/lib/ui";
import s from "./Content.module.css";

export default function VisionPage({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <>
      <PageHero locale={L} eyebrow="JEDYAN VISION" title={[t("الثبات", "The stability"), t("الذي يُحرّك.", "that moves.")]} lead={foundation.star[L]} crumbs={[{ href: "/vision", label: t("رؤية جديان", "Vision") }]} />

      <section className="section dark">
        <div className="wrap">
          <div className={s.vm}>
            <div data-reveal>
              <span className="eyebrow">VISION</span>
              <p className={s.vmText}>{foundation.vision[L]}</p>
              <p className="muted">{t("الرؤية لا تقول «الأكبر» ولا «الرائدة». تقول «الثابتة» — لأن الريادة تُدّعى، أما الثبات فيُختبر.", "The vision doesn't say \"largest\" or \"leading\". It says \"fixed\" — because leadership is claimed, stability is tested.")}</p>
            </div>
            <div data-reveal style={{ ["--d" as string]: 120 }}>
              <span className="eyebrow">MISSION</span>
              <p className={s.vmText}>{foundation.mission[L]}</p>
            </div>
          </div>
          <div className={s.vm} style={{ marginTop: 24 }}>
            <div data-reveal>
              <span className="eyebrow">PURPOSE</span>
              <p className={s.vmText}>{foundation.purpose[L]}</p>
            </div>
            <div data-reveal style={{ ["--d" as string]: 120 }}>
              <span className="eyebrow">PROMISE</span>
              <p className={s.vmText}>{messages.promise[L]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">VALUES</span>
            <h2 className="h2" data-reveal>{t("خمس قيم مكتوبة كسلوك — لا كصفات.", "Five values written as behaviour — not adjectives.")}</h2>
          </div>
          <ol className={s.values}>
            {foundation.values.map((v, i) => (
              <li key={i} data-reveal style={{ ["--d" as string]: i * 60 }}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{v.label[L]}</strong>
                <p>{v.text[L]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section graphite">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">BRAND PILLARS</span>
            <h2 className="h2" data-reveal>{messages.essence[L]}</h2>
            <p className="lead muted" data-reveal>{t("الجاهزية هنا ليست استعدادًا عامًا؛ هي قدرة قابلة للقياس على استقبال المخزون، واستيعاب الطلب، وتنفيذ الأمر، وتوجيه الشحنة، وإغلاق الاستثناء — دون أن يضطر العميل إلى بناء ذلك بنفسه.", "Readiness here isn't general preparedness; it's a measurable capability to receive stock, absorb demand, execute the order, route the shipment and close the exception — without the client having to build it themselves.")}</p>
          </div>
          <ul className={s.pillars}>
            {foundation.pillars.map((p) => (
              <li key={p.en} data-reveal>
                <span className="latin">{p.en}</span>
                <strong>{p.label[L]}</strong>
                <p>{p.text[L]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand tone="tint" locale={L} title={t("جاهزيةٌ تُبنى عليها الأعمال.", "Readiness businesses are built on.")} text={t("لنبدأ من تشخيص عمليتك.", "Let's start by diagnosing your operation.")} cta={ui("diagnose", L)} />
    </>
  );
}
