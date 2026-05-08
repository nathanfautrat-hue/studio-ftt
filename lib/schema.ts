/**
 * Schemas JSON-LD réutilisables pour le SEO Studio FTT.
 *
 * Tous les schemas suivent schema.org. Ils sont consommés par le composant
 * <JsonLd /> qui les sérialise dans un <script type="application/ld+json">.
 *
 * Source unique de vérité : les valeurs viennent de site.config.mjs.
 */

import { siteConfig } from "./site-config";

const URL = siteConfig.url;
const NAME = siteConfig.name;
const LOGO = `${URL}/logo_ftt.png`;
const OG_IMAGE = `${URL}/og-image.png`;

/**
 * Organization — entité Studio FTT.
 * À placer sur toutes les pages.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${URL}/#organization`,
    name: NAME,
    legalName: "Studio FTT",
    url: URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE,
    description: siteConfig.description,
    foundingDate: siteConfig.launchDate,
    founder: {
      "@type": "Person",
      "@id": `${URL}/#nathan`,
      name: "Nathan Fautrat",
      jobTitle: "Fondateur · Designer & développeur web",
      url: `${URL}/a-propos`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: "FR",
    },
    email: siteConfig.email,
    sameAs: [
      siteConfig.instagram,
      siteConfig.linkedin,
      "https://www.google.com/search?q=Studio+FTT&stick=H4sIAAAAAAAA_-NgU1I1qDBLski1MDYysTRKTTEwMje1MqgwNE8yMDNPSjUwNzRPsTQyXsTKFVxSmpKZr-AWEgIABv32ETYAAAA",
      "https://www.societe.com/societe/monsieur-nathan-fautrat-104048640.html",
      "https://www.pappers.fr/entreprise/fautrat-nathan-104048640",
      "https://annuaire-entreprises.data.gouv.fr/entreprise/nathan-fautrat-fautrat-studio-ftt-104048640",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.email,
      areaServed: "FR",
      availableLanguage: ["French"],
    },
    identifier: siteConfig.siret,
    vatID: "FR",
  };
}

/**
 * ProfessionalService / LocalBusiness — Studio FTT en tant que prestataire.
 * Donne du signal SEO local (Sarthe + France) et permet l'apparition
 * dans les résultats locaux pour "agence web Sarthe".
 */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${URL}/#service`,
    name: NAME,
    description: siteConfig.description,
    url: URL,
    image: OG_IMAGE,
    logo: LOGO,
    priceRange: "€€",
    telephone: "+33607033804",
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressRegion: siteConfig.address.region,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.8311,
      longitude: -0.0883,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "France",
      },
      {
        "@type": "AdministrativeArea",
        name: "Sarthe",
      },
      {
        "@type": "AdministrativeArea",
        name: "Pays de la Loire",
      },
    ],
    serviceType: [
      "Création de site web",
      "Développement web sur-mesure",
      "Référencement SEO",
      "Maintenance de site web",
      "Google Business Profile",
    ],
    knowsAbout: [
      "Création de site web sur-mesure",
      "Référencement SEO local",
      "Next.js",
      "Cloudflare Pages",
      "Tailwind CSS",
      "Schema.org",
      "Webdesign Sarthe",
      "Site web artisan",
      "Site web TPE PME",
    ],
    slogan: "Des sites qui convertissent.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Offres Studio FTT",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Site Vitrine",
          description: "Site sur-mesure, design adapté, SEO de base, mise en ligne, 1 modification incluse.",
          price: 500,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${URL}/tarifs`,
        },
        {
          "@type": "Offer",
          name: "Site Visibilité",
          description: "Tout Vitrine + SEO avancé (mots-clés ciblés, schema.org) + Google Business Profile.",
          price: 750,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${URL}/tarifs`,
        },
        {
          "@type": "Offer",
          name: "Site Sur-mesure",
          description: "Multi-pages, fonctionnalités avancées, devis personnalisé.",
          price: 1000,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${URL}/tarifs`,
        },
      ],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      siteConfig.instagram,
      siteConfig.linkedin,
      "https://www.google.com/search?q=Studio+FTT&stick=H4sIAAAAAAAA_-NgU1I1qDBLski1MDYysTRKTTEwMje1MqgwNE8yMDNPSjUwNzRPsTQyXsTKFVxSmpKZr-AWEgIABv32ETYAAAA",
      "https://www.societe.com/societe/monsieur-nathan-fautrat-104048640.html",
      "https://www.pappers.fr/entreprise/fautrat-nathan-104048640",
      "https://annuaire-entreprises.data.gouv.fr/entreprise/nathan-fautrat-fautrat-studio-ftt-104048640",
    ],
  };
}

/**
 * WebSite — site web global avec SearchAction (sitelinks search).
 * Permet à Google d'afficher une barre de recherche dans les SERPs.
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${URL}/#website`,
    url: URL,
    name: NAME,
    description: siteConfig.description,
    publisher: { "@id": `${URL}/#organization` },
    inLanguage: "fr-FR",
  };
}

/**
 * Person — Nathan Fautrat.
 * Donne du signal E-E-A-T (Expertise, Experience, Authoritativeness, Trust).
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${URL}/#nathan`,
    name: "Nathan Fautrat",
    givenName: "Nathan",
    familyName: "Fautrat",
    jobTitle: "Fondateur Studio FTT — Designer & développeur web",
    url: `${URL}/a-propos`,
    image: LOGO,
    worksFor: { "@id": `${URL}/#organization` },
    sameAs: [siteConfig.instagram, siteConfig.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: "FR",
    },
    knowsAbout: [
      "Création de site web",
      "Développement Next.js",
      "Référencement SEO local",
      "Design web",
      "Cloudflare Pages",
      "Tailwind CSS",
    ],
  };
}

/**
 * AboutPage — schéma pour la page /a-propos.
 * Améliore l'identification de la page comme bio fondateur + studio.
 */
export function aboutPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${URL}/a-propos#aboutpage`,
    url: `${URL}/a-propos`,
    name: "À propos — Studio FTT",
    description: "À propos de Nathan Fautrat, fondateur de Studio FTT, studio web indépendant en Sarthe.",
    inLanguage: "fr-FR",
    isPartOf: { "@id": `${URL}/#website` },
    about: { "@id": `${URL}/#organization` },
    mainEntity: { "@id": `${URL}/#nathan` },
  };
}

/**
 * BreadcrumbList — fil d'Ariane structuré pour les sous-pages.
 */
export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * FAQPage — pour la section FAQ de la homepage et /tarifs.
 * Améliore l'apparition en rich snippets et AI Overviews.
 */
export function faqPageSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/**
 * Service — pour chaque offre individuelle (Vitrine, Visibilité, Sur-mesure).
 */
export function serviceSchema(plan: {
  name: string;
  price: string;
  description: string;
  features: string[];
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: plan.name,
    description: plan.description,
    provider: { "@id": `${URL}/#organization` },
    areaServed: { "@type": "Country", name: "France" },
    serviceType: "Création de site web",
    url: plan.url,
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: plan.url,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      itemListElement: plan.features.map((f, i) => ({
        "@type": "Offer",
        position: i + 1,
        name: f,
      })),
    },
  };
}

/**
 * CreativeWork — pour les fiches projet (cas client).
 */
export function creativeWorkSchema(project: {
  name: string;
  description: string;
  url: string;
  image?: string;
  client?: string;
  industry?: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: project.url,
    ...(project.image && {
      image: project.image.startsWith("http") ? project.image : `${URL}${project.image}`,
    }),
    creator: { "@id": `${URL}/#organization` },
    ...(project.client && {
      about: {
        "@type": "Organization",
        name: project.client,
      },
    }),
    ...(project.industry && {
      genre: project.industry,
    }),
    ...(project.datePublished && {
      datePublished: project.datePublished,
    }),
    inLanguage: "fr-FR",
  };
}
