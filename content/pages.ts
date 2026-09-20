import type { T } from "./types";

/** Default page + section structure. Seeded into the database on first run; edited from /admin afterwards. */
export type SeedSection = { id: string; type: string; visible: boolean; props: Record<string, unknown> };
export type SeedPage = {
  id: string;
  slug: string;
  status: "published" | "draft";
  position: number;
  inNav: boolean;
  title: T;
  seo: { title: T; description: T };
  sections: SeedSection[];
};

const t = (ar: string, en: string): T => ({ ar, en });
let n = 0;
const s = (type: string, props: Record<string, unknown> = {}, visible = true): SeedSection => ({ id: `s${++n}`, type, visible, props });

export const defaultPages: SeedPage[] = [
  {
    id: "home",
    slug: "/",
    status: "published",
    position: 0,
    inNav: true,
    title: t("الرئيسية", "Home"),
    seo: {
      title: t("نُحرّك الأعمال — منظومة تشغيل التجارة", "We move business — Commerce Operations"),
      description: t(
        "جديان للخدمات اللوجستية: شريك منظومة تشغيل التجارة في السعودية — التخزين وإدارة المخزون، تنفيذ الطلبات، ربط التجارة الإلكترونية، التوزيع وإدارة الناقلين، والمرتجعات، تحت مسؤولية تشغيلية واحدة.",
        "Jedyan Logistics is a Saudi commerce operations partner — warehousing & inventory, fulfillment, commerce connect, distribution & carrier management, and returns, under one operating accountability."
      ),
    },
    sections: [
      s("hero-flow", {
        eyebrow: "COMMERCE OPERATIONS · KSA",
        line1: t("نُحرّك ما هو أكبر من البضائع.", "We move more than goods."),
        line2: t("نُحرّك الأعمال.", "We move business."),
        support: t("شركة سعودية تقدّم حلولًا تشغيلية متكاملة — التخزين، وتجهيز الطلبات، والتغليف، وإدارة التوزيع، والمرتجعات — لتشغّل الشركات تجارتها بكفاءة وقابلية أعلى للتوسع.", "A Saudi company delivering integrated operations — warehousing, order fulfillment, packaging, distribution management and returns — so businesses run their commerce efficiently and scale with confidence."),
        primaryLabel: t("اطلب تصورًا تشغيليًا", "Request an operating model"),
        primaryHref: "/contact",
        secondaryLabel: t("شاهد كيف نعمل", "See how we work"),
        secondaryHref: "/how-we-work",
      }),
      s("operating-layer", { eyebrow: "01 · OPERATING LAYER", title: t("جديان تدير ما يحدث بين الطلب ووصوله.", "Jedyan runs everything that happens between an order and its arrival."), lead: t("القيمة ليست في توفر كل خدمة على حدة، بل في ترابطها وإدارتها تحت مسؤولية تشغيلية واحدة.", "The value isn't in each service on its own — it's in connecting them and running them under one operating accountability.") }),
      s("commerce-journey", { title: t("من دخول البضاعة حتى إغلاق الطلب — رحلة تشغيل واحدة.", "From goods-in to order closure — one operating journey.") }),
      s("commerce-cycle", {
        eyebrow: "02 · COMMERCE OPERATIONS CYCLE",
        title: t("الطلب لا يبدأ من المستودع — لكنه لا يكتمل بدونه.", "Demand doesn't start in the warehouse — but it can't be completed without it."),
        lead: t("لا نُدير خدمات منفصلة؛ بل نربط طلب السوق بالمخزون والتنفيذ والتوزيع والمرتجعات والبيانات ضمن دورة تشغيل واحدة تحافظ على استمرارية الطلب وتدعم قرارات النمو.", "We don't run separate services. We connect market demand to inventory, fulfillment, distribution, returns and data in one operating cycle that keeps demand flowing and supports growth decisions."),
        closing: t("البيانات تُغلق دورة التشغيل، وتهيّئ القرار للطلب التالي.", "Data closes the operating cycle and prepares the decision for the next order."),
      }),
      s("why-exists", { eyebrow: "03 · WHY JEDYAN EXISTS", title: t("وُجدت جديان لتمنح الشركات جاهزية لوجستية دون الحاجة إلى بناء منظومة تشغيل كاملة داخلها.", "Jedyan exists to give businesses logistics readiness without building a full operating system in-house.") }),
      s("solutions-rail", {
        eyebrow: "04 · OUR SOLUTIONS",
        title: t("ستة محاور تبني رحلة واحدة.", "Six pillars, one journey."),
        lead: t("العميل لا يشتري ستة عقود — يشتري نتيجة واحدة مصمّمة من ستة محاور.", "Clients don't buy six contracts — they buy one outcome designed from six pillars."),
      }),
      s("who-we-serve", {
        eyebrow: "05 · WHO WE SERVE",
        title: t("نخدم شركات تُقاس بقدرتها على التنفيذ.", "We serve companies measured by their ability to execute."),
        lead: t("لكل شريحة نموذج تشغيلي مختلف؛ لذلك نصمّم الحل وفق طبيعة الطلب والقنوات والحجم ومستوى التعقيد — لا وفق قالب واحد للجميع.", "Each segment runs a different operating model, so we design around order profile, channels, volume and complexity — not one template for all."),
      }),
      s("sectors", {
        eyebrow: "06 · SECTORS WE OPERATE FOR",
        title: t("القطاع لا يغيّر المبدأ — يغيّر التفاصيل.", "The sector doesn't change the principle — it changes the details."),
        showLink: true,
      }),
      s("how-we-work", {
        eyebrow: "07 · HOW WE WORK",
        title: t("من التشخيص إلى التوسّع — رحلة واحدة بست محطات.", "From diagnosis to scale — one journey, six stations."),
        lead: t("لا نبدأ بالسعر. نبدأ بفهم شكل الطلب، لأن التسعير الصحيح نتيجة تشخيص صحيح.", "We don't start with price. We start by understanding your orders — correct pricing is the result of a correct diagnosis."),
      }),
      s("visibility", {
        eyebrow: "08 · TECHNOLOGY & VISIBILITY",
        title: t("ما لا يمكن رؤيته، لا يمكن إدارته.", "What can't be seen can't be managed."),
        lead: t("نستخدم أنظمة تشغيل وتقارير تجعل حالة المخزون والطلب معلومة قبل أن تُطلب. الإفصاح الاستباقي: نقول ما نعرفه قبل أن يُسأل عنه.", "We use operating systems and reporting that make stock and order status known before anyone asks. Proactive disclosure: we say what we know before we're asked."),
      }),
      s("why-jedyan", { eyebrow: "09 · WHY JEDYAN", title: t("ستة أسباب تجعل جديان شريك تشغيل يُعتمد عليه.", "Six reasons Jedyan is an operating partner you can rely on.") }),
      s("closing", {
        eyebrow: "10 · READINESS",
        titleLine1: t("جاهزيةٌ", "Readiness"),
        titleLine2: t("تُبنى عليها الأعمال.", "businesses are built on."),
        promise: t("لن تضطرّ إلى تأجيل نموّك بسبب عملياتك.", "You will never have to postpone growth because of your operations."),
        ctaText: t("لنبدأ من تشخيص عمليتك.", "Let's start by diagnosing your operation."),
        primaryLabel: t("ابدأ من تشخيص عمليتك", "Start with a diagnosis"),
        secondaryLabel: t("أرسل تفاصيل عملياتك", "Send your operation details"),
      }),
    ],
  },

  {
    id: "about",
    slug: "/about",
    status: "published",
    position: 1,
    inNav: true,
    title: t("من نحن", "About"),
    seo: {
      title: t("من نحن", "About Jedyan"),
      description: t("شركة سعودية تدير ما يحدث بين الطلب ووصوله: طبقة تشغيل موحّدة للمخزون والطلب والحركة والبيانات.", "A Saudi company running everything between an order and its arrival: one operating layer for inventory, orders, movement and data."),
    },
    sections: [
      s("page-hero", { eyebrow: "ABOUT JEDYAN", titleLine1: t("جديان تدير ما يحدث", "Jedyan runs everything that happens"), titleLine2: t("بين الطلب ووصوله.", "between an order and its arrival."), lead: t("شركة سعودية تقدّم حلولًا تشغيلية متكاملة — التخزين، وتجهيز الطلبات، والتغليف، وإدارة التوزيع، والمرتجعات.", "A Saudi company delivering integrated operations — warehousing, fulfillment, packaging, distribution and returns."), showBlades: true }),
      s("about-intro", {}),
      s("operating-layers", {
        eyebrow: "CATEGORY",
        title: t("شريك منظومة تشغيل التجارة", "Commerce Operations Infrastructure Partner"),
        lead: t("لسنا «شركة تخزين» لأن التخزين عنصر داخل العملية. ولسنا «شركة شحن» لأن الشبكات يمكن شراؤها؛ أما مسؤولية الطلب من المخزون إلى التسليم فهي القيمة الأعلى.", "We aren't a \"storage company\", because storage is one element of the process. We aren't a \"shipping company\", because networks can be bought; accountability for the order from stock to delivery is the higher value."),
        note: t("حين تُدار الطبقات الأربع تحت مسؤولية واحدة، يصبح التشغيل أكثر وضوحًا، والنتيجة أكثر قابلية للقياس والتنفيذ.", "When the four layers are run under one accountability, operations become clearer and results more measurable."),
      }),
      s("redefinitions", { eyebrow: "BRAND PHILOSOPHY", title: t("ثلاث إعادات تعريف تحكم كيف تفكّر جديان.", "Three redefinitions govern how Jedyan thinks.") }),
      s("quality-list", {
        eyebrow: "QUALITY & COMPLIANCE",
        title: t("الانضباط ليس إجراءً إضافيًا — بل شرط استمرار.", "Discipline isn't an extra step — it's a condition for continuity."),
        lead: t("نلتزم بإجراءات تشغيل تتوافق مع الأنظمة المعمول بها في المملكة، وتحمي البضاعة والعلاقة معًا.", "We follow operating procedures aligned with the Kingdom's regulations, protecting both the goods and the relationship."),
      }),
      s("star-note", {}),
      s("cta-band", {
        title: t("تحدّث مع فريق جديان.", "Talk to the Jedyan team."),
        text: t("أرسل لنا شكل طلبك وأصنافك وقنواتك، ونعود إليك بتصوّر تشغيلي أولي.", "Send us your order profile, SKUs and channels, and we'll come back with an initial operating model."),
        ctaLabel: t("تحدث مع فريق جديان", "Talk to the Jedyan team"),
        tone: "graphite",
      }),
    ],
  },

  {
    id: "solutions",
    slug: "/solutions",
    status: "published",
    position: 2,
    inNav: true,
    title: t("حلولنا", "Solutions"),
    seo: {
      title: t("حلولنا اللوجستية", "Logistics solutions"),
      description: t("ستة محاور تبني رحلة واحدة: التخزين وإدارة المخزون، تنفيذ الطلبات، ربط التجارة الإلكترونية، التوزيع وإدارة الناقلين، المرتجعات والخدمات المضافة، والتشغيل المؤسسي المُدار.", "Six pillars, one journey: warehousing & inventory, fulfillment, commerce connect, distribution & carrier management, returns & VAS, and enterprise managed logistics."),
    },
    sections: [
      s("page-hero", {
        showBlades: true,
        eyebrow: "OUR SOLUTIONS",
        titleLine1: t("ستة محاور", "Six pillars."),
        titleLine2: t("تبني رحلة واحدة.", "One journey."),
        lead: t("العميل لا يشتري ستة عقود — يشتري نتيجة واحدة مصمّمة من ستة محاور. نُنظّم الخدمات حسب رحلة الطلب، لا حسب الإدارات الداخلية.", "Clients don't buy six contracts — they buy one outcome designed from six pillars. Services follow the order's journey, not our internal departments."),
      }),
      s("solutions-index", {}),
      s("cta-band", { title: t("كل عملية مختلفة. نبدأ بفهم عمليتك.", "Every operation is different. We start by understanding yours."), ctaLabel: t("ابدأ من تشخيص عمليتك", "Start with a diagnosis"), tone: "graphite" }),
    ],
  },

  {
    id: "how-we-work",
    slug: "/how-we-work",
    status: "published",
    position: 3,
    inNav: true,
    title: t("كيف نعمل", "How we work"),
    seo: {
      title: t("كيف نعمل", "How we work"),
      description: t("رحلة تشغيل التجارة من الاستلام حتى التقارير، ورحلة العميل من التشخيص إلى التوسع، وإيقاع تشغيلي متفق عليه.", "The commerce operations journey from inbound to reporting, the client journey from diagnosis to scale, and an agreed operating rhythm."),
    },
    sections: [
      s("page-hero", {
        showBlades: true,
        eyebrow: "HOW WE WORK",
        titleLine1: t("إيقاع تشغيلي متفق عليه —", "An agreed operating rhythm —"),
        titleLine2: t("لا مبادرات متفرقة.", "not scattered initiatives."),
        lead: t("نُدير رحلة الطلب كسلسلة مترابطة؛ كل مرحلة تؤثر فيما بعدها، لذلك تُحسم الكفاءة عند نقاط الانتقال بين المراحل بقدر ما تُحسم داخل كل مرحلة.", "We run the order journey as a connected chain; each stage affects the next, so efficiency is decided at the hand-offs as much as within each stage."),
      }),
      s("commerce-journey", { title: t("من دخول البضاعة حتى إغلاق الطلب — رحلة تشغيل واحدة.", "From goods-in to order closure — one operating journey.") }),
      s("how-we-work", {
        eyebrow: "CLIENT JOURNEY",
        title: t("من التشخيص إلى التوسّع — رحلة واحدة بست محطات.", "From diagnosis to scale — one journey, six stations."),
        lead: t("لا نبدأ بالسعر. نبدأ بفهم شكل الطلب، لأن التسعير الصحيح نتيجة تشخيص صحيح.", "We don't start with price. We start by understanding your orders — correct pricing is the result of a correct diagnosis."),
      }),
      s("carrier-visual", {
        eyebrow: "CARRIER MANAGEMENT",
        title: t("لا نملك الطريق — نملك القرار على مساره.", "We don't own the road — we own the decision on its route."),
        lead: t("اختر حالة لترى كيف يُتخذ القرار: من يشحن، وبأي مستوى خدمة، وما الإجراء إذا تعثّر التسليم.", "Pick a scenario to see how the decision is made: who ships, at what service level, and what happens if delivery fails."),
      }),
      s("rhythm", {
        eyebrow: "OPERATING RHYTHM",
        title: t("ما يُتابع يوميًا، وما يُراجع دوريًا، وما يُقرّر معًا.", "What's tracked daily, reviewed periodically, and decided together."),
        note: t("المهم ليس عدد الاجتماعات — بل أن يعرف الطرفان الحقيقة نفسها في الوقت نفسه.", "What matters isn't the number of meetings — it's both sides knowing the same truth at the same time."),
      }),
      s("scale-modes", {
        eyebrow: "SCALABILITY & FLEXIBILITY",
        title: t("العملية التي تعمل اليوم يجب أن تستوعب نمو الغد.", "The process that works today must absorb tomorrow's growth."),
        lead: t("صُمّم النموذج التشغيلي على الصعود لا على الوزن: تتحرك السعة مع الطلب على مدى الشهر.", "The operating model is designed for the climb: capacity moves with demand across the month."),
        note: t("التوسّع لا يعني بناء عملية جديدة — بل تمديد العملية نفسها.", "Scaling doesn't mean building a new operation — it means extending the same one."),
      }),
      s("cta-band", { title: t("أرسل تفاصيل عملياتك.", "Send us your operation details."), text: t("لا نبدأ بالسعر. نبدأ بفهم شكل الطلب.", "We don't start with price. We start by understanding your orders."), ctaLabel: t("أرسل تفاصيل عملياتك", "Send your operation details"), tone: "graphite" }),
    ],
  },

  {
    id: "sectors",
    slug: "/sectors",
    status: "published",
    position: 4,
    inNav: true,
    title: t("القطاعات", "Sectors"),
    seo: {
      title: t("القطاعات ومن نخدم", "Sectors & clients"),
      description: t("نخدم الحسابات المؤسسية والمتاجر الإلكترونية والعلامات الرقمية وبائعي المنصات، في قطاعات الأزياء والجمال والإلكترونيات والهدايا وقطع الغيار وغيرها.", "We serve enterprise accounts, e-commerce, digital brands and marketplace sellers across fashion, beauty, electronics, gifts, spare parts and more."),
    },
    sections: [
      s("page-hero", {
        showBlades: true,
        eyebrow: "WHO WE SERVE · SECTORS",
        titleLine1: t("نخدم شركات تُقاس", "We serve companies measured"),
        titleLine2: t("بقدرتها على التنفيذ.", "by their ability to execute."),
        lead: t("طبيعة المنتج تحدد التغليف، ودورة الطلب تحدد السعة، والموسم يحدد التخطيط.", "The product defines packaging, the order cycle defines capacity, the season defines planning."),
      }),
      s("who-we-serve", { eyebrow: "WHO WE SERVE", title: t("نخدم شركات تُقاس بقدرتها على التنفيذ.", "We serve companies measured by their ability to execute."), lead: t("لكل شريحة نموذج تشغيلي مختلف؛ لذلك نصمّم الحل وفق طبيعة الطلب والقنوات والحجم ومستوى التعقيد.", "Each segment runs a different operating model, so we design around order profile, channels, volume and complexity.") }),
      s("sectors", { eyebrow: "SECTORS WE OPERATE FOR", title: t("القطاع لا يغيّر المبدأ — يغيّر التفاصيل.", "The sector doesn't change the principle — it changes the details."), showLink: false }),
      s("cta-band", { title: t("قطاعك له تفاصيله. أخبرنا بها.", "Your sector has its details. Tell us about them."), ctaLabel: t("اطلب تصورًا تشغيليًا", "Request an operating model"), tone: "graphite" }),
    ],
  },

  {
    id: "why-jedyan",
    slug: "/why-jedyan",
    status: "published",
    position: 5,
    inNav: true,
    title: t("لماذا جديان", "Why Jedyan"),
    seo: {
      title: t("لماذا جديان", "Why Jedyan"),
      description: t("ستة أسباب تجعل جديان شريك تشغيل يُعتمد عليه: السياق السعودي، الانضباط التشغيلي، المرونة، الأداء القابل للقياس، التوسع، والشراكة طويلة المدى.", "Six reasons Jedyan is a reliable operating partner: Saudi context, operational discipline, flexibility, measurable performance, scalability and long-term partnership."),
    },
    sections: [
      s("page-hero", {
        showBlades: true,
        eyebrow: "WHY JEDYAN",
        titleLine1: t("شريك تشغيل", "An operating partner"),
        titleLine2: t("يُعتمد عليه.", "you can rely on."),
        lead: t("الفرق بين مزوّد خدمة وشريك تشغيل هو موقع المسؤولية: من يملك القرار حين يتغيّر الواقع.", "The difference between a service provider and an operating partner is where accountability sits: who owns the decision when reality changes."),
      }),
      s("why-jedyan", { eyebrow: "SIX REASONS", title: t("ستة أسباب تجعل جديان شريك تشغيل يُعتمد عليه.", "Six reasons Jedyan is an operating partner you can rely on.") }),
      s("pillars", { eyebrow: "FOUR PILLARS", title: t("أربعة أسباب مختلفة لشراء الأساس التشغيلي نفسه.", "Four different reasons to buy the same operating foundation."), tone: "graphite" }),
      s("visibility", { eyebrow: "TECHNOLOGY & VISIBILITY", title: t("ما لا يمكن رؤيته، لا يمكن إدارته.", "What can't be seen can't be managed."), lead: t("نستخدم أنظمة تشغيل وتقارير تجعل حالة المخزون والطلب معلومة قبل أن تُطلب.", "We use operating systems and reporting that make stock and order status known before anyone asks.") }),
      s("cta-band", { title: t("لنبدأ من تشخيص عمليتك.", "Let's start by diagnosing your operation."), ctaLabel: t("ابدأ من تشخيص عمليتك", "Start with a diagnosis"), tone: "tint" }),
    ],
  },

  {
    id: "vision",
    slug: "/vision",
    status: "published",
    position: 6,
    inNav: true,
    title: t("رؤية جديان", "Vision"),
    seo: {
      title: t("رؤية جديان", "Jedyan vision"),
      description: t("رؤية جديان ورسالتها وقيمها: أن نصبح النقطة الثابتة التي تبني عليها الشركات السعودية خططها للنمو.", "Jedyan's vision, mission and values: to become the fixed point Saudi companies build their growth plans on."),
    },
    sections: [
      s("page-hero", { eyebrow: "JEDYAN VISION", titleLine1: t("الثبات", "The stability"), titleLine2: t("الذي يُحرّك.", "that moves."), useLead: "star" }),
      s("vision-mission", { note: t("الرؤية لا تقول «الأكبر» ولا «الرائدة». تقول «الثابتة» — لأن الريادة تُدّعى، أما الثبات فيُختبر.", "The vision doesn't say \"largest\" or \"leading\". It says \"fixed\" — because leadership is claimed, stability is tested.") }),
      s("values-list", { eyebrow: "VALUES", title: t("خمس قيم مكتوبة كسلوك — لا كصفات.", "Five values written as behaviour — not adjectives.") }),
      s("pillars", {
        eyebrow: "BRAND PILLARS",
        useTitle: "essence",
        lead: t("الجاهزية هنا ليست استعدادًا عامًا؛ هي قدرة قابلة للقياس على استقبال المخزون، واستيعاب الطلب، وتنفيذ الأمر، وتوجيه الشحنة، وإغلاق الاستثناء — دون أن يضطر العميل إلى بناء ذلك بنفسه.", "Readiness here isn't general preparedness; it's a measurable capability to receive stock, absorb demand, execute the order, route the shipment and close the exception — without the client having to build it themselves."),
        tone: "graphite",
      }),
      s("cta-band", { useTitle: "essence", text: t("لنبدأ من تشخيص عمليتك.", "Let's start by diagnosing your operation."), ctaLabel: t("ابدأ من تشخيص عمليتك", "Start with a diagnosis"), tone: "tint" }),
    ],
  },

  {
    id: "contact",
    slug: "/contact",
    status: "published",
    position: 7,
    inNav: true,
    title: t("تواصل معنا", "Contact"),
    seo: {
      title: t("تواصل معنا — ابدأ من تشخيص عمليتك", "Contact — start with a diagnosis"),
      description: t("أرسل شكل طلبك وأصنافك وقنواتك، ونعود إليك بتصوّر تشغيلي أولي. info@jedyan.sa", "Share your order profile, SKUs and channels and we'll come back with an initial operating model. info@jedyan.sa"),
    },
    sections: [s("contact-diagnosis", {
      eyebrow: "CONTACT · DIAGNOSIS",
      title: t("لنبدأ من تشخيص عمليتك.", "Let's start by diagnosing your operation."),
      sub: t("أرسل لنا شكل طلبك وأصنافك وقنواتك، ونعود إليك بتصوّر تشغيلي أولي. لا نبدأ بالسعر — نبدأ بفهم شكل الطلب.", "Share your order profile, SKUs and channels, and we'll come back with an initial operating model. We don't start with price — we start by understanding your orders."),
      steps: [
        t("نراجع شكل طلبك وقنواتك", "We review your order profile and channels"),
        t("جلسة تشخيص مع فريق التشغيل", "A diagnosis session with operations"),
        t("تصوّر تشغيلي أولي: العملية، السعة، التسعير", "An initial model: process, capacity, pricing"),
      ],
    })],
  },
];
