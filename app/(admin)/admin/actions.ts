"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser, login, logout, hashPassword, ensureFirstUser } from "@/lib/auth";
import { exec, query, enc, uid, initDb } from "@/lib/db";
import { saveDoc, savePage, deletePage, resetDoc, bumpContent, type PageDoc } from "@/lib/content";

const refresh = () => {
  bumpContent();
  revalidatePath("/", "layout");
};

/* ---------------- auth ---------------- */
export async function loginAction(_: unknown, form: FormData) {
  await ensureFirstUser();
  const email = String(form.get("email") || "");
  const password = String(form.get("password") || "");
  const ok = await login(email, password);
  if (!ok) return { error: "بيانات الدخول غير صحيحة." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

/* ---------------- pages ---------------- */
export async function savePageAction(page: PageDoc) {
  const u = await requireUser();
  await savePage(page, u.email);
  refresh();
  return { ok: true };
}

export async function createPageAction(data: { titleAr: string; titleEn: string; slug: string; template: string }) {
  const u = await requireUser();
  const slug = "/" + data.slug.replace(/^\/|\/$/g, "");
  const templates: Record<string, PageDoc["sections"]> = {
    blank: [],
    standard: [
      { id: uid("s_"), type: "page-hero", visible: true, props: { eyebrow: "JEDYAN", titleLine1: { ar: data.titleAr, en: data.titleEn }, showBlades: true } },
      { id: uid("s_"), type: "rich-text", visible: true, props: { title: { ar: data.titleAr, en: data.titleEn }, body: { ar: "اكتب النص هنا.", en: "Write your text here." }, tone: "white" } },
      { id: uid("s_"), type: "cta-band", visible: true, props: { title: { ar: "لنبدأ من تشخيص عمليتك.", en: "Let's start by diagnosing your operation." }, ctaLabel: { ar: "تواصل معنا", en: "Contact us" }, tone: "graphite" } },
    ],
    service: [
      { id: uid("s_"), type: "page-hero", visible: true, props: { eyebrow: "SERVICE", titleLine1: { ar: data.titleAr, en: data.titleEn }, showBlades: true } },
      { id: uid("s_"), type: "feature-grid", visible: true, props: { title: { ar: "نطاق الخدمة", en: "Service scope" }, items: [], tone: "white" } },
      { id: uid("s_"), type: "media-text", visible: true, props: { title: { ar: "كيف نعمل", en: "How it works" }, body: { ar: "", en: "" }, tone: "paper" } },
      { id: uid("s_"), type: "cta-band", visible: true, props: { title: { ar: "تحدث مع فريق جديان.", en: "Talk to the Jedyan team." }, ctaLabel: { ar: "تواصل معنا", en: "Contact us" }, tone: "graphite" } },
    ],
  };
  const rows = await query<{ n: number }>("select count(*) as n from pages");
  const page: PageDoc = {
    id: uid("pg_"),
    slug,
    status: "draft",
    position: Number(rows[0]?.n || 0) + 1,
    inNav: false,
    title: { ar: data.titleAr, en: data.titleEn || data.titleAr },
    seo: { title: { ar: data.titleAr, en: data.titleEn }, description: { ar: "", en: "" } },
    sections: templates[data.template] || [],
  };
  await savePage(page, u.email);
  refresh();
  redirect(`/admin/pages/${page.id}`);
}

export async function deletePageAction(id: string) {
  await requireUser();
  await deletePage(id);
  refresh();
  return { ok: true };
}

export async function reorderPagesAction(ids: string[]) {
  await requireUser();
  await initDb();
  for (let i = 0; i < ids.length; i++) await exec("update pages set position = ? where id = ?", [i, ids[i]]);
  refresh();
  return { ok: true };
}

/* ---------------- documents (content, settings, theme) ---------------- */
export async function saveDocAction(key: string, data: unknown) {
  const u = await requireUser();
  await saveDoc(key, data, u.email);
  refresh();
  return { ok: true };
}

export async function resetDocAction(key: string) {
  await requireUser();
  await resetDoc(key);
  refresh();
  return { ok: true };
}

/* ---------------- media ---------------- */
export async function uploadMediaAction(form: FormData) {
  await requireUser();
  await initDb();
  const file = form.get("file") as File | null;
  if (!file || !file.size) return { error: "لم يتم اختيار ملف." };
  if (file.size > 4 * 1024 * 1024) return { error: "الحد الأقصى لحجم الملف 4 ميجابايت." };
  const allowed = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/svg+xml", "video/mp4"];
  if (!allowed.includes(file.type)) return { error: "نوع الملف غير مدعوم (PNG, JPG, WEBP, AVIF, SVG, MP4)." };
  const buf = Buffer.from(await file.arrayBuffer());
  const id = uid("m_");
  await exec("insert into media (id, filename, mime, size, bytes, alt) values (?, ?, ?, ?, ?, ?)", [id, file.name, file.type, buf.length, buf, enc({ ar: "", en: "" })]);
  revalidatePath("/admin/media");
  refresh();
  return { ok: true, url: `/api/media/${id}` };
}

export async function deleteMediaAction(id: string) {
  await requireUser();
  await exec("delete from media where id = ?", [id]);
  revalidatePath("/admin/media");
  return { ok: true };
}

/* ---------------- leads ---------------- */
export async function setLeadStatusAction(id: string, status: string) {
  await requireUser();
  await exec("update leads set status = ? where id = ?", [status, id]);
  revalidatePath("/admin/leads");
  return { ok: true };
}

export async function setLeadNoteAction(id: string, note: string) {
  await requireUser();
  await exec("update leads set internal_note = ? where id = ?", [note, id]);
  revalidatePath("/admin/leads");
  return { ok: true };
}

export async function deleteLeadAction(id: string) {
  await requireUser();
  await exec("delete from leads where id = ?", [id]);
  revalidatePath("/admin/leads");
  return { ok: true };
}

/* ---------------- users ---------------- */
export async function createUserAction(data: { email: string; name: string; role: string; password: string }) {
  const me = await requireUser();
  if (me.role !== "admin") return { error: "صلاحية المدير مطلوبة." };
  if (data.password.length < 8) return { error: "كلمة المرور يجب أن تكون 8 أحرف أو أكثر." };
  const exists = await query("select id from users where email = ?", [data.email.toLowerCase()]);
  if (exists.length) return { error: "هذا البريد مسجّل بالفعل." };
  await exec("insert into users (id, email, name, role, password_hash) values (?, ?, ?, ?, ?)", [uid("usr_"), data.email.toLowerCase(), data.name, data.role, hashPassword(data.password)]);
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function deleteUserAction(id: string) {
  const me = await requireUser();
  if (me.role !== "admin") return { error: "صلاحية المدير مطلوبة." };
  if (me.id === id) return { error: "لا يمكنك حذف حسابك الحالي." };
  await exec("delete from sessions where user_id = ?", [id]);
  await exec("delete from users where id = ?", [id]);
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function changePasswordAction(data: { userId: string; password: string }) {
  const me = await requireUser();
  if (me.role !== "admin" && me.id !== data.userId) return { error: "صلاحية المدير مطلوبة." };
  if (data.password.length < 8) return { error: "كلمة المرور يجب أن تكون 8 أحرف أو أكثر." };
  await exec("update users set password_hash = ? where id = ?", [hashPassword(data.password), data.userId]);
  return { ok: true };
}
