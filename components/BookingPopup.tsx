"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";
import { getCal } from "@/lib/cal";

/**
 * Ouvre la réservation Cal.com en fenêtre sur le site au lieu d'un nouvel onglet.
 * Intercepte tous les liens vers siteConfig.booking. Sans JS, le lien marche normalement.
 */
export default function BookingPopup() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || !a.href.startsWith(siteConfig.booking)) return;
      e.preventDefault();
      getCal()("modal", { calLink: siteConfig.bookingCalLink, config: { layout: "month_view", theme: "dark" } });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
