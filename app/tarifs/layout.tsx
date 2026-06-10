import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

const TITLE = "Tarifs : sites web à partir de 500 € — livraison 14 jours ouvrés";
const DESCRIPTION =
  "Combien coûte un site internet ? Comparatif Wix, freelance, agence. Tarifs Studio FTT : Vitrine 500 €, Visibilité 750 €, Sur-mesure dès 1 000 €. Aucun abonnement obligatoire, hébergement offert la 1ère année.";

const URL = `${siteConfig.url}/tarifs`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "prix création site internet",
    "tarif site web artisan",
    "tarif agence web Sarthe",
    "site web 500 euros",
    "tarifs Studio FTT",
    "site vitrine pas cher",
    "création site web indépendant",
  ],
  alternates: {
    canonical: "/tarifs",
    types: {
      "text/markdown": "/tarifs.md",
    },
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

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = [
    {
      name: "Site Vitrine Studio FTT",
      price: "500",
      description:
        "Site sur-mesure d'une page pour démarrer : design adapté à votre secteur, formulaire de contact, SEO de base, mise en ligne incluse, 1 modification gratuite.",
      features: [
        "1 page",
        "Design adapté à votre secteur",
        "Formulaire de contact",
        "SEO de base",
        "1 modification gratuite",
      ],
      url: URL,
    },
    {
      name: "Site Visibilité Studio FTT",
      price: "750",
      description:
        "Tout ce qu'inclut Vitrine + SEO avancé (mots-clés ciblés, schema.org) + fiche Google Business Profile configurée. Le pack le plus choisi par les artisans et indépendants.",
      features: [
        "Jusqu'à 3 pages",
        "Tout ce qu'inclut Vitrine",
        "SEO avancé",
        "Fiche Google Business Profile configurée",
        "1 modification gratuite",
      ],
      url: URL,
    },
    {
      name: "Site Sur-mesure Studio FTT",
      price: "1000",
      description:
        "Tout ce qu'inclut Visibilité + jusqu'à 5 pages + fonctionnalités sur mesure selon le projet. Devis personnalisé.",
      features: [
        "Jusqu'à 5 pages",
        "Tout ce qu'inclut Visibilité",
        "Fonctionnalités sur mesure selon le projet",
        "1 modification gratuite",
      ],
      url: URL,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Accueil", url: siteConfig.url },
            { name: "Tarifs", url: URL },
          ]),
          ...services.map(serviceSchema),
        ]}
      />
      {children}
    </>
  );
}
