/**
 * JEDYAN — site content.
 * Source of truth: JEDYAN_COMPANY_PROFILE_2026 + JEDYAN_BRAND_BLUEPRINT_V6.
 * Rule: nothing here may state a capability, figure, partner or integration that the
 * source files do not confirm. Items the Blueprint marks as "capability map" are worded
 * as scoped-per-account, never as live connectors.
 */
import type { T } from "./types";

export const SITE_URL = "https://jedyan.sa";

export const company = {
  name: { ar: "جديان للخدمات اللوجستية", en: "Jedyan Logistics" },
  parent: { ar: "إحدى شركات صقر الجديان القابضة", en: "A Saqr Al-Jedyan Holding company" },
  country: { ar: "المملكة العربية السعودية", en: "Kingdom of Saudi Arabia" },
  email: "info@jedyan.sa",
  phoneDisplay: "+966 53 369 0167",
  phoneHref: "+966533690167",
  web: "jedyan.sa",
  instagram: "https://instagram.com/jedyan.sa",
  x: "https://x.com/jedyan_sa",
};

export const nav: { href: string; label: T }[] = [
  { href: "/", label: { ar: "الرئيسية", en: "Home" } },
  { href: "/about", label: { ar: "من نحن", en: "About" } },
  { href: "/solutions", label: { ar: "حلولنا", en: "Solutions" } },
  { href: "/how-we-work", label: { ar: "كيف نعمل", en: "How we work" } },
  { href: "/sectors", label: { ar: "القطاعات", en: "Sectors" } },
  { href: "/why-jedyan", label: { ar: "لماذا جديان", en: "Why Jedyan" } },
  { href: "/vision", label: { ar: "رؤية جديان", en: "Vision" } },
  { href: "/contact", label: { ar: "تواصل معنا", en: "Contact" } },
];

export const messages = {
  bigIdea1: { ar: "نُحرّك ما هو أكبر من البضائع.", en: "We move more than goods." },
  bigIdea2: { ar: "نُحرّك الأعمال.", en: "We move business." },
  essence: { ar: "جاهزيةٌ تُبنى عليها الأعمال.", en: "Readiness businesses are built on." },
  promise: { ar: "لن تضطرّ إلى تأجيل نموّك بسبب عملياتك.", en: "You will never have to postpone growth because of your operations." },
  oneStatement: {
    ar: "جديان تدير ما يحدث بين الطلب ووصوله.",
    en: "Jedyan runs everything that happens between an order and its arrival.",
  },
  heroSupport: {
    ar: "شركة سعودية تقدّم حلولًا تشغيلية متكاملة — التخزين، وتجهيز الطلبات، والتغليف، وإدارة التوزيع، والمرتجعات — لتشغّل الشركات تجارتها بكفاءة وقابلية أعلى للتوسع.",
    en: "A Saudi company delivering integrated operations — warehousing, order fulfillment, packaging, distribution management and returns — so businesses run their commerce efficiently and scale with confidence.",
  },
  demandRule: { ar: "الطلب لا يجب أن ينتظر قدرة التشغيل.", en: "Demand should never wait for operating capacity." },
  category: { ar: "شريك منظومة تشغيل التجارة", en: "Commerce Operations Infrastructure Partner" },
};

/* ---------- Section 01: Operating layer ---------- */
export const operatingElements: { key: string; label: T; en: string; note: T }[] = [
  { key: "inventory", label: { ar: "المخزون", en: "Inventory" }, en: "INVENTORY", note: { ar: "استلام، فحص، تصنيف، تخزين، جرد وضبط.", en: "Receive, inspect, classify, store, count, adjust." } },
  { key: "order", label: { ar: "الطلب", en: "Order" }, en: "ORDER", note: { ar: "استقبال الطلب من القناة وإطلاقه للتنفيذ.", en: "Capture the order from its channel and release it." } },
  { key: "fulfillment", label: { ar: "التنفيذ", en: "Fulfillment" }, en: "FULFILLMENT", note: { ar: "انتقاء، تعبئة وتغليف، وتجهيز للشحن.", en: "Pick, pack and prepare for dispatch." } },
  { key: "distribution", label: { ar: "التوزيع", en: "Distribution" }, en: "DISTRIBUTION", note: { ar: "اختيار الناقل، إرسال، تتبّع، تسليم.", en: "Carrier selection, dispatch, tracking, delivery." } },
  { key: "returns", label: { ar: "المرتجعات", en: "Returns" }, en: "RETURNS", note: { ar: "استلام وفحص وقرار موثّق يعيد الدورة.", en: "Receive, inspect, and a documented decision." } },
  { key: "data", label: { ar: "البيانات", en: "Data" }, en: "DATA", note: { ar: "حالة الطلب، حالة المخزون، الاستثناءات، تقارير الأداء.", en: "Order status, stock status, exceptions, performance." } },
];

export const operatingLayers: { en: string; label: T; items: T }[] = [
  { en: "INVENTORY LAYER", label: { ar: "طبقة المخزون", en: "Inventory layer" }, items: { ar: "استلام · فحص · تصنيف · تخزين · جرد · ضبط المخزون", en: "Receive · Inspect · Classify · Store · Count · Adjust" } },
  { en: "ORDER LAYER", label: { ar: "طبقة الطلب", en: "Order layer" }, items: { ar: "استقبال الطلب · انتقاء · تعبئة وتغليف · تجهيز للشحن", en: "Order intake · Pick · Pack · Ready to ship" } },
  { en: "MOVEMENT LAYER", label: { ar: "طبقة الحركة", en: "Movement layer" }, items: { ar: "اختيار الناقل · إرسال · تتبّع · تسليم · معالجة المرتجعات", en: "Carrier selection · Dispatch · Track · Deliver · Returns" } },
  { en: "DATA LAYER", label: { ar: "طبقة البيانات", en: "Data layer" }, items: { ar: "حالة الطلب · حالة المخزون · الاستثناءات · تقارير الأداء", en: "Order status · Stock status · Exceptions · Performance" } },
];

/* ---------- Section 02: Commerce operations cycle ---------- */
export const cycle: { en: string; label: T; note: T }[] = [
  { en: "DEMAND", label: { ar: "طلب السوق", en: "Demand" }, note: { ar: "المبيعات تأتي من المتاجر والتطبيقات والمنصات والفروع — والتشغيل يجب أن يكون جاهزًا لها جميعًا.", en: "Sales arrive from stores, apps, marketplaces and branches — operations must be ready for all of them." } },
  { en: "INVENTORY", label: { ar: "المخزون", en: "Inventory" }, note: { ar: "مخزون واحد متزامن عبر القنوات، يبدأ دقيقًا من لحظة الاستلام.", en: "One synchronised stock across channels, accurate from the moment of receipt." } },
  { en: "ORDER", label: { ar: "الطلب", en: "Order" }, note: { ar: "كل طلب يدخل دورة تشغيل واحدة لها حالة معروفة في كل لحظة.", en: "Every order enters one operating cycle with a known status at every moment." } },
  { en: "FULFILLMENT", label: { ar: "التنفيذ", en: "Fulfillment" }, note: { ar: "انتقاء وتحقق وتغليف وتجهيز — إجراء واحد منظّم يقلّل الأخطاء ويسرّع الإغلاق.", en: "Pick, verify, pack, prepare — one organised routine that cuts errors and speeds closure." } },
  { en: "DISTRIBUTION", label: { ar: "التوزيع", en: "Distribution" }, note: { ar: "المسار المناسب لكل شحنة، ومتابعتها حتى التسليم أو معالجة الاستثناء.", en: "The right route for every shipment, followed through to delivery or exception handling." } },
  { en: "CUSTOMER", label: { ar: "العميل", en: "Customer" }, note: { ar: "التغليف والتسليم هما آخر ما يلمسه عميلك من علامتك.", en: "Packaging and delivery are the last things your customer touches of your brand." } },
  { en: "RETURNS", label: { ar: "المرتجعات", en: "Returns" }, note: { ar: "المرتجع جزء من دورة التجارة؛ نعيده إلى الدورة بقرار موثّق.", en: "A return is part of the commerce cycle; we bring it back with a documented decision." } },
  { en: "DATA", label: { ar: "البيانات", en: "Data" }, note: { ar: "البيانات تُغلق دورة التشغيل، وتهيّئ القرار للطلب التالي.", en: "Data closes the operating cycle and prepares the decision for the next order." } },
];

/* ---------- Commerce operations journey (9 stages) ---------- */
export const journey: { en: string; label: T; status: T; note: T; data: T[] }[] = [
  { en: "INBOUND", label: { ar: "استلام", en: "Inbound" }, status: { ar: "وصلت الشحنة الواردة", en: "Inbound shipment arrived" }, note: { ar: "دقة الاستلام هي أساس دقة المخزون وكفاءة كل ما يليها.", en: "Receiving accuracy is the foundation of stock accuracy and everything after it." }, data: [{ ar: "مطابقة الكميات", en: "Quantity match" }, { ar: "فحص الحالة", en: "Condition check" }, { ar: "توثيق الوارد", en: "Inbound record" }] },
  { en: "STORAGE", label: { ar: "تخزين", en: "Storage" }, status: { ar: "مُخزّن في موقع محدد", en: "Stored at a defined location" }, note: { ar: "لكل صنف موقع، ولكل حركة أثر.", en: "Every item has a location; every movement leaves a trace." }, data: [{ ar: "ترميز الأصناف", en: "SKU labelling" }, { ar: "موقع التخزين", en: "Bin location" }, { ar: "رصيد متاح", en: "Available balance" }] },
  { en: "ORDER", label: { ar: "طلب", en: "Order" }, status: { ar: "طلب جديد مُستلم", en: "New order received" }, note: { ar: "يبدأ التشغيل من حدث الطلب، لا من باب المستودع.", en: "Operations start at the order event, not at the warehouse door." }, data: [{ ar: "القناة", en: "Channel" }, { ar: "الأصناف المحجوزة", en: "Reserved items" }, { ar: "إطلاق للتنفيذ", en: "Released" }] },
  { en: "PICK", label: { ar: "انتقاء", en: "Pick" }, status: { ar: "قيد الانتقاء", en: "Picking" }, note: { ar: "انتقاء وتحقق من الصنف قبل أن يتحول الخطأ إلى شكوى.", en: "Pick and verify before an error becomes a complaint." }, data: [{ ar: "قائمة الانتقاء", en: "Pick list" }, { ar: "تحقق بالمسح", en: "Scan verification" }, { ar: "مطابقة الطلب", en: "Order match" }] },
  { en: "PACK", label: { ar: "تغليف", en: "Pack" }, status: { ar: "قيد التغليف", en: "Packing" }, note: { ar: "التغليف آخر ما يلمسه عميلك — يحمي الشحنة ويمثّل علامتك.", en: "Packaging is the last touch — it protects the shipment and carries your brand." }, data: [{ ar: "مواد التغليف", en: "Packaging" }, { ar: "مواد مضافة", en: "Inserts" }, { ar: "بوليصة الشحن", en: "Shipping label" }] },
  { en: "DISPATCH", label: { ar: "إرسال", en: "Dispatch" }, status: { ar: "سُلّم للناقل", en: "Handed to carrier" }, note: { ar: "هنا تُقاس السرعة: الطلب يُغلق بالحركة.", en: "This is where speed is measured: the order closes by moving." }, data: [{ ar: "الناقل المختار", en: "Selected carrier" }, { ar: "مسح التسليم", en: "Handover scan" }, { ar: "رقم التتبع", en: "Tracking number" }] },
  { en: "DELIVERY", label: { ar: "تسليم", en: "Delivery" }, status: { ar: "في الطريق إلى العميل", en: "Out for delivery" }, note: { ar: "الشحنة لها حالة معروفة في كل لحظة.", en: "The shipment has a known status at every moment." }, data: [{ ar: "حالة التتبع", en: "Tracking status" }, { ar: "إثبات التسليم", en: "Proof of delivery" }, { ar: "استثناء عند الحاجة", en: "Exception if needed" }] },
  { en: "RETURNS", label: { ar: "مرتجع", en: "Returns" }, status: { ar: "مرتجع قيد الفحص", en: "Return under inspection" }, note: { ar: "قيمة المرتجع في سرعة إعادته إلى الدورة.", en: "A return's value lies in how fast it re-enters the cycle." }, data: [{ ar: "سبب الإرجاع", en: "Return reason" }, { ar: "فحص الحالة", en: "Condition" }, { ar: "قرار موثّق", en: "Documented decision" }] },
  { en: "REPORTING", label: { ar: "تقارير", en: "Reporting" }, status: { ar: "أُغلقت الدورة", en: "Cycle closed" }, note: { ar: "التقرير يحوّل التشغيل إلى قرار.", en: "Reporting turns operations into decisions." }, data: [{ ar: "حالة الطلب", en: "Order status" }, { ar: "حالة المخزون", en: "Stock status" }, { ar: "مؤشرات الأداء", en: "KPIs" }] },
];

/* ---------- Section 03 ---------- */
export const whyExists = {
  title: { ar: "وُجدت جديان لتمنح الشركات جاهزية لوجستية دون الحاجة إلى بناء منظومة تشغيل كاملة داخلها.", en: "Jedyan exists to give businesses logistics readiness without building a full operating system in-house." },
  problem: { ar: "مع نمو الأعمال، تتوزع المسؤوليات بين المخزون والطلبات والتغليف والنقل والمرتجعات والتقارير؛ فتزداد التعقيدات ويصبح التشغيل عبئًا على الإدارة.", en: "As a business grows, responsibility spreads across stock, orders, packaging, transport, returns and reporting. Complexity compounds and operations become a burden on management." },
  role: { ar: "تتولى جديان إدارة هذه المنظومة كطبقة تشغيل موحّدة؛ تربط مراحل الطلب، وتدير التنفيذ، وتتحمل مسؤولية التشغيل حتى الإغلاق.", en: "Jedyan runs this system as one unified operating layer — connecting every stage of the order, managing execution, and owning operations through to closure." },
  outcome: { ar: "جاهزية تُبنى عليها الأعمال؛ تتحول فيها العمليات اللوجستية من عبء يحدّ النمو إلى قدرة تشغيلية تدعمه.", en: "Readiness businesses build on — logistics shifts from a burden that limits growth to a capability that supports it." },
  line: { ar: "حين يتوزع التشغيل، تتوزع المسؤولية. وحين يُدار كمنظومة واحدة، تصبح السيطرة أوضح والنمو أسهل.", en: "When operations are fragmented, so is accountability. Run as one system, control gets clearer and growth gets easier." },
};

/* ---------- Solutions ---------- */
export type Solution = {
  slug: string;
  n: string;
  en: string;
  title: T;
  headline: T;
  intro: T;
  problem: T;
  role: T;
  scope: T[];
  stages: T[];
  outputs: T[];
  tech?: T;
  kpis: T[];
  relation: T;
  cta: T;
  visual: "bins" | "flow" | "connect" | "carrier" | "returns" | "tower";
};

export const solutions: Solution[] = [
  {
    slug: "warehousing-inventory",
    n: "01",
    en: "Warehousing & Inventory",
    title: { ar: "التخزين وإدارة المخزون", en: "Warehousing & Inventory" },
    headline: { ar: "المخزون تحت السيطرة يبدأ من لحظة الاستلام.", en: "Control over inventory starts at the moment of receipt." },
    intro: { ar: "نُدير المخزون كأمانة تشغيلية: لكل صنف موقع، ولكل حركة أثر، ولكل رقم قابل للتحقق.", en: "We manage inventory as an operational trust: every item has a location, every movement a trace, every number can be verified." },
    problem: { ar: "حين لا يطابق المخزونُ الطلباتِ والواقع، تتحول كل عملية بيع إلى مخاطرة: نفاد غير متوقع، أو رصيد وهمي، أو تأخير في الشحن.", en: "When stock doesn't match orders and reality, every sale becomes a risk: unexpected stock-outs, phantom balances, delayed shipments." },
    role: { ar: "نستلم الوارد ونوثّقه، ونخزّنه وفق مواقع محددة، ونضبط الرصيد بالجرد الدوري — ليكون المخزون جاهزًا للتحوّل إلى طلب صحيح بسرعة يمكن قياسها.", en: "We receive and document inbound, store it at defined locations, and keep balances true through periodic counts — so stock is ready to become a correct order at a measurable speed." },
    scope: [
      { ar: "استلام الوارد وتوثيقه", en: "Inbound receiving and documentation" },
      { ar: "فحص المطابقة والحالة", en: "Match and condition inspection" },
      { ar: "تصنيف الأصناف وترميزها", en: "Item classification and labelling" },
      { ar: "التخزين وفق مواقع محددة", en: "Storage at defined locations" },
      { ar: "ضبط المخزون والتسويات", en: "Stock control and adjustments" },
      { ar: "جرد دوري وتدقيق", en: "Cycle counts and audit" },
      { ar: "مناطق مشتركة أو مخصّصة حسب الحساب", en: "Shared or dedicated zones per account" },
      { ar: "إدارة التواريخ والدفعات عند الحاجة", en: "Date and batch management when required" },
    ],
    stages: [
      { ar: "استلام", en: "Receive" },
      { ar: "فحص", en: "Inspect" },
      { ar: "ترميز", en: "Label" },
      { ar: "تخزين", en: "Put-away" },
      { ar: "جرد", en: "Count" },
      { ar: "تقرير", en: "Report" },
    ],
    outputs: [
      { ar: "تقارير حالة المخزون", en: "Stock status reports" },
      { ar: "سجل موثّق للوارد", en: "Documented inbound record" },
      { ar: "رصيد متاح قابل للتحقق", en: "Verifiable available balance" },
    ],
    tech: { ar: "رؤية المخزون عبر نظام إدارة المستودع: متاح، محجوز، تالف، مرتجع.", en: "Inventory visibility through the warehouse system: available, reserved, damaged, returned." },
    kpis: [
      { ar: "دقة المخزون", en: "Inventory accuracy" },
      { ar: "دقة الجرد والفاقد المعلن", en: "Count accuracy and declared shrinkage" },
      { ar: "زمن الاستلام حتى الإتاحة", en: "Receipt-to-available time" },
    ],
    relation: { ar: "المخزون الدقيق هو ما يجعل تنفيذ الطلبات سريعًا، والتقارير موثوقة، والمرتجعات قابلة للإعادة إلى الرصيد.", en: "Accurate stock is what makes fulfillment fast, reporting reliable and returns re-stockable." },
    cta: { ar: "أرسل تفاصيل مخزونك", en: "Share your inventory profile" },
    visual: "bins",
  },
  {
    slug: "fulfillment",
    n: "02",
    en: "Fulfillment Operations",
    title: { ar: "تنفيذ الطلبات", en: "Fulfillment Operations" },
    headline: { ar: "من لحظة وصول الطلب حتى جاهزيته للشحن.", en: "From the moment an order lands to ready-to-ship." },
    intro: { ar: "إجراء واحد منظّم يبدأ من استلام الطلب وينتهي بتسليمه للناقل — بدقة تقلّل الأخطاء وتسرّع الإغلاق.", en: "One organised routine from order intake to carrier handover — precise enough to cut errors and speed up closure." },
    problem: { ar: "كل طلب خاطئ أو متأخر يظهر مباشرة لعميلك: صنف غير صحيح، تغليف ضعيف، أو شحنة فاتها موعد الإرسال.", en: "Every wrong or late order shows up directly to your customer: a wrong item, weak packaging, a missed dispatch cut-off." },
    role: { ar: "نُطلق الطلب، ونتنقي ونتحقق، ونغلّف ونطبع البوليصة، ونسلّم للناقل بمسح يغلق المرحلة — لطلبات الأفراد وطلبات الجملة.", en: "We release the order, pick and verify, pack and label, and hand over to the carrier with a closing scan — for both B2C and B2B orders." },
    scope: [
      { ar: "استلام الطلب وإطلاقه", en: "Order intake and release" },
      { ar: "الانتقاء والتحقق", en: "Picking and verification" },
      { ar: "التعبئة والتغليف بما فيه المخصّص", en: "Packing, including branded packaging" },
      { ar: "طباعة مستندات الشحن", en: "Shipping documents and labels" },
      { ar: "تجميع الباقات والعروض", en: "Kitting and bundling" },
      { ar: "إدارة مواعيد القطع", en: "Cut-off management" },
      { ar: "التسليم للناقل وإغلاق المسح", en: "Carrier handover and scan closure" },
    ],
    stages: [
      { ar: "الطلب", en: "Order" },
      { ar: "انتقاء", en: "Pick" },
      { ar: "تغليف", en: "Pack" },
      { ar: "إرسال", en: "Dispatch" },
    ],
    outputs: [
      { ar: "طلبات مغلقة بحالة موثّقة", en: "Orders closed with documented status" },
      { ar: "شحنات جاهزة ضمن موعد القطع", en: "Shipments ready within cut-off" },
      { ar: "سجل استثناءات واضح", en: "Clear exception log" },
    ],
    tech: { ar: "تتبع حالة كل طلب من الإطلاق حتى التسليم للناقل.", en: "Status tracking for every order from release to carrier handover." },
    kpis: [
      { ar: "دقة الانتقاء والتغليف", en: "Pick & pack accuracy" },
      { ar: "الإرسال ضمن موعد القطع", en: "Dispatch within cut-off" },
      { ar: "زمن الإبلاغ عن الاستثناء", en: "Exception notification time" },
    ],
    relation: { ar: "يعتمد التنفيذ على دقة المخزون، ويسلّم مباشرة إلى إدارة الناقلين، ويغذي بيانات الأداء.", en: "Fulfillment depends on accurate stock, hands directly to carrier management, and feeds performance data." },
    cta: { ar: "اطلب تصورًا تشغيليًا", en: "Request an operating model" },
    visual: "flow",
  },
  {
    slug: "commerce-connect",
    n: "03",
    en: "Commerce Connect",
    title: { ar: "ربط التجارة الإلكترونية", en: "Commerce Connect" },
    headline: { ar: "حين يبدأ الطلب رقميًا، يجب أن يبدأ التشغيل من حدث الطلب.", en: "When the order starts digitally, operations must start at the order event." },
    intro: { ar: "الربط مع قنوات البيع ليس ميزة تقنية جانبية؛ إنه جزء من تعريف الخدمة: الطلب والمخزون والتتبع في صورة واحدة.", en: "Connecting to sales channels isn't a side feature; it is part of the service itself — orders, stock and tracking in one view." },
    problem: { ar: "تتعدد القنوات: متاجر، تطبيقات، منصات، فروع. وبدون ربط، يتحول كل طلب إلى عمل يدوي، ويتباعد المخزون المعروض عن المخزون الفعلي.", en: "Channels multiply — stores, apps, marketplaces, branches. Without integration every order becomes manual work, and listed stock drifts from real stock." },
    role: { ar: "نربط قنوات البيع بتدفق التشغيل، ونطابق البيانات بين الأنظمة، لتصل الطلبات إلى التنفيذ مباشرة وتعود حالتها إلى القناة.", en: "We connect sales channels to the operating flow and map data between systems, so orders reach execution directly and status returns to the channel." },
    scope: [
      { ar: "ربط القنوات وتدفق البيانات ومطابقتها", en: "Channel connection, data flow and mapping" },
      { ar: "منصات المتاجر الإلكترونية", en: "E-commerce store platforms" },
      { ar: "تجهيز خاص بمتطلبات المنصات", en: "Marketplace-specific preparation" },
      { ar: "أنظمة العميل حسب الحساب", en: "Client systems, scoped per account" },
      { ar: "مزامنة أحداث الطلب", en: "Order event synchronisation" },
      { ar: "رؤية حالات المخزون", en: "Inventory status visibility" },
      { ar: "بيانات التتبع والتسليم", en: "Tracking and delivery data" },
    ],
    stages: [
      { ar: "تشخيص القنوات", en: "Map channels" },
      { ar: "مطابقة البيانات", en: "Map data" },
      { ar: "اختبار الربط", en: "Test integration" },
      { ar: "التشغيل", en: "Go live" },
    ],
    outputs: [
      { ar: "طلبات تصل للتنفيذ دون إدخال يدوي", en: "Orders reaching execution without manual entry" },
      { ar: "مخزون متزامن عبر القنوات", en: "Stock synchronised across channels" },
      { ar: "حالة الشحنة مرئية للقناة", en: "Shipment status visible to the channel" },
    ],
    tech: { ar: "يُحدَّد نطاق الربط لكل حساب في مرحلة التشخيص ويُختبر قبل التشغيل (اختبار الربط ومطابقة البيانات).", en: "Integration scope is defined per account during diagnosis and tested before go-live (integration test and data mapping)." },
    kpis: [
      { ar: "تطابق المخزون بين القناة والمستودع", en: "Channel-to-warehouse stock match" },
      { ar: "زمن وصول الطلب إلى التنفيذ", en: "Order-to-release time" },
      { ar: "نسبة الطلبات المعالجة دون تدخل يدوي", en: "Share of orders processed without manual touch" },
    ],
    relation: { ar: "الربط هو ما يجعل المخزون والتنفيذ والتوزيع والبيانات تعمل كمنظومة واحدة لا كخدمات منفصلة.", en: "Integration is what makes inventory, fulfillment, distribution and data work as one system, not separate services." },
    cta: { ar: "أخبرنا عن قنواتك", en: "Tell us about your channels" },
    visual: "connect",
  },
  {
    slug: "distribution-carrier-management",
    n: "04",
    en: "Distribution & Carrier Management",
    title: { ar: "التوزيع وإدارة الناقلين", en: "Distribution & Carrier Management" },
    headline: { ar: "لا نملك الطريق — نملك القرار على مساره.", en: "We don't own the road — we own the decision on its route." },
    intro: { ar: "نُدير التوزيع باختيار المسار المناسب لكل شحنة، ومتابعتها حتى التسليم أو معالجة الاستثناء.", en: "We manage distribution by choosing the right route for every shipment and following it through to delivery or exception handling." },
    problem: { ar: "الشحنة التي تخرج من المستودع دون قرار واضح حول الناقل والمسار والإجراء عند الفشل، تصبح شحنة بلا مسؤول.", en: "A shipment that leaves without a clear decision on carrier, route and what happens on failure becomes a shipment nobody owns." },
    role: { ar: "نكون مركز القرار والمسؤول عن الاستثناء: من يشحن، وإلى أين، وبأي مستوى خدمة، وما الإجراء إذا تعثّر التسليم.", en: "We are the decision centre and the owner of the exception: who ships, where, at what service level, and what happens if delivery fails." },
    scope: [
      { ar: "قواعد اختيار الناقل حسب المدينة والخدمة", en: "Carrier selection rules by city and service" },
      { ar: "توجيه حسب التكلفة ومستوى الخدمة", en: "Cost and service-level routing" },
      { ar: "التحكم في الاستلام والتسليم للناقل", en: "Pickup and handover control" },
      { ar: "تجميع بيانات التتبع", en: "Tracking aggregation" },
      { ar: "إدارة التسليم المتعثر", en: "Failed delivery management" },
      { ar: "مطابقة الدفع عند الاستلام", en: "Cash-on-delivery reconciliation" },
      { ar: "توزيع B2B وتزويد الفروع", en: "B2B and branch replenishment" },
      { ar: "توزيع المشاريع والحملات", en: "Project and campaign distribution" },
    ],
    stages: [
      { ar: "طلب جاهز للشحن", en: "Ready to ship" },
      { ar: "اختيار الناقل المناسب", en: "Carrier selection" },
      { ar: "تسليم للناقل وإرسال", en: "Handover & dispatch" },
      { ar: "تتبّع حالة الشحنة", en: "Tracking" },
      { ar: "تسليم للعميل", en: "Delivery" },
      { ar: "معالجة الاستثناءات", en: "Exception handling" },
    ],
    outputs: [
      { ar: "شحنة لها حالة معروفة في كل لحظة", en: "Shipments with a known status at every moment" },
      { ar: "تقارير التسليم", en: "Delivery reports" },
      { ar: "سجل استثناءات وإجراءات", en: "Exception and action log" },
    ],
    tech: { ar: "تجميع حالات التتبع من أكثر من ناقل في رؤية واحدة.", en: "Tracking statuses from multiple carriers aggregated into one view." },
    kpis: [
      { ar: "نسبة التسليم الناجح", en: "Successful delivery rate" },
      { ar: "زمن معالجة الاستثناء", en: "Exception resolution time" },
      { ar: "دقة مطابقة الدفع عند الاستلام", en: "COD reconciliation accuracy" },
    ],
    relation: { ar: "العميل يشتري مستوى خدمة واحدًا، حتى لو نُفّذ عبر أكثر من ناقل — وجديان هي من يدير هذا القرار.", en: "The client buys one service level, even if executed through several carriers — Jedyan manages that decision." },
    cta: { ar: "تحدث مع فريق جديان", en: "Talk to the Jedyan team" },
    visual: "carrier",
  },
  {
    slug: "returns-value-added-services",
    n: "05",
    en: "Returns & Value Added Services",
    title: { ar: "المرتجعات والخدمات المضافة", en: "Returns & Value Added Services" },
    headline: { ar: "الطلب لا ينتهي عند التسليم.", en: "The order doesn't end at delivery." },
    intro: { ar: "المرتجع جزء من دورة التجارة لا استثناء عليها. والخدمات المضافة ليست ملحقًا تجاريًا — بل ما يجعل الشحنة جاهزة فعليًا.", en: "A return is part of the commerce cycle, not an exception to it. Value added services aren't an add-on — they are what make a shipment truly ready." },
    problem: { ar: "المرتجعات غير المُدارة تجمّد قيمة المخزون وتخفي أسباب المشكلة. والتغليف الضعيف يضيف تلفًا وتكلفة لا تُرى إلا متأخرة.", en: "Unmanaged returns freeze stock value and hide the root cause. Weak packaging adds damage and cost that surface too late." },
    role: { ar: "نستلم المرتجع ونفحصه ونقيّمه ونتخذ قرارًا موثّقًا يعيده إلى الدورة. وننفّذ الخدمات المضافة داخل العملية لا بعدها.", en: "We receive, inspect and evaluate each return and make a documented decision that brings it back into the cycle. Value added services run inside the process, not after it." },
    scope: [
      { ar: "استلام المرتجع وفحص حالته", en: "Return receipt and condition check" },
      { ar: "توثيق سبب الإرجاع", en: "Return reason documentation" },
      { ar: "إعادة القابل للبيع إلى المخزون", en: "Restock of saleable items" },
      { ar: "فصل الأصناف غير الصالحة", en: "Segregation of unsaleable items" },
      { ar: "تجهيز الكراتين والقطع المفردة", en: "Carton and single-unit preparation" },
      { ar: "تغليف قياسي ومخصص", en: "Standard and custom packaging" },
      { ar: "تجميع الباقات والعروض", en: "Bundles and promotional kits" },
      { ar: "إدراج مواد تعريفية وتسويقية", en: "Marketing and information inserts" },
      { ar: "تجهيز الحملات الموسمية", en: "Seasonal campaign preparation" },
      { ar: "طباعة مستندات الشحن", en: "Shipping document printing" },
      { ar: "تغليف حراري Shrink Wrap", en: "Shrink wrap" },
      { ar: "إعادة ترتيب الطبليات وتوفيرها", en: "Pallet rebuild and supply" },
      { ar: "تفريغ الحاويات", en: "Container unloading" },
    ],
    stages: [
      { ar: "استلام", en: "Receive" },
      { ar: "فحص", en: "Inspect" },
      { ar: "تقييم", en: "Evaluate" },
      { ar: "إعادة معالجة", en: "Reprocess" },
      { ar: "قرار", en: "Decision" },
    ],
    outputs: [
      { ar: "إعادة إلى المخزون القابل للبيع", en: "Return to saleable stock" },
      { ar: "فصل الأصناف غير الصالحة", en: "Unsaleable items segregated" },
      { ar: "توثيق السبب في التقرير", en: "Reason documented in reporting" },
    ],
    kpis: [
      { ar: "زمن معالجة المرتجع", en: "Return processing time" },
      { ar: "نسبة الإعادة إلى المخزون", en: "Restock rate" },
      { ar: "تحليل أسباب الإرجاع", en: "Return reason analysis" },
    ],
    relation: { ar: "المرتجعات ليست تكلفة ما بعد البيع فقط؛ إنها مصدر بيانات عن المنتج والقناة وتجربة العميل.", en: "Returns aren't just an after-sale cost; they are a source of data on product, channel and customer experience." },
    cta: { ar: "ناقش دورة مرتجعاتك", en: "Discuss your returns cycle" },
    visual: "returns",
  },
  {
    slug: "enterprise-managed-logistics",
    n: "06",
    en: "Enterprise Managed Logistics",
    title: { ar: "التشغيل المؤسسي المُدار", en: "Enterprise Managed Logistics" },
    headline: { ar: "لا نضيف خدمة إلى عملياتك — نتولى جزءًا منها.", en: "We don't add a service to your operations — we take ownership of part of them." },
    intro: { ar: "الفرق بين مزوّد خدمة وشريك تشغيل هو موقع المسؤولية: من يملك القرار حين يتغير الواقع.", en: "The difference between a service provider and an operating partner is where accountability sits: who owns the decision when reality changes." },
    problem: { ar: "في الحسابات الكبيرة، تتوزع العمليات بين مورّدين متعددين؛ وحين يتعثر طلب بين نظامين أو مورّدين، لا يوجد مسؤول واحد.", en: "In large accounts operations spread across many vendors; when an order fails between two systems or two vendors, nobody owns it." },
    role: { ar: "طبقة تشغيل واحدة بين العميل والتنفيذ: قرار واحد، مسؤولية واحدة، تقرير واحد. العميل يبقى صاحب العلامة، وجديان تبقى صاحبة التنفيذ.", en: "One operating layer between the client and execution: one decision, one accountability, one report. The client keeps the brand; Jedyan owns the execution." },
    scope: [
      { ar: "مساحات أو مناطق مخصّصة أو هجينة", en: "Dedicated or hybrid space and zones" },
      { ar: "إيقاع تشغيل وحوكمة للاستثناءات", en: "Operating rhythm and exception governance" },
      { ar: "تخطيط الذروة: عمالة، مساحة، مواد، ناقلون", en: "Peak planning: labour, space, materials, carriers" },
      { ar: "تدفقات B2B وB2C من مخزون واحد", en: "B2B and B2C flows from one stock" },
      { ar: "استقبال وارد المورّدين بمواعيد", en: "Scheduled vendor inbound" },
      { ar: "مراجعات أداء دورية وتحسين مستمر", en: "Periodic performance reviews and continuous improvement" },
    ],
    stages: [
      { ar: "المستودع", en: "Warehouse" },
      { ar: "تنفيذ الطلبات", en: "Fulfillment" },
      { ar: "الناقلون", en: "Carriers" },
      { ar: "المرتجعات", en: "Returns" },
      { ar: "التقارير", en: "Reporting" },
    ],
    outputs: [
      { ar: "قرار واحد · مسؤولية واحدة · تقرير واحد", en: "One decision · one accountability · one report" },
      { ar: "مراجعة أداء دورية مع إجراءات", en: "Periodic performance review with actions" },
      { ar: "خطة موسم قبل الذروة", en: "Season plan before peak" },
    ],
    tech: { ar: "لوحة أداء موحّدة وحوكمة للحوادث واجتماعات مراجعة دورية.", en: "A unified performance dashboard, incident governance and periodic review meetings." },
    kpis: [
      { ar: "مؤشرات مستوى الخدمة المتفق عليها", en: "Agreed service-level indicators" },
      { ar: "الأداء في الذروة لا في المتوسط", en: "Performance at peak, not on average" },
      { ar: "تكلفة الخدمة واتجاهها", en: "Cost-to-serve and its trend" },
    ],
    relation: { ar: "التشغيل المُدار يجمع المحاور الخمسة الأخرى تحت مسؤولية تشغيلية واحدة، مصمّمة حول حسابك.", en: "Managed operations bring the other five pillars under one operating accountability, designed around your account." },
    cta: { ar: "اطلب جلسة تشخيص مؤسسية", en: "Request an enterprise diagnosis" },
    visual: "tower",
  },
];

/* ---------- Who we serve ---------- */
export const segments: { en: string; label: T; need: T }[] = [
  { en: "Enterprise Accounts", label: { ar: "حسابات مؤسسية", en: "Enterprise accounts" }, need: { ar: "أحجام كبيرة، حوكمة، وتقارير دورية.", en: "Large volumes, governance and periodic reporting." } },
  { en: "Growing E-commerce", label: { ar: "متاجر إلكترونية نامية", en: "Growing e-commerce" }, need: { ar: "نمو سريع يحتاج سعة مرنة لا التزامًا ثابتًا.", en: "Fast growth that needs flexible capacity, not fixed commitments." } },
  { en: "Digital Brands", label: { ar: "علامات رقمية", en: "Digital brands" }, need: { ar: "التغليف والتسليم جزء من المنتج نفسه.", en: "Packaging and delivery are part of the product itself." } },
  { en: "Marketplace Sellers", label: { ar: "بائعو المنصات", en: "Marketplace sellers" }, need: { ar: "تجهيز يتوافق مع اشتراطات كل منصة.", en: "Preparation that meets each marketplace's requirements." } },
  { en: "Regional Brand Entry", label: { ar: "علامات إقليمية تدخل السعودية", en: "Regional brands entering KSA" }, need: { ar: "دخول السوق دون تأسيس تشغيلي كامل.", en: "Market entry without building a full operation." } },
  { en: "B2B / B2C Distributors", label: { ar: "موزّعون B2B / B2C", en: "B2B / B2C distributors" }, need: { ar: "قناتان تُخدمان من مخزون واحد.", en: "Two channels served from one stock." } },
];

/* ---------- Sectors ---------- */
export const sectors: { en: string; label: T; profile: T }[] = [
  { en: "Fashion & Footwear", label: { ar: "أزياء وأحذية", en: "Fashion & footwear" }, profile: { ar: "مواسم · مقاسات · مرتجعات", en: "Seasons · sizes · returns" } },
  { en: "Beauty & Personal Care", label: { ar: "جمال وعناية شخصية", en: "Beauty & personal care" }, profile: { ar: "كثافة أصناف · حملات · حساسية التغليف", en: "Dense SKUs · campaigns · packaging sensitivity" } },
  { en: "Electronics & Accessories", label: { ar: "إلكترونيات وإكسسوارات", en: "Electronics & accessories" }, profile: { ar: "قيمة مخزون · دقة الأرقام التسلسلية", en: "Stock value · serial-number precision" } },
  { en: "Gifts", label: { ar: "هدايا", en: "Gifts" }, profile: { ar: "تفاوت الأحجام · باقات · موسمية", en: "Mixed sizes · bundles · seasonality" } },
  { en: "Spare Parts", label: { ar: "قطع غيار", en: "Spare parts" }, profile: { ar: "سرعة بحث · B2B/B2C · أصناف كثيفة", en: "Fast lookup · B2B/B2C · dense SKUs" } },
  { en: "Dry FMCG", label: { ar: "سلع استهلاكية جافة", en: "Dry FMCG" }, profile: { ar: "سرعة دوران · تواريخ صلاحية عند الحاجة", en: "Fast turnover · expiry dates when required" } },
  { en: "Subscriptions & Boxes", label: { ar: "اشتراكات وصناديق", en: "Subscriptions & boxes" }, profile: { ar: "تجميع متكرر · توقع أحجام", en: "Recurring kitting · volume forecasting" } },
  { en: "Campaigns & Events", label: { ar: "حملات وفعاليات", en: "Campaigns & events" }, profile: { ar: "ذروة قصيرة · تجميع · توزيع", en: "Short peaks · kitting · distribution" } },
];

export const sectorRule = {
  ar: "القطاع لا يغيّر المبدأ — يغيّر التفاصيل التي تُصمَّم عليها العملية. طبيعة المنتج تحدد التغليف، ودورة الطلب تحدد السعة، والموسم يحدد التخطيط.",
  en: "The sector doesn't change the principle — it changes the details the operation is designed around. The product defines packaging, the order cycle defines capacity, the season defines planning.",
};

/* ---------- How we work (client journey) ---------- */
export const clientJourney: { en: string; label: T; does: T; question: T; proof: string }[] = [
  { en: "DIAGNOSE", label: { ar: "تشخيص", en: "Diagnose" }, does: { ar: "شكل الطلب، الأصناف، القنوات، والمواسم.", en: "Order profile, SKUs, channels and seasons." }, question: { ar: "هل يفهمون تعقيدي؟", en: "Do they understand my complexity?" }, proof: "Order / SKU / Channel profile" },
  { en: "DESIGN", label: { ar: "تصميم", en: "Design" }, does: { ar: "خريطة العملية، السعة المطلوبة، ومنطق التسعير.", en: "Process map, required capacity and pricing logic." }, question: { ar: "هل النموذج مفصّل لي؟", en: "Is the model built for me?" }, proof: "Process map + capacity + pricing" },
  { en: "CONNECT", label: { ar: "ربط", en: "Connect" }, does: { ar: "ربط القنوات وتدفق البيانات ومطابقتها.", en: "Connect channels, data flows and mapping." }, question: { ar: "هل ستتحدث الأنظمة؟", en: "Will the systems talk?" }, proof: "Integration test + data mapping" },
  { en: "ONBOARD", label: { ar: "تهيئة", en: "Onboard" }, does: { ar: "إدخال المخزون، الترميز، والجرد الافتتاحي.", en: "Stock intake, labelling and opening count." }, question: { ar: "هل المخزون صحيح؟", en: "Is the stock right?" }, proof: "Inbound validation + baseline count" },
  { en: "OPERATE", label: { ar: "تشغيل", en: "Operate" }, does: { ar: "تنفيذ يومي مع متابعة ومعالجة الاستثناءات.", en: "Daily execution with follow-up and exception handling." }, question: { ar: "هل سأعرف المشكلة مبكرًا؟", en: "Will I hear about problems early?" }, proof: "Performance dashboard + exception alerts" },
  { en: "SCALE", label: { ar: "توسّع", en: "Scale" }, does: { ar: "مراجعة السعة والذروة وتوسيع النطاق.", en: "Review capacity and peaks, expand scope." }, question: { ar: "هل سيتوسعون معي؟", en: "Will they scale with me?" }, proof: "Peak plan + review + capacity" },
];

export const rhythm: { en: string; label: T; text: T }[] = [
  { en: "DAILY", label: { ar: "التشغيل اليومي", en: "Daily operations" }, text: { ar: "تنفيذ الطلبات، متابعة الحالات، معالجة الاستثناء فور ظهوره.", en: "Order execution, status follow-up, exceptions handled as they appear." } },
  { en: "WEEKLY", label: { ar: "المتابعة الأسبوعية", en: "Weekly follow-up" }, text: { ar: "حالة المخزون، أحجام الطلبات، النقاط التي تحتاج تعديلًا.", en: "Stock status, order volumes, points that need adjustment." } },
  { en: "PERIODIC", label: { ar: "المراجعة الدورية", en: "Periodic review" }, text: { ar: "مراجعة الأداء، أسباب الانحراف، قرارات التحسين والتوسع.", en: "Performance review, root causes, improvement and scaling decisions." } },
];

export const scaleModes: { en: string; label: T; text: T }[] = [
  { en: "NORMAL", label: { ar: "تشغيل عادي", en: "Normal" }, text: { ar: "إيقاع ثابت، سعة مخصصة، وتقارير دورية.", en: "Steady rhythm, allocated capacity, periodic reports." } },
  { en: "GROWTH", label: { ar: "نمو", en: "Growth" }, text: { ar: "زيادة تدريجية في الأصناف والطلبات دون إعادة تأسيس.", en: "Gradual growth in SKUs and orders without re-setup." } },
  { en: "SEASONAL PEAK", label: { ar: "ذروة موسمية", en: "Seasonal peak" }, text: { ar: "خطة موسم: سعة إضافية، عمالة، وجدولة مسبقة.", en: "Season plan: extra capacity, labour and advance scheduling." } },
  { en: "HIGHER VOLUME", label: { ar: "حجم أعلى", en: "Higher volume" }, text: { ar: "مراجعة النموذج والسعة والمسارات وفق الحجم الجديد.", en: "Review model, capacity and routes for the new volume." } },
];

/* ---------- Technology & visibility ---------- */
export const visibility: { en: string; label: T }[] = [
  { en: "Order Visibility", label: { ar: "تتبّع حالة الطلبات", en: "Order visibility" } },
  { en: "Inventory Visibility", label: { ar: "تقارير المخزون", en: "Inventory visibility" } },
  { en: "Performance Monitoring", label: { ar: "مراقبة الأداء التشغيلي", en: "Performance monitoring" } },
  { en: "Delivery Reporting", label: { ar: "تقارير التسليم", en: "Delivery reporting" } },
  { en: "Operational KPIs", label: { ar: "مؤشرات أداء تدعم القرار", en: "Operational KPIs" } },
];

/* ---------- Why Jedyan ---------- */
export const reasons: { en: string; label: T; text: T }[] = [
  { en: "Saudi operating context", label: { ar: "السياق التشغيلي السعودي", en: "Saudi operating context" }, text: { ar: "نعمل ضمن واقع السوق المحلي، بمتطلباته التنظيمية ومواسمه وتوقعات عملائه.", en: "We operate within the local market — its regulations, its seasons and its customers' expectations." } },
  { en: "Operational discipline", label: { ar: "الانضباط التشغيلي", en: "Operational discipline" }, text: { ar: "إجراءات واضحة وموثّقة تجعل الأداء قابلًا للتكرار والضبط، بعيدًا عن الاعتماد على الأفراد.", en: "Clear, documented procedures that make performance repeatable and controlled — not dependent on individuals." } },
  { en: "Flexible solutions", label: { ar: "الحلول المرنة", en: "Flexible solutions" }, text: { ar: "نكيّف نموذج التشغيل وفق طبيعة منتجاتك وقنواتك وأحجام طلباتك ومستوى التعقيد لديك.", en: "We adapt the operating model to your products, channels, order volumes and complexity." } },
  { en: "Measurable performance", label: { ar: "الأداء القابل للقياس", en: "Measurable performance" }, text: { ar: "نربط التنفيذ بمؤشرات واضحة وتقارير دورية، لتبقى النتائج قابلة للمتابعة والمراجعة والتحسين.", en: "Execution tied to clear indicators and periodic reports, so results can be tracked, reviewed and improved." } },
  { en: "Scalable model", label: { ar: "النموذج القابل للتوسع", en: "Scalable model" }, text: { ar: "سعة مرنة تتكيف مع نمو الطلب والمواسم والذروة، دون إعادة بناء العملية من الصفر.", en: "Flexible capacity that adapts to growth, seasons and peaks — without rebuilding from scratch." } },
  { en: "Long-term partnership", label: { ar: "الشراكة طويلة المدى", en: "Long-term partnership" }, text: { ar: "نقيس نجاح العلاقة باستقرار عملياتك وقدرتها على التوسع، لا بحجم الخدمة وحده.", en: "We measure the relationship by the stability of your operations and their capacity to grow — not by service volume alone." } },
];

/* ---------- Brand foundation (Blueprint V6) ---------- */
export const foundation = {
  purpose: { ar: "أن نجعل الجاهزية التشغيلية متاحة لكل شركة طموحة — حتى لا يبقى ضعف العمليات سببًا في تأجيل النمو.", en: "To make operational readiness available to every ambitious company — so weak operations are never a reason to postpone growth." },
  vision: { ar: "أن نصبح النقطة الثابتة التي تبني عليها الشركات السعودية خططها للنمو.", en: "To become the fixed point Saudi companies build their growth plans on." },
  mission: { ar: "نُصمّم عمليات لوجستية حول نموذج عمل كل عميل، ونديرها بانضباط موثّق، ونُفصح قبل أن نُسأل — لنحوّل التشغيل من قيد إلى قدرة.", en: "We design logistics operations around each client's business model, run them with documented discipline, and disclose before we are asked — turning operations from a constraint into a capability." },
  star: { ar: "يستمد الاسم معناه من «الجدي» — النجم الثابت الذي اهتدت به القوافل. الدليل الحقيقي ثابت، والمسافر هو من يتحرك.", en: "The name draws on Al-Jiddi — the fixed star caravans navigated by. The true guide stays fixed; the traveller is the one who moves." },
  values: [
    { label: { ar: "الوضوح قبل الوعد", en: "Clarity before promise" }, text: { ar: "نقول ما نستطيع قبل أن نقول ما نريد.", en: "We say what we can do before we say what we want." } },
    { label: { ar: "الثبات تحت الحمل", en: "Steadiness under load" }, text: { ar: "نُقاس في أصعب أسبوع، لا في أهدأ شهر.", en: "We are measured in the hardest week, not the calmest month." } },
    { label: { ar: "أمانة المخزون", en: "Stewardship of stock" }, text: { ar: "ما يُودع لدينا ليس بضاعة في مساحة، بل رأس مال عميل تحت مسؤوليتنا.", en: "What is stored with us isn't goods in a space — it is a client's capital under our responsibility." } },
    { label: { ar: "الإفصاح الافتراضي", en: "Disclosure by default" }, text: { ar: "لا ننتظر السؤال، ولا نؤجّل الخبر إلى اجتماع المراجعة.", en: "We don't wait to be asked, and we don't hold news for the review meeting." } },
    { label: { ar: "النمو المشترك", en: "Shared growth" }, text: { ar: "إذا لم يكبر العميل، فقد نجحنا في التنفيذ وفشلنا في الغاية.", en: "If the client doesn't grow, we succeeded in execution and failed in purpose." } },
  ],
  pillars: [
    { en: "Readiness before demand", label: { ar: "جاهزية قبل الطلب", en: "Readiness before demand" }, text: { ar: "خطة سعة وذروة قبل أن يصبح الحجم حالة طارئة.", en: "Capacity and peak plans before volume becomes an emergency." } },
    { en: "Connected commerce", label: { ar: "تجارة متصلة", en: "Connected commerce" }, text: { ar: "الطلب والمخزون والتتبع عبر أنظمة متكاملة.", en: "Orders, stock and tracking across integrated systems." } },
    { en: "Controlled execution", label: { ar: "تنفيذ تحت السيطرة", en: "Controlled execution" }, text: { ar: "إجراءات موثّقة وشفافية استثناء قابلة للتدقيق.", en: "Documented procedures and auditable exception transparency." } },
    { en: "Flexible network", label: { ar: "شبكة مرنة", en: "Flexible network" }, text: { ar: "اختيار المخزن والناقل والمسار وفق الاحتياج لا وفق أصل واحد.", en: "Choosing storage, carrier and route by need — not by a single asset." } },
  ],
};

/* ---------- Contact / diagnosis ---------- */
export const diagnosis = {
  title: { ar: "لنبدأ من تشخيص عمليتك.", en: "Let's start by diagnosing your operation." },
  sub: { ar: "أرسل لنا شكل طلبك وأصنافك وقنواتك، ونعود إليك بتصوّر تشغيلي أولي. لا نبدأ بالسعر — نبدأ بفهم شكل الطلب.", en: "Share your order profile, SKUs and channels, and we'll come back with an initial operating model. We don't start with price — we start by understanding your orders." },
  steps: [
    {
      id: "business",
      q: { ar: "ما نوع نشاطك؟", en: "What best describes your business?" },
      multi: false,
      options: [
        { ar: "متجر إلكتروني", en: "E-commerce store" },
        { ar: "علامة تجارية رقمية", en: "Digital brand" },
        { ar: "بائع على المنصات", en: "Marketplace seller" },
        { ar: "حساب مؤسسي / تجزئة", en: "Enterprise / retail" },
        { ar: "علامة إقليمية تدخل السعودية", en: "Regional brand entering KSA" },
        { ar: "موزّع B2B / B2C", en: "B2B / B2C distributor" },
      ],
    },
    {
      id: "volume",
      q: { ar: "كم طلبًا تعالج شهريًا تقريبًا؟", en: "Roughly how many orders per month?" },
      multi: false,
      options: [
        { ar: "أقل من 1,000", en: "Under 1,000" },
        { ar: "1,000 – 5,000", en: "1,000 – 5,000" },
        { ar: "5,000 – 20,000", en: "5,000 – 20,000" },
        { ar: "أكثر من 20,000", en: "Over 20,000" },
        { ar: "لم نبدأ بعد", en: "Not live yet" },
      ],
    },
    {
      id: "channels",
      q: { ar: "من أين تأتي طلباتك؟", en: "Where do your orders come from?" },
      multi: true,
      options: [
        { ar: "متجر إلكتروني", en: "Online store" },
        { ar: "تطبيق", en: "App" },
        { ar: "منصات بيع", en: "Marketplaces" },
        { ar: "فروع / تجزئة", en: "Branches / retail" },
        { ar: "طلبات جملة B2B", en: "B2B wholesale" },
      ],
    },
    {
      id: "products",
      q: { ar: "ما نوع منتجاتك؟", en: "What do you sell?" },
      multi: true,
      options: [
        { ar: "أزياء وأحذية", en: "Fashion & footwear" },
        { ar: "جمال وعناية", en: "Beauty & care" },
        { ar: "إلكترونيات", en: "Electronics" },
        { ar: "هدايا", en: "Gifts" },
        { ar: "قطع غيار", en: "Spare parts" },
        { ar: "سلع استهلاكية جافة", en: "Dry FMCG" },
        { ar: "اشتراكات وصناديق", en: "Subscriptions & boxes" },
        { ar: "أخرى", en: "Other" },
      ],
    },
    {
      id: "needs",
      q: { ar: "ما الذي تحتاج أن نتولاه؟", en: "What do you need us to run?" },
      multi: true,
      options: [
        { ar: "التخزين وإدارة المخزون", en: "Warehousing & inventory" },
        { ar: "تنفيذ الطلبات Fulfillment", en: "Fulfillment" },
        { ar: "الربط مع قنوات البيع", en: "Channel integration" },
        { ar: "التوزيع وإدارة الناقلين", en: "Distribution & carriers" },
        { ar: "المرتجعات", en: "Returns" },
        { ar: "تغليف وخدمات مضافة", en: "Packaging & VAS" },
        { ar: "تشغيل مُدار بالكامل", en: "Fully managed operations" },
      ],
    },
  ],
};
