import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { COOKIE_NAME, verifySession } from "@/lib/auth";
import styles from "@/components/admin/admin.module.css";

export default async function LoginPage() {
  if (verifySession((await cookies()).get(COOKIE_NAME)?.value)) redirect("/admin");
  return (
    <main className={styles.loginPage}>
      <div className={styles.loginCard}>
        <Image src="/logos/emblem.png" alt="Youth Ranger Indonesia Sumatera Selatan" width={72} height={72} />
        <h1>Panel Admin Berita</h1>
        <p>Masuk untuk menambah dan mengatur berita YRI Sumsel.</p>
        <LoginForm />
        <Link href="/berita" className={styles.back}>
          ← Kembali ke Berita
        </Link>
      </div>
    </main>
  );
}
