import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { solutions } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Glyph from "@/components/solutions/Glyph";
import { ui } from "@/lib/ui";
import s from "./SolutionsIndex.module.css";

export default function SolutionsIndex({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <>
      <PageHero locale={L} eyebrow="OUR SOLUTIONS" title={[t("ستة محاور", "Six pillars."), t("تبني رحلة واحدة.", "One journey.")]} lead={t("العميل لا يشتري ستة عقود — يشتري نتيجة واحدة مصمّمة من ستة محاور. نُنظّم الخدمات حسب رحلة الطلب، لا حسب الإدارات الداخلية.", "Clients don't buy six contracts — they buy one outcome designed from six pillars. Services follow the order's journey, not our internal departments.")} crumbs={[{ href: "/solutions", label: t("حلولنا", "Solutions") }]} />
      <section className="section white">
        <div className="wrap">
          <ol className={s.list}>
            {solutions.map((x) => (
              <li key={x.slug} className={s.row} data-reveal>
                <Link href={localePath(L, `/solutions/${x.slug}`)} className={s.link}>
                  <span className={s.n}>{x.n}</span>
                  <span className={s.main}>
                    <span className="mono">{x.en.toUpperCase()}</span>
                    <strong className={s.title}>{x.title[L]}</strong>
                    <span className={s.headline}>{x.headline[L]}</span>
                    <span className={s.scope}>{x.scope.slice(0, 5).map((sc, k) => <span key={k}>{sc[L]}</span>)}</span>
                  </span>
                  <Glyph type={x.visual} className={s.glyph} />
                  <span className={s.go}>{ui("explore", L)} <span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand locale={L} title={t("كل عملية مختلفة. نبدأ بفهم عمليتك.", "Every operation is different. We start by understanding yours.")} cta={ui("diagnose", L)} />
    </>
  );
}
