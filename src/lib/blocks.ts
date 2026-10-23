import type { Block } from "@/data/berita";

/**
 * Format isian sederhana untuk isi berita (dipakai di panel admin):
 *  - pisahkan paragraf dengan baris kosong
 *  - "## Judul"           -> subjudul
 *  - "> kutipan | Sumber" -> kutipan (sumber opsional setelah tanda |)
 *  - baris diawali "- "   -> daftar poin
 */
export function parseBlocks(text: string): Block[] {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      if (chunk.startsWith("## ")) return { type: "h2", text: chunk.slice(3).trim() };
      if (chunk.startsWith(">")) {
        const raw = chunk
          .split("\n")
          .map((l) => l.replace(/^>\s?/, ""))
          .join(" ")
          .trim();
        const [quote, ...cite] = raw.split("|");
        const c = cite.join("|").trim();
        return c ? { type: "quote", text: quote.trim(), cite: c } : { type: "quote", text: quote.trim() };
      }
      const lines = chunk.split("\n").map((l) => l.trim());
      if (lines.every((l) => l.startsWith("- "))) return { type: "list", items: lines.map((l) => l.slice(2).trim()) };
      return { type: "p", text: lines.join(" ") };
    });
}

export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `## ${b.text}`;
        case "quote":
          return `> ${b.text}${b.cite ? ` | ${b.cite}` : ""}`;
        case "list":
          return b.items.map((i) => `- ${i}`).join("\n");
        default:
          return b.text;
      }
    })
    .join("\n\n");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
