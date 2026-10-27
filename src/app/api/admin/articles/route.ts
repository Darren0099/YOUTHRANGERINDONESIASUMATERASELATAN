import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/auth";
import { sanitizeArticle } from "@/lib/cms-validate";
import { readArticles, writeArticles, type StagedImage } from "@/lib/cms-store";
import type { Article } from "@/data/berita";

async function guard() {
  return verifySession((await cookies()).get(COOKIE_NAME)?.value);
}

/** Tambah atau ubah berita. Body: { article, originalSlug? } */
export async function POST(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: "Sesi berakhir. Login ulang." }, { status: 401 });
  try {
    const body = (await req.json()) as { article?: unknown; originalSlug?: string; uploads?: unknown };
    const current = await readArticles();
    const result = sanitizeArticle(body.article, current, body.originalSlug);
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

    const art = result.article;
    const files = Array.isArray(body.uploads) ? body.uploads : [];
    if (files.length > 25) return NextResponse.json({ error: "Terlalu banyak foto." }, { status: 400 });
    const imagePaths = new Set([art.cover, ...(art.gallery ?? []).map((g) => g.src)]);
    const uploads: StagedImage[] = [];
    const used = new Set<string>();
    for (const file of files) {
      const data = file as { path?: unknown; sha?: unknown } | null;
      if (
        !data ||
        typeof data.path !== "string" ||
        typeof data.sha !== "string" ||
        !/^\/photos\/uploads\/[a-z0-9._-]+\.(jpg|jpeg|png|webp)$/i.test(data.path) ||
        !/^[0-9a-f]{40}$/i.test(data.sha) ||
        !imagePaths.has(data.path) ||
        used.has(data.path)
      ) {
        return NextResponse.json({ error: "Data unggahan foto tidak valid. Pilih ulang fotonya." }, { status: 400 });
      }
      uploads.push({ path: data.path, sha: data.sha });
      used.add(data.path);
    }

    const isUpdate = Boolean(body.originalSlug) && current.some((a) => a.slug === body.originalSlug);
    if (body.originalSlug && !isUpdate) return NextResponse.json({ error: "Berita yang diedit tidak ditemukan." }, { status: 404 });

    await writeArticles(
      (list: Article[]) => {
        // "Sorotan" hanya boleh satu: hapus tanda dari berita lain
        const base = art.featured ? list.map((a) => ({ ...a, featured: undefined })) : list;
        if (isUpdate) return base.map((a) => (a.slug === body.originalSlug ? art : a));
        return [art, ...base];
      },
      `CMS: ${isUpdate ? "ubah" : "tambah"} berita "${art.title.slice(0, 60)}"`,
      uploads,
    );
    return NextResponse.json({ ok: true, slug: art.slug });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Gagal menyimpan." }, { status: 500 });
  }
}

/** Hapus berita CMS: DELETE /api/admin/articles?slug=... */
export async function DELETE(req: Request) {
  if (!(await guard())) return NextResponse.json({ error: "Sesi berakhir. Login ulang." }, { status: 401 });
  try {
    const slug = new URL(req.url).searchParams.get("slug") ?? "";
    const current = await readArticles();
    if (!current.some((a) => a.slug === slug)) return NextResponse.json({ error: "Berita tidak ditemukan." }, { status: 404 });
    await writeArticles((list) => list.filter((a) => a.slug !== slug), `CMS: hapus berita "${slug}"`);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Gagal menghapus." }, { status: 500 });
  }
}
