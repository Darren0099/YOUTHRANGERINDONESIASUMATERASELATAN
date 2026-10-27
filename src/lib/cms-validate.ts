import { baseArticles, categories, type Article, type Block, type Category } from "@/data/berita";
import { slugify } from "./blocks";

const IMG = /^\/photos\/(?:uploads\/)?[A-Za-z0-9._-]+\.(jpg|jpeg|png|webp)$/i;
const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Format lama dari upload sebelumnya masih diterima supaya draft yang terbuka tidak perlu diisi ulang. */
export function normalizeImagePath(input: unknown): string {
  return clip(input, 200).replace(/^\/public(?=\/photos\/uploads\/)/, "");
}

export type Result = { ok: true; article: Article } | { ok: false; error: string };

function cleanBlocks(input: unknown): Block[] {
  if (!Array.isArray(input)) return [];
  const out: Block[] = [];
  for (const b of input.slice(0, 200)) {
    if (!b || typeof b !== "object") continue;
    const t = (b as { type?: string }).type;
    if (t === "h2" || t === "p") {
      const text = clip((b as { text?: string }).text, 5000);
      if (text) out.push({ type: t, text });
    } else if (t === "quote") {
      const text = clip((b as { text?: string }).text, 2000);
      const cite = clip((b as { cite?: string }).cite, 200);
      if (text) out.push(cite ? { type: "quote", text, cite } : { type: "quote", text });
    } else if (t === "list") {
      const items = Array.isArray((b as { items?: unknown[] }).items)
        ? ((b as { items: unknown[] }).items.map((i) => clip(i, 500)).filter(Boolean) as string[])
        : [];
      if (items.length) out.push({ type: "list", items });
    }
  }
  return out;
}

/** Validasi & bersihkan data berita dari formulir admin. */
export function sanitizeArticle(input: unknown, existing: Article[], originalSlug?: string): Result {
  if (!input || typeof input !== "object") return { ok: false, error: "Data tidak valid." };
  const d = input as Record<string, unknown>;

  const title = clip(d.title, 200);
  if (!title) return { ok: false, error: "Judul wajib diisi." };

  const slug = slugify(clip(d.slug, 120) || title);
  if (!slug) return { ok: false, error: "Slug tidak valid." };
  const isBaseArticle = baseArticles.some((a) => a.slug === originalSlug);
  if (isBaseArticle && slug !== originalSlug) {
    return { ok: false, error: "Alamat berita bawaan tidak bisa diubah supaya tautan lama tetap berfungsi." };
  }
  const taken = new Set([
    ...baseArticles.filter((a) => a.slug !== originalSlug).map((a) => a.slug),
    ...existing.filter((a) => a.slug !== originalSlug).map((a) => a.slug),
  ]);
  if (taken.has(slug)) return { ok: false, error: `Slug "${slug}" sudah dipakai berita lain. Ganti slug-nya.` };

  const category = clip(d.category, 30) as Category;
  if (!categories.includes(category)) return { ok: false, error: "Kategori tidak valid." };

  const excerpt = clip(d.excerpt, 600);
  if (!excerpt) return { ok: false, error: "Ringkasan wajib diisi." };

  const cover = normalizeImagePath(d.cover);
  if (!IMG.test(cover)) return { ok: false, error: "Foto sampul wajib diunggah." };

  const blocks = cleanBlocks(d.blocks);
  if (!blocks.length) return { ok: false, error: "Isi berita wajib diisi." };

  const gallery = Array.isArray(d.gallery)
    ? d.gallery
        .slice(0, 24)
        .map((g) => ({ src: normalizeImagePath((g as { src?: string })?.src), alt: clip((g as { alt?: string })?.alt, 200) }))
        .filter((g) => IMG.test(g.src))
        .map((g) => ({ src: g.src, alt: g.alt || title }))
    : [];

  const info = Array.isArray(d.info)
    ? d.info
        .slice(0, 12)
        .map((i) => ({ label: clip((i as { label?: string })?.label, 60), value: clip((i as { value?: string })?.value, 300) }))
        .filter((i) => i.label && i.value)
    : [];

  const instagram = clip(d.instagram, 300);
  if (instagram && !/^https:\/\/(www\.)?instagram\.com\//.test(instagram)) return { ok: false, error: "Link Instagram harus diawali https://www.instagram.com/" };

  const article: Article = {
    slug,
    title,
    category,
    excerpt,
    cover,
    coverAlt: clip(d.coverAlt, 200) || title,
    blocks,
    ...(clip(d.date, 60) ? { date: clip(d.date, 60) } : {}),
    ...(clip(d.author, 80) ? { author: clip(d.author, 80) } : {}),
    ...(d.featured === true ? { featured: true } : {}),
    ...(d.popular === true ? { popular: true } : {}),
    ...(info.length ? { info } : {}),
    ...(gallery.length ? { gallery } : {}),
    ...(instagram ? { instagram } : {}),
  };
  return { ok: true, article };
}

export function detectImage(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf.length > 12 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.length > 12 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buf.length > 12 && buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP") return "webp";
  return null;
}
