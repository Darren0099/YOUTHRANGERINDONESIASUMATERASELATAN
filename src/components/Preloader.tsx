"use client";

import { useEffect, useState } from "react";
import styles from "./preloader.module.css";

/** Layar pembuka singkat (hanya sekali per sesi). */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"show" | "out" | "gone">("show");

  useEffect(() => {
    if (sessionStorage.getItem("yri-pre")) {
      setPhase("gone");
      return;
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const total = 11500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 2))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("yri-pre", "1");
        setPhase("out");
        document.body.style.overflow = "";
        setTimeout(() => setPhase("gone"), 900);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`${styles.pre} ${phase === "out" ? styles.out : ""}`} aria-hidden="true">
      <div className={styles.count}>{String(count).padStart(2, "0")}</div>
      <p>Gelorakan Api Pemuda Sumatera Selatan</p>
      <div className={styles.bar}>
        <span style={{ width: `${count}%` }} />
      </div>
    </div>
  );
}
