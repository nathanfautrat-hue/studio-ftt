"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mini-previews fidèles aux hero des pages projet.
 * Rendus dans une card 16/10 — reproduisent le look-and-feel
 * du haut de chaque site.
 */

export function ScavbackPreview() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
      <img
        src="/preview-scavback.webp"
        alt="Aperçu du site SCAVBACK — collectif créatif"
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
    </div>
  );
}

export function SprayfilmPreview() {
  return (
    <div className="absolute inset-0 bg-[#0c0c0c] overflow-hidden">
      {/* top bar */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
        <span
          className="text-white text-sm md:text-base italic font-bold leading-none"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Spray<span className="font-normal">film</span>
        </span>
        <div className="flex items-center gap-1.5 text-white text-[9px] md:text-[10px]">
          <span>Menu</span>
          <span className="flex flex-col gap-[2px]">
            <span className="block w-3 h-[1.5px] bg-white" />
            <span className="block w-3 h-[1.5px] bg-white" />
          </span>
        </div>
      </div>
      {/* giant yellow PRODUCTION */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
        <div
          className="font-display text-[#F2F425] leading-[0.82] tracking-[-0.04em] text-center"
          style={{ fontSize: "clamp(3.5rem, 18vw, 9rem)", transform: "scaleY(1.15)" }}
        >
          PRODUCTION
        </div>
        <div className="mt-4 text-white text-[9px] md:text-[11px] tracking-wide text-center leading-snug">
          Agence de Production Audiovisuelle &amp; Exécutive
          <br />
          en Bretagne.
        </div>
      </div>
      {/* bottom bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[8px] md:text-[9px]">
        <div className="flex items-center gap-1.5">
          <span>Scroll</span>
          <span>⌄</span>
        </div>
        <span>Services</span>
      </div>
    </div>
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
    <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#0F2C47" }}>
      {/* grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* orange glow top right */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full" style={{ background: "radial-gradient(circle, rgba(230,126,34,0.35), transparent 70%)" }} />
      {/* top strip */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-2" style={{ backgroundColor: "#E67E22" }}>
        <div className="flex items-center gap-1.5 text-white text-[8px] tracking-[0.2em] uppercase">
          <span className="h-1 w-1 rounded-full bg-white animate-pulse" />
          Urgence 24/7
        </div>
        <span className="text-white text-[8px] font-semibold">02 43 52 18 90</span>
      </div>
      {/* nav */}
      <div className="absolute top-10 left-4 right-4 flex items-center justify-between text-[8px] tracking-[0.2em] uppercase text-white/60">
        <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: 12 }} className="normal-case tracking-tight">
          <span className="text-white">Atelier</span>
          <span style={{ color: "#E67E22" }}> Marceau</span>
        </span>
        <div className="hidden md:flex gap-3">
          <span>Services</span><span>Zone</span><span>Contact</span>
        </div>
      </div>
      {/* title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-6">
        <div
          className="text-white text-3xl md:text-5xl text-center leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Un plombier
          <br />
          <em style={{ color: "#E67E22" }}>de confiance</em>.
        </div>
      </div>
      {/* CTA pills */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 whitespace-nowrap">
        <div className="text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded font-bold whitespace-nowrap" style={{ backgroundColor: "#E67E22", color: "#fff" }}>
          02 43 52 18 90
        </div>
        <div className="text-[8px] tracking-[0.2em] uppercase px-3 py-1.5 rounded border border-white/30 text-white whitespace-nowrap">
          Devis →
        </div>
      </div>
    </div>
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
