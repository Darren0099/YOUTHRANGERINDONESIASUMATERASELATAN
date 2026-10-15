import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import "./globals.css";

const telegraf = localFont({
  src: [
    { path: "../fonts/Telegraf-Light.woff", weight: "300", style: "normal" },
    { path: "../fonts/Telegraf-Regular.woff", weight: "400", style: "normal" },
  ],
  variable: "--font-telegraf",
  display: "swap",
});

const haffer = localFont({
  src: "../fonts/HafferSQXH-Regular.woff",
  variable: "--font-haffer",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.hashtag}`, template: `%s | ${site.shortName}` },
  description: site.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#160b2e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${telegraf.variable} ${haffer.variable}`}>
      <head>
        {/* Aktifkan animasi reveal hanya jika JavaScript berjalan */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,1500;12..96,700;12..96,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
