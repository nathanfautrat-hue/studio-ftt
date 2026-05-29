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
    a: "3 formules : Vitrine à 500 € (1 page), Visibilité à 750 € (jusqu'à 3 pages, SEO avancé et Google Business Profile), Sur-mesure à partir de 1 000 € (jusqu'à 5 pages). Design, développement, mise en ligne et SEO de base inclus. Pages supplémentaires : 300 € l'unité.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "En 14 jours ouvrés après réception de l'acompte et de vos contenus.",
  },
  {
    q: "Je n'ai pas de textes ni de photos — vous gérez ?",
    a: "On peut vous aider à rédiger et on utilise des visuels adaptés à votre secteur en attendant les vôtres. L'essentiel, c'est de démarrer.",
  },
  {
    q: "Est-ce que je peux modifier mon site moi-même ?",
    a: "Non, c'est nous qui gérons les modifications. À la demande, c'est 50 €/h. Avec la maintenance à 35 €/mois, vous avez 3 modifications incluses chaque mois.",
  },
  {
    q: "Vous travaillez avec qui ?",
    a: "Artisans, TPE, PME — principalement en Sarthe et Mayenne, mais on travaille aussi à distance partout en France.",
  },
  {
    q: "Quelle différence avec Wix ou Squarespace ?",
    a: "Le site est conçu sur-mesure pour votre activité, pas depuis un template générique. Il charge plus vite, il est mieux référencé, et vous n'avez pas d'abonnement mensuel lié à une plateforme.",
  },
  {
    q: "Y a-t-il un abonnement ou des frais cachés ?",
    a: "Non, aucun abonnement obligatoire. L'hébergement est offert la première année, puis 10 €/mois (ou inclus dans la maintenance à 35 €/mois si vous la prenez). Le seul coût récurrent, c'est votre nom de domaine : vous l'achetez à votre nom (une dizaine d'euros par an), il vous appartient, et on le configure gratuitement.",
  },
  {
    q: "Vous travaillez partout en France ?",
    a: "Oui. On est basé en Sarthe mais on travaille à distance dans toute la France, en visio et par email. Le rendez-vous en présentiel reste possible en Sarthe et alentours.",
  },
  {
    q: "Et après la mise en ligne, vous disparaissez ?",
    a: "Non, on reste joignable après la mise en ligne. Pour les modifications régulières, la maintenance à 35 €/mois en inclut 3 par mois ; sinon c'est 50 €/h à la demande.",
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
    desc: "15 minutes pour comprendre votre métier et vos clients. On vous dit franchement si on peut vous aider, sans jargon et sans vous pousser à signer.",
    action: "Appel de découverte · 15 min",
  },
  {
    num: "02",
    title: "On construit",
    desc: "Design, textes, développement, référencement : on s'occupe de tout. Vous validez la maquette avant qu'on code la moindre ligne, donc vous voyez exactement votre site avant qu'il parte en ligne.",
    action: "Design → Dev → Validation",
  },
  {
    num: "03",
    title: "On lance",
    desc: "Votre site est en ligne. On vous envoie une vidéo personnalisée qui vous présente votre site en détail, pour que vous sachiez exactement ce que vous avez.",
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
      "SEO de base (title, meta, structure Hn)",
      "Mise en ligne incluse",
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
      "SEO avancé (mots-clés ciblés, schema.org)",
      "Fiche Google Business Profile configurée",
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
      "Fonctionnalités sur mesure selon le projet",
    ],
  },
];
