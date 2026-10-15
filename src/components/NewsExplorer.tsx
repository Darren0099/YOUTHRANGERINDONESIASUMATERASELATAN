"use client";

import { useMemo, useState } from "react";
import { categories, type Article } from "@/data/berita";
import NewsCard from "./NewsCard";
import styles from "./newsexplorer.module.css";

export default function NewsExplorer({ articles }: { articles: Article[] }) {
  const [cat, setCat] = useState<string>("Semua");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return articles.filter(
      (a) =>
        (cat === "Semua" || a.category === cat) &&
        (!term || a.title.toLowerCase().includes(term) || a.excerpt.toLowerCase().includes(term)),
    );
  }, [articles, cat, q]);

  const present = categories.filter((c) => articles.some((a) => a.category === c));

  return (
    <div>
      <div className={styles.controls}>
        <div className={styles.chips} role="tablist" aria-label="Kategori berita">
          {["Semua", ...present].map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              className={`${styles.chip} ${cat === c ? styles.on : ""}`}
              onClick={() => setCat(c)}
            >
              {c}
              <span>{c === "Semua" ? articles.length : articles.filter((a) => a.category === c).length}</span>
            </button>
          ))}
        </div>
        <label className={styles.search}>
          <span className="sr-only">Cari berita</span>
          <input type="search" placeholder="Cari berita…" value={q} onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>

      {list.length ? (
        <ul className={styles.grid}>
          {list.map((a) => (
            <li key={a.slug}>
              <NewsCard article={a} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>Belum ada berita yang cocok. Coba kata kunci atau kategori lain.</p>
      )}
    </div>
  );
}
