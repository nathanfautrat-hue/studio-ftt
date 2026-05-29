import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import {
  organizationSchema,
  professionalServiceSchema,
  webSiteSchema,
  personSchema,
} from "@/lib/schema";

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

const TITLE_DEFAULT = "Studio FTT — Création site internet Sarthe & Le Mans";
const TITLE_TEMPLATE = "%s — Studio FTT";
const DESCRIPTION =
  "Création de site internet en Sarthe et au Mans. Sites sur-mesure pour artisans et PME — livrés en 14 jours, à partir de 500 €. SEO local inclus.";

export const metadata: Metadata = {
  metadataBase: new globalThis.URL(siteConfig.url),
  title: {
    default: TITLE_DEFAULT,
    template: TITLE_TEMPLATE,
  },
  description: DESCRIPTION,
  applicationName: "Studio FTT",
  authors: [{ name: "Nathan Fautrat", url: `${siteConfig.url}/a-propos` }],
  creator: "Nathan Fautrat",
  publisher: "Studio FTT",
  generator: "Next.js",
  keywords: [
    "agence web Sarthe",
    "création site internet Sarthe",
    "création site internet Le Mans",
    "site web artisan",
    "site internet plombier",
    "site internet kiné",
    "studio web indépendant",
    "site sur-mesure",
    "Next.js Cloudflare Pages",
    "SEO local Sarthe",
    "Studio FTT",
    "Nathan Fautrat",
  ],
  category: "Web design and development",
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Studio FTT — Agence web sur-mesure en Sarthe",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@studio.ftt",
    site: "@studio.ftt",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo_ftt.png", sizes: "any", type: "image/png" }],
    shortcut: "/logo_ftt.png",
    apple: [{ url: "/logo_ftt.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "e0b516b7a7957f16",
  },
  other: {
    "geo.region": "FR-72",
    "geo.placename": "Arthezé, Sarthe",
    "geo.position": "47.8311;-0.0883",
    ICBM: "47.8311, -0.0883",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
      <head>
        {/* JSON-LD global : Organization + WebSite + ProfessionalService + Person en @graph */}
        <JsonLd
          data={[
            organizationSchema(),
            webSiteSchema(),
            professionalServiceSchema(),
            personSchema(),
          ]}
        />
        {/* Préconnect réseaux Google Fonts (déjà géré par next/font, mais sécurise) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* DNS prefetch Cloudflare Insights */}
        <link rel="dns-prefetch" href="https://static.cloudflareinsights.com" />
        {/* Lien explicite vers le sitemap (signal redondant utile) */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {/* llms.txt pour les crawlers AI */}
        <link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />
      </head>
      <body>
        {children}
        {/* Cloudflare Web Analytics */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon='{"token": "abf2189bcc544af68e8bfed20af49935"}'
        />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-V3KDDW3PJY"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V3KDDW3PJY', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
