import AdminHeader from "@/components/admin/AdminHeader";
import ArticleForm from "@/components/admin/ArticleForm";
import styles from "@/components/admin/admin.module.css";
import { categories } from "@/data/berita";
import { requireAdmin } from "@/lib/guard";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <div className={styles.shell}>
      <AdminHeader />
      <main className={styles.main}>
        <h1>Tambah Berita</h1>
        <ArticleForm categories={categories} />
      </main>
    </div>
  );
}
