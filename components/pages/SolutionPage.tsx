import Link from "next/link";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { solutions, type Solution } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import Glyph from "@/components/solutions/Glyph";
import { BinsVisual, FlowVisual, ConnectVisual, CarrierVisual, ReturnsVisual, TowerVisual } from "@/components/solutions/Visuals";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL } from "@/content/site";
import s from "./SolutionPage.module.css";

const VIS = { bins: BinsVisual, flow: FlowVisual, connect: ConnectVisual, carrier: CarrierVisual, returns: ReturnsVisual, tower: TowerVisual };

/**
 * Each solution shares one information model but not one composition:
 * the visual's placement and the ground colour of each band follow the nature of the service.
 */
export default function SolutionPage({ locale, slug }: { locale: Locale; slug: string }) {
  const L = locale;
  const x = solutions.find((v) => v.slug === slug) as Solution;
  const i = solutions.indexOf(x);
  const Visual = VIS[x.visual];
  const wide = x.visual === "carrier" || x.visual === "connect";
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  const others = solutions.filter((v) => v.slug !== slug);

  const problemRole = (
    <div className={s.pr}>
      <div data-reveal>
        <span className="mono muted">THE PROBLEM</span>
        <h2 className="h3">{t("المشكلة التي تعالجها الخدمة", "The problem this solves")}</h2>
        <p>{x.problem[L]}</p>
      </div>
      <div data-reveal style={{ ["--d" as string]: 100 }}>
        <span className="mono accent">JEDYAN&apos;S ROLE</span>
        <h2 className="h3">{t("دور جديان", "Jedyan's role")}</h2>
        <p>{x.role[L]}</p>
      </div>
    </div>
  );

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: x.title[L], serviceType: x.en, description: x.intro[L], areaServed: { "@type": "Country", name: "Saudi Arabia" }, provider: { "@type": "Organization", name: L === "ar" ? "جديان للخدمات اللوجستية" : "Jedyan Logistics", url: SITE_URL }, url: SITE_URL + localePath(L, `/solutions/${x.slug}`) }} />
      <PageHero
        locale={L}
        eyebrow={`${x.n} · ${x.en.toUpperCase()}`}
        title={[x.title[L]]}
        lead={x.intro[L]}
        crumbs={[{ href: "/solutions", label: t("حلولنا", "Solutions") }, { href: `/solutions/${x.slug}`, label: x.title[L] }]}
      >
        <p className={s.headline} data-reveal style={{ ["--d" as string]: 420 }}>{x.headline[L]}</p>
      </PageHero>

      {wide ? (
        <>
          <section className="section white"><div className="wrap">{problemRole}</div></section>
          <section className={`section--tight paper`}><div className="wrap" data-reveal><Visual locale={L} /></div></section>
        </>
      ) : (
        <section className={`section ${i % 2 ? "paper" : "white"}`}>
          <div className={`wrap ${s.twoCol} ${i % 2 ? s.flip : ""}`}>
            {problemRole}
            <div className={s.visualCol} data-reveal><Visual locale={L} /></div>
          </div>
        </section>
      )}

      <section className={`section ${wide ? "white" : i % 2 ? "white" : "paper"}`}>
        <div className={`wrap ${s.scopeGrid}`}>
          <div className={s.scopeHead}>
            <span className="eyebrow">SCOPE</span>
            <h2 className="h2" data-reveal>{t("نطاق الخدمة", "Service scope")}</h2>
            <Glyph type={x.visual} className={s.glyph} />
          </div>
          <ul className={s.scope}>
            {x.scope.map((sc, k) => (
              <li key={k} data-reveal style={{ ["--d" as string]: k * 40 }}>
                <span className="mono">{String(k + 1).padStart(2, "0")}</span>{sc[L]}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">OPERATING STAGES</span>
            <h2 className="h2" data-reveal>{t("مراحل التشغيل", "Operating stages")}</h2>
          </div>
          <ol className={s.stages} style={{ ["--n" as string]: x.stages.length }}>
            {x.stages.map((st, k) => (
              <li key={k} data-reveal style={{ ["--d" as string]: k * 90 }}>
                <span className={s.stageN}>{String(k + 1).padStart(2, "0")}</span>
                <strong>{st[L]}</strong>
              </li>
            ))}
          </ol>

          <div className={s.triple}>
            <div data-reveal>
              <span className="mono accent">OUTPUTS</span>
              <h3 className="h3">{t("المخرجات", "Outputs")}</h3>
              <ul>{x.outputs.map((o, k) => <li key={k}>{o[L]}</li>)}</ul>
            </div>
            <div data-reveal style={{ ["--d" as string]: 90 }}>
              <span className="mono accent">KPIs</span>
              <h3 className="h3">{t("مؤشرات الأداء", "Performance indicators")}</h3>
              <ul>{x.kpis.map((o, k) => <li key={k}>{o[L]}</li>)}</ul>
              <p className={s.fine}>{t("تُحدَّد القيم المستهدفة لكل حساب ضمن اتفاقية مستوى الخدمة SLA.", "Target values are agreed per account in the SLA.")}</p>
            </div>
            {x.tech && (
              <div data-reveal style={{ ["--d" as string]: 180 }}>
                <span className="mono accent">TECHNOLOGY</span>
                <h3 className="h3">{t("التكامل التقني", "Technology & integration")}</h3>
                <p>{x.tech[L]}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className={`wrap ${s.relation}`}>
          <div>
            <span className="eyebrow">ONE SYSTEM</span>
            <h2 className="h2" data-reveal>{t("العلاقة مع باقي منظومة جديان", "How it connects to the Jedyan system")}</h2>
            <p className="lead muted" data-reveal>{x.relation[L]}</p>
          </div>
          <ul className={s.others}>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={localePath(L, `/solutions/${o.slug}`)}>
                  <span className="mono">{o.n}</span>
                  <strong>{o.title[L]}</strong>
                  <span aria-hidden="true" className={s.go}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand locale={L} title={t("لنصمّم هذا الجزء من عمليتك.", "Let's design this part of your operation.")} text={t("نبدأ من شكل طلبك وأصنافك وقنواتك — ثم نقترح النموذج.", "We start from your order profile, SKUs and channels — then propose the model.")} cta={x.cta[L]} />
    </>
  );
}
