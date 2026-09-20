import { notFound } from "next/navigation";
import { guard } from "@/lib/guard";
import { getSite } from "@/lib/content";
import { collectionDef } from "@/lib/blocks";
import CollectionEditor from "@/components/admin/CollectionEditor";
import JsonEditor from "@/components/admin/JsonEditor";

export const dynamic = "force-dynamic";

const FREEFORM: Record<string, { title: string; note: string }> = {
  messages: { title: "الرسائل الأساسية للعلامة", note: "كل حقل هنا يظهر في أكثر من مكان على الموقع." },
  foundation: { title: "الرؤية والرسالة والقيم والركائز", note: "تحتاج اعتماد الإدارة قبل النشر." },
  diagnosis: { title: "نموذج التشخيص", note: "الأسئلة والخيارات في صفحة التواصل." },
  whyExists: { title: "لماذا وُجدت جديان", note: "المشكلة، الدور، النتيجة، والجملة الختامية." },
  sectorRule: { title: "قاعدة القطاعات", note: "النص الذي يشرح كيف يختلف التشغيل حسب القطاع." },
};

export default async function CollectionPage({ params }: { params: Promise<{ key: string }> }) {
  await guard();
  const { key } = await params;
  const site = await getSite();
  const data = (site as unknown as Record<string, unknown>)[key];
  const def = collectionDef(key);
  if (def) return <CollectionEditor def={def} items={(data as Record<string, unknown>[]) || []} />;
  if (FREEFORM[key]) return <JsonEditor dataKey={key} title={FREEFORM[key].title} note={FREEFORM[key].note} value={data} />;
  notFound();
}
