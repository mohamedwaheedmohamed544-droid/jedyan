"use client";
import { useMemo, useState } from "react";
import type { Locale } from "@/content/types";
import { useSite } from "@/components/SiteContext";
import Arrow from "@/components/ui/Arrow";
import s from "./DiagnosticForm.module.css";

type Answers = Record<string, number[]>;
type Contact = { name: string; company: string; email: string; phone: string; notes: string };



export default function DiagnosticForm({ locale }: { locale: Locale }) {
  const L = locale;
  const { diagnosis, settings } = useSite();
  const company = settings.company;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  const steps = diagnosis.steps;
  const total = steps.length + 1;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>({ name: "", company: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  const cur = steps[step];
  const pick = (id: string, i: number, multi: boolean) => {
    setAnswers((a) => {
      const prev = a[id] || [];
      const next = multi ? (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]) : [i];
      return { ...a, [id]: next };
    });
    if (!multi) window.setTimeout(() => setStep((v) => Math.min(total - 1, v + 1)), 260);
  };

  const summary = useMemo(
    () => steps.map((st) => ({ q: st.q[L], a: (answers[st.id] || []).map((i) => st.options[i][L]).join("، ") })).filter((x) => x.a),
    [answers, steps, L]
  );

  const validate = () => {
    const e: typeof errors = {};
    if (!contact.name.trim()) e.name = t("اكتب اسمك.", "Enter your name.");
    if (!contact.company.trim()) e.company = t("اكتب اسم الشركة.", "Enter your company name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = t("اكتب بريدًا إلكترونيًا صحيحًا، مثل name@company.sa", "Enter a valid email, e.g. name@company.sa");
    if (contact.phone && !/^[+\d\s-]{8,}$/.test(contact.phone)) e.phone = t("اكتب رقمًا صحيحًا بالأرقام فقط.", "Use digits only.");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("sending");
    const payload = { source: "contact", locale: L, contact, answers: summary, website: "" };
    let stored = false;
    try {
      const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      stored = res.ok;
    } catch { stored = false; }
    if (!stored) {
      const body = [
        `${t("الاسم", "Name")}: ${contact.name}`,
        `${t("الشركة", "Company")}: ${contact.company}`,
        `${t("البريد", "Email")}: ${contact.email}`,
        `${t("الهاتف", "Phone")}: ${contact.phone}`,
        "",
        ...summary.map((x) => `${x.q}\n— ${x.a}`),
        "",
        contact.notes,
      ].join("\n");
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(t("طلب تشخيص تشغيلي — ", "Operational diagnosis request — ") + contact.company)}&body=${encodeURIComponent(body)}`;
    }
    setState("done");
  };

  if (state === "done") {
    return (
      <div className={s.card} role="status">
        <span className="mono accent">RECEIVED</span>
        <h2 className="h3">{t("شكرًا، وصلتنا تفاصيل عمليتك.", "Thank you — we have your operation details.")}</h2>
        <p className="muted">{t("سيراجع فريق جديان شكل طلبك ويتواصل معك لترتيب جلسة التشخيص.", "The Jedyan team will review your order profile and contact you to arrange the diagnosis session.")}</p>
        {<p className="caption muted">{t("إذا لم يُفتح بريدك تلقائيًا، راسلنا على", "If your email app didn't open, write to")} <a href={`mailto:${company.email}`} className="accent latin">{company.email}</a></p>}
      </div>
    );
  }

  return (
    <form className={s.card} onSubmit={submit} noValidate>
      <div className={s.progress} aria-hidden="true">
        {Array.from({ length: total }, (_, i) => <i key={i} className={i <= step ? s.pOn : ""} />)}
      </div>
      <p className={`caption ${s.stepCount}`}>{t(`الخطوة ${step + 1} من ${total}`, `Step ${step + 1} of ${total}`)}</p>

      {step < steps.length ? (
        <fieldset className={s.fieldset} key={cur.id}>
          <legend className={s.q}>{cur.q[L]}</legend>
          {cur.multi && <p className="caption muted">{t("يمكنك اختيار أكثر من إجابة.", "Choose all that apply.")}</p>}
          <div className={s.options}>
            {cur.options.map((o, i) => {
              const on = (answers[cur.id] || []).includes(i);
              return (
                <label key={i} className={`${s.opt} ${on ? s.optOn : ""}`}>
                  <input id={`${cur.id}-${i}`} type={cur.multi ? "checkbox" : "radio"} name={cur.id} checked={on} onChange={() => pick(cur.id, i, cur.multi)} />
                  <span>{o[L]}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <fieldset className={s.fieldset}>
          <legend className={s.q}>{t("إلى من نرسل التصوّر التشغيلي؟", "Where should we send the operating model?")}</legend>
          <div className={s.fields}>
            {([
              ["name", t("الاسم", "Full name"), "text", "name"],
              ["company", t("الشركة", "Company"), "text", "organization"],
              ["email", t("البريد الإلكتروني", "Work email"), "email", "email"],
              ["phone", t("رقم الجوال (اختياري)", "Mobile (optional)"), "tel", "tel"],
            ] as const).map(([k, label, type, ac]) => (
              <div key={k} className={s.field}>
                <label htmlFor={`f-${k}`}>{label}</label>
                <input id={`f-${k}`} type={type} autoComplete={ac} value={contact[k]} dir={type === "email" || type === "tel" ? "ltr" : undefined} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined} onChange={(e) => setContact({ ...contact, [k]: e.target.value })} />
                {errors[k] && <span id={`e-${k}`} className={s.err}>{errors[k]}</span>}
              </div>
            ))}
            <div className={`${s.field} ${s.full}`}>
              <label htmlFor="f-notes">{t("أي تفاصيل إضافية (المواسم، عدد الأصناف، متطلبات خاصة)", "Anything else (seasons, SKU count, special requirements)")}</label>
              <textarea id="f-notes" rows={3} value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} />
            </div>
          </div>
          {summary.length > 0 && (
            <div className={s.summary}>
              <span className="caption muted">{t("ملخص إجاباتك", "Your answers")}</span>
              <ul>{summary.map((x) => <li key={x.q}><span>{x.q}</span><strong>{x.a}</strong></li>)}</ul>
            </div>
          )}
        </fieldset>
      )}

      <div className={s.nav}>
        <button type="button" className={`btn btn--ghost btn--sm ${s.back}`} onClick={() => setStep((v) => Math.max(0, v - 1))} disabled={step === 0}>
          {t("السابق", "Back")}
        </button>
        {step < steps.length ? (
          <button type="button" className="btn btn--ink" onClick={() => setStep((v) => v + 1)}>
            {(answers[cur.id] || []).length ? t("التالي", "Next") : t("تخطَّ", "Skip")} <Arrow />
          </button>
        ) : (
          <button type="submit" className="btn" disabled={state === "sending"}>
            {t("أرسل طلب التشخيص", "Send diagnosis request")} <Arrow />
          </button>
        )}
      </div>
    </form>
  );
}
