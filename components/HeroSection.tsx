"use client";

import Reveal from "@/components/Reveal";

/**
 * Hero : ciel étoilé + Saturne tramée en points rouges (style pixel/dither).
 * Pas de filtre blur pour rester fluide sur mobile.
 */
/** Étoiles fixes : [x %, y %, rayon px, opacité] */
const STARS: [number, number, number, number][] = [
  [32.4, 9.1, 0.6, 0.24],
  [53.6, 21.9, 0.6, 0.75],
  [21.5, 5.2, 1.2, 0.24],
  [9.1, 25.5, 0.6, 0.77],
  [63.1, 35.0, 0.6, 0.55],
  [39.7, 58.6, 0.6, 0.53],
  [13.3, 25.1, 0.6, 0.54],
  [56.0, 40.9, 0.6, 0.55],
  [63.9, 22.3, 0.6, 0.54],
  [61.9, 29.8, 1.2, 0.67],
  [46.6, 55.4, 1.0, 0.38],
  [79.4, 41.9, 0.8, 0.25],
  [30.0, 29.7, 1.0, 0.64],
  [28.8, 58.8, 0.6, 0.51],
  [16.5, 20.5, 1.2, 0.45],
  [96.2, 4.7, 1.0, 0.40],
  [35.0, 29.8, 1.2, 0.24],
  [9.4, 16.2, 0.6, 0.24],
  [70.1, 38.8, 1.2, 0.37],
  [38.6, 40.1, 0.6, 0.76],
  [35.5, 36.7, 1.2, 0.24],
  [76.8, 7.8, 0.8, 0.44],
  [91.7, 29.8, 0.8, 0.47],
  [54.9, 53.0, 1.2, 0.72],
  [27.8, 24.9, 1.0, 0.61],
  [38.0, 13.8, 0.6, 0.31],
  [23.2, 14.0, 1.2, 0.70],
  [18.2, 16.9, 0.8, 0.45],
  [36.9, 34.0, 0.8, 0.61],
  [51.5, 37.1, 0.6, 0.47],
  [87.1, 57.1, 1.2, 0.44],
  [39.4, 28.9, 1.2, 0.24],
  [6.7, 12.5, 0.8, 0.27],
  [60.1, 6.1, 0.8, 0.52],
  [94.9, 36.8, 0.6, 0.72],
  [61.4, 8.9, 1.0, 0.77],
  [60.2, 28.4, 0.6, 0.71],
  [99.3, 28.0, 1.2, 0.39],
  [14.4, 45.0, 1.0, 0.49],
  [69.2, 31.0, 0.8, 0.77],
  [52.8, 8.8, 0.6, 0.65],
  [29.8, 38.6, 0.6, 0.62],
  [26.1, 22.0, 0.8, 0.41],
  [22.3, 32.5, 1.0, 0.58],
  [61.3, 47.3, 0.8, 0.68],
  [81.8, 44.4, 0.8, 0.32],
  [49.3, 43.9, 0.6, 0.67],
  [47.2, 11.6, 1.0, 0.47],
  [93.7, 59.3, 1.0, 0.25],
  [10.2, 28.2, 1.0, 0.32],
  [62.4, 54.0, 0.6, 0.49],
  [65.3, 48.0, 0.6, 0.70],
  [12.0, 23.3, 0.8, 0.49],
  [17.9, 47.3, 1.0, 0.25],
  [94.6, 43.3, 1.2, 0.44],
  [94.7, 43.5, 0.8, 0.80],
  [2.8, 35.4, 1.2, 0.68],
  [14.6, 49.6, 1.2, 0.59],
  [35.0, 32.9, 0.8, 0.21],
  [79.9, 43.6, 0.6, 0.52],
  [93.4, 26.0, 0.8, 0.70],
  [21.1, 15.1, 1.0, 0.50],
  [76.4, 19.6, 1.2, 0.70],
  [6.1, 44.4, 1.2, 0.60],
  [81.5, 31.0, 0.8, 0.52],
  [52.4, 1.1, 1.2, 0.67],
  [60.9, 46.6, 0.8, 0.30],
  [47.3, 43.5, 0.6, 0.40],
  [51.8, 33.3, 0.6, 0.73],
  [5.7, 11.5, 0.6, 0.66]
];

export default function HeroSection() {
  return (
    <section
      className="hero-pad hero-card relative overflow-hidden flex flex-col gap-10"
    >
      {/* Ciel étoilé */}
      <svg aria-hidden className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {STARS.map(([x, y, r, o], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="#F4EFE6" opacity={o} />
        ))}
      </svg>
      {/* Saturne en points rouges (photo NASA Cassini PIA06193, domaine public, tramée) */}
      <img
        src="/hero-saturne.webp"
        alt=""
        aria-hidden
        width={1700}
        height={690}
        fetchPriority="high"
        className="hero-planet absolute pointer-events-none select-none"
      />
      {/* Voile pour garder le titre lisible (centré sur mobile, à gauche sur ordinateur) */}
      <div aria-hidden className="hero-veil absolute inset-0" />

      {/* Badge + titre + texte, colonne de gauche */}
      <div className="hero-content relative z-10 my-auto">
        <Reveal delay={1}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(36px, 7.2vw, 124px)",
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="nowrap-sm" style={{ display: "block" }}>JE CRÉE DES SITES</span>
            <span className="nowrap-sm" style={{ display: "block" }}>
              QUI{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                convertissent
              </em>
            </span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p
            style={{
              maxWidth: 560,
              fontSize: "clamp(16px, 1.5vw, 19px)",
              lineHeight: 1.55,
              color: "var(--ftt-text-mid)",
              margin: "28px 0 0",
            }}
          >
            Je crée et gère votre site web pour que{" "}
            <span style={{ color: "var(--ftt-red)" }}>vous</span> ayez une{" "}
            <span style={{ color: "var(--ftt-red)" }}>meilleure</span> visibilité.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
