import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";

const TITLE = "Scavback — Plateforme web pour un collectif artistique";
const DESCRIPTION =
  "Cas client : plateforme en ligne pour Scavback, collectif artistique. Galerie d'œuvres, portfolio des artistes, identité visuelle forte et navigation immersive — design propre, code léger, hébergement Cloudflare.";

const URL = `${siteConfig.url}/projets/scavback`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site web collectif artistique",
    "site galerie d'art",
    "exemple site portfolio artiste",
    "Scavback",
    "Studio FTT projet art",
    "création site galerie en ligne",
  ],
  alternates: {
    canonical: "/projets/scavback",
    types: {
      "text/markdown": "/projets/scavback.md",
    },
  },
  openGraph: {
    type: "article",
    locale: "fr_FR",
    url: URL,
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function ScavbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", url: siteConfig.url },
            { name: "Projets", url: `${siteConfig.url}/#projets` },
            { name: "Scavback", url: URL },
          ]),
          creativeWorkSchema({
            name: "Scavback — Plateforme web collectif artistique",
            description: DESCRIPTION,
            url: URL,
            client: "Scavback",
            industry: "Art contemporain · Collectif artistique",
            datePublished: "2026-03-20",
          }),
        ]}
      />
      {children}
    </>
  );
}
