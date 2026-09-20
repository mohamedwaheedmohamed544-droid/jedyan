import type { ReactNode } from "react";
import { currentUser } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  if (!user) return <>{children}</>;
  return (
    <div className="a-shell">
      <AdminNav user={user} />
      <div className="a-main">{children}</div>
    </div>
  );
}
