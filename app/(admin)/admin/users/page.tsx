import { guard } from "@/lib/guard";
import { initDb, query } from "@/lib/db";
import UsersManager from "@/components/admin/UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const me = await guard();
  await initDb();
  const users = await query<{ id: string; email: string; name: string; role: string; created_at: string }>(
    "select id, email, name, role, created_at from users order by created_at asc"
  );
  return <UsersManager users={users} me={me} />;
}
