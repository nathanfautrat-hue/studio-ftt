"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { APPROCHE, type ApprocheStep } from "@/lib/data";

/* ---------------------------------------------------------------------------
 * Visuels des cartes : photos Pexels libres de droits + petit badge par-dessus.
 * Logo : toujours le vrai logo Studio FTT (/logo_ftt.png).
 * ------------------------------------------------------------------------- */

const badge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "9px 14px",
  borderRadius: 999,
  background: "rgba(10,10,10,0.82)",
  border: "1px solid rgba(255,255,255,0.1)",
  fontSize: 12,
  fontWeight: 500,
};

const VISUELS: { src: string; alt: string; overlay: React.ReactNode }[] = [
  {
    src: "/approche-1.webp",
    alt: "Téléphone affichant un appel en cours (photo Pexels)",
    overlay: (
      <span style={badge}>
        <img src="/logo_ftt.png" alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
        Appel découverte
        <span className="font-mono" style={{ fontSize: 10, color: "var(--ftt-green)", letterSpacing: "0.1em" }}>
          · 30 MIN
        </span>
      </span>
    ),
  },
  {
    src: "/approche-2.webp",
    alt: "Designer travaillant sur une maquette avec une tablette graphique (photo Pexels)",
    overlay: (
      <span style={{ ...badge, color: "var(--ftt-green)", borderColor: "rgba(59,245,156,0.35)" }}>
        ✓ Maquette validée
      </span>
    ),
  },
  {
    src: "/approche-3.webp",
    alt: "Ordinateur portable ouvert dans la pénombre (photo Pexels)",
    overlay: (
      <span style={badge}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--ftt-green)" }} />
        Votre site est en ligne
      </span>
    ),
  },
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
                    style={{ filter: "grayscale(0.35) brightness(0.7) contrast(1.05)" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, rgba(15,15,15,0) 35%, #0f0f0f 100%)" }}
                  />
                  <div className="absolute" style={{ left: 20, bottom: 18 }}>
                    {v.overlay}
                  </div>
                </div>

                {/* Texte */}
                <div style={{ padding: "8px clamp(22px, 2.5vw, 30px) clamp(26px, 3vw, 34px)" }}>
                  <h3 style={{ fontSize: 19, fontWeight: 500, margin: "0 0 12px", lineHeight: 1.3 }}>
                    <span style={{ color: "var(--ftt-red)" }}>{step.num}</span>
                    <span style={{ color: "var(--ftt-text-dim)" }}> — </span>
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
