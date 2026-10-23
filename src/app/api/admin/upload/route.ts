import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/auth";
import { detectImage } from "@/lib/cms-validate";
import { saveImage } from "@/lib/cms-store";

const MAX = 3.5 * 1024 * 1024; // batas body Vercel ± 4,5 MB

export async function POST(req: Request) {
  if (!verifySession((await cookies()).get(COOKIE_NAME)?.value)) return NextResponse.json({ error: "Sesi berakhir. Login ulang." }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
    if (file.size > MAX) return NextResponse.json({ error: "Ukuran gambar maksimal 3,5 MB." }, { status: 413 });

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = detectImage(buf);
    if (!ext) return NextResponse.json({ error: "Format harus JPG, PNG, atau WebP." }, { status: 415 });

    const name = `${Date.now().toString(36)}-${randomBytes(3).toString("hex")}.${ext}`;
    const publicPath = await saveImage(buf, name);
    return NextResponse.json({ path: publicPath });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Gagal mengunggah." }, { status: 500 });
  }
}
