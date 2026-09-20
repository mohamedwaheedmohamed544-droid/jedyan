import { renderMetadata, renderPage } from "@/lib/page-render";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return renderMetadata("en", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return renderPage("en", slug);
}
