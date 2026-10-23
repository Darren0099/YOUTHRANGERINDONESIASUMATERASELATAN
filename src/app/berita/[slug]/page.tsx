import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NewsCard from "@/components/NewsCard";
import PhotoGrid from "@/components/PhotoGrid";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import ShareButtons from "@/components/ShareButtons";
import { articles, getArticle, getRelated, type Block } from "@/data/berita";
import { site } from "@/data/site";
import styles from "./article.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt };
}

function Body({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "quote":
      return (
        <blockquote>
          <p>{block.text}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );
    case "list":
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const related = getRelated(a.slug, 3);
  const gallery = a.gallery ?? [];
  const meta = [a.date, a.author ? `Oleh ${a.author}` : null].filter(Boolean) as string[];

  return (
    <>
      <ReadingProgress />
      <Navbar />
      <main>
        <header className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <Reveal>
              <nav className={styles.crumb} aria-label="Breadcrumb">
                <Link href="/berita">Berita</Link>
                <span>/</span>
                <span>{a.category}</span>
              </nav>
            </Reveal>
            <Reveal delay={100}>
              <h1>{a.title}</h1>
            </Reveal>
            <Reveal delay={200}>
              <p className={styles.lead}>{a.excerpt}</p>
            </Reveal>
            {meta.length > 0 && (
              <Reveal delay={280}>
                <p className={styles.meta}>{meta.join(" · ")}</p>
              </Reveal>
            )}
          </div>
        </header>

        <div className={`container ${styles.coverWrap}`}>
          <Reveal variant="zoom">
            <div className={styles.cover}>
              <Image src={a.cover} alt={a.coverAlt} fill priority sizes="(max-width: 1240px) 96vw, 1180px" />
              <span className={styles.badge}>{a.category}</span>
            </div>
          </Reveal>
        </div>

        <div className={`container ${styles.layout}`}>
          <article className={styles.content}>
            {a.blocks.map((b, i) => (
              <Reveal key={i}>
                <Body block={b} />
              </Reveal>
            ))}
          </article>

          <aside className={styles.aside}>
            {a.info && (
              <div className={styles.infoCard}>
                <h3>Info kegiatan</h3>
                <dl>
                  {a.info.map((i) => (
                    <div key={i.label}>
                      <dt>{i.label}</dt>
                      <dd>{i.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            <div className={styles.shareCard}>
              <h3>Bagikan</h3>
              <ShareButtons title={a.title} />
            </div>
            <a href={site.register} target="_blank" rel="noopener noreferrer" className={styles.joinCard}>
              <strong>Tertarik ikut kegiatan YRI Sumsel?</strong>
              <span>
                Gabung sekarang <b aria-hidden="true">↗</b>
              </span>
            </a>
          </aside>
        </div>

        {gallery.length >= 2 && (
          <section className={`container ${styles.gallery}`}>
            <Reveal>
              <h2>
                Galeri <span className="grad">Kegiatan</span>
              </h2>
            </Reveal>
            <PhotoGrid photos={gallery} />
          </section>
        )}

        <section className={`section ${styles.related}`}>
          <div className="container">
            <Reveal>
              <div className={styles.relHead}>
                <h2>
                  Berita <span className="grad">Lainnya</span>
                </h2>
                <Link href="/berita" className="btn btn-dark">
                  Semua berita <span className="btn-arrow">↗</span>
                </Link>
              </div>
            </Reveal>
            <ul className={styles.relGrid}>
              {related.map((r, i) => (
                <li key={r.slug}>
                  <Reveal delay={i * 100} className={styles.fill}>
                    <NewsCard article={r} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
