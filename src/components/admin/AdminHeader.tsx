import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import styles from "./admin.module.css";

export default function AdminHeader() {
  return (
    <header className={styles.header}>
      <Link href="/admin" className={styles.brand}>
        <Image src="/logos/emblem.png" alt="" width={38} height={38} />
        <span>
          Panel Admin <b>YRI Sumsel</b>
        </span>
      </Link>
      <nav>
        <Link href="/berita" className={styles.navLink}>
          Lihat situs ↗
        </Link>
        <LogoutButton />
      </nav>
    </header>
  );
}
