import type { Locale } from "@/content/types";
import { rhythm, scaleModes } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import CommerceJourney from "@/components/home/CommerceJourney";
import HowWeWork from "@/components/home/HowWeWork";
import { CarrierVisual } from "@/components/solutions/Visuals";
import { ui } from "@/lib/ui";
import s from "./Content.module.css";

export default function HowWeWorkPage({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <>
      <PageHero locale={L} eyebrow="HOW WE WORK" title={[t("إيقاع تشغيلي متفق عليه —", "An agreed operating rhythm —"), t("لا مبادرات متفرقة.", "not scattered initiatives.")]} lead={t("نُدير رحلة الطلب كسلسلة مترابطة؛ كل مرحلة تؤثر فيما بعدها، لذلك تُحسم الكفاءة عند نقاط الانتقال بين المراحل بقدر ما تُحسم داخل كل مرحلة.", "We run the order journey as a connected chain; each stage affects the next, so efficiency is decided at the hand-offs as much as within each stage.")} crumbs={[{ href: "/how-we-work", label: t("كيف نعمل", "How we work") }]} />

      <CommerceJourney locale={L} />

      <HowWeWork locale={L} eyebrow="CLIENT JOURNEY" />

      <section className="section white">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">CARRIER MANAGEMENT</span>
            <h2 className="h2" data-reveal>{t("لا نملك الطريق — نملك القرار على مساره.", "We don't own the road — we own the decision on its route.")}</h2>
            <p className="lead muted" data-reveal>{t("اختر حالة لترى كيف يُتخذ القرار: من يشحن، وبأي مستوى خدمة، وما الإجراء إذا تعثّر التسليم.", "Pick a scenario to see how the decision is made: who ships, at what service level, and what happens if delivery fails.")}</p>
          </div>
          <div data-reveal><CarrierVisual locale={L} /></div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">OPERATING RHYTHM</span>
            <h2 className="h2" data-reveal>{t("ما يُتابع يوميًا، وما يُراجع دوريًا، وما يُقرّر معًا.", "What's tracked daily, reviewed periodically, and decided together.")}</h2>
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
          <p className={s.star} style={{ marginTop: 40 }} data-reveal>{t("المهم ليس عدد الاجتماعات — بل أن يعرف الطرفان الحقيقة نفسها في الوقت نفسه.", "What matters isn't the number of meetings — it's both sides knowing the same truth at the same time.")}</p>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">SCALABILITY & FLEXIBILITY</span>
            <h2 className="h2" data-reveal>{t("العملية التي تعمل اليوم يجب أن تستوعب نمو الغد.", "The process that works today must absorb tomorrow's growth.")}</h2>
            <p className="lead muted" data-reveal>{t("صُمّم النموذج التشغيلي على الصعود لا على الوزن: تتحرك السعة مع الطلب على مدى الشهر.", "The operating model is designed for the climb: capacity moves with demand across the month.")}</p>
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
          <p className={s.note} data-reveal>{t("التوسّع لا يعني بناء عملية جديدة — بل تمديد العملية نفسها.", "Scaling doesn't mean building a new operation — it means extending the same one.")}</p>
        </div>
      </section>

      <CtaBand locale={L} title={t("أرسل تفاصيل عملياتك.", "Send us your operation details.")} text={t("لا نبدأ بالسعر. نبدأ بفهم شكل الطلب.", "We don't start with price. We start by understanding your orders.")} cta={ui("sendDetails", L)} />
    </>
  );
}
