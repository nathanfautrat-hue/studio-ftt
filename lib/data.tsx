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
  ElectricienPreview,
  ConsultantPreview,
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
    id: "electricien",
    name: "Lumen Électricité",
    kind: "Électricien artisan",
    tag: "Site vitrine · Dépannage",
    blurb:
      "Démo pour un électricien artisan : la maison s'allume au fil du scroll, dépannage, tableau, zone d'intervention.",
    href: "/demo/electricien/index.html",
    preview: <ElectricienPreview />,
    isDemo: true,
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
  {
    id: "consultant",
    name: "Tangente Conseil",
    kind: "Consultant indépendant",
    tag: "Site vitrine · Accompagnement",
    blurb:
      "Démo pour un consultant qui accompagne les dirigeants de PME : dégradé vivant qui suit la souris, offres claires, prise de contact.",
    href: "/demo/consultant/index.html",
    preview: <ConsultantPreview />,
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
    a: "Ça dépend de ce dont vous avez besoin. On en parle 30 minutes, puis je vous envoie un devis clair. Vous payez une fois, sans abonnement obligatoire.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "7 jours ouvrés après réception de l'acompte et de vos contenus.",
  },
  {
    q: "Y a-t-il un abonnement ?",
    a: "Non, rien d'obligatoire. L'hébergement est offert la première année, ensuite c'est un petit forfait mensuel, indiqué dans le devis. Vous payez aussi votre nom de domaine, une dizaine d'euros par an, et il est à votre nom.",
  },
  {
    q: "Et après la mise en ligne ?",
    a: "Je reste joignable. Une modification est offerte à la livraison. Ensuite, soit je facture à l'heure, soit vous prenez la maintenance mensuelle, qui couvre 3 modifications par mois.",
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
    desc: "30 minutes pour comprendre votre métier et vos clients. Je vous dis franchement si je peux vous aider.",
    action: "Appel de découverte · 30 min",
  },
  {
    num: "02",
    title: "Je construis",
    desc: "Design, textes, développement, référencement : je m'occupe de tout.",
    action: "Design → Dev → Validation",
  },
  {
    num: "03",
    title: "Je lance",
    desc: "Votre site est en ligne. Je vous envoie une vidéo personnalisée qui vous présente votre site en détail, pour que vous sachiez exactement ce que vous avez.",
    action: "Mise en ligne + vidéo livrée",
  },
];

