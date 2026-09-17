import { notFound } from "next/navigation";
import SolutionPage from "@/components/pages/SolutionPage";
import { solutions } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({ locale: "en", path: `/solutions/${slug}`, title: s.title.en, description: `${s.headline.en} ${s.intro.en}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!solutions.some((x) => x.slug === slug)) notFound();
  return <SolutionPage locale="en" slug={slug} />;
}
