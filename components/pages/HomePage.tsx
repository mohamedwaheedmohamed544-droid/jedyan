import type { Locale } from "@/content/types";
import Hero from "@/components/home/Hero";
import OperatingLayer from "@/components/home/OperatingLayer";
import CommerceJourney from "@/components/home/CommerceJourney";
import CommerceCycle from "@/components/home/CommerceCycle";
import WhyExists from "@/components/home/WhyExists";
import SolutionsRail from "@/components/home/SolutionsRail";
import { WhoWeServe, Sectors } from "@/components/home/Audience";
import HowWeWork from "@/components/home/HowWeWork";
import Visibility from "@/components/home/Visibility";
import WhyJedyan from "@/components/home/WhyJedyan";
import Closing from "@/components/home/Closing";

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <OperatingLayer locale={locale} />
      <CommerceJourney locale={locale} />
      <CommerceCycle locale={locale} />
      <WhyExists locale={locale} />
      <SolutionsRail locale={locale} />
      <WhoWeServe locale={locale} />
      <Sectors locale={locale} />
      <HowWeWork locale={locale} />
      <Visibility locale={locale} />
      <WhyJedyan locale={locale} />
      <Closing locale={locale} />
    </>
  );
}
