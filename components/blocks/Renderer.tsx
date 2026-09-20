"use client";
import type { Locale } from "@/content/types";
import type { Section } from "@/lib/content";
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
import * as B from "./Blocks";

type P = { locale: Locale; b?: Record<string, unknown> };

const REGISTRY: Record<string, (p: P) => React.ReactElement | null> = {
  "hero-flow": ({ locale, b }) => <Hero locale={locale} b={b} />,
  "page-hero": (p) => <B.PageHeroBlock {...p} />,
  "operating-layer": ({ locale, b }) => <OperatingLayer locale={locale} b={b} />,
  "commerce-journey": ({ locale, b }) => <CommerceJourney locale={locale} b={b} />,
  "commerce-cycle": ({ locale, b }) => <CommerceCycle locale={locale} b={b} />,
  "why-exists": ({ locale, b }) => <WhyExists locale={locale} b={b} />,
  "solutions-rail": ({ locale, b }) => <SolutionsRail locale={locale} b={b} />,
  "solutions-index": (p) => <B.SolutionsIndexBlock {...p} />,
  "who-we-serve": ({ locale, b }) => <WhoWeServe locale={locale} b={b} numbered={false} />,
  sectors: ({ locale, b }) => <Sectors locale={locale} b={b} numbered={false} link={b?.showLink !== false} />,
  "how-we-work": ({ locale, b }) => <HowWeWork locale={locale} b={b} />,
  visibility: ({ locale, b }) => <Visibility locale={locale} b={b} />,
  "why-jedyan": ({ locale, b }) => <WhyJedyan locale={locale} b={b} />,
  closing: ({ locale, b }) => <Closing locale={locale} b={b} />,
  "cta-band": (p) => <B.CtaBandBlock {...p} />,
  "about-intro": (p) => <B.AboutIntroBlock {...p} />,
  "operating-layers": (p) => <B.OperatingLayersBlock {...p} />,
  redefinitions: (p) => <B.RedefinitionsBlock {...p} />,
  "quality-list": (p) => <B.QualityBlock {...p} />,
  "star-note": (p) => <B.StarNoteBlock {...p} />,
  "vision-mission": (p) => <B.VisionMissionBlock {...p} />,
  "values-list": (p) => <B.ValuesBlock {...p} />,
  pillars: (p) => <B.PillarsBlock {...p} />,
  rhythm: (p) => <B.RhythmBlock {...p} />,
  "scale-modes": (p) => <B.ScaleModesBlock {...p} />,
  "carrier-visual": (p) => <B.CarrierBlock {...p} />,
  "contact-diagnosis": (p) => <B.ContactBlock {...p} />,
  "rich-text": (p) => <B.RichTextBlock {...p} />,
  "feature-grid": (p) => <B.FeatureGridBlock {...p} />,
  "media-text": (p) => <B.MediaTextBlock {...p} />,
  quote: (p) => <B.QuoteBlock {...p} />,
  gallery: (p) => <B.GalleryBlock {...p} />,
};

export default function Renderer({ sections, locale }: { sections: Section[]; locale: Locale }) {
  return (
    <>
      {sections.filter((s) => s.visible !== false).map((s) => {
        const R = REGISTRY[s.type];
        if (!R) return null;
        return <div key={s.id} id={`section-${s.id}`}>{R({ locale, b: s.props })}</div>;
      })}
    </>
  );
}

export const BLOCK_TYPES = Object.keys(REGISTRY);
