"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { getCal } from "@/lib/cal";

/**
 * Calendrier Cal.com intégré dans la page (thème sombre, pleine largeur).
 * Préchargé bien avant que la section arrive à l'écran.
 */
export default function BookingInline() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        getCal()("inline", {
          elementOrSelector: el,
          calLink: siteConfig.bookingCalLink,
          config: { layout: "month_view", theme: "dark" },
        });
      },
      { rootMargin: "2500px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className="cal-embed-wrap" style={{ width: "100%", minHeight: 560, overflow: "auto" }} />;
}
