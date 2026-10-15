import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PhotoGrid, { type Photo } from "@/components/PhotoGrid";
import Reveal from "@/components/Reveal";
import styles from "./galeri.module.css";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan Youth Ranger Indonesia Sumatera Selatan.",
};

const photos: Photo[] = [
  { src: "/photos/grup-yri-fest.jpg", alt: "Foto bersama pemuda YRI Sumsel", caption: "Keluarga besar YRI Sumsel" },
  { src: "/photos/ajangsana-cover.jpg", alt: "Ajangsana Mengajar", caption: "Ajangsana Mengajar" },
  { src: "/photos/gamon.jpg", alt: "GG GAMON 2024", caption: "GG GAMON 2024, Gerakan Menanam Pohon" },
  { src: "/photos/expo-fest.jpg", alt: "YRI FEST X EXPO", caption: "YRI FEST X EXPO" },
  { src: "/photos/community-fest.jpg", alt: "Community Fest", caption: "Community Fest" },
  { src: "/photos/welcoming-party.jpg", alt: "Welcoming Party Gen2.0", caption: "Welcoming Party Gen2.0" },
  { src: "/photos/kegiatan-luar.jpg", alt: "Kegiatan luar ruangan Rangers", caption: "Kegiatan luar ruangan" },
  { src: "/photos/ajangsana-1.jpg", alt: "Ajangsana Mengajar bersama adik-adik panti", caption: "Ajangsana Mengajar" },
  { src: "/photos/sponsor-1.jpg", alt: "Foto bersama sponsor", caption: "Thank you to our sponsors" },
  { src: "/photos/mou-aiesec.jpg", alt: "Kerjasama dengan AIESEC in UNSRI", caption: "Kerjasama AIESEC in UNSRI" },
  { src: "/photos/audiensi.jpg", alt: "Audiensi YRI Sumsel", caption: "Audiensi" },
  { src: "/photos/ajangsana-2.jpg", alt: "Ajangsana Mengajar", caption: "Ajangsana Mengajar" },
  { src: "/photos/sponsor-2.jpg", alt: "Foto bersama panitia dan sponsor", caption: "Thank you to our sponsors" },
  { src: "/photos/literasi.jpg", alt: "Kegiatan literasi", caption: "Literasi buku bersama" },
  { src: "/photos/ajangsana-3.jpg", alt: "Ajangsana Mengajar", caption: "Ajangsana Mengajar" },
  { src: "/photos/seminar.jpg", alt: "Seminar daring", caption: "Seminar Graphic Design & Public Speaking" },
  { src: "/photos/sponsor-3.jpg", alt: "Dokumentasi YRI FEST", caption: "YRI FEST" },
  { src: "/photos/kumpul-pengurus.jpg", alt: "Pengurus YRI Sumsel berkumpul", caption: "Pengurus YRI Sumsel" },
  { src: "/photos/ajangsana-4.jpg", alt: "Ajangsana Mengajar", caption: "Ajangsana Mengajar" },
  { src: "/photos/komunitas-1.jpg", alt: "Komunitas YRI Sumsel", caption: "Komunitas YRI Sumsel" },
];

export default function GaleriPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className="container">
            <Reveal>
              <span className={styles.tag}>Dokumentasi</span>
            </Reveal>
            <Reveal delay={100}>
              <h1>
                Galeri <span>Kegiatan</span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p>Potret kebersamaan Rangers Sumatera Selatan. Klik foto untuk memperbesar.</p>
            </Reveal>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <PhotoGrid photos={photos} layout="masonry" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
