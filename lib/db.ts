import "server-only";

/**
 * Storage layer.
 * Driver is chosen by DATABASE_URL:
 *   - postgres://…  → Postgres (Vercel / Netlify DB / Neon / Supabase / RDS)
 *   - anything else (or unset) → SQLite file at DATABASE_FILE || ./data/jedyan.db  (VPS / local)
 * The schema is intentionally small: JSON documents + a few real tables.
 */

type Row = Record<string, unknown>;

interface Driver {
  query<T = Row>(sql: string, params?: unknown[]): Promise<T[]>;
  exec(sql: string, params?: unknown[]): Promise<void>;
  kind: "sqlite" | "postgres";
}

// Vercel Postgres sets POSTGRES_URL, Netlify DB sets NETLIFY_DATABASE_URL — both are picked up automatically.
const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NETLIFY_DATABASE_URL || "";
const isPg = url.startsWith("postgres://") || url.startsWith("postgresql://");

/** `?` placeholders → `$1, $2 …` for Postgres */
const toPg = (sql: string) => {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
};

let driver: Driver | null = null;

function getDriver(): Driver {
  if (driver) return driver;

  if (isPg) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require("pg") as typeof import("pg");
    const local = /@(localhost|127\.0\.0\.1|\[::1\])[:/]/.test(url);
    const noSsl = local || url.includes("sslmode=disable");
    const pool = new Pool({ connectionString: url, max: 5, ssl: noSsl ? undefined : { rejectUnauthorized: false } });
    driver = {
      kind: "postgres",
      async query<T>(sql: string, params: unknown[] = []) {
        const r = await pool.query(toPg(sql), params as never[]);
        return r.rows as T[];
      },
      async exec(sql: string, params: unknown[] = []) {
        await pool.query(toPg(sql), params as never[]);
      },
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = require("better-sqlite3") as typeof import("better-sqlite3");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs") as typeof import("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path") as typeof import("path");
    const file = process.env.DATABASE_FILE || path.join(process.cwd(), "data", "jedyan.db");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const db = new Database(file);
    db.pragma("journal_mode = WAL");
    driver = {
      kind: "sqlite",
      async query<T>(sql: string, params: unknown[] = []) {
        return db.prepare(sql).all(...(params as never[])) as T[];
      },
      async exec(sql: string, params: unknown[] = []) {
        db.prepare(sql).run(...(params as never[]));
      },
    };
  }
  return driver;
}

export const dbKind = () => getDriver().kind;
export const query = <T = Row>(sql: string, params?: unknown[]) => getDriver().query<T>(sql, params);
export const exec = (sql: string, params?: unknown[]) => getDriver().exec(sql, params);
export const one = async <T = Row>(sql: string, params?: unknown[]) => (await query<T>(sql, params))[0] ?? null;

const JSONB = () => (isPg ? "jsonb" : "text");
const BYTES = () => (isPg ? "bytea" : "blob");
const NOW = () => (isPg ? "now()" : "CURRENT_TIMESTAMP");

let ready: Promise<void> | null = null;

/** Creates the schema on first use (safe to call on every request). */
export function initDb() {
  if (!ready) {
    ready = (async () => {
      const d = getDriver();
      const stmts = [
        `create table if not exists documents (
           key text primary key,
           data ${JSONB()} not null,
           updated_at timestamp default ${NOW()}
         )`,
        `create table if not exists pages (
           id text primary key,
           slug text not null unique,
           status text not null default 'published',
           position integer not null default 0,
           in_nav integer not null default 1,
           data ${JSONB()} not null,
           updated_at timestamp default ${NOW()}
         )`,
        `create table if not exists media (
           id text primary key,
           filename text not null,
           mime text not null,
           size integer not null,
           bytes ${BYTES()} not null,
           alt ${JSONB()},
           created_at timestamp default ${NOW()}
         )`,
        `create table if not exists leads (
           id text primary key,
           created_at timestamp default ${NOW()},
           status text not null default 'new',
           locale text not null default 'ar',
           name text,
           company text,
           email text,
           phone text,
           notes text,
           answers ${JSONB()},
           internal_note text
         )`,
        `create table if not exists users (
           id text primary key,
           email text not null unique,
           name text not null,
           role text not null default 'editor',
           password_hash text not null,
           created_at timestamp default ${NOW()}
         )`,
        `create table if not exists sessions (
           id text primary key,
           user_id text not null,
           expires_at timestamp not null
         )`,
        `create table if not exists revisions (
           id text primary key,
           entity text not null,
           entity_id text not null,
           data ${JSONB()} not null,
           author text,
           created_at timestamp default ${NOW()}
         )`,
      ];
      for (const s of stmts) await d.exec(s);
    })();
  }
  return ready;
}

/* ---------- JSON helpers ----------
   Always send JSON as text: Postgres casts a JSON string into json/jsonb, while passing a
   raw JS array would be encoded as a Postgres array literal and rejected. */
export const enc = (v: unknown) => JSON.stringify(v);
export const dec = <T>(v: unknown, fallback: T): T => {
  if (v == null) return fallback;
  if (typeof v === "string") {
    try { return JSON.parse(v) as T; } catch { return fallback; }
  }
  return v as T;
};

export const uid = (prefix = "") => prefix + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
