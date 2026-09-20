# نشر موقع جديان + لوحة التحكم — خطوة بخطوة

الموقع يقرأ محتواه من قاعدة بيانات، لذلك يحتاج استضافة تشغّل **Node** (Vercel أو Netlify كلاهما يصلح).
على المنصتين لا يمكن استخدام ملف SQLite — لأن نظام الملفات مؤقت — لذلك **نستخدم قاعدة Postgres مجانية**.

---

## قبل البدء (10 دقائق، مشترك بين المنصتين)

### 1) ارفع المشروع على GitHub
```bash
cd jedyan-web
git init
git add .
git commit -m "Jedyan website + dashboard"
git branch -M main
git remote add origin https://github.com/<حسابك>/jedyan-web.git
git push -u origin main
```
> مجلد `data/` وملف `.env` مستثنيان تلقائيًا من الرفع (في `.gitignore`).

### 2) أنشئ قاعدة بيانات Postgres مجانية
الأسهل: **Neon** (neon.tech) — خطة مجانية تكفي الموقع.
1. سجّل دخول → **Create project** → اسم: `jedyan` → المنطقة: **Frankfurt** أو **AWS me-central (Bahrain)** إن توفرت.
2. انسخ **Connection string**، شكله:
   `postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`

### 3) جهّز متغيرات البيئة الثلاثة
| المتغير | القيمة |
|---|---|
| `DATABASE_URL` | رابط Postgres الذي نسخته |
| `ADMIN_EMAIL` | `info@jedyan.sa` |
| `ADMIN_PASSWORD` | كلمة مرور قوية (ستغيّرها بعد أول دخول) |

---

## أولًا: النشر على Vercel

1. ادخل **vercel.com** → **Add New… → Project** → **Import Git Repository** واختر `jedyan-web`.
2. Vercel سيتعرّف على Next.js تلقائيًا:
   - Framework Preset: **Next.js**
   - Build Command: `npm run build` (اتركه كما هو)
   - Output Directory: اتركه فارغًا — **لا تختر Static**.
3. افتح **Environment Variables** وأضف الثلاثة أعلاه (اختر **All Environments**).
   > إن أنشأت قاعدة البيانات من **Vercel → Storage → Postgres** فسيُضاف `POSTGRES_URL` تلقائيًا، والمشروع يقرأه مباشرة — يكفي حينها `ADMIN_EMAIL` و `ADMIN_PASSWORD`.
4. اضغط **Deploy** وانتظر 2–3 دقائق.
5. افتح رابط الموقع للتأكد، ثم ادخل `https://<your-app>.vercel.app/admin` وسجّل الدخول بالبريد وكلمة المرور.
   (قاعدة البيانات تُنشأ ويُزرع المحتوى تلقائيًا عند أول فتح للموقع.)
6. **غيّر كلمة المرور** من: المستخدمون ← تغيير كلمة المرور.
7. الدومين: **Settings → Domains → Add** واكتب `jedyan.sa` و `www.jedyan.sa`، ثم أضف السجلات التي يعطيك إياها Vercel عند مزوّد الدومين:
   - `A` للجذر → `76.76.21.21`
   - `CNAME` لـ `www` → `cname.vercel-dns.com`
8. بعد ربط الدومين: لوحة التحكم ← **الإعدادات ← رابط الموقع** واكتب `https://jedyan.sa` (يضبط خريطة الموقع والروابط الأساسية).

**نصيحة:** في Vercel ضع المنطقة على **fra1** (موجودة مسبقًا في `vercel.json`) أو أقرب منطقة للسعودية، واجعل قاعدة Neon في نفس المنطقة لتقليل زمن الاستجابة.

---

## ثانيًا: النشر على Netlify

1. ادخل **netlify.com** → **Add new site → Import an existing project** → اختر GitHub ثم `jedyan-web`.
2. إعدادات البناء (موجودة أصلًا في ملف `netlify.toml` داخل المشروع):
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify يفعّل **Next.js Runtime** تلقائيًا (إضافة `@netlify/plugin-nextjs`).
3. **Site configuration → Environment variables → Add a variable** وأضف الثلاثة أعلاه.
   > إن استخدمت **Netlify DB** (Neon المدمج) فسيُضاف `NETLIFY_DATABASE_URL` تلقائيًا، والمشروع يقرأه مباشرة — يكفي حينها إضافة `ADMIN_EMAIL` و `ADMIN_PASSWORD` فقط.
4. **Deploy site** وانتظر البناء.
5. افتح الموقع ثم `/admin` وسجّل الدخول، وغيّر كلمة المرور.
6. الدومين: **Domain management → Add a domain** ثم اتبع سجلات DNS التي يعرضها (عادةً `CNAME` لـ www وسجلات Netlify DNS للجذر).
7. لوحة التحكم ← الإعدادات ← رابط الموقع → `https://jedyan.sa`.

---

## بعد النشر — قائمة تحقق سريعة

- [ ] الصفحة الرئيسية والصفحات الثماني تفتح بالعربية، و `/en` بالإنجليزية.
- [ ] `/admin` يفتح ويسجّل الدخول، وكلمة المرور تغيّرت.
- [ ] أرسل طلبًا تجريبيًا من صفحة **تواصل معنا** وتأكد من ظهوره في **طلبات العملاء**.
- [ ] ارفع صورة في **مكتبة الصور** (الحد 4 ميجابايت للملف).
- [ ] عدّل عنوانًا في الصفحة الرئيسية وتأكد أنه ظهر على الموقع بعد الحفظ.
- [ ] `https://jedyan.sa/sitemap.xml` و `robots.txt` يعملان.
- [ ] احذف المستخدم الافتراضي إن أنشأت حسابًا باسمك، أو غيّر بريده.

## أسئلة شائعة

**هل يمكن النشر على استضافة ملفات ثابتة (مثل استضافة عادية أو GitHub Pages)؟**
لا، ليس مع لوحة التحكم. اللوحة تحتاج Node وقاعدة بيانات. إن أردت ملفات ثابتة فقط، يمكن إعادة تفعيل التصدير الثابت لكن ستفقد اللوحة.

**أين تُحفظ الصور؟**
داخل قاعدة البيانات نفسها، لذلك لا تضيع عند إعادة النشر، وتعمل على المنصتين دون تخزين خارجي.

**كيف أنسخ نسخة احتياطية؟**
نسخة احتياطية من قاعدة Postgres (Neon يوفّرها تلقائيًا)، أو تصدير الطلبات من اللوحة كملف Excel/CSV.

**نسيت كلمة المرور؟**
من أي جهاز فيه المشروع:
```bash
DATABASE_URL="postgresql://..." node scripts/reset-password.mjs info@jedyan.sa "كلمة-جديدة"
```

**تعديل لا يظهر على الموقع؟**
اضغط «حفظ التغييرات» ثم حدّث الصفحة. إن بقي الأمر، أعد النشر من لوحة المنصة (Redeploy) — يحدث فقط إن تغيّرت متغيرات البيئة.
