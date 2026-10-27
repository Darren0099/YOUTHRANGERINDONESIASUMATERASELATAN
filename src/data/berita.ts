/**
 * Data berita & kegiatan. Satu objek = satu halaman /berita/[slug].
 * Untuk menambah berita: tambahkan objek baru di `articles`, taruh foto di public/photos/.
 */

import customData from "./berita.custom.json";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export type Category = "Akademik" | "Literasi" | "Sosial" | "Kolaborasi" | "Event";

export interface Article {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  popular?: boolean;
  /** Tanggal kegiatan (teks bebas, mis. "23 Maret 2025"). */
  date?: string;
  author?: string;
  /** Info singkat (lokasi, waktu, dll.) yang tampil di samping artikel. */
  info?: { label: string; value: string }[];
  blocks: Block[];
  gallery?: { src: string; alt: string }[];
  /** Link postingan Instagram terkait (opsional). */
  instagram?: string;
}

export const categories: Category[] = ["Akademik", "Literasi", "Sosial", "Kolaborasi", "Event"];

export const categoryInfo: Record<Category, string> = {
  Akademik: "Dunia perkuliahan dan pembelajaran softskill",
  Literasi: "Waktunya menaikkan minat membaca Rangers!",
  Sosial: "Kegiatan sosial bersama organisasi lain",
  Kolaborasi: "Kerjasama dan program nasional",
  Event: "Acara dan festival bersama komunitas",
};

/** Berita bawaan (ditulis di kode). Berita dari panel admin ada di berita.custom.json. */
export const baseArticles: Article[] = [
  {
    slug: "ajangsana-mengajar",
    date: "23 Maret 2025",
    author: "Winda Mufidah",
    title: "Sukses Melaksanakan Program Ajangsana Mengajar",
    category: "Sosial",
    featured: true,
    excerpt:
      "Youth Rangers Indonesia Sumatera Selatan mengadakan kegiatan seru bersama adik-adik di Panti Asuhan Baiturrahman Rantau Kasih, Palembang. Dari sesi edukatif hingga berbuka puasa bersama, semuanya penuh kehangatan dan tawa!",
    cover: "/photos/ajangsana-cover.jpg",
    coverAlt: "Foto bersama peserta Ajangsana Mengajar dan adik-adik panti asuhan",
    info: [
      { label: "Tema", value: "Ramadhan of Learning: Giving Minds a Brighter Light" },
      { label: "Lokasi", value: "Panti Asuhan Baiturrahman Rantau Kasih, Palembang" },
      { label: "Waktu", value: "Ramadan 2025" },
      { label: "Pendaftaran", value: "10 – 23 Maret 2025" },
    ],
    blocks: [
      { type: "h2", text: "Apa itu Ajangsana Mengajar?" },
      {
        type: "p",
        text: "Kegiatan ini bertujuan untuk mengajar anak-anak yang berada di panti asuhan dengan pembelajaran berupa materi, serta games yang dimaksudkan untuk meningkatkan keaktifan dan kreativitas anak-anak tersebut.",
      },
      {
        type: "p",
        text: "Selain kegiatan mengajar, Rangers juga berbuka puasa bersama, dilanjutkan dengan pembagian sembako.",
      },
      {
        type: "quote",
        text: "Kita mungkin hanya mengajar selama satu hari, tetapi ilmu dan kasih sayang yang kita berikan bisa menjadi cahaya yang menyinari masa depan anak-anak.",
        cite: "Learning, Giving, Growing Together",
      },
      { type: "h2", text: "Berbagi ilmu, motivasi, dan kasih sayang" },
      {
        type: "p",
        text: "Dari sesi edukatif hingga berbuka puasa bersama, kegiatan ini berlangsung hangat dan penuh tawa. Tujuannya sederhana: berbagi ilmu, motivasi, dan kasih sayang kepada anak-anak panti, sehingga mereka semakin termotivasi untuk belajar dan meraih masa depan yang lebih cerah.",
      },
    ],
    gallery: [
      { src: "/photos/ajangsana-cover.jpg", alt: "Foto bersama Ajangsana Mengajar" },
      { src: "/photos/ajangsana-1.jpg", alt: "Rangers bersama adik-adik panti asuhan" },
      { src: "/photos/ajangsana-2.jpg", alt: "Rangers dan adik-adik panti asuhan berfoto bersama" },
      { src: "/photos/ajangsana-3.jpg", alt: "Keseruan Ajangsana Mengajar" },
      { src: "/photos/ajangsana-4.jpg", alt: "Dokumentasi Ajangsana Mengajar" },
    ],
  },
  {
    slug: "mentoring-skill-analisis-akar-masalah",
    title: "Mentoring Skill: Analisis Akar Masalah dengan 5 Ways!",
    category: "Akademik",
    excerpt:
      "Kegiatan Mentoring Skill “Kenapa Kok Bisa?” bareng Kak Muhammad Rifky, S.Pd. Kita belajar bareng gimana cara menganalisis akar masalah pakai metode 5 Ways.",
    cover: "/photos/mentoring.jpg",
    coverAlt: "Sesi Mentoring Skill secara daring",
    popular: false,
    info: [
      { label: "Pemateri", value: "Muhammad Rifky, S.Pd" },
      { label: "Format", value: "Online via Zoom" },
      { label: "Pelaksanaan", value: "12 April, 09:00 – 10:00" },
      { label: "Batas pendaftaran", value: "11 April 2025" },
    ],
    blocks: [
      { type: "h2", text: "Kenapa kok bisa?" },
      {
        type: "p",
        text: "Mentoring Skill adalah program YRI Sumsel untuk melatih softskill para pemuda. Pada sesi ini, peserta belajar bareng bagaimana menganalisis akar masalah menggunakan metode 5 Ways bersama Kak Muhammad Rifky, S.Pd.",
      },
      {
        type: "p",
        text: "Sesi berlangsung secara daring melalui Zoom sehingga bisa diikuti dari mana saja.",
      },
    ],
    gallery: [{ src: "/photos/zoom-mentoring.jpg", alt: "Tampilan sesi mentoring melalui Zoom" }],
  },
  {
    slug: "welcoming-party-gen2",
    author: "Desvi Yandira",
    title: "Welcoming Party Gen2.0",
    category: "Event",
    excerpt:
      "Youth Rangers Indonesia Sumatera Selatan mengadakan acara Welcoming Party Gen 2.0! Tepatnya di gedung Dispora Provinsi Sumatera Selatan.",
    cover: "/photos/welcoming-party.jpg",
    coverAlt: "Foto bersama Welcoming Party Gen2.0",
    info: [
      { label: "Lokasi", value: "Gedung Dispora Provinsi Sumatera Selatan" },
      { label: "Tanggal", value: "19 Januari, 10:00 – 12:00" },
      { label: "Open recruitment staff", value: "1 Oktober – 30 Desember 2024" },
    ],
    blocks: [
      { type: "h2", text: "Semangat baru untuk generasi baru" },
      {
        type: "p",
        text: "Welcoming Party menjadi awal yang hangat dan menginspirasi bagi Gen 2.0 YRI Sumsel, sekaligus langkah pertama menuju kesuksesan bersama.",
      },
    ],
    gallery: [{ src: "/photos/komunitas-1.jpg", alt: "Foto bersama komunitas YRI Sumsel" }],
  },
  {
    slug: "volunteer-green-generation-sumsel",
    title: "Volunteer Green Generation Sumsel",
    category: "Sosial",
    excerpt:
      "Green Generation Sumsel bareng komunitas pecinta lingkungan lainnya, termasuk YRI, menggelar Gerakan Menanam Pohon di kawasan hijau ikonik Palembang, Punti Kayu.",
    cover: "/photos/gamon.jpg",
    coverAlt: "Relawan membawa bibit pohon pada acara GG GAMON 2024",
    info: [
      { label: "Kegiatan", value: "GG GAMON 2024, Gerakan Menanam Pohon" },
      { label: "Lokasi", value: "Taman Wisata Alam Punti Kayu, Palembang" },
      { label: "Penyelenggara", value: "Green Generation Sumsel bersama komunitas lingkungan" },
    ],
    blocks: [
      { type: "h2", text: "Menanam untuk bumi yang sehat" },
      {
        type: "p",
        text: "Green Generation Sumsel bersama komunitas pecinta lingkungan lainnya, termasuk YRI Sumsel, menggelar Gerakan Menanam Pohon (GG GAMON 2024) di kawasan hijau ikonik Palembang, Punti Kayu.",
      },
      {
        type: "p",
        text: "Kegiatan ini sejalan dengan semangat YRI untuk melibatkan pemuda dalam aksi nyata menjaga lingkungan dan keberlanjutan.",
      },
    ],
  },
  {
    slug: "community-fest",
    title: "YRI Sumsel Diundang dalam Event Community Fest",
    category: "Event",
    popular: true,
    excerpt:
      "Sumsel baru saja jadi tuan rumah salah satu event paling hype tahun ini, Community Fest by Dispora Sumsel! Event ini bikin vibes komunitas di Sumsel makin naik level, dan YRI Sumsel ikut meramaikan.",
    cover: "/photos/community-fest.jpg",
    coverAlt: "Stan YRI Sumsel di Community Fest",
    info: [
      { label: "Penyelenggara", value: "Dinas Pemuda dan Olahraga (Dispora) Sumsel" },
      { label: "Peran YRI Sumsel", value: "Diundang dan ikut meramaikan acara" },
    ],
    blocks: [
      { type: "h2", text: "Vibes komunitas naik level" },
      {
        type: "p",
        text: "Sumatera Selatan menjadi tuan rumah Community Fest by Dispora Sumsel, salah satu event paling ditunggu tahun ini. Acara ini mempertemukan banyak komunitas di Sumsel.",
      },
      {
        type: "p",
        text: "YRI Sumsel diundang untuk ikut meramaikan acara ini dan bertemu dengan komunitas-komunitas lainnya.",
      },
    ],
  },
  {
    slug: "yri-fest-x-expo",
    date: "30 Agustus 2024",
    author: "Al-man Raffli",
    title: "YRI FEST X EXPO",
    category: "Event",
    excerpt: "YRI Expo x Fest merupakan ajang kompetisi nasional dengan 5 cabang lomba yang menginspirasi.",
    cover: "/photos/expo-fest.jpg",
    coverAlt: "Peserta dan panitia YRI FEST X EXPO",
    info: [
      { label: "Bentuk acara", value: "Kompetisi nasional" },
      { label: "Cabang lomba", value: "5 cabang lomba" },
      { label: "Volunteer", value: "Open recruitment pada kegiatan ini" },
    ],
    blocks: [
      { type: "h2", text: "Merajut kreativitas dan prestasi di panggung nasional" },
      {
        type: "p",
        text: "YRI Expo x Fest merupakan ajang kompetisi nasional dengan 5 cabang lomba yang menginspirasi. Acara ini menjadi wadah bagi pemuda untuk bersaing secara kreatif dan menunjukkan prestasinya.",
      },
      {
        type: "p",
        text: "YRI Sumsel membuka open recruitment volunteer untuk kegiatan seperti YRI FEST X EXPO. Pantau Instagram YRI Sumsel untuk informasi pendaftarannya.",
      },
    ],
    gallery: [
      { src: "/photos/expo-fest.jpg", alt: "YRI FEST X EXPO" },
      { src: "/photos/sponsor-1.jpg", alt: "Foto bersama sponsor dan peserta" },
      { src: "/photos/sponsor-2.jpg", alt: "Foto bersama sponsor dan panitia" },
      { src: "/photos/sponsor-3.jpg", alt: "Dokumentasi YRI FEST" },
    ],
  },
  {
    slug: "audiensi-pj-gubernur-sumsel",
    title: "YRI Sumsel Lakukan Audiensi dengan Pj Gubernur Sumsel, Bahas Kolaborasi untuk Kemajuan Sumsel",
    category: "Kolaborasi",
    popular: true,
    excerpt:
      "Bapak Koimudin, mewakili Pj Gubernur Sumsel, menyambut baik audiensi ini dan mengapresiasi kontribusi YRI Sumsel dalam berbagai kegiatan di Sumsel.",
    cover: "/photos/audiensi.jpg",
    coverAlt: "Foto bersama saat audiensi YRI Sumsel",
    info: [
      { label: "Pihak yang menerima", value: "Bapak Koimudin, mewakili Pj Gubernur Sumsel" },
      { label: "Topik", value: "Kolaborasi untuk kemajuan Sumatera Selatan" },
    ],
    blocks: [
      { type: "h2", text: "Membahas kolaborasi untuk Sumsel" },
      {
        type: "p",
        text: "YRI Sumsel melakukan audiensi untuk membahas kolaborasi demi kemajuan Sumatera Selatan. Bapak Koimudin, mewakili Pj Gubernur Sumsel, menyambut baik audiensi ini dan mengapresiasi kontribusi YRI Sumsel dalam berbagai kegiatan di Sumsel.",
      },
    ],
  },
  {
    slug: "mou-aiesec-in-unsri",
    title: "YRI Sumsel Menjalin Kerjasama MoU dengan AIESEC in UNSRI",
    category: "Kolaborasi",
    popular: true,
    excerpt:
      "Bersamaan dengan kerjasama ini diharapkan dapat memberikan kontribusi terhadap kegiatan berdampak lainnya.",
    cover: "/photos/mou-aiesec.jpg",
    coverAlt: "Penandatanganan kerjasama YRI Sumsel dan AIESEC in UNSRI",
    info: [
      { label: "Mitra", value: "AIESEC in UNSRI" },
      { label: "Bentuk kerjasama", value: "Nota Kesepahaman (MoU)" },
    ],
    blocks: [
      { type: "h2", text: "Kerjasama untuk dampak yang lebih luas" },
      {
        type: "p",
        text: "YRI Sumsel menjalin kerjasama MoU dengan AIESEC in UNSRI. Kerjasama ini diharapkan dapat memberikan kontribusi terhadap kegiatan berdampak lainnya bagi pemuda.",
      },
    ],
  },
  {
    slug: "seminar-graphic-design-dan-public-speaking",
    date: "18 Februari 2024",
    author: "Desvi Yandira",
    title: "Talking About Graphic Design and Public Speaking",
    category: "Akademik",
    excerpt:
      "Seminar Graphic Design dan Public Speaking yang mengasah kreativitas dan kemampuan komunikasi kamu.",
    cover: "/photos/seminar.jpg",
    coverAlt: "Seminar Graphic Design dan Public Speaking secara daring",
    blocks: [
      { type: "h2", text: "Mengasah kreativitas dan komunikasi" },
      {
        type: "p",
        text: "Seminar ini mengajak peserta belajar tentang desain grafis dan public speaking, dua keterampilan yang membantu kamu berkarya sekaligus menyampaikan gagasan dengan percaya diri.",
      },
    ],
  },
  {
    slug: "literasi-buku-bersama",
    date: "27 April 2024",
    author: "Della",
    title: "Unggulkan Generasi dengan Literasi",
    category: "Literasi",
    excerpt:
      "Membangun budaya membaca dengan acara literasi buku bersama untuk generasi gemilang.",
    cover: "/photos/literasi.jpg",
    coverAlt: "Kegiatan literasi buku bersama YRI Sumsel",
    info: [{ label: "Tujuan", value: "Meningkatkan literasi pemuda Sumsel" }],
    blocks: [
      { type: "h2", text: "Membangun budaya membaca" },
      {
        type: "p",
        text: "Program Literasi YRI Sumsel hadir untuk meningkatkan minat baca pemuda Sumatera Selatan melalui acara literasi buku bersama.",
      },
    ],
  },
];

/**
 * Berita dari panel admin (/admin). File JSON ini ditulis otomatis oleh CMS.
 * Berita terbaru tampil paling atas, lalu berita bawaan.
 */
export const customArticles = customData as unknown as Article[];

const customSlugs = new Set(customArticles.map((a) => a.slug));
export const articles: Article[] = [...customArticles, ...baseArticles.filter((a) => !customSlugs.has(a.slug))];

export const announcements = [
  { title: "Pendaftaran Mentoring Skill: Analisis Masalah dengan 5 Ways!", text: "Batas akhir: 11 April 2025" },
  { title: "Pendaftaran Ajangsana Mengajar 2025", text: "Batas waktu: 10 Maret – 23 Maret 2025" },
  { title: "OPREC Staff Gen2.0 YRI Sumsel", text: "Dibuka: 1 Oktober – 30 Desember 2024" },
];

export const agenda = [
  { day: "12", month: "April", title: "Mentoring Skill", text: "09:00 – 10:00 · Online via Zoom" },
  { day: "23", month: "Maret", title: "Ajangsana Mengajar", text: "16:00 – 19:00 · Panti Asuhan" },
  { day: "19", month: "Januari", title: "Welcoming Party Gen2.0", text: "10:00 – 12:00 · Gedung Dispora Sumsel" },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelated(slug: string, n = 3): Article[] {
  const current = getArticle(slug);
  const others = articles.filter((a) => a.slug !== slug);
  const sameCategory = others.filter((a) => a.category === current?.category);
  return [...sameCategory, ...others.filter((a) => !sameCategory.includes(a))].slice(0, n);
}
