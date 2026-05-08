import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";

const TITLE = "Atelier Marceau — Concept démo Studio FTT (plombier artisan)";
const DESCRIPTION =
  "Concept démo sectoriel Studio FTT : projet de référence pour un plombier artisan au Mans. Présentation des services (dépannage, salle de bain, chauffage RGE), zone d'intervention en Sarthe, urgence 24/7, demande de devis en ligne. Cas démo non livré à un client réel.";

const URL = `${siteConfig.url}/projets/marceau`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site web plombier",
    "exemple site internet plombier Le Mans",
    "site artisan plomberie Sarthe",
    "création site plombier",
    "Atelier Marceau",
    "Studio FTT projet plombier",
  ],
  alternates: {
    canonical: "/projets/marceau",
    types: {
      "text/markdown": "/projets/marceau.md",
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

export default function MarceauLayout({
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
            { name: "Atelier Marceau", url: URL },
          ]),
          creativeWorkSchema({
            name: "Atelier Marceau — Concept démo plombier artisan",
            description: DESCRIPTION,
            url: URL,
            industry: "Plomberie · Artisanat BTP — concept démo",
            datePublished: "2026-04-01",
          }),
        ]}
      />
      {children}
    </>
  );
}
