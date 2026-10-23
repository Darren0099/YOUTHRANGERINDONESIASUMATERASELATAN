import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, SESSION_SECONDS, createSession, isLocked, registerFailure, registerSuccess, verifyCredentials } from "@/lib/auth";

export async function POST(req: Request) {
  const h = await headers();
  const key = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (isLocked(key)) return NextResponse.json({ error: "Terlalu banyak percobaan. Coba lagi dalam 10 menit." }, { status: 429 });

  let body: { username?: string; password?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const ok = verifyCredentials(String(body.username ?? ""), String(body.password ?? ""));
  if (!ok) {
    registerFailure(key);
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Nama atau password salah." }, { status: 401 });
  }

  registerSuccess(key);
  (await cookies()).set(COOKIE_NAME, createSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return NextResponse.json({ ok: true });
}
