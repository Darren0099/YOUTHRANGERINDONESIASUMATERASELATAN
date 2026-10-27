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
      "Content-Type": "application/json",
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

async function githubError(res: Response, action: string): Promise<Error> {
  const data = (await res.json().catch(() => null)) as { message?: string } | null;
  if (res.status === 401 || res.status === 403) {
    return new Error(`${action} gagal (${res.status}). Periksa GITHUB_TOKEN dan izin Contents: Read and write di Vercel.`);
  }
  return new Error(`${action} gagal (${res.status}): ${data?.message || "Periksa log Vercel."}`);
}

export type StagedImage = { path: string; sha: string };

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

export async function writeArticles(update: (current: Article[]) => Article[], message: string, images: StagedImage[] = []): Promise<Article[]> {
  const mode = getMode();
  if (mode === "local") {
    const file = path.join(process.cwd(), DATA_FILE);
    const current = await readArticles();
    const next = update(current);
    await writeFile(file, JSON.stringify(next, null, 2) + "\n", "utf8");
    return next;
  }
  if (mode === "github") {
    for (let attempt = 0; attempt < 3; attempt++) {
      let headSha = "";
      let baseTreeSha = "";
      if (images.length) {
        const headRes = await gh(`git/ref/heads/${encodeURIComponent(branch())}`);
        if (!headRes.ok) throw await githubError(headRes, "Membaca branch GitHub");
        const head = (await headRes.json()) as { object?: { sha?: string } };
        headSha = head.object?.sha ?? "";
        if (!headSha) throw new Error("Commit terbaru GitHub tidak ditemukan.");
        const commitRes = await gh(`git/commits/${headSha}`);
        if (!commitRes.ok) throw await githubError(commitRes, "Membaca commit GitHub");
        const commit = (await commitRes.json()) as { tree?: { sha?: string } };
        baseTreeSha = commit.tree?.sha ?? "";
        if (!baseTreeSha) throw new Error("Tree GitHub tidak ditemukan.");
      }

      const existing = await ghGet(DATA_FILE);
      const current: Article[] = existing ? JSON.parse(existing.content || "[]") : [];
      const next = update(current);
      const json = JSON.stringify(next, null, 2) + "\n";

      if (!images.length) {
        const res = await ghPut(DATA_FILE, Buffer.from(json, "utf8"), message, existing?.sha);
        if (res.ok) return next;
        if (res.status === 409 || res.status === 422) continue;
        throw await githubError(res, "Menyimpan berita");
      }

      const entries = [
        { path: `${dir()}${DATA_FILE}`, mode: "100644", type: "blob", content: json },
        ...images.map((img) => ({
          path: `${dir()}${img.path.replace(/^\//, "")}`,
          mode: "100644",
          type: "blob",
          sha: img.sha,
        })),
      ];
      const treeRes = await gh("git/trees", {
        method: "POST",
        body: JSON.stringify({ base_tree: baseTreeSha, tree: entries }),
      });
      if (!treeRes.ok) throw await githubError(treeRes, "Menyiapkan foto dan berita");
      const tree = (await treeRes.json()) as { sha?: string };
      if (!tree.sha) throw new Error("Tree baru GitHub tidak ditemukan.");

      const commitRes = await gh("git/commits", {
        method: "POST",
        body: JSON.stringify({ message, tree: tree.sha, parents: [headSha] }),
      });
      if (!commitRes.ok) throw await githubError(commitRes, "Membuat commit berita");
      const newCommit = (await commitRes.json()) as { sha?: string };
      if (!newCommit.sha) throw new Error("Commit baru GitHub tidak ditemukan.");

      const updateRes = await gh(`git/refs/heads/${encodeURIComponent(branch())}`, {
        method: "PATCH",
        body: JSON.stringify({ sha: newCommit.sha, force: false }),
      });
      if (updateRes.ok) return next;
      if (updateRes.status !== 409 && updateRes.status !== 422) {
        throw await githubError(updateRes, "Memperbarui branch berita");
      }
    }
    throw new Error("Penyimpanan bertabrakan dengan perubahan lain di GitHub. Coba terbitkan lagi.");
  }
  throw new Error("CMS belum dikonfigurasi");
}

/** Upload foto ke GitHub sebagai blob sementara tanpa membuat commit atau deployment. */
export async function saveImage(buffer: Buffer, filename: string): Promise<{ path: string; sha?: string }> {
  const mode = getMode();
  const rel = `${UPLOAD_DIR}/${filename}`;
  const publicPath = `/${rel}`;

  if (mode === "local") {
    const abs = path.join(process.cwd(), rel);
    await mkdir(path.dirname(abs), { recursive: true });
    await writeFile(abs, buffer);
    return { path: publicPath };
  }
  if (mode === "github") {
    const res = await gh("git/blobs", {
      method: "POST",
      body: JSON.stringify({ content: buffer.toString("base64"), encoding: "base64" }),
    });
    if (!res.ok) throw await githubError(res, "Mengunggah foto ke GitHub");
    const data = (await res.json()) as { sha?: string };
    if (!data.sha || !/^[0-9a-f]{40}$/i.test(data.sha)) {
      throw new Error("GitHub tidak mengembalikan ID foto yang valid.");
    }
    return { path: publicPath, sha: data.sha };
  }
  throw new Error("CMS belum dikonfigurasi");
}
