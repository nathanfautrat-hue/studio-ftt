import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Site internet kinésithérapeute : être choisi";
const DESCRIPTION =
  "Sur Doctolib, vous êtes une ligne parmi cinquante. Un site de kiné qui vous rend visible et respecte votre déontologie. 750 € tout compris, 14 jours ouvrés.";

const URL = `${siteConfig.url}/site-internet-kine`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site internet kinésithérapeute",
    "site internet kiné",
    "site web ostéopathe",
    "site internet cabinet kinésithérapie",
    "création site kiné prix",
    "site kiné déontologie",
    "alternative Doctolib visibilité",
  ],
  alternates: {
    canonical: "/site-internet-kine",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: URL,
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-kine.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-kine.png"],
  },
};

export default function SiteInternetKineLayout({
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
            { name: "Site internet pour kinésithérapeute", url: URL },
          ]),
          serviceSchema({
            name: "Création de site internet pour kinésithérapeute, ostéopathe et sophrologue",
            price: "750",
            description:
              "Site sur-mesure pour cabinet de kinésithérapie : jusqu'à 3 pages, SEO local, fiche Google Business Profile configurée, conforme aux règles de communication de la profession. Livré en 14 jours ouvrés.",
            features: [
              "Jusqu'à 3 pages",
              "Design adapté au secteur santé",
              "SEO local (ville + spécialités)",
              "Fiche Google Business Profile configurée",
              "Lien de prise de rendez-vous intégré",
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
