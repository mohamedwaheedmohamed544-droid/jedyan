import "server-only";
import { redirect } from "next/navigation";
import { currentUser } from "./auth";

export async function guard() {
  const user = await currentUser();
  if (!user) redirect("/admin/login");
  return user;
}
