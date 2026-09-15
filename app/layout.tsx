import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import "./globals.css";

const headingFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Alin & Richard — Undangan Pernikahan",
  description:
    "Dengan penuh sukacita, kami mengundang Anda untuk merayakan hari pernikahan Alin dan Richard.",
  openGraph: {
    title: "Alin & Richard — 26 Juni 2027",
    description:
      "Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Undangan pernikahan Alin dan Richard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alin & Richard",
    description: "Undangan Pernikahan — 26 Juni 2027",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f4eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
