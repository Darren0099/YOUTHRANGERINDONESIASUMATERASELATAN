/** Animasi masuk halaman (fade in up) untuk semua halaman. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
