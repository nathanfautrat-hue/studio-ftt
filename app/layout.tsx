import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
const mono = JetBrains_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio FTT — Agence web Sarthe",
  description:
    "Studio indépendant pour artisans et PME. On dessine, on développe, on référence — vous obtenez un site qui rassure, et qui vous amène des clients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${bebas.variable} ${dm.variable} ${playfair.variable} ${mono.variable}`}
    >
      <body>{children}</body>
      {/* Cloudflare Web Analytics */}
      <script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "abf2189bcc544af68e8bfed20af49935"}'
      />
      {/* End Cloudflare Web Analytics */}
    </html>
  );
}
