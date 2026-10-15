import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import Marquee from "./Marquee";
import Reveal from "./Reveal";
import styles from "./hero.module.css";

const words = ["Gelorakan", "Api", "Pemuda", "Bersatu kito", "Kuat kito", "Sumatera Selatan"];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} aria-hidden="true">
        <span className={styles.g1} />
        <span className={styles.g2} />
        <span className={styles.g3} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal>
            <span className={styles.badge}>Youth Ranger Indonesia · Sumatera Selatan</span>
          </Reveal>
          <Reveal delay={100}>
            <h1>
              Salam Pemuda <span className={styles.grad}>Rangers</span> Sumatera Selatan!
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className={styles.lead}>
              Siap jadi pemimpin untuk para generasi muda di masa depan? <b>Bersatu kito, kuat kito!</b> Terus maju, jangan lupa asal, demi masa depan yang
              lebih baik!
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className={styles.actions}>
              <a href={site.register} target="_blank" rel="noopener noreferrer" className="btn btn-yellow">
                Gabung Sekarang <span className="btn-arrow">↗</span>
              </a>
              <Link href="/program" className="btn btn-ghost">
                Lihat Program
              </Link>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <ul className={styles.facts}>
              <li>
                <strong>1500+</strong> pemuda bergabung
              </li>
              <li>
                <strong>10</strong> divisi staff
              </li>
              <li>
                <strong>5+</strong> program tetap
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal variant="zoom" delay={200} className={styles.collageWrap}>
          <div className={styles.collage}>
            <svg className={styles.blobA} viewBox="0 0 200 200" aria-hidden="true">
              <path
                fill="currentColor"
                d="M43.4,-61.6C56.7,-52.4,68.2,-40.1,72.9,-25.6C77.6,-11.1,75.4,5.6,69.2,19.9C63,34.2,52.7,46.1,40.2,55.4C27.7,64.7,13.8,71.4,-1.3,73C-16.4,74.6,-32.8,71.1,-45.4,62C-58,52.9,-66.8,38.2,-71.1,22.4C-75.4,6.6,-75.2,-10.3,-68.9,-24C-62.6,-37.7,-50.3,-48.2,-37.2,-57.5C-24.1,-66.8,-12,-74.9,1.7,-77.2C15.4,-79.5,30.1,-70.8,43.4,-61.6Z"
                transform="translate(100 100)"
              />
            </svg>
            <svg className={styles.blobB} viewBox="0 0 200 200" aria-hidden="true">
              <path
                fill="currentColor"
                d="M39.2,-52.6C51.8,-45.6,63.9,-35.4,69.6,-22.1C75.2,-8.8,74.4,7.5,67.9,20.4C61.4,33.3,49.3,42.8,36.5,52.2C23.8,61.6,10.4,70.9,-3.6,75.5C-17.6,80,-35.2,79.8,-47.4,71C-59.6,62.2,-66.4,44.8,-70.6,28.2C-74.8,11.6,-76.4,-4.2,-71.6,-17.6C-66.9,-31,-55.8,-41.9,-43.6,-49.2C-31.4,-56.5,-15.7,-60.2,-1.2,-58.5C13.3,-56.8,26.6,-59.6,39.2,-52.6Z"
                transform="translate(100 100)"
              />
            </svg>

            <div className={`${styles.card} ${styles.cardA}`}>
              <Image src="/photos/grup-yri-fest.jpg" alt="Foto bersama pemuda YRI Sumsel" fill sizes="(max-width: 900px) 90vw, 560px" priority />
            </div>
            <div className={`${styles.card} ${styles.cardB}`}>
              <Image src="/photos/kegiatan-luar.jpg" alt="Rangers YRI Sumsel dalam kegiatan luar ruangan" fill sizes="260px" />
            </div>

          
            <span className={`${styles.sticker} ${styles.s1}`}>Palembang</span>
            <span className={`${styles.sticker} ${styles.s2}`}>{site.hashtag}</span>
            <span className={`${styles.sticker} ${styles.s3}`}>Gen 2.0</span>
          </div>
        </Reveal>
      </div>

      <div className={styles.band}>
        <Marquee items={words} />
      </div>
    </section>
  );
}
