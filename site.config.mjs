/**
 * Configuration centralisée du site Studio FTT.
 *
 * Le jour où tu changes de domaine, tu modifies UNIQUEMENT ce fichier.
 * Tout le reste (sitemap, robots, llms.txt, mirrors .md, composants React)
 * récupère sa valeur depuis ici.
 */

export const siteConfig = {
  // Domaine canonique du site (sans slash final)
  url: "https://studio-ftt.pages.dev",

  // Nom et description
  name: "Studio FTT",
  description:
    "Studio web indépendant pour artisans, indépendants et commerces locaux. Sites livrés en 2 semaines, à partir de 500 €, hébergement Cloudflare offert.",

  // Coordonnées
  email: "contactstudioftt@gmail.com",
  instagram: "https://www.instagram.com/studio_ftt___/",
  linkedin: "https://www.linkedin.com/in/studio-ftt",

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
