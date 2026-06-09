/**
 * Configuration centralisée du site Studio FTT.
 *
 * Le jour où tu changes de domaine, tu modifies UNIQUEMENT ce fichier.
 * Tout le reste (sitemap, robots, llms.txt, mirrors .md, composants React)
 * récupère sa valeur depuis ici.
 */

export const siteConfig = {
  // Domaine canonique du site (sans slash final)
  url: "https://studioftt.fr",

  // Nom et description
  name: "Studio FTT",
  description:
    "Studio web indépendant pour artisans, indépendants et commerces locaux. Sites livrés en 14 jours ouvrés, à partir de 500 €, hébergement Cloudflare offert.",

  // Coordonnées
  email: "contact@studioftt.fr",
  instagram: "https://www.instagram.com/studio.ftt/",
  instagramHandle: "@studio.ftt",
  linkedin: "https://www.linkedin.com/in/studio-ftt-ba790a404/",
  linkedinHandle: "Studio FTT",
  calendly: "https://calendly.com/contactstudioftt/15min",

  // Localisation
  address: {
    street: "7 rue du Fromenteau",
    postalCode: "72270",
    city: "Arthezé",
    region: "Sarthe",
    country: "France",
  },
  siret: "10404864000015",

  // Date de lancement
  launchDate: "2026-04-21",
};

export default siteConfig;
