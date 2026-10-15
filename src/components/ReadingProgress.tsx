"use client";

import { useEffect, useState } from "react";

/** Garis progres membaca di bagian atas halaman artikel. */
export default function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1100,
        height: 4,
        width: `${p}%`,
        background: "linear-gradient(90deg, var(--yellow), var(--orange), var(--pink), var(--purple))",
      }}
    />
  );
}
