import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifySession } from "./auth";

/** Dipakai di halaman admin (server component): alihkan ke login bila belum masuk. */
export async function requireAdmin() {
  const ok = verifySession((await cookies()).get(COOKIE_NAME)?.value);
  if (!ok) redirect("/admin/login");
}
