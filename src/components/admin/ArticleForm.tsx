"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Article, Category } from "@/data/berita";
import { blocksToText, parseBlocks, slugify } from "@/lib/blocks";
import styles from "./admin.module.css";

interface Img {
  path: string;
  alt: string;
  /** URL lokal (blob) untuk pratinjau: gambar baru belum tersedia di server sebelum situs dibangun ulang. */
  preview?: string;
}

/** Perkecil gambar di browser (maks. 1600 px, JPEG) agar muat batas unggah Vercel dan situs tetap ringan. */
async function compress(file: File, maxW = 1600, quality = 0.82): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, maxW / bmp.width);
  const w = Math.round(bmp.width * scale);
  const h = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Browser tidak mendukung pemrosesan gambar.");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(bmp, 0, 0, w, h);
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Gagal memproses gambar."))), "image/jpeg", quality));
}

async function uploadImage(file: File): Promise<{ path: string; preview: string }> {
  const blob = await compress(file);
  const form = new FormData();
  form.append("file", blob, "foto.jpg");
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error ?? "Gagal mengunggah gambar.");
  return { path: json.path as string, preview: URL.createObjectURL(blob) };
}

export default function ArticleForm({ categories, initial }: { categories: Category[]; initial?: Article }) {
  const router = useRouter();
  const editing = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(editing);
  const [category, setCategory] = useState<Category>(initial?.category ?? categories[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [content, setContent] = useState(initial ? blocksToText(initial.blocks) : "");
  const [cover, setCover] = useState<Img | null>(initial ? { path: initial.cover, alt: initial.coverAlt } : null);
  const [gallery, setGallery] = useState<Img[]>(initial?.gallery?.map((g) => ({ path: g.src, alt: g.alt })) ?? []);
  const [info, setInfo] = useState<{ label: string; value: string }[]>(initial?.info ?? []);
  const [instagram, setInstagram] = useState(initial?.instagram ?? "");
  const [featured, setFeatured] = useState(Boolean(initial?.featured));
  const [popular, setPopular] = useState(Boolean(initial?.popular));

  const [uploading, setUploading] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onTitle = (v: string) => {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  };

  async function pick(files: FileList | null, mode: "cover" | "gallery") {
    if (!files?.length) return;
    setError("");
    setUploading((n) => n + files.length);
    for (const file of Array.from(mode === "cover" ? [files[0]] : files)) {
      try {
        const { path, preview } = await uploadImage(file);
        if (mode === "cover") setCover({ path, preview, alt: cover?.alt ?? "" });
        else setGallery((g) => [...g, { path, preview, alt: "" }]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Gagal mengunggah gambar.");
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!cover) return setError("Foto sampul wajib diunggah.");
    if (uploading) return setError("Tunggu sampai unggahan gambar selesai.");
    setSaving(true);
    const article = {
      title,
      slug,
      category,
      excerpt,
      date,
      author,
      cover: cover.path,
      coverAlt: cover.alt,
      blocks: parseBlocks(content),
      gallery: gallery.map((g) => ({ src: g.path, alt: g.alt })),
      info,
      instagram,
      featured,
      popular,
    };
    const res = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ article, originalSlug: initial?.slug }),
    });
    const json = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) return setError(json.error ?? "Gagal menyimpan.");
    router.push(`/admin?saved=${encodeURIComponent(json.slug)}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <section className={styles.card}>
            <h2>Informasi utama</h2>
            <label>
              <span>Judul berita *</span>
              <input value={title} onChange={(e) => onTitle(e.target.value)} required maxLength={200} placeholder="Contoh: Sukses Melaksanakan Program Ajangsana Mengajar" />
            </label>
            <label>
              <span>Slug (alamat halaman) *</span>
              <div className={styles.slug}>
                <i>/berita/</i>
                <input
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  required
                  placeholder="otomatis dari judul"
                />
              </div>
            </label>
            <div className={styles.two}>
              <label>
                <span>Kategori *</span>
                <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Tanggal kegiatan</span>
                <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="23 Maret 2025" />
              </label>
            </div>
            <label>
              <span>Penulis</span>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Nama penulis" maxLength={80} />
            </label>
            <label>
              <span>Ringkasan * (tampil di kartu berita)</span>
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} required maxLength={600} placeholder="1–2 kalimat pembuka berita" />
              <small>{excerpt.length}/600</small>
            </label>
          </section>

          <section className={styles.card}>
            <h2>Isi berita *</h2>
            <textarea
              className={styles.content}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              required
              placeholder={"Tulis paragraf pertama di sini.\n\n## Subjudul\n\nParagraf berikutnya.\n\n> Kutipan menarik | Nama sumber\n\n- Poin pertama\n- Poin kedua"}
            />
            <ul className={styles.help}>
              <li>
                Pisahkan paragraf dengan <b>baris kosong</b>.
              </li>
              <li>
                <code>## Judul</code> membuat subjudul.
              </li>
              <li>
                <code>&gt; kutipan | Sumber</code> membuat kotak kutipan.
              </li>
              <li>
                Baris yang diawali <code>- </code> membuat daftar poin.
              </li>
            </ul>
          </section>

          <section className={styles.card}>
            <h2>Info kegiatan (opsional)</h2>
            <p className={styles.muted}>Tampil di kotak samping artikel, mis. Lokasi, Waktu, Pemateri.</p>
            {info.map((row, i) => (
              <div key={i} className={styles.infoRow}>
                <input value={row.label} onChange={(e) => setInfo((l) => l.map((r, k) => (k === i ? { ...r, label: e.target.value } : r)))} placeholder="Label (Lokasi)" />
                <input value={row.value} onChange={(e) => setInfo((l) => l.map((r, k) => (k === i ? { ...r, value: e.target.value } : r)))} placeholder="Isi (Gedung Dispora Sumsel)" />
                <button type="button" className={styles.mini} onClick={() => setInfo((l) => l.filter((_, k) => k !== i))} aria-label="Hapus baris">
                  ✕
                </button>
              </div>
            ))}
            <button type="button" className={styles.ghostBtn} onClick={() => setInfo((l) => [...l, { label: "", value: "" }])}>
              + Tambah baris info
            </button>
          </section>
        </div>

        <div className={styles.col}>
          <section className={styles.card}>
            <h2>Foto sampul *</h2>
            {cover ? (
              <div className={styles.coverBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cover.preview ?? cover.path} alt="" />
                <button type="button" className={styles.mini} onClick={() => setCover(null)} aria-label="Hapus foto sampul">
                  ✕
                </button>
              </div>
            ) : (
              <label className={styles.drop}>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => pick(e.target.files, "cover")} hidden />
                <b>Pilih foto sampul</b>
                <small>JPG, PNG, atau WebP. Otomatis diperkecil.</small>
              </label>
            )}
            {cover && (
              <label>
                <span>Deskripsi foto (untuk aksesibilitas)</span>
                <input value={cover.alt} onChange={(e) => setCover({ ...cover, alt: e.target.value })} placeholder="Foto bersama peserta kegiatan" />
              </label>
            )}
          </section>

          <section className={styles.card}>
            <h2>Galeri foto (opsional)</h2>
            <p className={styles.muted}>Galeri tampil jika ada minimal 2 foto.</p>
            <div className={styles.thumbs}>
              {gallery.map((g, i) => (
                <div key={g.path} className={styles.thumbItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.preview ?? g.path} alt="" />
                  <input
                    value={g.alt}
                    onChange={(e) => setGallery((l) => l.map((x, k) => (k === i ? { ...x, alt: e.target.value } : x)))}
                    placeholder="Keterangan foto"
                  />
                  <button type="button" className={styles.mini} onClick={() => setGallery((l) => l.filter((_, k) => k !== i))} aria-label="Hapus foto">
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <label className={styles.dropSmall}>
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(e) => pick(e.target.files, "gallery")} hidden />+ Tambah foto galeri
            </label>
          </section>

          <section className={styles.card}>
            <h2>Opsi</h2>
            <label>
              <span>Link postingan Instagram (opsional)</span>
              <input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://www.instagram.com/p/..." />
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
              <span>
                <b>Jadikan Sorotan</b> (tampil besar di halaman Berita; hanya satu berita)
              </span>
            </label>
            <label className={styles.check}>
              <input type="checkbox" checked={popular} onChange={(e) => setPopular(e.target.checked)} />
              <span>
                <b>Tampilkan di Berita Populer</b>
              </span>
            </label>
          </section>

          <section className={`${styles.card} ${styles.preview}`}>
            <h2>Pratinjau kartu</h2>
            <div className={styles.pCard}>
              <span className={styles.pMedia}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {cover ? <img src={cover.preview ?? cover.path} alt="" /> : <em>Foto sampul</em>}
                <i>{category}</i>
              </span>
              <strong>{title || "Judul berita"}</strong>
              <small>{excerpt || "Ringkasan berita akan tampil di sini."}</small>
            </div>
          </section>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.bar}>
        <Link href="/admin" className={styles.ghost}>
          Batal
        </Link>
        <button type="submit" className={styles.primary} disabled={saving || uploading > 0}>
          {uploading > 0 ? "Mengunggah gambar…" : saving ? "Menyimpan…" : editing ? "Simpan perubahan" : "Terbitkan berita"}
        </button>
      </div>
    </form>
  );
}
