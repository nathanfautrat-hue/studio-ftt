"use client";

import { useRef } from "react";
import CursorBlob from "@/components/CursorBlob";
import Reveal from "@/components/Reveal";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={heroRef}
      className="hero-pad relative overflow-hidden flex flex-col justify-between gap-10"
      style={{ minHeight: "calc(100svh - 80px)" }}
    >
      <CursorBlob containerRef={heroRef} />

      {/* Top row */}
      <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
        <Reveal>
          <div className="eyebrow">
            <span className="dot" />
            Studio FTT — Sites web sur-mesure
          </div>
        </Reveal>
        <Reveal>
          <div
            className="font-mono"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 999,
              border: "1px solid rgba(59,245,156,0.28)",
              background: "rgba(59,245,156,0.05)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--ftt-green)",
            }}
          >
            <span
              className="animate-pulse"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--ftt-green)",
                flexShrink: 0,
              }}
            />
            Disponible · Projets ouverts
          </div>
        </Reveal>
      </div>

      {/* Title block */}
      <div className="relative z-10">
        <Reveal delay={1}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(44px, 11vw, 150px)",
              margin: 0,
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ display: "block" }}>ON CRÉE</span>
            <span style={{ display: "block" }}>DES SITES</span>
            <span style={{ display: "block" }}>
              <span style={{ display: "inline-block", position: "relative" }}>
                QUI
                <svg
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: -10,
                    right: -10,
                    bottom: -8,
                    width: "calc(100% + 20px)",
                    height: 22,
                  }}
                  viewBox="0 0 200 22"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 12 Q 50 2, 100 12 T 198 12"
                    stroke="#E8352A"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                convertissent
              </em>
              .
            </span>
          </h1>
        </Reveal>

        <Reveal delay={2}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mt-8 lg:mt-10">
            <p
              style={{
                maxWidth: 460,
                fontSize: "clamp(15px, 1.5vw, 17px)",
                lineHeight: 1.5,
                color: "var(--ftt-text-mid)",
                margin: 0,
              }}
            >
              Studio indépendant pour artisans et PME. On dessine, on développe,
              on référence — vous obtenez un site qui rassure, et qui vous amène
              des clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a href="#projets" className="btn btn--ghost justify-center w-full sm:w-auto">
                Voir les projets <span className="btn__arrow">→</span>
              </a>
              <a href="#contact" className="btn btn--solid justify-center w-full sm:w-auto">
                Démarrer le mien <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
