"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { APPROCHE, type ApprocheStep } from "@/lib/data";

/* ---------------------------------------------------------------------------
 * Visuels des cartes : petites interfaces dessinées en HTML/CSS (pas d'images).
 * ------------------------------------------------------------------------- */

const glass: React.CSSProperties = {
  background: "rgba(24,24,24,0.85)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
  boxShadow: "0 24px 50px -20px rgba(0,0,0,0.9)",
};

function Icon({ d, red = false }: { d: string; red?: boolean }) {
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{
        width: 38,
        height: 38,
        borderRadius: 999,
        background: red ? "var(--ftt-red)" : "rgba(255,255,255,0.08)",
      }}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F4EFE6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </span>
  );
}

function VisuelAppel() {
  return (
    <div className="flex flex-col items-center" style={{ gap: 14 }}>
      <div className="flex items-center" style={{ ...glass, gap: 12, padding: "12px 18px" }}>
        <span
          className="font-display inline-flex items-center justify-center"
          style={{ width: 36, height: 36, borderRadius: 999, background: "#111", color: "var(--ftt-red)", fontSize: 14 }}
        >
          FTT
        </span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Appel découverte</div>
          <div className="font-mono" style={{ fontSize: 10, color: "var(--ftt-green)", letterSpacing: "0.1em" }}>
            EN COURS · 12:48
          </div>
        </div>
      </div>
      <div className="flex" style={{ ...glass, gap: 10, padding: 10, borderRadius: 999 }}>
        <Icon d="M15 10l5-3v10l-5-3M3 7h12v10H3z" />
        <Icon d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" />
        <Icon red d="M4 14c4-4 12-4 16 0l-2 3-3-1v-2c-2-.6-4-.6-6 0v2l-3 1z" />
        <Icon d="M3 5h18v11H3zM8 20h8M12 16v4" />
      </div>
    </div>
  );
}

function VisuelMaquette() {
  const bar = (w: string, o = 0.12) => (
    <div style={{ height: 8, width: w, borderRadius: 4, background: `rgba(244,239,230,${o})` }} />
  );
  return (
    <div className="relative" style={{ width: "78%", maxWidth: 300 }}>
      <div style={{ ...glass, padding: 14 }}>
        <div className="flex" style={{ gap: 5, marginBottom: 14 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 7, height: 7, borderRadius: 999, background: "rgba(255,255,255,0.18)" }} />
          ))}
        </div>
        <div className="grid" style={{ gap: 8 }}>
          {bar("70%", 0.5)}
          {bar("45%", 0.25)}
          <div style={{ height: 54, borderRadius: 8, background: "linear-gradient(135deg, rgba(232,53,42,0.35), rgba(232,53,42,0.08))", margin: "4px 0" }} />
          <div className="grid grid-cols-3" style={{ gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 30, borderRadius: 6, background: "rgba(255,255,255,0.06)" }} />
            ))}
          </div>
        </div>
      </div>
      <span
        className="font-mono absolute"
        style={{
          right: -14,
          bottom: -14,
          padding: "7px 12px",
          borderRadius: 999,
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "var(--ftt-green)",
          background: "rgba(10,10,10,0.92)",
          border: "1px solid rgba(59,245,156,0.35)",
        }}
      >
        ✓ MAQUETTE VALIDÉE
      </span>
    </div>
  );
}

function VisuelEnLigne() {
  return (
    <div style={{ width: "82%", maxWidth: 320 }}>
      <div className="flex items-center" style={{ ...glass, gap: 10, padding: "10px 14px", borderRadius: 999, marginBottom: 12 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(244,239,230,0.6)" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <span style={{ fontSize: 12, color: "rgba(244,239,230,0.75)" }}>votre métier + votre ville</span>
      </div>
      <div style={{ ...glass, padding: 14 }}>
        <div className="flex items-center" style={{ gap: 8, marginBottom: 6 }}>
          <span style={{ width: 18, height: 18, borderRadius: 999, background: "var(--ftt-red)" }} />
          <span style={{ fontSize: 11, color: "rgba(244,239,230,0.55)" }}>votre-entreprise.fr</span>
        </div>
        <div style={{ fontSize: 14, color: "#8AB4F8", marginBottom: 6 }}>Votre entreprise · Votre métier</div>
        <div style={{ height: 7, width: "90%", borderRadius: 4, background: "rgba(244,239,230,0.12)", marginBottom: 5 }} />
        <div style={{ height: 7, width: "65%", borderRadius: 4, background: "rgba(244,239,230,0.12)" }} />
      </div>
    </div>
  );
}

const VISUELS = [VisuelAppel, VisuelMaquette, VisuelEnLigne];

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
          const Visuel = VISUELS[i % VISUELS.length];
          return (
            <Reveal key={step.num} delay={((i + 1) as 1 | 2 | 3)}>
              <article
                className="flex flex-col h-full overflow-hidden"
                style={{ borderRadius: 22, background: "#0f0f0f" }}
              >
                {/* Zone visuelle */}
                <div
                  aria-hidden
                  className="relative flex items-center justify-center"
                  style={{
                    height: 250,
                    background:
                      "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(232,53,42,0.16), transparent 70%), linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%)",
                  }}
                >
                  <Visuel />
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
