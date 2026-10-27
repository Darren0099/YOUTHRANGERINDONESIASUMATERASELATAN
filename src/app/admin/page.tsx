import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import DeleteButton from "@/components/admin/DeleteButton";
import styles from "@/components/admin/admin.module.css";
import { baseArticles } from "@/data/berita";
import { describeMode, readArticles } from "@/lib/cms-store";
import { requireAdmin } from "@/lib/guard";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const info = describeMode();

  let items: Awaited<ReturnType<typeof readArticles>> = [];
  const baseSlugs = new Set(baseArticles.map((a) => a.slug));
  let loadError = "";
  if (info.mode !== "none") {
    try {
      items = await readArticles();
    } catch (e) {
      loadError = e instanceof Error ? e.message : "Gagal memuat data.";
    }
  }

  return (
    <div className={styles.shell}>
      <AdminHeader />
      <main className={styles.main}>
        <div className={styles.titleRow}>
          <div>
            <h1>Berita</h1>
            <p className={styles.muted}>Tambah, ubah, atau hapus berita. Halaman berita dibuat otomatis dari data ini.</p>
          </div>
          {info.mode !== "none" && (
            <Link href="/admin/berita/baru" className={styles.primary}>
              + Tambah Berita
            </Link>
          )}
        </div>

        {saved && (
          <div className={styles.success} role="status">
            Berita tersimpan.{" "}
            {info.mode === "github"
              ? "Situs sedang dibangun ulang di Vercel, berita akan tampil di web dalam ± 1–2 menit."
              : "Berita sudah tampil di situs."}{" "}
            <Link href={`/berita/${saved}`}>Lihat halaman berita ↗</Link>
          </div>
        )}

        <div className={`${styles.status} ${info.mode === "none" ? styles.statusBad : ""}`}>
          <strong>Penyimpanan:</strong> {info.label}
          {info.hint && <span> · {info.hint}</span>}
        </div>

        {loadError && <p className={styles.error}>{loadError}</p>}

        <section>
          <h2>Berita dari panel ({items.length})</h2>
          {items.length === 0 ? (
            <p className={styles.empty}>Belum ada berita yang ditambahkan lewat panel. Klik “Tambah Berita” untuk memulai.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((a) => (
                <li key={a.slug} className={styles.row}>
                  <span className={styles.thumb}>
                    {/* Foto baru tampil setelah situs selesai dibangun ulang */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.cover} alt="" loading="lazy" />
                  </span>
                  <span className={styles.rowBody}>
                    <strong>{a.title}</strong>
                    <small>
                      {a.category}
                      {a.date ? ` · ${a.date}` : ""} · /berita/{a.slug}
                      {a.featured ? " · Sorotan" : ""}
                      {a.popular ? " · Populer" : ""}
                    </small>
                  </span>
                  <span className={styles.actions}>
                    <Link href={`/berita/${a.slug}`} className={styles.ghost}>
                      Lihat
                    </Link>
                    <Link href={`/admin/berita/${a.slug}/edit`} className={styles.ghost}>
                      Edit
                    </Link>
                    <DeleteButton slug={a.slug} title={a.title} restoreDefault={baseSlugs.has(a.slug)} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Berita bawaan ({baseArticles.length})</h2>
          <p className={styles.muted}>Berita bawaan sekarang bisa diedit. Perubahan tersimpan di GitHub dan versi aslinya tetap aman.</p>
          <ul className={styles.compact}>
            {baseArticles.map((a) => {
              const updated = items.find((item) => item.slug === a.slug);
              return (
                <li key={a.slug}>
                  <Link href={`/berita/${a.slug}`}>{updated?.title ?? a.title}</Link>
                  <small>{updated ? "Sudah diedit" : a.category}</small>
                  <Link href={`/admin/berita/${a.slug}/edit`} className={styles.ghost}>Edit</Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}
