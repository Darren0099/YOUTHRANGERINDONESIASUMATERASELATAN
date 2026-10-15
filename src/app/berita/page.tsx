import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsExplorer from "@/components/NewsExplorer";
import Reveal from "@/components/Reveal";
import { agenda, announcements, articles, categories, categoryInfo } from "@/data/berita";
import { site } from "@/data/site";
import styles from "./berita.module.css";

export const metadata: Metadata = {
  title: "Berita & Kegiatan",
  description: "Kabar terbaru, kegiatan, dan kolaborasi Youth Ranger Indonesia Sumatera Selatan.",
};

export default function BeritaPage() {
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const popular = articles.filter((a) => a.popular);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroText}>
              <Reveal>
                <span className={styles.tag}>Newsroom</span>
              </Reveal>
              <Reveal delay={100}>
                <h1>
                  Berita <span>&amp;</span> Kegiatan
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p>Kabar terbaru, cerita kegiatan, dan kolaborasi Youth Ranger Indonesia Sumatera Selatan. Gelorakan api pemuda bersama kami!</p>
              </Reveal>
              <Reveal delay={300}>
                <ul className={styles.cats}>
                  {categories.map((c) => (
                    <li key={c}>
                      <strong>{c}</strong>
                      <span>{categoryInfo[c]}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal variant="zoom" delay={150}>
              <Link href={`/berita/${featured.slug}`} className={styles.featured}>
                <Image src={featured.cover} alt={featured.coverAlt} fill sizes="(max-width: 900px) 92vw, 600px" priority />
                <span className={styles.shade} />
                <span className={styles.fTag}>Sorotan · {featured.category}</span>
                <span className={styles.fBody}>
                  <strong>{featured.title}</strong>
                  <span>{featured.excerpt}</span>
                  <i>
                    Baca selengkapnya <b aria-hidden="true">↗</b>
                  </i>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Semua berita */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className={styles.sectionHead}>
                <h2>
                  Semua <span className="grad">Berita</span>
                </h2>
                <p>{articles.length} cerita kegiatan dan kolaborasi.</p>
              </div>
            </Reveal>
            <NewsExplorer articles={articles} />
          </div>
        </section>

        {/* Populer, pengumuman, agenda */}
        <section className="container" style={{ paddingBottom: "clamp(3rem, 7vw, 6rem)" }}>
          <div className={styles.trio}>
            <Reveal className={styles.fill}>
              <div className={`${styles.box} ${styles.boxPurple}`}>
                <h3>Berita Populer</h3>
                <ol>
                  {popular.map((a, i) => (
                    <li key={a.slug}>
                      <Link href={`/berita/${a.slug}`}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <strong>{a.title}</strong>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
            <Reveal delay={100} className={styles.fill}>
              <div className={`${styles.box} ${styles.boxYellow}`}>
                <h3>Pengumuman</h3>
                <ul>
                  {announcements.map((a) => (
                    <li key={a.title}>
                      <strong>{a.title}</strong>
                      <span>{a.text}</span>
                    </li>
                  ))}
                </ul>
                <a href={site.register} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  Daftar sekarang <span className="btn-arrow">↗</span>
                </a>
              </div>
            </Reveal>
            <Reveal delay={200} className={styles.fill}>
              <div className={`${styles.box} ${styles.boxWhite}`}>
                <h3>Agenda Kegiatan</h3>
                <ul className={styles.agenda}>
                  {agenda.map((a) => (
                    <li key={a.title}>
                      <span className={styles.date}>
                        <b>{a.day}</b>
                        {a.month}
                      </span>
                      <span>
                        <strong>{a.title}</strong>
                        <small>{a.text}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
