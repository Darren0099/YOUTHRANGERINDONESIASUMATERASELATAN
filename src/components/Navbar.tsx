"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/data/site";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Sembunyikan saat scroll ke bawah, tampilkan saat scroll ke atas
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header className={`${styles.header} ${hidden && !open ? styles.hidden : ""}`}>
      <nav className={styles.nav} aria-label="Navigasi utama">
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <Image src="/logos/emblem.png" alt="" width={40} height={40} priority />
          <span>
            Youth Ranger <b>Sumsel</b>
          </span>
        </Link>

        <button
          type="button"
          className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <div className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive(item.href) ? styles.active : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={site.register} target="_blank" rel="noopener noreferrer" className={styles.cta}>
            Gabung Sekarang <span aria-hidden="true">↗</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
