import type { Locale } from "@/content/types";
import { foundation } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import WhyJedyan from "@/components/home/WhyJedyan";
import Visibility from "@/components/home/Visibility";
import { ui } from "@/lib/ui";
import s from "./Content.module.css";

export default function WhyPage({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <>
      <PageHero locale={L} eyebrow="WHY JEDYAN" title={[t("شريك تشغيل", "An operating partner"), t("يُعتمد عليه.", "you can rely on.")]} lead={t("الفرق بين مزوّد خدمة وشريك تشغيل هو موقع المسؤولية: من يملك القرار حين يتغيّر الواقع.", "The difference between a service provider and an operating partner is where accountability sits: who owns the decision when reality changes.")} crumbs={[{ href: "/why-jedyan", label: t("لماذا جديان", "Why Jedyan") }]} />
      <WhyJedyan locale={L} eyebrow="SIX REASONS" />
      <section className="section graphite">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">FOUR PILLARS</span>
            <h2 className="h2" data-reveal>{t("أربعة أسباب مختلفة لشراء الأساس التشغيلي نفسه.", "Four different reasons to buy the same operating foundation.")}</h2>
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
      <Visibility locale={L} eyebrow="TECHNOLOGY & VISIBILITY" />
      <CtaBand tone="tint" locale={L} title={t("لنبدأ من تشخيص عمليتك.", "Let's start by diagnosing your operation.")} cta={ui("diagnose", L)} />
    </>
  );
}
