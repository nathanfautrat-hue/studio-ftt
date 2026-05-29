/**
 * Utilitaires Google Analytics 4
 * ID de mesure : G-V3KDDW3PJY
 *
 * Usage :
 *   import { gtagEvent } from "@/lib/gtag";
 *   gtagEvent("generate_lead", { method: "form_contact" });
 */

export const GA_MEASUREMENT_ID = "G-V3KDDW3PJY";

type GtagEventParams = Record<string, string | number | boolean>;

/**
 * Envoie un événement personnalisé à GA4.
 * Ne plante jamais si gtag n'est pas chargé (SSR, bloqueur pub, etc.).
 */
export function gtagEvent(eventName: string, params?: GtagEventParams) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
