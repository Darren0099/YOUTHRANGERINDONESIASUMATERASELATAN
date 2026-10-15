import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/berita";
import { benefits, offers, stats } from "@/data/program";
import { faq, partners, site } from "@/data/site";
import Accordion from "./Accordion";
import Counter from "./Counter";
import InstagramFeed from "./InstagramFeed";
import Marquee from "./Marquee";
import NewsCard from "./NewsCard";
import Reveal from "./Reveal";
import styles from "./home.module.css";

export function About() {
  return (
    <section id="profil" className={`panel ${styles.about}`}>
      <Image src="/img/motif-a.png" alt="" width={260} height={260} className={styles.motifA} aria-hidden="true" />
      <Image src="/img/motif-b.png" alt="" width={260} height={260} className={styles.motifB} aria-hidden="true" />
      <div className="container">
        <Reveal>
          <span className="eyebrow">Who are we?</span>
        </Reveal>
        <Reveal delay={100}>
          <p className={styles.statement}>
            Platform pengembangan potensi <mark className={styles.m1}>pemuda</mark> yang berfokus pada peningkatan <mark className={styles.m2}>kepemimpinan</mark>,
            pemberdayaan <mark className={styles.m3}>komunitas</mark>, dan keberlanjutan <mark className={styles.m4}>lingkungan</mark>.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div className={styles.row}>
            <Link href="/program" className="btn btn-primary">
              Know More <span className="btn-arrow">↗</span>
            </Link>
            <a href={site.founder} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Meet the Founder
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Benefits() {
  const tones = ["tOrange", "tPurple", "tTeal", "tYellow"] as const;
  return (
    <section className={`section ${styles.benefits}`}>
      <div className="container">
        <Reveal>
          <div className={styles.head}>
            <h2>
              Apa Yang <span className="grad">Kamu Dapatkan</span> Disini
            </h2>
            <p>Bergabung bersama kami untuk mendalami softskill kamu, menjadi bagian dari kami dan memperbanyak pengalaman CV kamu!</p>
          </div>
        </Reveal>
        <ul className={styles.cards4}>
          {benefits.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={i * 90} className={styles.fill}>
                <article className={`${styles.benefit} ${styles[tones[i % 4]]}`}>
                  <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Explore() {
  return (
    <section className={`panel ${styles.explore}`}>
      <div className={`container ${styles.exploreGrid}`}>
        <Reveal variant="left">
          <div className={styles.notch}>
            <Image src="/photos/komunitas-1.jpg" alt="Pemuda YRI Sumsel berfoto bersama" fill sizes="(max-width: 900px) 90vw, 560px" />
            <span className={styles.tile}>#01</span>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2>
              With Us <span className={styles.yel}>Explore</span> Your Potential!
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Youth Rangers Indonesia Sumatera Selatan merupakan wadah ideal untuk pemuda berkembang dan menggali potensi diri. Penasaran lebih lanjut? Cuz, lihat
              program lainnya!
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className={styles.letters} aria-hidden="true">
              <span>Y</span>
              <span>R</span>
              <span>I</span>
            </div>
            <Link href="/program" className="btn btn-yellow">
              Cuz, Bergabung bersama kami! <span className="btn-arrow">↗</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Offer() {
  return (
    <section className={`section ${styles.offer}`}>
      <div className="container">
        <Reveal>
          <div className={styles.head}>
            <h2>
              What We <span className="grad">Offer</span>
            </h2>
            <p>Bersama kami, kamu akan menemukan peluang, dukungan, dan inspirasi untuk berkembang dan menciptakan dampak nyata.</p>
          </div>
        </Reveal>
        <ul className={styles.cards3}>
          {offers.map((o, i) => (
            <li key={o.title}>
              <Reveal delay={i * 110} className={styles.fill}>
                <article className={styles.offerCard}>
                  <div className={styles.offerImg}>
                    <Image src={o.image} alt={o.title} fill sizes="(max-width: 900px) 90vw, 380px" />
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Support() {
  return (
    <section className={`panel ${styles.support}`}>
      <Image src="/img/batik.png" alt="" fill sizes="100vw" className={styles.batik} aria-hidden="true" />
      <div className="container">
        <div className={styles.supportTop}>
          <Reveal>
            <h2>
              Bersama-sama kita tingkatkan <span>Dukungan!</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Youth Rangers Indonesia merupakan platform pengembangan potensi pemuda Indonesia (Yayasan Potensi Pemuda Indonesia Jaya) yang bergerak di bidang
              pengembangan potensi diri untuk pemuda.
            </p>
          </Reveal>
        </div>
        <ul className={styles.stats}>
          {stats.map((s, i) => (
            <li key={s.label}>
              <Reveal delay={i * 100} variant="zoom">
                <div className={styles.stat}>
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
          <p className={styles.supportFoot}>
            Youth Ranger Indonesia Sumatera Selatan berupaya menjadi motor penggerak perubahan bagi pemuda Indonesia. Kami berkomitmen untuk selalu berinovasi dalam
            melaksanakan program, sekaligus mengembangkan metode kerja yang lebih efisien agar dampak positif yang dihasilkan bagi masyarakat semakin besar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function LatestNews() {
  const latest = articles.slice(0, 3);
  return (
    <section className={`section ${styles.news}`}>
      <div className="container">
        <Reveal>
          <div className={styles.headRow}>
            <div>
              <span className="eyebrow">Berita</span>
              <h2>
                Kabar <span className="grad">Terbaru</span> YRI Sumsel
              </h2>
            </div>
            <Link href="/berita" className="btn btn-dark">
              Lihat semua berita <span className="btn-arrow">↗</span>
            </Link>
          </div>
        </Reveal>
        <ul className={styles.cards3}>
          {latest.map((a, i) => (
            <li key={a.slug}>
              <Reveal delay={i * 110} className={styles.fill}>
                <NewsCard article={a} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Instagram() {
  return (
    <section className={`section ${styles.ig}`}>
      <div className="container">
        <Reveal>
          <div className={styles.head}>
            <span className="eyebrow">Instagram</span>
            <h2>
              Intip Keseruan di <span className="grad">Instagram</span>
            </h2>
            <p>Postingan terbaru dari {site.instagram.handle} langsung di sini.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <InstagramFeed />
        </Reveal>
      </div>
    </section>
  );
}

export function Collaborators() {
  const items = partners.map((p) => <img key={p.name} src={p.logo} alt={p.name} loading="lazy" />);
  return (
    <section className={`section ${styles.collab}`}>
      <div className="container">
        <Reveal>
          <div className={styles.head}>
            <h2>
              Kolaborator <span className="grad">Are Waiting</span> For You To Explore
            </h2>
            <p>Kolaborator terbaik kami siap mendukung perjalanan kamu untuk berkembang lebih jauh dan mencapai potensi maksimal.</p>
          </div>
        </Reveal>
      </div>
      <Marquee variant="logos" items={items} />
    </section>
  );
}

export function Faq() {
  return (
    <section className={`section ${styles.faq}`}>
      <div className={`container ${styles.faqGrid}`}>
        <Reveal variant="left">
          <div>
            <span className="eyebrow">Punya Pertanyaan?</span>
            <h2>
              Frequently Asked <span className="grad">Questions</span>
            </h2>
            <p>Feel free untuk bertanya kepada kami jika ada yang perlu ditanyakan.</p>
            <a href={`mailto:${site.email}`} className="btn btn-dark">
              Tanya lewat email <span className="btn-arrow">↗</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <Accordion items={faq} />
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className={`panel ${styles.cta}`}>
      <Reveal variant="zoom">
        <div className="container">
          <p className={styles.ctaTag}>{site.hashtag}</p>
          <h2>
            Yuk, jadi bagian dari <span>YRI Sumsel!</span>
          </h2>
          <div className={styles.row}>
            <a href={site.register} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
              Register <span className="btn-arrow">↗</span>
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Ikuti Instagram
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
