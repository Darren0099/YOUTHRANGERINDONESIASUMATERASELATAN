import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        style={{
          minHeight: "80vh",
          display: "grid",
          placeItems: "center",
          padding: "8rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        <div>
          <p
            className="grad"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(6rem, 22vw, 14rem)", lineHeight: 1 }}
          >
            404
          </p>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>Halaman tidak ditemukan</h1>
          <p style={{ margin: "1rem 0 2rem", color: "var(--muted)" }}>Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
          <Link href="/" className="btn btn-primary">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
