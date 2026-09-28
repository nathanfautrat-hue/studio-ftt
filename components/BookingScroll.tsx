"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Tous les liens de réservation (siteConfig.booking) emmènent au calendrier
 * Cal.com intégré en bas de l'accueil (#contact) au lieu d'ouvrir une fenêtre.
 * Sans JS, le lien mène directement à Cal.com.
 */
export default function BookingScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || !a.href.startsWith(siteConfig.booking)) return;
      e.preventDefault();
      const contact = document.getElementById("contact");
      if (!contact) {
        window.location.href = "/#contact";
        return;
      }
      contact.scrollIntoView({ behavior: "smooth", block: "start" });
      // Filet de sécurité : si le défilement doux est interrompu (images qui chargent), on finit d'un coup
      window.setTimeout(() => {
        if (Math.abs(contact.getBoundingClientRect().top) > 120) contact.scrollIntoView({ block: "start" });
      }, 1200);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
