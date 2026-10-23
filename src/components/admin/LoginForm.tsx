"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./admin.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: f.get("username"), password: f.get("password") }),
    });
    setBusy(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError((await res.json().catch(() => ({}))).error ?? "Gagal masuk.");
    }
  }

  return (
    <form onSubmit={submit} className={styles.loginForm}>
      <label>
        <span>Nama</span>
        <input name="username" autoComplete="username" required autoFocus />
      </label>
      <label>
        <span>Password</span>
        <div className={styles.pw}>
          <input name="password" type={show ? "text" : "password"} autoComplete="current-password" required />
          <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Sembunyikan password" : "Tampilkan password"}>
            {show ? "Sembunyikan" : "Lihat"}
          </button>
        </div>
      </label>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <button type="submit" className={styles.primary} disabled={busy}>
        {busy ? "Memeriksa…" : "Masuk"}
      </button>
    </form>
  );
}
