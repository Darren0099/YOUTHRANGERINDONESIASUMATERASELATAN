"use client";

import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className={styles.logout}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Keluar
    </button>
  );
}
