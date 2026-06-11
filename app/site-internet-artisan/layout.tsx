import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Site internet artisan : être trouvé le premier";
const DESCRIPTION =
  "Quand un client tape « plombier + votre ville » à 22h, il appelle celui qu'il trouve. Site + fiche Google reliés, 750 € tout compris, livré en 14 jours ouvrés.";

const URL = `${siteConfig.url}/site-internet-artisan`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site internet artisan",
    "site internet plombier",
    "site internet électricien",
    "site internet chauffagiste",
    "site web artisan BTP prix",
    "création site artisan",
    "site vitrine artisan",
  ],
  alternates: {
    canonical: "/site-internet-artisan",
  },
  openGraph: {
    type: "website",
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

export default function SiteInternetArtisanLayout({
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
            { name: "Site internet pour artisan", url: URL },
          ]),
          serviceSchema({
            name: "Création de site internet pour artisan du bâtiment",
            price: "750",
            description:
              "Site sur-mesure pour artisan (plombier, électricien, chauffagiste, maçon) : jusqu'à 3 pages, SEO local sur votre ville et vos services, fiche Google Business Profile configurée. Livré en 14 jours ouvrés.",
            features: [
              "Jusqu'à 3 pages",
              "Design adapté à votre métier",
              "SEO local (ville + services)",
              "Fiche Google Business Profile configurée",
              "Zone d'intervention détaillée",
              "1 modification gratuite",
            ],
            url: URL,
          }),
        ]}
      />
      {children}
    </>
  );
}
