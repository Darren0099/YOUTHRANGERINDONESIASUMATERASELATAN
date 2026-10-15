import Image from "next/image";
import Link from "next/link";
import { navItems, site } from "@/data/site";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.big} aria-hidden="true">
        <span>GELORAKAN</span>
        <span>API PEMUDA</span>
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Image src="/logos/logo.png" alt="Youth Ranger Indonesia Sumatera Selatan" width={220} height={220} />
          <p>{site.description}</p>
        </div>

        <div>
          <h3>Jelajahi</h3>
          <ul>
            {navItems.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Terhubung</h3>
          <ul>
            <li>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                Instagram {site.instagram.handle}
              </a>
            </li>
            <li>
              <a href={site.eventInstagram.url} target="_blank" rel="noopener noreferrer">
                {site.eventInstagram.name} {site.eventInstagram.handle}
              </a>
            </li>
            <li>
              <a href={site.register} target="_blank" rel="noopener noreferrer">
                Linktree YRI
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Organisasi</h3>
          <ul>
            <li>
              <a href={site.pusat} target="_blank" rel="noopener noreferrer">
                Youth Ranger Indonesia (pusat)
              </a>
            </li>
            <li>
              <a href={site.founder} target="_blank" rel="noopener noreferrer">
                Meet the Founder
              </a>
            </li>
            <li>
              <a href={site.formSurat} target="_blank" rel="noopener noreferrer">
                Permohonan surat YRI
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>{site.hashtag}</p>
      </div>
    </footer>
  );
}
