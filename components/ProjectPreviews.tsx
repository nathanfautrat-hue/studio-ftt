"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mini-previews fidèles aux hero des pages projet.
 * Rendus dans une card 16/10 — reproduisent le look-and-feel
 * du haut de chaque site.
 */

export function ScavbackPreview() {
  return (
    <LiveIframePreview
      src="https://scavback.pages.dev/"
      bg="#0a0a0a"
      label="SCAVBACK — preview"
    />
  );
}

export function SprayfilmPreview() {
  return (
    <LiveIframePreview
      src="https://sprayfilm.fr/"
      bg="#171717"
      label="Sprayfilm — preview"
    />
  );
}

// Live iframe preview — shows the actual demo hero from the live HTML site.
// Renders the demo at a fixed 1440px viewport, then scales it to fit
// the card. ResizeObserver keeps the scale in sync with the card width.
function LiveIframePreview({
  src,
  bg,
  label,
}: {
  src: string;
  bg: string;
  label: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w > 0) setScale(w / 1440);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 overflow-hidden"
      style={{ background: bg }}
    >
      <iframe
        src={src}
        title={label}
        loading="lazy"
        scrolling="no"
        tabIndex={-1}
        aria-hidden
        style={{
          width: "1440px",
          height: "900px",
          border: 0,
          pointerEvents: "none",
          display: "block",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

export function GarageKlaxPreview() {
  return (
    <LiveIframePreview
      src="/demo/garage-klax/index.html"
      bg="#F7F5F0"
      label="Garage Klax — preview"
    />
  );
}

export function SigmaLiftPreview() {
  return (
    <LiveIframePreview
      src="/demo/sigma-lift/index.html"
      bg="#0A0A0A"
      label="Sigma Lift — preview"
    />
  );
}

export function MarceauPreview() {
  return (
    <LiveIframePreview
      src="/projets/marceau"
      bg="#F7F4EF"
      label="Atelier Marceau — preview"
    />
  );
}

export function CabinetAtlasPreview() {
  return (
    <LiveIframePreview
      src="/demo/cabinet-atlas/index.html"
      bg="#F5EFE6"
      label="Cabinet Atlas — preview"
    />
  );
}
