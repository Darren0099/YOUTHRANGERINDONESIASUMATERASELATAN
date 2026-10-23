/** Info umum organisasi, kontak, tautan, dan navigasi. Ubah di sini, berlaku di seluruh website. */

export const site = {
  name: "Youth Ranger Indonesia Sumatera Selatan",
  shortName: "YRI Sumsel",
  hashtag: "#GelorakanApiPemuda",
  description:
    "Platform pengembangan potensi pemuda yang berfokus pada kepemimpinan, pemberdayaan komunitas, dan keberlanjutan lingkungan di Sumatera Selatan.",
  email: "youthrangersumsel@gmail.com",
  register: "https://linktr.ee/youthranger.id",
  pusat: "https://youthrangerindonesia.com",
  founder: "https://youthrangerindonesia.com/tentang-kami",
  formSurat: "https://bit.ly/FormRequestSuratRangerYRI",
  drive: "https://drive.google.com/drive/folders/11d-njnoODHi18uT9jU5--sLBvtIQaP2i",
  instagram: {
    handle: "@youthranger.sumsel",
    url: "https://www.instagram.com/youthranger.sumsel/",
  },
  eventInstagram: {
    name: "Summit of Stars",
    handle: "@summitofstarsyri",
    url: "https://www.instagram.com/summitofstarsyri/",
  },
};

/**
 * 3 postingan Instagram yang ditampilkan di landing page.
 * Cukup isi kode pendek dari link postingan: instagram.com/p/<KODE>/
 * Ganti/tambah kode di sini untuk memperbarui tampilan.
 */
export const instagramPosts = [
  { code: "Ddytbpqmn21" },
  { code: "DTAnmSUibyQ" },
  { code: "DYFH1XliVMG" },
];

export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/#profil" },
  { label: "Berita", href: "/berita" },
  { label: "Program", href: "/program" },
  { label: "Galeri", href: "/galeri" },
];

export const partners = [
  // Baris 1
  { name: "Kejar Mimpi CIMB Niaga", logo: "/logos/kejar-mimpi.png", row: 1 },
  { name: "SRE Universitas Sriwijaya", logo: "/logos/sre-unsri.png", row: 1 },
  { name: "IRSSA FISIP UNSRI", logo: "/logos/irssa.png", row: 1 },
  { name: "AIESEC", logo: "/logos/aiesec.png", row: 1 },
  { name: "Indonesian Youth Diplomacy", logo: "/logos/iyd.png", row: 1 },
  { name: "Nutrifood", logo: "/logos/nutrifood.png", row: 1 },
  { name: "Radio Republik Indonesia", logo: "/logos/rri.png", row: 1 },
  // Baris 2
  { name: "Youth Ranger Indonesia Sumatera 2", logo: "/logos/yri-sumatera-2.png", row: 2 },
  { name: "Youth Ranger Indonesia Sumatera Selatan", logo: "/logos/yri-sumsel.png", row: 2 },
  { name: "Youth Ranger Indonesia", logo: "/logos/yri-indonesia.png", row: 2 },
  { name: "Mitra", logo: "/logos/mitra-1.png", row: 2 },
  { name: "Kemenpora RI", logo: "/logos/kemenpora.png", row: 2 },
  { name: "Youtz Media", logo: "/logos/youtz-media.png", row: 2 },
];

export const faq = [
  {
    q: "Apa saja persyaratan yang diperlukan untuk mendaftar?",
    a: "Persyaratan umum termasuk data diri kamu. Dengan itu kamu sudah bisa mendaftar menjadi Rangers Aktif!",
  },
  {
    q: "Bagaimana cara mengajukan permohonan surat aktif organisasi YRI?",
    a: "Syaratnya 3 kali ikut kegiatan YRI Pusat atau Wilayah. Untuk surat Rekomendasi/Pernyataan syaratnya 10 kali ikut kegiatan YRI. Jika sudah sesuai persyaratan, kamu bisa mengisi formulir permohonan.",
    link: { label: "Isi formulir surat", href: site.formSurat },
  },
  {
    q: "Untuk dokumentasi kegiatan YRI ada di mana sih, Kak?",
    a: "Dokumentasi kegiatan berbagai regional, terkhusus YRI Sumsel, bisa kamu temukan di Google Drive kami.",
    link: { label: "Buka folder dokumentasi", href: site.drive },
  },
  {
    q: "Kapan dibuka volunteer kegiatannya?",
    a: "Kami membuka open recruitment volunteer pada kegiatan tertentu, seperti YRI FEST X EXPO!",
  },
  {
    q: "Apakah kami bisa membagikan kisah inspiratif?",
    a: "Bisa banget! Kirim pengalaman inspiratif dan inovatifmu lewat DM Instagram YRI Sumsel.",
    link: { label: "DM Instagram YRI Sumsel", href: site.instagram.url },
  },
];
