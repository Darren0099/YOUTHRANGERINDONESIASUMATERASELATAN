import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import { articles } from "@/data/berita";
import { programBenefits, programStats, programs } from "@/data/program";
import { partners, site } from "@/data/site";
import styles from "./program.module.css";

export const metadata: Metadata = {
  title: "Program",
  description: "Program unggulan, benefit, dan kegiatan Youth Ranger Indonesia Sumatera Selatan.",
};

const quotes = [
  "Pemuda adalah harapan, teruslah melangkah dan jangan takut bermimpi besar!",
  "Jangan takut gagal, karena dari situ kamu akan belajar dan tumbuh lebih kuat.",
  "Masa depan ada di tanganmu. Mulailah hari ini dengan semangat untuk menciptakan dunia yang lebih baik!",
];

const trusted = ["kejar-mimpi", "nutrifood", "kemenpora", "rri"];

export default function ProgramPage() {
  const dated = articles
    .filter((a) => a.date)
    .sort((a, b) => Number(b.date!.slice(-4)) - Number(a.date!.slice(-4)))
    .slice(0, 5);
  const people = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <Reveal>
              <span className={styles.tag}>{site.hashtag}</span>
            </Reveal>
            <Reveal delay={100}>
              <h1>
                Hi Kamu <span>yang Disana</span>
              </h1>
            </Reveal>
            <div className={styles.heroCols}>
              <Reveal delay={200}>
                <p>
                  <strong>Selamat datang di YRI Sumsel!</strong> Dalam setahun terakhir, kami telah sukses melaksanakan berbagai program sosial dan seminar skill
                  yang bermanfaat bagi remaja Sumsel. Kini, kami mengundang kamu untuk bergabung dan menjadi bagian dari <b>PEMUDA YRI SUMSEL</b>. Bersama, kita
                  wujudkan dampak positif yang lebih besar!
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className={styles.actions}>
                  <a href={site.register} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
                    Join Us <span className="btn-arrow">↗</span>
                  </a>
                  <a href={`mailto:${site.email}`} className="btn btn-ghost">
                    Contact Us
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
          <ul className={styles.people} aria-hidden="true">
            {people.map((n, i) => (
              <li key={n} style={{ ["--i" as string]: i }}>
                <Image src={`/cutouts/orang-${n}.png`} alt="" width={300} height={640} />
              </li>
            ))}
          </ul>
        </section>

        {/* Benefit */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className={styles.head}>
                <h2>
                  Together, is a <span className="grad">better work</span>
                </h2>
                <p>
                  Ikutan kegiatan seru kami lainnya, dengan benefit yang dapat kamu jadikan <b>pengalaman berharga</b>.
                </p>
              </div>
            </Reveal>
            <ul className={styles.benefits}>
              {programBenefits.map((b, i) => (
                <li key={b.title}>
                  <Reveal delay={i * 100} className={styles.fill}>
                    <article className={styles.benefit}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <h3>{b.title}</h3>
                      <p>{b.text}</p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Program unggulan */}
        <section className={`panel ${styles.programs}`}>
          <div className="container">
            <Reveal>
              <div className={styles.headLight}>
                <span className="eyebrow">Program unggulan</span>
                <h2>
                  Apa saja <span>programnya?</span>
                </h2>
              </div>
            </Reveal>
            <ul className={styles.programGrid}>
              {programs.map((p, i) => (
                <li key={p.title}>
                  <Reveal delay={i * 90} className={styles.fill}>
                    <Link href={p.href} className={`${styles.program} ${styles[p.color as "purple"]}`}>
                      <span className={styles.programImg}>
                        <Image src={p.image} alt={p.title} fill sizes="(max-width: 700px) 90vw, 280px" />
                      </span>
                      <small>{p.tag}</small>
                      <strong>{p.title}</strong>
                      <span>{p.text}</span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Trusted by */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className={styles.head}>
                <h2>
                  We are trusted <span className="grad">by..</span>
                </h2>
                <p>Sponsor dan partner terbaik tahun ini.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ul className={styles.trusted}>
                {trusted.map((t) => {
                  const p = partners.find((x) => x.logo.includes(t))!;
                  return (
                    <li key={t}>
                      <img src={p.logo} alt={p.name} loading="lazy" />
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Grow together */}
        <section className={`panel ${styles.grow}`}>
          <div className="container">
            <Reveal>
              <h2>
                Grow Together, <span>from everywhere</span>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p>
                Hai, Pemuda Sumsel! Kini saatnya kita bersatu untuk bertumbuh, belajar, dan memberi dampak positif, dari mana saja kamu berada! Melalui semangat
                kolaborasi dan inovasi, kita percaya bahwa setiap pemuda punya peran penting dalam menciptakan perubahan, tanpa batasan jarak atau tempat.
              </p>
            </Reveal>
            <ul className={styles.stats}>
              {programStats.map((s, i) => (
                <li key={s.label}>
                  <Reveal delay={i * 100} variant="zoom">
                    <div>
                      <strong>
                        <Counter value={s.value} suffix={s.suffix} />
                      </strong>
                      <span>{s.label}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <div className={styles.actions}>
                <Link href="/berita/yri-fest-x-expo" className="btn btn-yellow">
                  YRI FEST X EXPO <span className="btn-arrow">↗</span>
                </Link>
                <a href={`mailto:${site.email}`} className="btn btn-ghost">
                  Get in touch
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Kegiatan */}
        <section className="section">
          <div className="container">
            <Reveal>
              <div className={styles.head}>
                <span className="eyebrow">Best events</span>
                <h2>
                  Kegiatan <span className="grad">YRI Sumsel</span>
                </h2>
              </div>
            </Reveal>
            <ol className={styles.events}>
              {dated.map((a, i) => (
                <li key={a.slug}>
                  <Reveal delay={i * 70}>
                    <Link href={`/berita/${a.slug}`} className={styles.event}>
                      <span className={styles.eNum}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={styles.eBody}>
                        <small>
                          {a.date} · {a.category}
                        </small>
                        <strong>{a.title}</strong>
                        <span>{a.excerpt}</span>
                      </span>
                      <span className={styles.eImg}>
                        <Image src={a.cover} alt={a.coverAlt} fill sizes="200px" />
                      </span>
                      <i aria-hidden="true">↗</i>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <div className={styles.center}>
                <Link href="/berita" className="btn btn-dark">
                  Lihat semua berita <span className="btn-arrow">↗</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Kutipan */}
        <section className={styles.quotes}>
          <Marquee items={quotes.map((q) => <span key={q}>{q}</span>)} variant="type" />
        </section>

        {/* Testimoni */}
        <section className="section">
          <div className="container">
            <Reveal>
              <figure className={styles.testi}>
                <blockquote>“Join us to be part of the GEN2.0 change for YRI SUMSEL STAFF”</blockquote>
                <figcaption>
                  <strong>Darren Abimansyah</strong>
                  <span>FrontEnd Google Developer and DevTeam YRI Sumsel</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className={`panel ${styles.cta}`}>
          <Reveal variant="zoom">
            <div className="container">
              <h2>
                Interest to Join Us?
                <br />
                <span>Then you should join us now!!</span>
              </h2>
              <div className={styles.actions} style={{ justifyContent: "center" }}>
                <a href={site.register} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
                  Register <span className="btn-arrow">↗</span>
                </a>
                <a href={`mailto:${site.email}`} className="btn btn-ghost">
                  Call Us
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
