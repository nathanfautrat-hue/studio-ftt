import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";

const TITLE = "Sprayfilm — Site vitrine pour une production audiovisuelle";
const DESCRIPTION =
  "Cas client : site vitrine pour Sprayfilm, agence de production audiovisuelle en Bretagne. SEO local, fiche Google Business, mise en avant du portfolio vidéo et formulaire de devis intégré.";

const URL = `${siteConfig.url}/projets/sprayfilm`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site web agence vidéo",
    "site internet production audiovisuelle",
    "exemple site videaste",
    "Sprayfilm",
    "Studio FTT projet vidéo",
    "site web réalisateur Bretagne",
  ],
  alternates: {
    canonical: "/projets/sprayfilm",
    types: {
      "text/markdown": "/projets/sprayfilm.md",
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

export default function SprayfilmLayout({
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
            { name: "Sprayfilm", url: URL },
          ]),
          creativeWorkSchema({
            name: "Sprayfilm — Site vitrine production audiovisuelle",
            description: DESCRIPTION,
            url: URL,
            client: "Sprayfilm",
            industry: "Production audiovisuelle · Vidéo",
            datePublished: "2026-04-15",
          }),
        ]}
      />
      {children}
    </>
  );
}
