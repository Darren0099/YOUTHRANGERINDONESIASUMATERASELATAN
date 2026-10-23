import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/berita";
import styles from "./newscard.module.css";

export default function NewsCard({ article, size = "md" }: { article: Article; size?: "md" | "lg" }) {
  return (
    <Link href={`/berita/${article.slug}`} className={`${styles.card} ${size === "lg" ? styles.lg : ""}`}>
      <span className={styles.media}>
        <Image
          src={article.cover}
          alt={article.coverAlt}
          fill
          sizes={size === "lg" ? "(max-width: 900px) 100vw, 640px" : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px"}
        />
        <span className={styles.tag}>{article.category}</span>
      </span>
      <span className={styles.body}>
        <strong>{article.title}</strong>
        <small>{article.excerpt}</small>
        <span className={styles.more}>
          Baca selengkapnya <i aria-hidden="true">↗</i>
        </span>
      </span>
    </Link>
  );
}
