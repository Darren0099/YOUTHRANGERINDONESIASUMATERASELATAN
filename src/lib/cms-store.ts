import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Article } from "@/data/berita";

/**
 * Penyimpanan data CMS. Dua mode:
 *  - "github": menulis (commit) ke repo GitHub lewat API. Vercel lalu otomatis build ulang.
 *             Butuh env GITHUB_TOKEN dan GITHUB_REPO ("pemilik/nama-repo"); opsional GITHUB_BRANCH (default "main").
 *  - "local" : menulis langsung ke file di folder proyek (untuk `npm run dev` / komputer sendiri).
 *  - "none"  : belum dikonfigurasi (di Vercel tanpa token).
 * Paksa mode dengan env CMS_STORAGE=github|local.
 */

export const DATA_FILE = "src/data/berita.custom.json";
export const UPLOAD_DIR = "public/photos/uploads";

export type Mode = "github" | "local" | "none";

export function getMode(): Mode {
  const forced = process.env.CMS_STORAGE;
  if (forced === "github" || forced === "local") return forced;
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) return "github";
  if (process.env.NODE_ENV !== "production") return "local";
  return "none";
}

export function describeMode(): { mode: Mode; label: string; hint?: string } {
  const mode = getMode();
  if (mode === "github")
    return { mode, label: `GitHub (${process.env.GITHUB_REPO ?? "?"}@${process.env.GITHUB_BRANCH || "main"})`, hint: "Perubahan di-commit ke GitHub, lalu Vercel build ulang (± 1–2 menit)." };
  if (mode === "local") return { mode, label: "Lokal (file di komputer ini)", hint: "Perubahan langsung ditulis ke folder proyek." };
  return {
    mode,
    label: "Belum dikonfigurasi",
    hint: "Isi environment variable GITHUB_TOKEN dan GITHUB_REPO di Vercel agar CMS bisa menyimpan.",
  };
}

/* ---------- GitHub ---------- */

const apiBase = () => process.env.GITHUB_API_URL || "https://api.github.com";
const branch = () => process.env.GITHUB_BRANCH || "main";
const dir = () => (process.env.GITHUB_DATA_DIR ? process.env.GITHUB_DATA_DIR.replace(/\/+$/, "") + "/" : "");

async function gh(pathname: string, init: RequestInit = {}) {
  const res = await fetch(`${apiBase()}/repos/${process.env.GITHUB_REPO}/${pathname}`, {
    ...init,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "yri-sumsel-cms",
      ...(init.headers ?? {}),
    },
  });
  return res;
}

async function ghGet(file: string): Promise<{ content: string; sha: string } | null> {
  const res = await gh(`contents/${dir()}${file}?ref=${encodeURIComponent(branch())}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET ${file} gagal (${res.status})`);
  const json = (await res.json()) as { content: string; sha: string };
  return { content: Buffer.from(json.content, "base64").toString("utf8"), sha: json.sha };
}

async function ghPut(file: string, content: Buffer, message: string, sha?: string) {
  const res = await gh(`contents/${dir()}${file}`, {
    method: "PUT",
    body: JSON.stringify({ message, content: content.toString("base64"), branch: branch(), ...(sha ? { sha } : {}) }),
  });
  return res;
}

/* ---------- API publik ---------- */

export async function readArticles(): Promise<Article[]> {
  const mode = getMode();
  let raw = "[]";
  if (mode === "github") raw = (await ghGet(DATA_FILE))?.content ?? "[]";
  else if (mode === "local") raw = await readFile(path.join(process.cwd(), DATA_FILE), "utf8").catch(() => "[]");
  else throw new Error("CMS belum dikonfigurasi");
  const parsed = JSON.parse(raw || "[]");
  return Array.isArray(parsed) ? (parsed as Article[]) : [];
}

export async function writeArticles(update: (current: Article[]) => Article[], message: string): Promise<Article[]> {
  const mode = getMode();
  if (mode === "local") {
    const file = path.join(process.cwd(), DATA_FILE);
    const current = await readArticles();
    const next = update(current);
    await writeFile(file, JSON.stringify(next, null, 2) + "\n", "utf8");
    return next;
  }
  if (mode === "github") {
    for (let attempt = 0; attempt < 2; attempt++) {
      const existing = await ghGet(DATA_FILE);
      const current: Article[] = existing ? JSON.parse(existing.content || "[]") : [];
      const next = update(current);
      const res = await ghPut(DATA_FILE, Buffer.from(JSON.stringify(next, null, 2) + "\n", "utf8"), message, existing?.sha);
      if (res.ok) return next;
      if (res.status !== 409 && res.status !== 422) throw new Error(`GitHub PUT gagal (${res.status})`);
    }
    throw new Error("Gagal menyimpan: terjadi bentrok perubahan, coba lagi.");
  }
  throw new Error("CMS belum dikonfigurasi");
}

/** Simpan gambar ke public/photos/uploads dan kembalikan path publiknya. */
export async function saveImage(buffer: Buffer, filename: string): Promise<string> {
  const mode = getMode();
  const rel = `${UPLOAD_DIR}/${filename}`;
  if (mode === "local") {
    const abs = path.join(process.cwd(), rel);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, buffer);
  } else if (mode === "github") {
    // [skip ci]: agar unggah gambar tidak memicu build sendiri; build jalan saat data berita disimpan.
    const res = await ghPut(rel, buffer, `CMS: unggah gambar ${filename} [skip ci]`);
    if (!res.ok) throw new Error(`GitHub upload gagal (${res.status})`);
  } else {
    throw new Error("CMS belum dikonfigurasi");
  }
  return `/photos/uploads/${filename}`;
}
