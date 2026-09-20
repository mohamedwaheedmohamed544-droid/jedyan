#!/usr/bin/env node
/**
 * Resets (or creates) a dashboard user from the command line.
 *   node scripts/reset-password.mjs admin@jedyan.sa "new-password"
 * Works with the SQLite file (default) or DATABASE_URL for Postgres.
 */
import { randomBytes, scryptSync } from "crypto";

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error("Usage: node scripts/reset-password.mjs <email> <password>");
  process.exit(1);
}
const hash = (pw) => {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(pw, salt, 64).toString("hex")}`;
};
const id = "usr_" + randomBytes(5).toString("hex");
const url = process.env.DATABASE_URL || "";

if (url.startsWith("postgres")) {
  const { Pool } = await import("pg");
  const pool = new Pool({ connectionString: url });
  const r = await pool.query("update users set password_hash = $1 where email = $2", [hash(password), email.toLowerCase()]);
  if (!r.rowCount) await pool.query("insert into users (id, email, name, role, password_hash) values ($1,$2,$3,'admin',$4)", [id, email.toLowerCase(), email, hash(password)]);
  await pool.end();
} else {
  const { default: Database } = await import("better-sqlite3");
  const file = process.env.DATABASE_FILE || "data/jedyan.db";
  const db = new Database(file);
  const r = db.prepare("update users set password_hash = ? where email = ?").run(hash(password), email.toLowerCase());
  if (!r.changes) db.prepare("insert into users (id, email, name, role, password_hash) values (?,?,?,'admin',?)").run(id, email.toLowerCase(), email, hash(password));
}
console.log(`✓ Password updated for ${email}`);
