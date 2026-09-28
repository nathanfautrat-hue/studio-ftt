/**
 * Données statiques du portfolio.
 * Toutes les données de contenu (projets, FAQ, approche) centralisées ici.
 * Les pages et composants importent depuis ce fichier — jamais de données inline.
 */

import type { StackProject } from "@/components/ProjectStack";
import {
  ScavbackPreview,
  SprayfilmPreview,
  GarageKlaxPreview,
  SigmaLiftPreview,
  MarceauPreview,
  CabinetAtlasPreview,
} from "@/components/ProjectPreviews";

// ---------------------------------------------------------------------------
// Projets
// ---------------------------------------------------------------------------

export const PROJECTS: StackProject[] = [
  {
    id: "scavback",
    name: "Scavback",
    kind: "Collectif artistique",
    tag: "Plateforme · Galerie",
    blurb:
      "Plateforme en ligne pour un collectif artistique : galerie, portfolio et univers visuel fort.",
    href: "/projets/scavback",
    preview: <ScavbackPreview />,
  },
  {
    id: "sprayfilm",
    name: "Sprayfilm",
    kind: "Production audiovisuelle",
    tag: "Site vitrine · SEO",
    blurb:
      "Site vitrine pour une agence de production audiovisuelle en Bretagne : SEO local et Google Business inclus.",
    href: "/projets/sprayfilm",
    preview: <SprayfilmPreview />,
  },
  {
    id: "garage-klax",
    name: "Garage Klax",
    kind: "Garage indépendant",
    tag: "Site vitrine · Forfaits affichés",
    blurb:
      "Démo pour un garage indépendant en Sarthe : design industriel brut, forfaits affichés, devis en ligne.",
    href: "/demo/garage-klax/index.html",
    preview: <GarageKlaxPreview />,
    isDemo: true,
  },
  {
    id: "sigma-lift",
    name: "Sigma Lift",
    kind: "Coaching sportif en ligne",
    tag: "Landing · Programmes & dashboard",
    blurb:
      "Démo pour un coach sportif en ligne : design performance noir/lime, programmes, dashboard de suivi data.",
    href: "/demo/sigma-lift/index.html",
    preview: <SigmaLiftPreview />,
    isDemo: true,
  },
  {
    id: "marceau",
    name: "Atelier Marceau",
    kind: "Plombier artisan",
    tag: "Site vitrine · Devis",
    blurb:
      "Site vitrine pour un plombier artisan au Mans : services, zone d'intervention, urgence 24/7.",
    href: "/projets/marceau",
    preview: <MarceauPreview />,
    isDemo: true,
  },
  {
    id: "cabinet-atlas",
    name: "Cabinet Atlas",
    kind: "Kinésithérapie · Ostéopathie",
    tag: "Site cabinet · Doctolib · RDV",
    blurb:
      "Démo pour un cabinet pluri kiné/ostéo : design contemporain lumineux (sable, bleu nuit, ocre), photo praticien, équipe, parcours patient.",
    href: "/demo/cabinet-atlas/index.html",
    preview: <CabinetAtlasPreview />,
    isDemo: true,
  },
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export type FaqItem = { q: string; a: string };

export const FAQ: FaqItem[] = [
  {
    q: "Combien coûte un site ?",
    a: "Ça dépend de ce dont vous avez besoin. On en parle 30 minutes, puis je vous envoie un devis clair. Vous payez une fois. Le détail des formules est sur la page Tarifs.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "7 jours ouvrés après réception de l'acompte et de vos contenus.",
  },
  {
    q: "Y a-t-il un abonnement ?",
    a: "Non, rien d'obligatoire. L'hébergement est offert la première année, puis 10 €/mois. Vous payez aussi votre nom de domaine, une dizaine d'euros par an, et il est à votre nom.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: "Je reste joignable. Une modification est offerte à la livraison. Ensuite, c'est 50 €/h, ou 3 modifications par mois avec la maintenance à 35 €/mois.",
  },
  {
    q: "Vous travaillez partout en France ?",
    a: "Oui, à distance, en visio et par e-mail. Je suis basé en Sarthe, donc on peut aussi se voir si vous êtes dans le coin.",
  },
];

// ---------------------------------------------------------------------------
// Approche (étapes process)
// ---------------------------------------------------------------------------

export type ApprocheStep = {
  num: string;
  title: string;
  desc: string;
  action: string;
};

export const APPROCHE: ApprocheStep[] = [
  {
    num: "01",
    title: "Je vous appelle",
    desc: "30 minutes pour comprendre votre métier et vos clients. Je vous dis franchement si je peux vous aider, sans jargon et sans vous pousser à signer.",
    action: "Appel de découverte · 30 min",
  },
  {
    num: "02",
    title: "Je construis",
    desc: "Design, textes, développement, référencement : je m'occupe de tout. Vous validez la maquette avant que je code la moindre ligne, donc vous voyez exactement votre site avant qu'il parte en ligne.",
    action: "Design → Dev → Validation",
  },
  {
    num: "03",
    title: "Je lance",
    desc: "Votre site est en ligne. Je vous envoie une vidéo personnalisée qui vous présente votre site en détail, pour que vous sachiez exactement ce que vous avez.",
    action: "Mise en ligne + vidéo livrée",
  },
];

// ---------------------------------------------------------------------------
// Tarifs (packs sites web) — source unique partagée par /tarifs et la home
// ---------------------------------------------------------------------------

export type Plan = {
  id: string;
  name: string;
  price: string;
  sub: string;
  featured: boolean;
  desc: string;
  features: string[];
};

export const PLANS: Plan[] = [
  {
    id: "vitrine",
    name: "Vitrine",
    price: "500 €",
    sub: "one-shot, tout compris",
    featured: false,
    desc: "Pour démarrer avec un site propre et référencé.",
    features: [
      "1 page",
      "Design adapté à votre secteur",
      "Formulaire de contact",
      "SEO de base",
      "1 modification gratuite",
    ],
  },
  {
    id: "visibilite",
    name: "Visibilité",
    price: "750 €",
    sub: "one-shot, tout compris",
    featured: true,
    desc: "Le choix de la plupart des artisans et indépendants.",
    features: [
      "Jusqu'à 3 pages",
      "Tout ce qu'inclut Vitrine",
      "SEO avancé",
      "Fiches Google Business, Bing Places et Apple Plans configurées",
      "Site optimisé pour être compris par les IA (ChatGPT, réponses IA de Google)",
      "1 modification gratuite",
    ],
  },
  {
    id: "sur-mesure",
    name: "Sur-mesure",
    price: "à partir de 1 000 €",
    sub: "devis personnalisé",
    featured: false,
    desc: "Pour les projets plus complets ou avec des besoins spécifiques.",
    features: [
      "Jusqu'à 5 pages",
      "Tout ce qu'inclut Visibilité",
      "Fonctionnalités sur mesure (e-commerce, réservation, espace client…)",
      "1 modification gratuite",
    ],
  },
];
