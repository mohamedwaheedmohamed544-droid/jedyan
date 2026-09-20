"use client";
import { useEffect, useState, type CSSProperties } from "react";
import type { Locale } from "@/content/types";
import { useInView } from "@/lib/hooks";
import s from "./Visuals.module.css";

const reduce = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function useCycle(n: number, ms: number, run: boolean, hold: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!run || hold || reduce()) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [n, ms, run, hold]);
  return [i, setI] as const;
}

/* ---------------- Warehousing: a live bin map ---------------- */
const BIN_STATES = [
  { k: "available", ar: "متاح", en: "Available" },
  { k: "reserved", ar: "محجوز", en: "Reserved" },
  { k: "returned", ar: "مرتجع", en: "Returned" },
  { k: "damaged", ar: "تالف", en: "Damaged" },
] as const;
const binState = (i: number) => (i % 11 === 3 ? 1 : i % 17 === 5 ? 2 : i % 23 === 9 ? 3 : 0);

export function BinsVisual({ locale }: { locale: Locale }) {
  const L = locale;
  const [ref, inView] = useInView<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const [scan, setScan] = useCycle(48, 900, inView, hover !== null);
  const cur = hover ?? scan;
  const st = BIN_STATES[binState(cur)];
  const loc = `A${String(Math.floor(cur / 8) + 1).padStart(2, "0")}-${String((cur % 8) + 1).padStart(2, "0")}`;
  return (
    <div ref={ref} className={s.frame}>
      <div className={s.frameHead}><span className="mono">WMS · BIN MAP</span><span className={s.pill}>{L === "ar" ? "تصوّر توضيحي" : "Illustrative"}</span></div>
      <div className={s.bins} onMouseLeave={() => setHover(null)}>
        {Array.from({ length: 48 }, (_, i) => (
          <button key={i} type="button" aria-label={`BIN ${i + 1}`} className={`${s.bin} ${s[BIN_STATES[binState(i)].k]} ${i === cur ? s.binOn : ""}`} onMouseEnter={() => setHover(i)} onFocus={() => setHover(i)} onClick={() => setScan(i)} />
        ))}
      </div>
      <div className={s.readout} aria-live="polite">
        <div><span className={s.k}>{L === "ar" ? "الموقع" : "Location"}</span><span className="mono">{loc}</span></div>
        <div><span className={s.k}>SKU</span><span className="mono">JD-{(4100 + cur * 7).toString()}</span></div>
        <div><span className={s.k}>{L === "ar" ? "الحالة" : "Status"}</span><strong>{L === "ar" ? st.ar : st.en}</strong></div>
      </div>
      <ul className={s.legend}>
        {BIN_STATES.map((b) => <li key={b.k}><i className={s[b.k]} />{L === "ar" ? b.ar : b.en}</li>)}
      </ul>
    </div>
  );
}

/* ---------------- Fulfillment: the order line ---------------- */
export function FlowVisual({ locale }: { locale: Locale }) {
  const L = locale;
  const [mode, setMode] = useState<"b2c" | "b2b">("b2c");
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step] = useCycle(4, 1400, inView, false);
  const stations = L === "ar" ? ["الطلب", "انتقاء", "تغليف", "إرسال"] : ["Order", "Pick", "Pack", "Dispatch"];
  const note = mode === "b2c"
    ? (L === "ar" ? "طلبات أفراد بأحجام صغيرة وتكرار عالٍ — التغليف والتجربة يصنعان الفرق." : "Individual orders, small sizes, high frequency — packaging and experience make the difference.")
    : (L === "ar" ? "طلبات جملة بأحجام أكبر — التوثيق ومطابقة الكميات يصنعان الفرق." : "Bulk orders, larger volumes — documentation and quantity matching make the difference.");
  return (
    <div ref={ref} className={s.frame} style={{ "--step": step } as CSSProperties}>
      <div className={s.frameHead}>
        <span className="mono">FULFILLMENT LINE</span>
        <div className={s.toggle} role="group" aria-label={L === "ar" ? "نوع الطلب" : "Order type"}>
          {(["b2c", "b2b"] as const).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} className={mode === m ? s.tOn : ""} onClick={() => setMode(m)}>{m.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div className={s.line}>
        <span className={s.belt} aria-hidden="true"><i /></span>
        {stations.map((x, i) => (
          <div key={x} className={`${s.station} ${i === step ? s.stOn : ""} ${i < step ? s.stDone : ""}`}>
            <span className={s.stIcon}>
              {mode === "b2c" ? (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect x="3" y="6" width="8" height="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="13" y="6" width="8" height="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="8" y="13" width="8" height="7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
              )}
            </span>
            <strong>{x}</strong>
            <span className="mono">{["ORDER", "PICK", "PACK", "DISPATCH"][i]}</span>
          </div>
        ))}
      </div>
      <p className={s.caption} key={mode}>{note}</p>
    </div>
  );
}

/* ---------------- Commerce Connect: events in, status out ---------------- */
const EVENTS = ["order.created", "order.cancelled", "order.fulfilled", "order.returned"];
export function ConnectVisual({ locale }: { locale: Locale }) {
  const L = locale;
  const [ref, inView] = useInView<HTMLDivElement>();
  const [ev, setEv] = useCycle(EVENTS.length, 2000, inView, false);
  const channels = L === "ar" ? ["متجر إلكتروني", "تطبيق", "منصات البيع", "نظام العميل"] : ["Online store", "App", "Marketplaces", "Client system"];
  const back = L === "ar" ? ["المخزون المتاح", "حالة الطلب", "رقم التتبع", "حالة المرتجع"] : ["Available stock", "Order status", "Tracking number", "Return status"];
  return (
    <div ref={ref} className={s.frame}>
      <div className={s.frameHead}><span className="mono">COMMERCE CONNECT · EVENT MAP</span><span className={s.pill}>{L === "ar" ? "النطاق يُحدَّد لكل حساب" : "Scoped per account"}</span></div>
      <div className={s.connect}>
        <ul className={s.channels}>
          {channels.map((c, i) => <li key={c} className={i === ev ? s.chOn : ""}>{c}</li>)}
        </ul>
        <div className={s.pipe} aria-hidden="true">
          <svg viewBox="0 0 200 200" preserveAspectRatio="none">
            {[25, 75, 125, 175].map((y, i) => (
              <path key={y} d={`M0 ${y} C 90 ${y}, 110 100, 200 100`} className={i === ev ? s.pOn : s.p} />
            ))}
          </svg>
        </div>
        <div className={s.hub}>
          <span className="latin">JEDYAN</span>
          <span className="mono" key={ev}>{EVENTS[ev]}</span>
        </div>
      </div>
      <div className={s.eventRow} role="group" aria-label={L === "ar" ? "أحداث الطلب" : "Order events"}>
        {EVENTS.map((e, i) => <button type="button" key={e} className={`mono ${i === ev ? s.evOn : ""}`} onClick={() => setEv(i)} aria-pressed={i === ev}>{e}</button>)}
      </div>
      <p className={s.caption}>{L === "ar" ? "يعود إلى القناة:" : "Returned to the channel:"} <strong>{back[ev]}</strong></p>
    </div>
  );
}

/* ---------------- Carrier management: decision network ---------------- */
type Scenario = { id: string; label: { ar: string; en: string }; rule: { ar: string; en: string }; carrier: number; exception: boolean };
const SCENARIOS: Scenario[] = [
  { id: "express", label: { ar: "مدينة رئيسية · سريع", en: "Major city · Express" }, rule: { ar: "القاعدة: مستوى الخدمة أولًا", en: "Rule: service level first" }, carrier: 0, exception: false },
  { id: "standard", label: { ar: "مدينة أخرى · قياسي", en: "Other city · Standard" }, rule: { ar: "القاعدة: التغطية والتكلفة", en: "Rule: coverage and cost" }, carrier: 1, exception: false },
  { id: "b2b", label: { ar: "تزويد فرع · B2B", en: "Branch replenishment · B2B" }, rule: { ar: "القاعدة: الحجم والموعد", en: "Rule: volume and schedule" }, carrier: 2, exception: false },
  { id: "failed", label: { ar: "تعذّر التسليم", en: "Failed delivery" }, rule: { ar: "القاعدة: معالجة الاستثناء", en: "Rule: exception handling" }, carrier: 1, exception: true },
];

export function CarrierVisual({ locale }: { locale: Locale }) {
  const L = locale;
  const [sc, setSc] = useState(0);
  const cur = SCENARIOS[sc];
  const cy = [60, 150, 240];
  const carriers = L === "ar" ? ["ناقل أ", "ناقل ب", "ناقل ج"] : ["Carrier A", "Carrier B", "Carrier C"];
  const y = cy[cur.carrier];
  return (
    <div className={s.frame}>
      <div className={s.frameHead}>
        <span className="mono">CARRIER ORCHESTRATION</span>
        <span className={s.pill}>{L === "ar" ? "نملك القرار على المسار" : "We own the routing decision"}</span>
      </div>
      <div className={s.scenarios} role="radiogroup" aria-label={L === "ar" ? "اختر حالة" : "Choose a scenario"}>
        {SCENARIOS.map((x, i) => (
          <button key={x.id} type="button" role="radio" aria-checked={i === sc} className={i === sc ? s.scOn : ""} onClick={() => setSc(i)}>{x.label[L]}</button>
        ))}
      </div>
      <div className={s.netWrap}>
        <svg viewBox="0 0 760 300" className={s.net} role="img" aria-label={`${cur.label[L]} — ${cur.rule[L]}`}>
          <g className={s.netBase}>
            {cy.map((yy) => <path key={yy} d={`M170 150 C 250 150, 260 ${yy}, 330 ${yy}`} />)}
            {cy.map((yy) => <path key={`o${yy}`} d={`M420 ${yy} C 480 ${yy}, 500 150, 560 150`} />)}
            <path d="M650 150 L 720 90" /><path d="M650 150 L 720 210" />
          </g>
          <g className={s.netHot} key={sc}>
            <path d="M60 150 H170" />
            <path d={`M170 150 C 250 150, 260 ${y}, 330 ${y}`} />
            <path d={`M420 ${y} C 480 ${y}, 500 150, 560 150`} />
            <path d={cur.exception ? "M650 150 L 720 210" : "M650 150 L 720 90"} className={cur.exception ? s.exc : ""} />
          </g>
          <g className={s.nodes}>
            <g transform="translate(60 150)"><circle r="30" className={s.nOrder} /><text y="5">{L === "ar" ? "الطلب" : "Order"}</text></g>
            <g transform="translate(170 150)"><rect x="-36" y="-22" width="72" height="44" rx="10" className={s.nRule} /><text y="5">{L === "ar" ? "القرار" : "Decide"}</text></g>
            {cy.map((yy, i) => (
              <g key={yy} transform={`translate(375 ${yy})`} className={i === cur.carrier ? s.nOn : ""}>
                <rect x="-45" y="-20" width="90" height="40" rx="20" /><text y="5">{carriers[i]}</text>
              </g>
            ))}
            <g transform="translate(605 150)"><rect x="-45" y="-22" width="90" height="44" rx="10" className={s.nRule} /><text y="5">{L === "ar" ? "التتبّع" : "Tracking"}</text></g>
            <g transform="translate(720 90)" className={!cur.exception ? s.nOn : ""}><circle r="26" /><text y="5" className={s.small}>{L === "ar" ? "تسليم" : "Delivered"}</text></g>
            <g transform="translate(720 210)" className={cur.exception ? s.nExc : ""}><circle r="26" /><text y="5" className={s.small}>{L === "ar" ? "استثناء" : "Exception"}</text></g>
          </g>
        </svg>
      </div>
      <div className={s.decision} aria-live="polite" key={`d${sc}`}>
        <span className="mono">{cur.rule.en.toUpperCase()}</span>
        <p>
          {cur.exception
            ? (L === "ar" ? "يُرصد التعثّر، يُبلَّغ العميل، وتُطلق إعادة المحاولة أو الإرجاع وفق إجراء موثّق." : "The failure is detected, the client is notified, and a re-attempt or return starts under a documented procedure.")
            : (L === "ar" ? `${cur.rule.ar} — تُسلَّم الشحنة إلى ${carriers[cur.carrier]} وتُتابع حالتها حتى التسليم.` : `${cur.rule.en} — the shipment is handed to ${carriers[cur.carrier]} and tracked to delivery.`)}
        </p>
      </div>
    </div>
  );
}

/* ---------------- Returns: decision tree ---------------- */
export function ReturnsVisual({ locale }: { locale: Locale }) {
  const L = locale;
  const [ok, setOk] = useState(true);
  const steps = L === "ar" ? ["استلام", "فحص", "تقييم", "إعادة معالجة", "قرار"] : ["Receive", "Inspect", "Evaluate", "Reprocess", "Decision"];
  return (
    <div className={s.frame}>
      <div className={s.frameHead}>
        <span className="mono">RETURNS · DECISION FLOW</span>
        <div className={s.toggle} role="group" aria-label={L === "ar" ? "حالة الصنف" : "Item condition"}>
          <button type="button" aria-pressed={ok} className={ok ? s.tOn : ""} onClick={() => setOk(true)}>{L === "ar" ? "صالح للبيع" : "Saleable"}</button>
          <button type="button" aria-pressed={!ok} className={!ok ? s.tOn : ""} onClick={() => setOk(false)}>{L === "ar" ? "غير صالح" : "Unsaleable"}</button>
        </div>
      </div>
      <ol className={s.rSteps}>
        {steps.map((x, i) => <li key={x} style={{ "--i": i } as CSSProperties}><i /> {x}</li>)}
      </ol>
      <div className={s.outcomes}>
        <div className={ok ? s.outOn : s.outOff}>
          <span className="mono">RESTOCK</span>
          <strong>{L === "ar" ? "إعادة إلى المخزون القابل للبيع" : "Back to saleable stock"}</strong>
        </div>
        <div className={!ok ? s.outOn : s.outOff}>
          <span className="mono">SEGREGATE</span>
          <strong>{L === "ar" ? "فصل الأصناف غير الصالحة" : "Segregate unsaleable items"}</strong>
        </div>
        <div className={s.outAlways}>
          <span className="mono">REPORT</span>
          <strong>{L === "ar" ? "توثيق السبب في التقرير" : "Reason documented in reporting"}</strong>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Enterprise: one layer between client and execution ---------------- */
export function TowerVisual({ locale }: { locale: Locale }) {
  const L = locale;
  const [on, setOn] = useState<number | null>(null);
  const exec = L === "ar" ? ["المستودع", "تنفيذ الطلبات", "الناقلون", "المرتجعات", "التقارير"] : ["Warehouse", "Fulfillment", "Carriers", "Returns", "Reporting"];
  return (
    <div className={s.frame}>
      <div className={s.frameHead}><span className="mono">ENTERPRISE MANAGED LOGISTICS</span></div>
      <div className={s.tower}>
        <div className={s.tClient}>
          <span className="mono">CLIENT</span>
          <strong>{L === "ar" ? "العميل — المنتج، الطلب، الوعد التجاري" : "Client — product, demand, commercial promise"}</strong>
        </div>
        <div className={s.tLayer}>
          <span className="mono">JEDYAN OPERATING LAYER</span>
          <strong>{L === "ar" ? "قرار واحد · مسؤولية واحدة · تقرير واحد" : "One decision · one accountability · one report"}</strong>
        </div>
        <ul className={s.tExec} onMouseLeave={() => setOn(null)}>
          {exec.map((x, i) => (
            <li key={x} tabIndex={0} onMouseEnter={() => setOn(i)} onFocus={() => setOn(i)} className={on === i ? s.tExecOn : ""}>{x}</li>
          ))}
        </ul>
      </div>
      <p className={s.caption}>{L === "ar" ? "العميل يبقى صاحب العلامة. جديان تبقى صاحبة التنفيذ." : "The client keeps the brand. Jedyan owns the execution."}</p>
    </div>
  );
}
