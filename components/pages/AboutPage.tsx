import type { Locale } from "@/content/types";
import { company, foundation, messages, operatingLayers } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { ui } from "@/lib/ui";
import s from "./Content.module.css";

export default function AboutPage({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  const redefs = [
    { from: t("اللوجستيات ليست نقلًا", "Logistics isn't transport"), to: t("اللوجستيات هي تمكين الأعمال", "Logistics is business enablement"), text: t("النقل نتيجة ظاهرة لعملية أعمق: قرار متى، وأين، وكم، وبأي تسلسل. من يرى النقل فقط يبيع حركة. من يرى القرار يبيع قدرة.", "Transport is the visible result of a deeper process: deciding when, where, how much and in what sequence. Those who see only transport sell movement. Those who see the decision sell capability.") },
    { from: t("المستودعات ليست مباني", "Warehouses aren't buildings"), to: t("المستودعات بنية نمو", "Warehouses are growth infrastructure"), text: t("المتر المربع لا يعني شيئًا بذاته. ما يعنيه هو: كم طلبًا إضافيًا يستطيع العميل قبوله غدًا دون أن يوقّع عقدًا جديدًا أو يوظّف فريقًا جديدًا.", "A square metre means nothing on its own. What matters is how many additional orders the client can accept tomorrow without signing a new contract or hiring a new team.") },
    { from: t("العمليات ليست إجراءات", "Operations aren't procedures"), to: t("العمليات ثقة في حالة حركة", "Operations are trust in motion"), text: t("كل شحنة تخرج في وقتها هي وعدٌ وُفي به، وكل رقم جرد صحيح هو أمانة حُفظت.", "Every shipment that leaves on time is a promise kept; every correct count is a trust preserved.") },
  ];
  const quality = [
    { h: t("ضبط الجودة", "Quality control"), p: t("نقاط فحص محددة داخل العملية.", "Defined checkpoints inside the process.") },
    { h: t("تقليل المخاطر التشغيلية", "Operational risk reduction"), p: t("معالجة الانحراف قبل أن يصل للعميل.", "Deviations handled before they reach the client.") },
    { h: t("حماية الشحنات", "Shipment protection"), p: t("التغليف والمناولة وفق حدود الوزن والأبعاد.", "Packaging and handling within weight and dimension limits.") },
    { h: t("استمرارية الأعمال", "Business continuity"), p: t("إجراءات بديلة عند تغيّر الظرف التشغيلي.", "Fallback procedures when operating conditions change.") },
    { h: t("الالتزام بالأنظمة", "Regulatory compliance"), p: t("التوافق مع المتطلبات النظامية في المملكة.", "Alignment with regulatory requirements in the Kingdom.") },
  ];
  return (
    <>
      <PageHero locale={L} eyebrow="ABOUT JEDYAN" title={[messages.oneStatement[L]]} lead={messages.heroSupport[L]} crumbs={[{ href: "/about", label: t("من نحن", "About") }]} />

      <section className="section white">
        <div className={`wrap ${s.intro}`}>
          <div data-reveal>
            <span className="eyebrow">WHO WE ARE</span>
            <h2 className="h2">{company.name[L]}</h2>
            <p className="lead muted">{company.parent[L]} — {company.country[L]}</p>
          </div>
          <div className={s.statement} data-reveal>
            <p className={s.big}>{t("نحن لا نرى الطلب رقمًا يخرج من المستودع. نراه وعدًا تجاريًا بدأ قبل أن يصل إلينا.", "We don't see an order as a number leaving the warehouse. We see it as a commercial promise that began before it reached us.")}</p>
            <p>{t("لهذا لا نقيس عملنا بعدد الشحنات فقط، بل بقدرة العميل على أن يبيع أكثر دون أن يزيد التعقيد بنفس السرعة. نربط ما يتفرق عادةً: المخزون، الطلب، التنفيذ، الناقل، المرتجع، والمعلومة. ونقول ما نستطيع قبل أن نَعِد بما نريد.", "That's why we don't measure our work by shipments alone, but by our client's ability to sell more without complexity growing at the same pace. We connect what is usually scattered: stock, order, execution, carrier, return and information. And we say what we can do before we promise what we want.")}</p>
            <p className="accent" style={{ fontWeight: 600 }}>{t("جديان. نُحرّك الأعمال لأننا نجعل حركتها جاهزة.", "Jedyan. We move business because we make its movement ready.")}</p>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">CATEGORY</span>
            <h2 className="h2" data-reveal>{messages.category[L]}</h2>
            <p className="lead muted" data-reveal>{t("لسنا «شركة تخزين» لأن التخزين عنصر داخل العملية. ولسنا «شركة شحن» لأن الشبكات يمكن شراؤها؛ أما مسؤولية الطلب من المخزون إلى التسليم فهي القيمة الأعلى.", "We aren't a \"storage company\", because storage is one element of the process. We aren't a \"shipping company\", because networks can be bought; accountability for the order from stock to delivery is the higher value.")}</p>
          </div>
          <ol className={s.layers}>
            {operatingLayers.map((ly, i) => (
              <li key={ly.en} data-reveal style={{ ["--d" as string]: i * 80 }}>
                <span className="mono">{ly.en}</span>
                <strong>{ly.label[L]}</strong>
                <span>{ly.items[L]}</span>
              </li>
            ))}
          </ol>
          <p className={s.note} data-reveal>{t("حين تُدار الطبقات الأربع تحت مسؤولية واحدة، يصبح التشغيل أكثر وضوحًا، والنتيجة أكثر قابلية للقياس والتنفيذ.", "When the four layers are run under one accountability, operations become clearer and results more measurable.")}</p>
        </div>
      </section>

      <section className="section paper">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">BRAND PHILOSOPHY</span>
            <h2 className="h2" data-reveal>{t("ثلاث إعادات تعريف تحكم كيف تفكّر جديان.", "Three redefinitions govern how Jedyan thinks.")}</h2>
          </div>
          <ul className={s.redefs}>
            {redefs.map((r, i) => (
              <li key={i} data-reveal style={{ ["--d" as string]: i * 90 }}>
                <span className={s.from}>{r.from}</span>
                <strong className={s.to}>{r.to}</strong>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section white">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">QUALITY & COMPLIANCE</span>
            <h2 className="h2" data-reveal>{t("الانضباط ليس إجراءً إضافيًا — بل شرط استمرار.", "Discipline isn't an extra step — it's a condition for continuity.")}</h2>
            <p className="lead muted" data-reveal>{t("نلتزم بإجراءات تشغيل تتوافق مع الأنظمة المعمول بها في المملكة، وتحمي البضاعة والعلاقة معًا.", "We follow operating procedures aligned with the Kingdom's regulations, protecting both the goods and the relationship.")}</p>
          </div>
          <ul className={s.quality}>
            {quality.map((q, i) => (
              <li key={i} data-reveal style={{ ["--d" as string]: i * 60 }}>
                <strong>{q.h}</strong>
                <p>{q.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section--tight tint">
        <div className="wrap">
          <p className={s.star} data-reveal>{foundation.star[L]}</p>
        </div>
      </section>

      <CtaBand locale={L} title={t("تحدّث مع فريق جديان.", "Talk to the Jedyan team.")} text={t("أرسل لنا شكل طلبك وأصنافك وقنواتك، ونعود إليك بتصوّر تشغيلي أولي.", "Send us your order profile, SKUs and channels, and we'll come back with an initial operating model.")} cta={ui("talkTeam", L)} />
    </>
  );
}
