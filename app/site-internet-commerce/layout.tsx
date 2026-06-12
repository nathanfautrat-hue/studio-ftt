import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Site internet garage & commerce local";
const DESCRIPTION =
  "Les chaînes ont des sites clinquants, vous avez le métier. Site + fiche Google reliés pour garage ou commerce : 750 € tout compris, livré en 14 jours ouvrés.";

const URL = `${siteConfig.url}/site-internet-commerce`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "site internet commerce local",
    "site internet garage",
    "site internet institut de beauté",
    "site internet auto-école",
    "site web service local prix",
    "création site commerce",
    "site vitrine commerce de proximité",
  ],
  alternates: {
    canonical: "/site-internet-commerce",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: URL,
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-commerce.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-commerce.png"],
  },
};

export default function SiteInternetCommerceLayout({
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
            { name: "Site internet pour commerce et service local", url: URL },
          ]),
          serviceSchema({
            name: "Création de site internet pour commerce et service de proximité",
            price: "750",
            description:
              "Site sur-mesure pour commerce ou service local (garage, institut, auto-école, boutique) : jusqu'à 3 pages, SEO local, fiche Google Business Profile configurée et reliée au site. Livré en 14 jours ouvrés.",
            features: [
              "Jusqu'à 3 pages",
              "Design adapté à votre activité",
              "SEO local (ville + prestations)",
              "Fiche Google Business Profile configurée",
              "Horaires et infos pratiques structurés",
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
