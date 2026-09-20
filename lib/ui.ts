import type { Locale } from "@/content/types";

const dict = {
  startTalk: { ar: "ابدأ محادثة", en: "Start a conversation" },
  requestModel: { ar: "اطلب تصورًا تشغيليًا", en: "Request an operating model" },
  diagnose: { ar: "ابدأ من تشخيص عمليتك", en: "Start with a diagnosis" },
  contact: { ar: "تواصل معنا", en: "Contact us" },
  talkTeam: { ar: "تحدث مع فريق جديان", en: "Talk to the Jedyan team" },
  sendDetails: { ar: "أرسل تفاصيل عملياتك", en: "Send your operation details" },
  explore: { ar: "استكشف الحل", en: "Explore solution" },
  allSolutions: { ar: "كل الحلول", en: "All solutions" },
  menu: { ar: "القائمة", en: "Menu" },
  close: { ar: "إغلاق", en: "Close" },
  switchLang: { ar: "English", en: "العربية" },
  switchLangLabel: { ar: "التبديل إلى الإنجليزية", en: "Switch to Arabic" },
  skip: { ar: "تخطَّ إلى المحتوى", en: "Skip to content" },
  home: { ar: "الرئيسية", en: "Home" },
  rights: { ar: "جميع الحقوق محفوظة", en: "All rights reserved" },
  siteLinks: { ar: "روابط الموقع", en: "Site" },
  reach: { ar: "التواصل", en: "Contact" },
  illustrative: { ar: "تصوّر توضيحي — ليس بيانات حقيقية", en: "Illustrative concept — not live data" },
  scrollHint: { ar: "مرّر لمتابعة الطلب", en: "Scroll to follow the order" },
} as const;

export type UIKey = keyof typeof dict;
export const ui = (k: UIKey, l: Locale) => dict[k][l];
