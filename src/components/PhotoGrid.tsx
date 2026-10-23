"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./photogrid.module.css";

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

/** Galeri foto dengan lightbox (klik untuk memperbesar, geser dengan panah/keyboard, Esc untuk menutup). */
export default function PhotoGrid({ photos, layout = "grid" }: { photos: Photo[]; layout?: "grid" | "masonry" }) {
  const [current, setCurrent] = useState<number | null>(null);
  const total = photos.length;

  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback((d: 1 | -1) => setCurrent((i) => (i === null ? i : (i + d + total) % total)), [total]);

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, close, step]);

  return (
    <>
      <ul className={`${styles.list} ${layout === "masonry" ? styles.masonry : styles.grid}`}>
        {photos.map((p, i) => (
          <li key={p.src} className={styles.item}>
            <button type="button" onClick={() => setCurrent(i)} aria-label={`Perbesar foto: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} width={900} height={640} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 400px" />
              <span className={styles.over}>
                <span>{p.caption ?? p.alt}</span>
                <i aria-hidden="true">⤢</i>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current !== null && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={close}>
          <button type="button" className={styles.close} onClick={close} aria-label="Tutup">
            ×
          </button>
          {total > 1 && (
            <>
              <button
                type="button"
                className={`${styles.nav} ${styles.prev}`}
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Foto sebelumnya"
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.nav} ${styles.next}`}
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Foto berikutnya"
              >
                ›
              </button>
            </>
          )}
          <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
            <div className={styles.full}>
              <Image src={photos[current].src} alt={photos[current].alt} fill sizes="100vw" priority />
            </div>
            <figcaption>
              {photos[current].caption ?? photos[current].alt} · {current + 1}/{total}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
