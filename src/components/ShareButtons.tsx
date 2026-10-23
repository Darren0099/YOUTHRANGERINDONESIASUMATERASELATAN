"use client";

import { useState } from "react";
import styles from "./share.module.css";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  const share = () => {
    if (navigator.share) navigator.share({ title, url: window.location.href }).catch(() => {});
    else copy();
  };

  const wa = () =>
    `https://wa.me/?text=${encodeURIComponent(`${title} ${typeof window === "undefined" ? "" : window.location.href}`)}`;

  return (
    <div className={styles.row}>
      <button type="button" onClick={copy} className={styles.btn}>
        {copied ? "Tersalin ✓" : "Salin link"}
      </button>
      <button type="button" onClick={share} className={styles.btn}>
        Bagikan
      </button>
      <a href={wa()} target="_blank" rel="noopener noreferrer" className={styles.btn} onClick={(e) => (e.currentTarget.href = wa())}>
        WhatsApp
      </a>
    </div>
  );
}
