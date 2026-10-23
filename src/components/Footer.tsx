import Link from "next/link";
import { site } from "@/data/site";
import styles from "./footer.module.css";

const icon = {
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  ),
};

const socials = [
  { label: "Instagram YRI Sumsel", href: site.instagram.url, icon: icon.instagram },
  { label: "Instagram Summit of Stars", href: site.eventInstagram.url, icon: icon.star },
  { label: "Linktree YRI", href: site.register, icon: icon.link },
  { label: "Email YRI Sumsel", href: `mailto:${site.email}`, icon: icon.mail },
  { label: "Website Youth Ranger Indonesia", href: site.pusat, icon: icon.globe },
];

export default function Footer() {
  return (
    <footer className={styles.footer} id="kontak">
      <div className={styles.hash} aria-hidden="true">
        <span className={styles.h1}>#GelorakanApiPemuda</span>
        <span className={styles.h2}>YouthRangerIndonesiaSumateraSelatan</span>
      </div>

      <div className={styles.wrap}>
        <ul className={styles.rail} aria-label="Media sosial">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.label}
                title={s.label}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.panel}>
          <a href="#" className={styles.top} aria-label="Kembali ke atas">
            ↑
          </a>

          <div className={styles.main}>
            <div className={styles.join}>
              <h2>
                Wanna Join Us?
                <br />
                Then lets go diving
                <br />
                more our skills!
              </h2>
              <a href={site.register} target="_blank" rel="noopener noreferrer" className={styles.register}>
                Register <span aria-hidden="true">↗</span>
              </a>
            </div>

            <nav className={styles.cols} aria-label="Footer">
              <div>
                <h3>Learn</h3>
                <ul>
                  <li>
                    <Link href="/#profil">About</Link>
                  </li>
                  <li>
                    <Link href="/program">Program</Link>
                  </li>
                  <li>
                    <Link href="/berita">Berita</Link>
                  </li>
                  <li>
                    <Link href="/galeri">Galeri</Link>
                  </li>
                  <li>
                    <Link href="/#faq">FAQs</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Explore</h3>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <a href={site.pusat} target="_blank" rel="noopener noreferrer">
                      YRI Pusat
                    </a>
                  </li>
                  <li>
                    <a href={site.founder} target="_blank" rel="noopener noreferrer">
                      Meet the Founder
                    </a>
                  </li>
                  <li>
                    <a href={site.formSurat} target="_blank" rel="noopener noreferrer">
                      Permohonan Surat
                    </a>
                  </li>
                  <li>
                    <a href={site.drive} target="_blank" rel="noopener noreferrer">
                      Dokumentasi
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Get in touch</h3>
                <ul className={styles.touch}>
                  <li>
                    <span aria-hidden="true">{icon.mail}</span>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                  <li>
                    <span aria-hidden="true">{icon.instagram}</span>
                    <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                      {site.instagram.handle}
                    </a>
                  </li>
                  <li>
                    <span aria-hidden="true">{icon.globe}</span>
                    <span>Palembang, Sumatera Selatan</span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <p className={styles.word}>
            YouthRangerIndonesia <span>SumateraSelatan</span>
          </p>

          <div className={styles.bottom}>
            <p>
              © {new Date().getFullYear()} Youth Ranger Indonesia Sumatera Selatan <i>|</i> All Rights Reserved
            </p>
            <p className={styles.tags}>
              <span>Gelorakan</span>
              <i>|</i>
              <span>Api</span>
              <i>|</i>
              <span>Pemuda</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
