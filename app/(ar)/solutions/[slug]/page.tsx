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
  return pageMeta({ locale: "ar", path: `/solutions/${slug}`, title: s.title.ar, description: `${s.headline.ar} ${s.intro.ar}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!solutions.some((x) => x.slug === slug)) notFound();
  return <SolutionPage locale="ar" slug={slug} />;
}
