import type { Locale } from "@/content/types";
import PageHero from "@/components/ui/PageHero";
import CtaBand from "@/components/ui/CtaBand";
import { WhoWeServe, Sectors } from "@/components/home/Audience";
import { ui } from "@/lib/ui";

export default function SectorsPage({ locale }: { locale: Locale }) {
  const L = locale;
  const t = (ar: string, en: string) => (L === "ar" ? ar : en);
  return (
    <>
      <PageHero locale={L} eyebrow="WHO WE SERVE · SECTORS" title={[t("نخدم شركات تُقاس", "We serve companies measured"), t("بقدرتها على التنفيذ.", "by their ability to execute.")]} lead={t("طبيعة المنتج تحدد التغليف، ودورة الطلب تحدد السعة، والموسم يحدد التخطيط.", "The product defines packaging, the order cycle defines capacity, the season defines planning.")} crumbs={[{ href: "/sectors", label: t("القطاعات", "Sectors") }]} />
      <WhoWeServe locale={L} numbered={false} />
      <Sectors locale={L} link={false} numbered={false} />
      <CtaBand locale={L} title={t("قطاعك له تفاصيله. أخبرنا بها.", "Your sector has its details. Tell us about them.")} cta={ui("requestModel", L)} />
    </>
  );
}
