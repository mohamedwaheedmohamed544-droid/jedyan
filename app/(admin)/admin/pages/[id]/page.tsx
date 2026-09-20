import { notFound } from "next/navigation";
import { guard } from "@/lib/guard";
import { getPages } from "@/lib/content";
import PageEditor from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  await guard();
  const { id } = await params;
  const page = (await getPages()).find((p) => p.id === id);
  if (!page) notFound();
  return <PageEditor page={page} />;
}
