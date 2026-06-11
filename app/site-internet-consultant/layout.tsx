import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Site internet pour consultant : un site au niveau de votre TJM";
const DESCRIPTION =
  "Crédible en réunion, invisible en ligne ? Positionnement, offre, preuves, prise de rendez-vous : un site de consultant sur-mesure dès 1 000 €, livré en 14 jours ouvrés.";

const URL = `${siteConfig.url}/site-internet-consultant`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site internet consultant",
    "site internet formateur",
    "site internet coach",
    "site web consultant indépendant",
    "création site consultant prix",
    "site personal branding",
    "site web freelance B2B",
  ],
  alternates: {
    canonical: "/site-internet-consultant",
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

export default function SiteInternetConsultantLayout({
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
            { name: "Site internet pour consultant", url: URL },
          ]),
          serviceSchema({
            name: "Création de site internet pour consultant, formateur et coach",
            price: "1000",
            description:
              "Site sur-mesure pour consultant, formateur ou coach : positionnement clair, pages offre, parcours et références, prise de rendez-vous intégrée. À partir de 1 000 €, livré en 14 jours ouvrés.",
            features: [
              "Jusqu'à 5 pages",
              "Positionnement et pages offre",
              "Intégration de votre lien de réservation",
              "SEO sur votre expertise",
              "Design au niveau de votre tarif",
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
