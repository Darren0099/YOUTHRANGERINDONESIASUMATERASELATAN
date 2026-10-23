import styles from "./marquee.module.css";

/** Teks atau elemen yang berjalan horizontal tanpa henti. */
export default function Marquee({
  items,
  variant = "type",
  reverse = false,
}: {
  items: React.ReactNode[];
  variant?: "type" | "logos";
  reverse?: boolean;
}) {
  const row = (key: string) => (
    <ul className={styles.row} aria-hidden={key !== "a"} key={key}>
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
  return (
    <div className={`${styles.marquee} ${styles[variant]} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.track}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
