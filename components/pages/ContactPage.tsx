import type { Locale } from "@/content/types";
import { company, diagnosis } from "@/content/site";
import DiagnosticForm from "@/components/contact/DiagnosticForm";
import Blades from "@/components/ui/Blades";
import Lines from "@/components/ui/Lines";
import s from "./ContactPage.module.css";

export default function ContactPage({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <section className={s.page}>
      <div className={`dark ${s.side}`}>
        <Blades className={s.blades} tone="ink" />
        <div className={s.sideInner}>
          <p className="eyebrow" data-reveal>CONTACT · DIAGNOSIS</p>
          <Lines as="h1" className="h1" lines={[diagnosis.title[L]]} />
          <p className="lead" style={{ opacity: 0.8 }} data-reveal>{diagnosis.sub[L]}</p>
          <ul className={s.direct}>
            <li><span className="muted">{t("البريد الإلكتروني", "Email")}</span><a href={`mailto:${company.email}`} className="latin">{company.email}</a></li>
            <li><span className="muted">{t("الهاتف", "Phone")}</span><a href={`tel:${company.phoneHref}`} dir="ltr">{company.phoneDisplay}</a></li>
            <li><span className="muted">{t("الموقع", "Location")}</span><span>{company.country[L]}</span></li>
          </ul>
          <ol className={s.next}>
            <li><span className="mono">01</span>{t("نراجع شكل طلبك وقنواتك", "We review your order profile and channels")}</li>
            <li><span className="mono">02</span>{t("جلسة تشخيص مع فريق التشغيل", "A diagnosis session with operations")}</li>
            <li><span className="mono">03</span>{t("تصوّر تشغيلي أولي: العملية، السعة، التسعير", "An initial model: process, capacity, pricing")}</li>
          </ol>
        </div>
      </div>
      <div className={s.formCol}>
        <DiagnosticForm locale={L} />
      </div>
    </section>
  );
}
