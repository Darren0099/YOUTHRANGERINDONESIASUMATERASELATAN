"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./admin.module.css";

export default function DeleteButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <button
      type="button"
      className={styles.danger}
      disabled={busy}
      onClick={async () => {
        if (!confirm(`Hapus berita "${title}"?\n\nTindakan ini tidak bisa dibatalkan.`)) return;
        setBusy(true);
        const res = await fetch(`/api/admin/articles?slug=${encodeURIComponent(slug)}`, { method: "DELETE" });
        setBusy(false);
        if (res.ok) router.refresh();
        else alert((await res.json().catch(() => ({}))).error ?? "Gagal menghapus.");
      }}
    >
      {busy ? "Menghapus…" : "Hapus"}
    </button>
  );
}
