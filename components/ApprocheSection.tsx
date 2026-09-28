"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { APPROCHE, type ApprocheStep } from "@/lib/data";

/* ---------------------------------------------------------------------------
 * Visuels des cartes : photos Pexels libres de droits, montées en mockup
 * (écran d'appel avec le vrai logo /logo_ftt.png, démo Marceau sur le portable).
 * ------------------------------------------------------------------------- */
const VISUELS: { src: string; alt: string }[] = [
  { src: "/approche-1.webp", alt: "Téléphone affichant un appel avec Studio FTT, à côté d'un café" },
  { src: "/approche-2.webp", alt: "Croquis de maquette de site sur papier" },
  { src: "/approche-3.webp", alt: "Ordinateur portable affichant un site réalisé par Studio FTT" },
];

export default function ApprocheSection() {
  return (
    <section
      id="approche"
      className="mx-auto section-x section-y-sm"
      style={{ maxWidth: 1320 }}
    >
      <Reveal>
        <SectionHeader
          num="01"
          label="Mon approche"
          title=""
          titleChildren={
            <>
              DU PREMIER APPEL{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                à la mise en ligne
              </em>
            </>
          }
        />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-4">
        {APPROCHE.map((step: ApprocheStep, i: number) => {
          const v = VISUELS[i % VISUELS.length];
          return (
            <Reveal key={step.num} delay={((i + 1) as 1 | 2 | 3)}>
              <article
                className="flex flex-col h-full overflow-hidden"
                style={{ borderRadius: 22, background: "#0f0f0f" }}
              >
                {/* Zone visuelle : photo + badge */}
                <div className="relative" style={{ height: 250 }}>
                  <img
                    src={v.src}
                    alt={v.alt}
                    width={900}
                    height={558}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "brightness(0.85)" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(15,15,15,0) 55%, #0f0f0f 100%)" }}
                  />
                </div>

                {/* Texte */}
                <div style={{ padding: "8px clamp(22px, 2.5vw, 30px) clamp(26px, 3vw, 34px)" }}>
                  <h3 style={{ fontSize: 19, fontWeight: 500, margin: "0 0 12px", lineHeight: 1.3 }}>
                    <span style={{ color: "var(--ftt-red)" }}>{step.num}</span>
                    {" "}
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ftt-text-mid)", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
