"use client";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { localePath } from "@/content/types";
import { useSite, px } from "@/components/SiteContext";
import { ui } from "@/lib/ui";
import Arrow from "@/components/ui/Arrow";
import Magnetic from "@/components/ui/Magnetic";
import Blades from "@/components/ui/Blades";
import Lines from "@/components/ui/Lines";
import Glyph from "@/components/solutions/Glyph";
import { CarrierVisual } from "@/components/solutions/Visuals";
import DiagnosticForm from "@/components/contact/DiagnosticForm";
import s from "./Content.module.css";
import si from "./SolutionsIndex.module.css";
import c from "./ContactPage.module.css";

export type BlockProps = { locale: Locale; b?: Record<string, unknown> };
type Tone = "white" | "paper" | "dark" | "graphite" | "tint";
const tone = (b: BlockProps["b"], d: Tone = "white") => (String(b?.tone || d) as Tone);
const bool = (b: BlockProps["b"], k: string, d = true) => (b?.[k] === undefined ? d : !!b[k]);

/* ---------------- page hero ---------------- */
export function PageHeroBlock({ locale: L, b }: BlockProps) {
  const { messages, foundation } = useSite();
  const lines = [px(b, "titleLine1", L), px(b, "titleLine2", L)].filter(Boolean);
  const useMsg = String(b?.useMessage || "");
  const title = useMsg === "oneStatement" ? [messages.oneStatement[L]] : lines.length ? lines : [px(b, "title", L, "")];
  const lead = String(b?.useLead || "") === "star" ? foundation.star[L] : px(b, "lead", L, "");
  return (
    <section className="dark page-hero">
      {bool(b, "showBlades") && <Blades className="page-hero__blades" tone="ink" />}
      <div className="wrap" style={{ position: "relative" }}>
        <p className="eyebrow" style={{ marginTop: 8 }} data-reveal>{px(b, "eyebrow", L, "")}</p>
        <Lines as="h1" className="h1" lines={title} />
        {lead && <p className="lead" data-reveal style={{ ["--d" as string]: 300 }}>{lead}</p>}
      </div>
    </section>
  );
}

/* ---------------- CTA band ---------------- */
export function CtaBandBlock({ locale: L, b }: BlockProps) {
  const { messages } = useSite();
  const title = String(b?.useTitle || "") === "essence" ? messages.essence[L] : px(b, "title", L, "");
  const text = px(b, "text", L, "");
  return (
    <section className={`${tone(b, "graphite")} section--tight cta-band`}>
      <div className="wrap cta-band__inner">
        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          <h2 className="h2" data-reveal>{title}</h2>
          {text && <p className="lead" style={{ opacity: 0.8 }} data-reveal>{text}</p>}
        </div>
        <div data-reveal>
          <Magnetic>
            <Link href={localePath(L, String(b?.ctaHref || "/contact"))} className="btn">
              {px(b, "ctaLabel", L, ui("diagnose", L))} <Arrow />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

/* ---------------- about: intro statement ---------------- */
export function AboutIntroBlock({ locale: L, b }: BlockProps) {
  const { settings, messages } = useSite();
  const company = settings.company;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className={`wrap ${s.intro}`}>
        <div data-reveal>
          <span className="eyebrow">{px(b, "eyebrow", L, "WHO WE ARE")}</span>
          <h2 className="h2">{px(b, "title", L, company.name[L])}</h2>
          <p className="lead muted">{px(b, "sub", L, `${company.parent[L]} — ${company.country[L]}`)}</p>
        </div>
        <div className={s.statement} data-reveal>
          <p className={s.big}>{px(b, "p1", L, t("نحن لا نرى الطلب رقمًا يخرج من المستودع. نراه وعدًا تجاريًا بدأ قبل أن يصل إلينا.", "We don't see an order as a number leaving the warehouse. We see it as a commercial promise that began before it reached us."))}</p>
          <p>{px(b, "p2", L, t("لهذا لا نقيس عملنا بعدد الشحنات فقط، بل بقدرة العميل على أن يبيع أكثر دون أن يزيد التعقيد بنفس السرعة. نربط ما يتفرق عادةً: المخزون، الطلب، التنفيذ، الناقل، المرتجع، والمعلومة.", "That's why we don't measure our work by shipments alone, but by our client's ability to sell more without complexity growing at the same pace. We connect what is usually scattered: stock, order, execution, carrier, return and information."))}</p>
          <p className="accent" style={{ fontWeight: 600 }}>{px(b, "p3", L, `${messages.bigIdea2[L]} ${t("لأننا نجعل حركتها جاهزة.", "because we make its movement ready.")}`)}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- operating layers (4 layers list) ---------------- */
export function OperatingLayersBlock({ locale: L, b }: BlockProps) {
  const { operatingLayers, messages } = useSite();
  return (
    <section className={`section ${tone(b, "dark")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "CATEGORY")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, messages.category[L])}</h2>
          <p className="lead muted" data-reveal>{px(b, "lead", L, "")}</p>
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
        {px(b, "note", L, "") && <p className={s.note} data-reveal>{px(b, "note", L, "")}</p>}
      </div>
    </section>
  );
}

/* ---------------- brand redefinitions ---------------- */
export function RedefinitionsBlock({ locale: L, b }: BlockProps) {
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  const items = (b?.items as { from: Record<string, string>; to: Record<string, string>; text: Record<string, string> }[] | undefined) ?? [
    { from: { ar: "اللوجستيات ليست نقلًا", en: "Logistics isn't transport" }, to: { ar: "اللوجستيات هي تمكين الأعمال", en: "Logistics is business enablement" }, text: { ar: "النقل نتيجة ظاهرة لعملية أعمق: قرار متى، وأين، وكم، وبأي تسلسل. من يرى النقل فقط يبيع حركة. من يرى القرار يبيع قدرة.", en: "Transport is the visible result of a deeper process: deciding when, where, how much and in what sequence. Those who see only transport sell movement; those who see the decision sell capability." } },
    { from: { ar: "المستودعات ليست مبانٍ", en: "Warehouses aren't buildings" }, to: { ar: "المستودعات بنية نمو", en: "Warehouses are growth infrastructure" }, text: { ar: "المتر المربع لا يعني شيئًا بذاته. ما يعنيه هو: كم طلبًا إضافيًا يستطيع العميل قبوله غدًا دون أن يوقّع عقدًا جديدًا أو يوظّف فريقًا جديدًا.", en: "A square metre means nothing on its own. What matters is how many additional orders the client can accept tomorrow without a new contract or a new team." } },
    { from: { ar: "العمليات ليست إجراءات", en: "Operations aren't procedures" }, to: { ar: "العمليات ثقة في حالة حركة", en: "Operations are trust in motion" }, text: { ar: "كل شحنة تخرج في وقتها هي وعدٌ وُفي به، وكل رقم جرد صحيح هو أمانة حُفظت.", en: "Every shipment that leaves on time is a promise kept; every correct count is a trust preserved." } },
  ];
  return (
    <section className={`section ${tone(b, "paper")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "BRAND PHILOSOPHY")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, t("ثلاث إعادات تعريف تحكم كيف تفكّر جديان.", "Three redefinitions govern how Jedyan thinks."))}</h2>
        </div>
        <ul className={s.redefs}>
          {items.map((r, i) => (
            <li key={i} data-reveal style={{ ["--d" as string]: i * 90 }}>
              <span className={s.from}>{r.from?.[L]}</span>
              <strong className={s.to}>{r.to?.[L]}</strong>
              <p>{r.text?.[L]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- quality & compliance ---------------- */
export function QualityBlock({ locale: L, b }: BlockProps) {
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  const items = (b?.items as { title: Record<string, string>; text: Record<string, string> }[] | undefined) ?? [
    { title: { ar: "ضبط الجودة", en: "Quality control" }, text: { ar: "نقاط فحص محددة داخل العملية.", en: "Defined checkpoints inside the process." } },
    { title: { ar: "تقليل المخاطر التشغيلية", en: "Operational risk reduction" }, text: { ar: "معالجة الانحراف قبل أن يصل للعميل.", en: "Deviations handled before they reach the client." } },
    { title: { ar: "حماية الشحنات", en: "Shipment protection" }, text: { ar: "التغليف والمناولة وفق حدود الوزن والأبعاد.", en: "Packaging and handling within weight and dimension limits." } },
    { title: { ar: "استمرارية الأعمال", en: "Business continuity" }, text: { ar: "إجراءات بديلة عند تغيّر الظرف التشغيلي.", en: "Fallback procedures when operating conditions change." } },
    { title: { ar: "الالتزام بالأنظمة", en: "Regulatory compliance" }, text: { ar: "التوافق مع المتطلبات النظامية في المملكة.", en: "Alignment with regulatory requirements in the Kingdom." } },
  ];
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "QUALITY & COMPLIANCE")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, t("الانضباط ليس إجراءً إضافيًا — بل شرط استمرار.", "Discipline isn't an extra step — it's a condition for continuity."))}</h2>
          <p className="lead muted" data-reveal>{px(b, "lead", L, "")}</p>
        </div>
        <ul className={s.quality}>
          {items.map((q, i) => (
            <li key={i} data-reveal style={{ ["--d" as string]: i * 60 }}>
              <strong>{q.title?.[L]}</strong>
              <p>{q.text?.[L]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- star note ---------------- */
export function StarNoteBlock({ locale: L, b }: BlockProps) {
  const { foundation } = useSite();
  return (
    <section className={`section--tight ${tone(b, "tint")}`}>
      <div className="wrap">
        <p className={s.star} data-reveal>{px(b, "text", L, foundation.star[L])}</p>
      </div>
    </section>
  );
}

/* ---------------- vision / mission / purpose / promise ---------------- */
export function VisionMissionBlock({ locale: L, b }: BlockProps) {
  const { foundation, messages } = useSite();
  const cell = (eyebrow: string, text: string, note?: string, delay = 0) => (
    <div data-reveal style={{ ["--d" as string]: delay }}>
      <span className="eyebrow">{eyebrow}</span>
      <p className={s.vmText}>{text}</p>
      {note && <p className="muted">{note}</p>}
    </div>
  );
  return (
    <section className={`section ${tone(b, "dark")}`}>
      <div className="wrap">
        <div className={s.vm}>
          {cell("VISION", foundation.vision[L], px(b, "note", L, ""))}
          {cell("MISSION", foundation.mission[L], undefined, 120)}
        </div>
        <div className={s.vm} style={{ marginTop: 24 }}>
          {cell("PURPOSE", foundation.purpose[L])}
          {cell("PROMISE", messages.promise[L], undefined, 120)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- values ---------------- */
export function ValuesBlock({ locale: L, b }: BlockProps) {
  const { foundation } = useSite();
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "VALUES")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, t("خمس قيم مكتوبة كسلوك — لا كصفات.", "Values written as behaviour — not adjectives."))}</h2>
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
  );
}

/* ---------------- brand pillars ---------------- */
export function PillarsBlock({ locale: L, b }: BlockProps) {
  const { foundation, messages } = useSite();
  const title = String(b?.useTitle || "") === "essence" ? messages.essence[L] : px(b, "title", L, "");
  return (
    <section className={`section ${tone(b, "graphite")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "BRAND PILLARS")}</span>
          <h2 className="h2" data-reveal>{title}</h2>
          {px(b, "lead", L, "") && <p className="lead muted" data-reveal>{px(b, "lead", L, "")}</p>}
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
  );
}

/* ---------------- operating rhythm ---------------- */
export function RhythmBlock({ locale: L, b }: BlockProps) {
  const { rhythm } = useSite();
  return (
    <section className={`section ${tone(b, "tint")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "OPERATING RHYTHM")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2>
        </div>
        <ul className={s.rhythm}>
          {rhythm.map((r, i) => (
            <li key={r.en} data-reveal style={{ ["--d" as string]: i * 80 }}>
              <span className="mono">{r.en}</span>
              <strong>{r.label[L]}</strong>
              <p>{r.text[L]}</p>
            </li>
          ))}
        </ul>
        {px(b, "note", L, "") && <p className={s.star} style={{ marginTop: 40 }} data-reveal>{px(b, "note", L, "")}</p>}
      </div>
    </section>
  );
}

/* ---------------- scalability modes ---------------- */
export function ScaleModesBlock({ locale: L, b }: BlockProps) {
  const { scaleModes } = useSite();
  return (
    <section className={`section ${tone(b, "dark")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "SCALABILITY & FLEXIBILITY")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2>
          {px(b, "lead", L, "") && <p className="lead muted" data-reveal>{px(b, "lead", L, "")}</p>}
        </div>
        <ol className={s.scale}>
          {scaleModes.map((m, i) => (
            <li key={m.en} style={{ ["--i" as string]: i }} data-reveal>
              <span className="mono">{m.en}</span>
              <strong>{m.label[L]}</strong>
              <p>{m.text[L]}</p>
            </li>
          ))}
        </ol>
        {px(b, "note", L, "") && <p className={s.note} data-reveal>{px(b, "note", L, "")}</p>}
      </div>
    </section>
  );
}

/* ---------------- carrier orchestration visual ---------------- */
export function CarrierBlock({ locale: L, b }: BlockProps) {
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">{px(b, "eyebrow", L, "CARRIER MANAGEMENT")}</span>
          <h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2>
          {px(b, "lead", L, "") && <p className="lead muted" data-reveal>{px(b, "lead", L, "")}</p>}
        </div>
        <div data-reveal><CarrierVisual locale={L} /></div>
      </div>
    </section>
  );
}

/* ---------------- solutions index list ---------------- */
export function SolutionsIndexBlock({ locale: L, b }: BlockProps) {
  const { solutions } = useSite();
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap">
        <ol className={si.list}>
          {solutions.map((x) => (
            <li key={x.slug} className={si.row} data-reveal>
              <Link href={localePath(L, `/solutions/${x.slug}`)} className={si.link}>
                <span className={si.n}>{x.n}</span>
                <span className={si.main}>
                  <span className="mono">{x.en.toUpperCase()}</span>
                  <strong className={si.title}>{x.title[L]}</strong>
                  <span className={si.headline}>{x.headline[L]}</span>
                  <span className={si.scope}>{x.scope.slice(0, 5).map((sc, k) => <span key={k}>{sc[L]}</span>)}</span>
                </span>
                <Glyph type={x.visual} className={si.glyph} />
                <span className={si.go}>{ui("explore", L)} <span aria-hidden="true">→</span></span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- contact + diagnosis ---------------- */
export function ContactBlock({ locale: L, b }: BlockProps) {
  const { diagnosis, settings } = useSite();
  const company = settings.company;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  const steps = (b?.steps as Record<string, string>[] | undefined)?.map((x) => (x && typeof x === "object" && "label" in x ? (x.label as unknown as Record<string, string>) : x)) ?? [
    { ar: "نراجع شكل طلبك وقنواتك", en: "We review your order profile and channels" },
    { ar: "جلسة تشخيص مع فريق التشغيل", en: "A diagnosis session with operations" },
    { ar: "تصوّر تشغيلي أولي: العملية، السعة، التسعير", en: "An initial model: process, capacity, pricing" },
  ];
  return (
    <section className={c.page}>
      <div className={`dark ${c.side}`}>
        <Blades className={c.blades} tone="ink" />
        <div className={c.sideInner}>
          <p className="eyebrow" data-reveal>{px(b, "eyebrow", L, "CONTACT · DIAGNOSIS")}</p>
          <Lines as="h1" className="h1" lines={[px(b, "title", L, diagnosis.title[L])]} />
          <p className="lead" style={{ opacity: 0.8 }} data-reveal>{px(b, "sub", L, diagnosis.sub[L])}</p>
          <ul className={c.direct}>
            <li><span className="muted">{t("البريد الإلكتروني", "Email")}</span><a href={`mailto:${company.email}`} className="latin">{company.email}</a></li>
            <li><span className="muted">{t("الهاتف", "Phone")}</span><a href={`tel:${company.phoneHref}`} dir="ltr">{company.phoneDisplay}</a></li>
            <li><span className="muted">{t("الموقع", "Location")}</span><span>{company.address?.[L] || company.country[L]}</span></li>
          </ul>
          <ol className={c.next}>
            {steps.map((x, i) => <li key={i}><span className="mono">{String(i + 1).padStart(2, "0")}</span>{x[L]}</li>)}
          </ol>
        </div>
      </div>
      <div className={c.formCol}>
        <DiagnosticForm locale={L} />
      </div>
    </section>
  );
}

/* ---------------- generic blocks for new pages ---------------- */
export function RichTextBlock({ locale: L, b }: BlockProps) {
  const body = px(b, "body", L, "").split("\n").filter(Boolean);
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap" style={{ display: "grid", gap: 20, maxWidth: 860 }}>
        {px(b, "eyebrow", L, "") && <span className="eyebrow">{px(b, "eyebrow", L, "")}</span>}
        {px(b, "title", L, "") && <h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2>}
        {body.map((p, i) => <p key={i} className={i === 0 ? "lead" : ""} data-reveal style={{ ["--d" as string]: i * 60 }}>{p}</p>)}
      </div>
    </section>
  );
}

export function FeatureGridBlock({ locale: L, b }: BlockProps) {
  const items = (b?.items as { title: Record<string, string>; text: Record<string, string>; en?: string }[] | undefined) ?? [];
  return (
    <section className={`section ${tone(b, "paper")}`}>
      <div className="wrap">
        <div className="section-head">
          {px(b, "eyebrow", L, "") && <span className="eyebrow">{px(b, "eyebrow", L, "")}</span>}
          {px(b, "title", L, "") && <h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2>}
          {px(b, "lead", L, "") && <p className="lead muted" data-reveal>{px(b, "lead", L, "")}</p>}
        </div>
        <ul className={s.quality}>
          {items.map((it, i) => (
            <li key={i} data-reveal style={{ ["--d" as string]: i * 60 }}>
              {it.en && <span className="mono accent">{it.en}</span>}
              <strong>{it.title?.[L]}</strong>
              <p>{it.text?.[L]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function MediaTextBlock({ locale: L, b }: BlockProps) {
  const img = String(b?.image || "");
  const side = String(b?.imageSide || "end");
  const body = px(b, "body", L, "").split("\n").filter(Boolean);
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap split" style={{ alignItems: "center" }}>
        <div style={{ display: "grid", gap: 14, order: side === "start" ? 2 : 1 }}>
          {px(b, "eyebrow", L, "") && <span className="eyebrow">{px(b, "eyebrow", L, "")}</span>}
          <h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2>
          {body.map((p, i) => <p key={i} data-reveal style={{ ["--d" as string]: i * 60 }}>{p}</p>)}
        </div>
        <div data-reveal style={{ order: side === "start" ? 1 : 2 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {img && <img src={img} alt={px(b, "alt", L, "")} style={{ width: "100%", borderRadius: "var(--radius)" }} loading="lazy" />}
        </div>
      </div>
    </section>
  );
}

export function QuoteBlock({ locale: L, b }: BlockProps) {
  return (
    <section className={`section--tight ${tone(b, "graphite")}`}>
      <div className="wrap" style={{ display: "grid", gap: 16, maxWidth: 900 }}>
        <p style={{ fontSize: "var(--fs-h2)", fontWeight: 600, lineHeight: 1.4 }} data-reveal>«{px(b, "text", L, "")}»</p>
        {px(b, "source", L, "") && <p className="muted">{px(b, "source", L, "")}</p>}
      </div>
    </section>
  );
}

export function GalleryBlock({ locale: L, b }: BlockProps) {
  const images = (b?.images as string[] | undefined) ?? [];
  return (
    <section className={`section ${tone(b, "white")}`}>
      <div className="wrap">
        {px(b, "title", L, "") && <div className="section-head"><h2 className="h2" data-reveal>{px(b, "title", L, "")}</h2></div>}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="" loading="lazy" data-reveal style={{ width: "100%", borderRadius: "var(--radius)", ["--d" as string]: i * 60 } as CSSProperties} />
          ))}
        </div>
      </div>
    </section>
  );
}
