import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import ArticleForm from "@/components/admin/ArticleForm";
import styles from "@/components/admin/admin.module.css";
import { baseArticles, categories } from "@/data/berita";
import { readArticles } from "@/lib/cms-store";
import { requireAdmin } from "@/lib/guard";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  await requireAdmin();
  const { slug } = await params;
  const article = (await readArticles()).find((a) => a.slug === slug) ?? baseArticles.find((a) => a.slug === slug);
  if (!article) notFound();
  const lockSlug = baseArticles.some((a) => a.slug === slug);
  return (
    <div className={styles.shell}>
      <AdminHeader />
      <main className={styles.main}>
        <h1>Edit Berita</h1>
        <ArticleForm categories={categories} initial={article} lockSlug={lockSlug} />
      </main>
    </div>
  );
}
