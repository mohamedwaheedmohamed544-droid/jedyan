import "server-only";
import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual, randomUUID } from "crypto";
import { initDb, query, exec, one, uid } from "./db";

export type User = { id: string; email: string; name: string; role: "admin" | "editor" };

const COOKIE = "jedyan_session";
const DAY = 24 * 60 * 60 * 1000;

export function hashPassword(pw: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(pw, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const a = Buffer.from(hash, "hex");
  const b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD when the users table is empty. */
export async function ensureFirstUser() {
  await initDb();
  const rows = await query("select id from users limit 1");
  if (rows.length) return;
  const email = (process.env.ADMIN_EMAIL || "admin@jedyan.sa").toLowerCase();
  const pw = process.env.ADMIN_PASSWORD || "jedyan2026";
  await exec("insert into users (id, email, name, role, password_hash) values (?, ?, ?, ?, ?)", [uid("usr_"), email, "Jedyan Admin", "admin", hashPassword(pw)]);
}

export async function login(email: string, password: string) {
  await ensureFirstUser();
  const u = await one<{ id: string; password_hash: string }>("select id, password_hash from users where email = ?", [email.trim().toLowerCase()]);
  if (!u || !verifyPassword(password, u.password_hash)) return null;
  const sid = randomUUID();
  const expires = new Date(Date.now() + 30 * DAY);
  await exec("insert into sessions (id, user_id, expires_at) values (?, ?, ?)", [sid, u.id, expires.toISOString()]);
  const jar = await cookies();
  jar.set(COOKIE, sid, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", expires });
  return u.id;
}

export async function logout() {
  const jar = await cookies();
  const sid = jar.get(COOKIE)?.value;
  if (sid) await exec("delete from sessions where id = ?", [sid]);
  jar.delete(COOKIE);
}

export async function currentUser(): Promise<User | null> {
  await initDb();
  const jar = await cookies();
  const sid = jar.get(COOKIE)?.value;
  if (!sid) return null;
  const row = await one<{ id: string; email: string; name: string; role: string; expires_at: string }>(
    "select u.id, u.email, u.name, u.role, s.expires_at from sessions s join users u on u.id = s.user_id where s.id = ?",
    [sid]
  );
  if (!row) return null;
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await exec("delete from sessions where id = ?", [sid]);
    return null;
  }
  return { id: row.id, email: row.email, name: row.name, role: row.role as User["role"] };
}

export async function requireUser(): Promise<User> {
  const u = await currentUser();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}
