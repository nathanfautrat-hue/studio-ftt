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
      "Plateforme en ligne pour un collectif artistique — galerie, portfolio et univers visuel fort.",
    href: "/projets/scavback",
    preview: <ScavbackPreview />,
  },
  {
    id: "sprayfilm",
    name: "Sprayfilm",
    kind: "Production audiovisuelle",
    tag: "Site vitrine · SEO",
    blurb:
      "Site vitrine pour une agence de production audiovisuelle en Bretagne — SEO local et Google Business inclus.",
    href: "/projets/sprayfilm",
    preview: <SprayfilmPreview />,
  },
  {
    id: "garage-klax",
    name: "Garage Klax",
    kind: "Garage indépendant",
    tag: "Site vitrine · Forfaits affichés",
    blurb:
      "Démo pour un garage indépendant en Sarthe — design industriel brut, forfaits affichés, devis en ligne.",
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
      "Démo pour un coach sportif en ligne — design performance noir/lime, programmes, dashboard de suivi data.",
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
      "Site vitrine pour un plombier artisan au Mans — services, zone d'intervention, urgence 24/7.",
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
      "Démo pour un cabinet pluri kiné/ostéo — design contemporain lumineux (sable, bleu nuit, ocre), photo praticien, équipe, parcours patient.",
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
    a: "3 formules : Vitrine à 500 €, Visibilité à 750 € (avec SEO avancé et Google Business Profile), Sur-mesure à partir de 1 000 €. Tout est inclus — design, développement, mise en ligne, SEO de base et 1 modification gratuite.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "Entre 3 jours et 2 semaines après réception de vos contenus.",
  },
  {
    q: "Je n'ai pas de textes ni de photos — vous gérez ?",
    a: "On peut vous aider à rédiger et on utilise des visuels adaptés à votre secteur en attendant les vôtres. L'essentiel, c'est de démarrer.",
  },
  {
    q: "Est-ce que je peux modifier mon site moi-même ?",
    a: "Non — c'est nous qui gérons les modifications. Chaque site livré inclut une modification gratuite. Avec la formule maintenance à 35 €/mois, vous avez 3 modifications incluses par mois. Au-delà, les modifications sont facturées 50 €/h.",
  },
  {
    q: "Vous travaillez avec qui ?",
    a: "Artisans, TPE, PME — principalement en Sarthe et Mayenne, mais on travaille aussi à distance partout en France.",
  },
  {
    q: "Quelle différence avec Wix ou Squarespace ?",
    a: "Le site est conçu sur-mesure pour votre activité, pas depuis un template générique. Il charge plus vite, il est mieux référencé, et vous n'avez pas d'abonnement mensuel lié à une plateforme.",
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
    title: "On s'appelle",
    desc: "15 minutes pour comprendre votre activité, vos clients, ce que vous attendez du site. On vous dit ce qu'on peut faire et comment.",
    action: "Appel de découverte · 15 min",
  },
  {
    num: "02",
    title: "On construit",
    desc: "Design, développement, textes, référencement — on s'occupe de tout. Vous validez avant la mise en ligne.",
    action: "Design → Dev → Validation",
  },
  {
    num: "03",
    title: "On lance",
    desc: "Le site est en ligne. On vous envoie une vidéo explicative pour que vous sachiez exactement ce que vous avez entre les mains.",
    action: "Mise en ligne + vidéo livrée",
  },
];
