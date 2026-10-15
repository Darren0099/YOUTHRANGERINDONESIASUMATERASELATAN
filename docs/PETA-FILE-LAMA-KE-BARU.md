# Peta file lama ke baru

Dokumen ini menjawab pertanyaan "file lama yang mana berpasangan dengan file baru yang mana".

## Halaman

| File lama (HTML/CSS/JS) | Pengganti di Next.js |
| --- | --- |
| `index.html` + `styles.css` + `css/*.css` + `main.js` | `src/app/page.tsx` + `src/components/Hero.tsx`, `HomeSections.tsx` + `home.module.css` |
| `YRI2/index.html` + `YRI2/style.css` + `YRI2/script.js` + `YRI2/footer.js` | `src/app/program/page.tsx` + `program.module.css` |
| `News.html` + `css/berita.css`, `b2.css` | `src/app/berita/page.tsx` + `berita.module.css` + `NewsExplorer.tsx`, `NewsCard.tsx` |
| `Berita/ajangsanamengajar/` (template Clapat: `index.html`, `css/`, `js/`, `images/`) | `src/app/berita/[slug]/page.tsx` + data di `src/data/berita.ts` (slug `ajangsana-mengajar`) |
| `gallery.html` | `src/app/galeri/page.tsx` + `PhotoGrid.tsx` |
| `error.html` + `css/error.css` | `src/app/not-found.tsx` |

## Bagian yang dipecah jadi komponen

| Bagian di `index.html` lama | Komponen baru |
| --- | --- |
| Navbar / header | `components/Navbar.tsx` |
| Hero "Salam Pemuda Rangers" | `components/Hero.tsx` (desain baru) |
| Who are we | `About` di `HomeSections.tsx` |
| Apa yang kamu dapatkan (steps) | `Benefits` di `HomeSections.tsx` |
| With Us Explore Your Potential (steps2) | `Explore` di `HomeSections.tsx` |
| What We Offer | `Offer` di `HomeSections.tsx` |
| Dukungan + counter | `Support` di `HomeSections.tsx` + `Counter.tsx` |
| Kolaborator | `Collaborators` di `HomeSections.tsx` + `Marquee.tsx` |
| FAQ | `Faq` di `HomeSections.tsx` + `Accordion.tsx` |
| Gelorakan (teks besar) + footer | `FinalCta` + `components/Footer.tsx` |
| Preloader | `components/Preloader.tsx` |
| (baru) Kartu Instagram | `components/InstagramFeed.tsx` |

## Data (dulu tertanam di HTML)

| Konten | Lokasi baru |
| --- | --- |
| Berita, pengumuman, agenda (`News.html`) | `src/data/berita.ts` |
| Kontak, link, mitra, FAQ | `src/data/site.ts` |
| Program, benefit, statistik | `src/data/program.ts` |

## Aset

| Lama | Baru |
| --- | --- |
| `font/` | `src/fonts/` |
| `img/`, `img/berita/`, `assets/As*.png`, `YRI2/assets/bg*`, `Berita/ajangsanamengajar/images/bg11*` | `public/photos/` (dikompres dan diberi nama jelas) |
| `YRI2/assets/1.png` s.d. `9.png` | `public/cutouts/orang-1.png` s.d. `orang-9.png` |
| `Collab/`, `YRI2/Collab/`, `img/0909.png`, `assets/yri.png` | `public/logos/` |
| `img/4.png`, `img/45.png`, `img/batik.png` | `public/img/` |

## Tidak dibawa

| File lama | Alasan |
| --- | --- |
| `x.html`, `y.html`, `YRI2/tes.html`, `Berita/ajangsanamengajar/tes.html` | File uji coba / draf |
| `css/forbiden191.css` dan CSS lain yang tidak terpakai | Tidak dirujuk halaman mana pun |
| `assets/person*.png`, `client-*.jpg`, `amazon.png`, `figma.png`, dll. | Sisa template (foto stok dan logo contoh) |
| Gambar template di `Berita/ajangsanamengajar/images/` (`05hero`, `06hero`, `provenance*`, `clients-*`) | Sisa template Clapat |
| Footer lama (nomor telepon UK, tautan `error.html`) | Sisa template, diganti footer YRI yang benar |
