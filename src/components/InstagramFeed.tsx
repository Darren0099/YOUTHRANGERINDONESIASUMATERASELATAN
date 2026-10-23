import { instagramPosts, site } from "@/data/site";
import styles from "./instagram.module.css";

/**
 * 3 postingan Instagram YRI Sumsel (embed resmi Instagram) + kartu profil dan event utama.
 * Ganti/tambah kode postingan di src/data/site.ts (instagramPosts).
 */
export default function InstagramFeed() {
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={styles.profile}>
          <span className={styles.ig} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
          </span>
          <span>
            <strong>{site.instagram.handle}</strong>
            <small>Youth Ranger Indonesia Sumatera Selatan</small>
          </span>
          <span className={styles.follow}>Ikuti ↗</span>
        </a>
        <a href={site.eventInstagram.url} target="_blank" rel="noopener noreferrer" className={`${styles.profile} ${styles.event}`}>
          <span className={styles.ig} aria-hidden="true">
            ★
          </span>
          <span>
            <strong>{site.eventInstagram.handle}</strong>
            <small>Event utama: {site.eventInstagram.name}</small>
          </span>
          <span className={styles.follow}>Lihat ↗</span>
        </a>
      </div>

      <ul className={styles.posts}>
        {instagramPosts.map((p) => (
          <li key={p.code} className={styles.postWrap}>
            <div className={styles.post}>
              <div className={styles.fallback}>
                <span>Memuat postingan Instagram…</span>
              </div>
              <iframe
                src={`https://www.instagram.com/p/${p.code}/embed`}
                title={`Postingan Instagram YRI Sumsel ${p.code}`}
                loading="lazy"
                scrolling="no"
                allowTransparency
              />
            </div>
            <a href={`https://www.instagram.com/p/${p.code}/`} target="_blank" rel="noopener noreferrer" className={styles.open}>
              Buka di Instagram ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
