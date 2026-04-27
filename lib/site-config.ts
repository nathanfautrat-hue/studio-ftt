/**
 * Re-export de la config centralisée du site (depuis site.config.mjs racine).
 * Utilisé dans les composants React (.tsx) et les pages Next.js.
 *
 * NE PAS DUPLIQUER LES VALEURS — elles vivent dans /site.config.mjs.
 */

import siteConfigData from "../site.config.mjs";

export const siteConfig = siteConfigData as {
  url: string;
  name: string;
  description: string;
  email: string;
  instagram: string;
  linkedin: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
  };
  siret: string;
  launchDate: string;
};

export default siteConfig;
