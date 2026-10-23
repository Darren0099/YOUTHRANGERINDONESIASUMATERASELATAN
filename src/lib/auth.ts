import { createHash, createHmac, timingSafeEqual } from "crypto";

/**
 * Autentikasi panel admin (sisi server).
 * Kredensial bawaan: user "YRISUMSEL" dengan sandi yang disimpan sebagai HASH (bukan teks asli).
 * Disarankan menggantinya lewat environment variable di Vercel: ADMIN_USER, ADMIN_PASSWORD, ADMIN_SESSION_SECRET.
 */

export const COOKIE_NAME = "yri_admin";
export const SESSION_SECONDS = 60 * 60 * 8;

const DEFAULT_USER = "YRISUMSEL";
const DEFAULT_HASH = "746f12a1addb2e2d6ca451911c8ece54fd2c8a3db73e460b7b2a0f2e6ccb240a";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");
const hashPassword = (user: string, pass: string) => sha(`yri-sumsel-cms:${user}:${pass}`);

function expected() {
  const user = process.env.ADMIN_USER || DEFAULT_USER;
  const hash = process.env.ADMIN_PASSWORD ? hashPassword(user, process.env.ADMIN_PASSWORD) : DEFAULT_HASH;
  return { user, hash };
}

function safeEqual(a: string, b: string) {
  const x = createHash("sha256").update(a).digest();
  const y = createHash("sha256").update(b).digest();
  return timingSafeEqual(x, y);
}

export function verifyCredentials(user: string, pass: string): boolean {
  const e = expected();
  const userOk = safeEqual(user, e.user);
  const passOk = safeEqual(hashPassword(e.user, pass), e.hash);
  return userOk && passOk;
}

function secret() {
  return process.env.ADMIN_SESSION_SECRET || sha(`yri-cms-secret:${expected().hash}`);
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("hex");

export function createSession(): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${exp}.${sign(String(exp))}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < Date.now() / 1000) return false;
  const good = sign(exp);
  return sig.length === good.length && timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}

/** Pembatas percobaan login sederhana (per instance server). */
const attempts = new Map<string, { n: number; until: number }>();

export function isLocked(key: string): boolean {
  const a = attempts.get(key);
  return !!a && a.until > Date.now();
}

export function registerFailure(key: string) {
  const a = attempts.get(key) ?? { n: 0, until: 0 };
  a.n += 1;
  if (a.n >= 5) {
    a.until = Date.now() + 10 * 60 * 1000;
    a.n = 0;
  }
  attempts.set(key, a);
}

export function registerSuccess(key: string) {
  attempts.delete(key);
}
