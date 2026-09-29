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
    href: "https://scavback.pages.dev/",
    preview: <ScavbackPreview />,
  },
  {
    id: "sprayfilm",
    name: "Sprayfilm",
    kind: "Production audiovisuelle",
    tag: "Site vitrine · SEO",
    blurb:
      "Site vitrine pour une agence de production audiovisuelle en Bretagne : SEO local et Google Business inclus.",
    href: "https://sprayfilm.fr/",
    preview: <SprayfilmPreview />,
  },
  {
    id: "electricien",
    name: "Lumen Électricité",
    kind: "Électricien artisan",
    tag: "Site vitrine · Dépannage 2 h",
    blurb:
      "Démo pour un électricien : bleu vif, cercle jaune qui s'allume comme une ampoule, rappel en 60 secondes, services en blocs, avis clients.",
    href: "/demo/electricien/index.html",
    preview: <ElectricienPreview />,
    isDemo: true,
  },
  {
    id: "garage-klax",
    name: "Garage Klax",
    kind: "Garage indépendant",
    tag: "Site vitrine · Prix affichés",
    blurb:
      "Démo pour un garage indépendant : jaune atelier, voiture détourée qui arrive en roulant, prix affichés, galerie de l'atelier, avis clients.",
    href: "/demo/garage-klax/index.html",
    preview: <GarageKlaxPreview />,
    isDemo: true,
  },
  {
    id: "sigma-lift",
    name: "Sigma Lift",
    kind: "Coaching sportif en ligne",
    tag: "Landing · Programmes · Offres",
    blurb:
      "Démo pour un coach sportif en ligne : noir et citron, typographie géante sur photo, programmes à faire défiler, résultats d'élèves, formules.",
    href: "/demo/sigma-lift/index.html",
    preview: <SigmaLiftPreview />,
    isDemo: true,
  },
  {
    id: "marceau",
    name: "Atelier Marceau",
    kind: "Plombier chauffagiste",
    tag: "Site vitrine · Dépannage 7j/7",
    blurb:
      "Démo pour un plombier : dépannage en rouge et bleu atelier, services en tuiles, tarifs affichés, chantiers récents, barre d'appel sur mobile.",
    href: "/demo/marceau/index.html",
    preview: <MarceauPreview />,
    isDemo: true,
  },
  {
    id: "cabinet-atlas",
    name: "Cabinet Atlas",
    kind: "Kinésithérapie · Ostéopathie",
    tag: "Site cabinet · Soins · Avis",
    blurb:
      "Démo pour un cabinet kiné et ostéo : ambiance lumière dorée, arc de photos qui tourne au scroll, soins, première séance, avis patients.",
    href: "/demo/cabinet-atlas/index.html",
    preview: <CabinetAtlasPreview />,
    isDemo: true,
  },
  {
    id: "consultant",
    name: "Tangente Conseil",
    kind: "Consultant pour TPE",
    tag: "Site vitrine · Audit · Contact",
    blurb:
      "Démo pour un consultant qui réduit les charges sociales des TPE : badges chiffrés sur photo, compteur des sommes récupérées, paiement au résultat.",
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
    a: "Non. L'hébergement est inclus, sans limite de durée. Le seul frais annuel, c'est votre nom de domaine, une dizaine d'euros par an, que vous payez directement et qui est à votre nom. La maintenance mensuelle existe, mais elle est facultative.",
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

