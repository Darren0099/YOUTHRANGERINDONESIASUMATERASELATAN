# Youth Ranger Indonesia Sumatera Selatan — Organization Website & News CMS

Website profil **Youth Ranger Indonesia Sumatera Selatan** untuk menampilkan program, berita, dan dokumentasi kegiatan dalam pengalaman digital yang selaras dengan identitas komunitas. Dikembangkan ulang dari website HTML/CSS/JS menjadi aplikasi **Next.js App Router**.

## Kebutuhan proyek

Informasi komunitas sebelumnya tersebar pada halaman-halaman terpisah, sementara publikasi berita membutuhkan alur yang dapat dijalankan pengelola tanpa mengubah kode aplikasi setiap kali ada kegiatan baru.

## Solusi yang dibuat

| Halaman / sistem | Kemampuan |
| --- | --- |
| Beranda (`/`) | Identitas organisasi, pengantar, serta sorotan kegiatan |
| Program (`/program`) | Informasi program dan aktivitas komunitas |
| Berita (`/berita`) | Sorotan artikel, pencarian, filter kategori, pengumuman dan agenda |
| Detail (`/berita/[slug]`) | Artikel, progres membaca, media pendukung dan tombol berbagi |
| Galeri (`/galeri`) | Dokumentasi foto dengan lightbox |
| Admin (`/admin`) | Pengelolaan berita: tambah, edit, hapus, serta unggah media |

### Pengelolaan artikel melalui GitHub

Aplikasi menyimpan konten berita tambahan dalam `src/data/berita.custom.json`. Aksi admin menggunakan route API untuk membuat perubahan pada repository melalui GitHub API. Metode ini membantu mengelola artikel tanpa database SQL tersendiri, tetapi memerlukan izin token yang tepat dan memperhatikan batasan commit/deployment.

## Teknologi yang diverifikasi

**Next.js 15, React 19, TypeScript, CSS Modules, GitHub API, dan Vercel.** Animasi, komponen galeri, dan antarmuka admin ditulis sebagai komponen proyek sendiri. **Tidak menggunakan Tailwind CSS** pada implementasi utama yang terdokumentasi.

## Hasil pengembangan

Terbentuk website organisasi dengan halaman informasi publik dan alur administrasi artikel. Hasil yang bisa dibuktikan adalah **modul, antarmuka, dan mekanisme pengelolaan konten** yang tercantum di repository, bukan angka kenaikan traffic atau pendaftaran relawan yang belum diukur.

**Website:** https://youthrangerindonesiasumateraselatan.vercel.app/

> Fitur admin berbasis GitHub memerlukan konfigurasi izin server yang sesuai agar penulisan artikel maupun foto dapat berfungsi pada deployment.
