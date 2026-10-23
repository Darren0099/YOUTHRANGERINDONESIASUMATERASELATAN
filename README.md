# Youth Ranger Indonesia Sumatera Selatan (YRI Sumsel)

Website profil organisasi **Youth Ranger Indonesia Sumatera Selatan**, dibangun ulang dari HTML/CSS/JS menjadi **Next.js (App Router) + React + TypeScript + CSS Modules**.

Tampilan tetap memakai identitas YRI (ungu, oranye/kuning, merah muda, font Telegraf dan Haffer, motif songket), dengan hero baru, halaman berita modern, dan animasi halus di semua halaman.

## Halaman

| Route | Isi | Pengganti file lama |
| --- | --- | --- |
| `/` | Landing page utama | `index.html` |
| `/program` | Landing page kedua (program & kegiatan) | `YRI2/index.html` |
| `/berita` | Semua berita, filter kategori, pencarian, populer, pengumuman, agenda | `News.html` |
| `/berita/[slug]` | Detail satu berita, data dari `src/data/berita.ts` | `Berita/ajangsanamengajar/index.html` |
| `/galeri` | Galeri foto dengan lightbox | `gallery.html` |
| 404 | Halaman tidak ditemukan | `error.html` |

Daftar lengkap file lama dan padanannya ada di [`docs/PETA-FILE-LAMA-KE-BARU.md`](docs/PETA-FILE-LAMA-KE-BARU.md).

## Fitur

- **Hero baru** di landing (full-width): kolase foto, potret cutout, stiker, dan teks raksasa berjalan. Hero halaman Program memakai foto staff berbentuk kapsul berwarna.
- **Preloader** singkat (sekali per sesi), animasi **fade in up** saat scroll di semua section, dan animasi masuk setiap halaman. Menghormati pengaturan "reduce motion".
- **Berita modern**: sorotan utama, filter kategori, pencarian, kartu berita, dan kotak Populer/Pengumuman/Agenda.
- **Detail berita**: progress membaca, info kegiatan, tombol bagikan, galeri dengan lightbox, dan berita terkait.
- **Instagram**: 3 postingan terbaru (embed resmi) plus kartu akun `@youthranger.sumsel` dan event utama `@summitofstarsyri`.
- **Responsif** untuk ponsel, tablet, dan desktop.

## Panel admin berita (CMS)

`/admin` memungkinkan menambah/mengubah/menghapus berita (judul, isi, foto sampul, galeri) tanpa edit kode. Data disimpan lewat commit otomatis ke GitHub sehingga cocok untuk Vercel. Tombol **Add News!** ada di halaman Berita. Panduan lengkap dan pengaturan variabel: [`docs/CMS-PANEL-ADMIN.md`](docs/CMS-PANEL-ADMIN.md).

## Menjalankan

Butuh Node.js 18.18 atau lebih baru (disarankan 20+).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produksi
npm start
```

## Mengubah konten (semua di `src/data/`)

| File | Isi |
| --- | --- |
| `site.ts` | Kontak, link, navigasi, **kode postingan Instagram**, mitra, FAQ |
| `berita.ts` | Berita bawaan (satu objek = satu halaman), pengumuman, agenda. Berita dari panel admin ada di `berita.custom.json` |
| `program.ts` | Program unggulan, benefit, statistik |

### Mengganti 3 postingan Instagram
Buka link postingan, ambil kode di antara `/p/` dan `/`, lalu ganti di `instagramPosts` pada `src/data/site.ts`.
Contoh: `https://www.instagram.com/p/DYFH1XliVMG/` menjadi `{ code: "DYFH1XliVMG" }`.

### Menambah berita baru
1. Taruh foto di `public/photos/`.
2. Tambahkan satu objek di `articles` pada `src/data/berita.ts` (`slug`, `title`, `category`, `excerpt`, `cover`, `blocks`, dan opsional `gallery`, `info`, `date`, `author`).
3. Halaman `/berita/<slug>` otomatis tersedia dan muncul di daftar berita.

## Struktur

```
src/
├─ app/                  Halaman (page.tsx) + CSS halaman
│  ├─ page.tsx           Landing utama
│  ├─ program/           Landing kedua
│  ├─ berita/            Daftar berita
│  │  └─ [slug]/         Detail berita
│  ├─ galeri/
│  ├─ layout.tsx, template.tsx, globals.css, not-found.tsx
├─ components/           Navbar, Hero, HomeSections, Footer, Reveal (animasi), dll.
├─ data/                 Data konten (site, berita, program)
└─ fonts/                Telegraf & Haffer
public/
├─ photos/               Foto kegiatan
├─ logos/                Logo YRI & mitra
├─ cutouts/              Potret tanpa latar (staff)
└─ img/                  Motif dekoratif
```

## Catatan

- Foto sudah dikompres (maks. 1800 px) agar situs ringan.
- Statistik di landing (500+ anak muda, 500+ pengikut, 10+ kerja sama, 10+ program) dibawa dari situs lama. Periksa dan perbarui di `src/data/program.ts` bila sudah berubah.
- Embed Instagram memakai fitur resmi Instagram. Tampilan "live" otomatis tanpa mengganti kode tidak bisa dilakukan tanpa API/token Instagram atau layanan widget pihak ketiga.
