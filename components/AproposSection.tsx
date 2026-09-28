"use client";

import Reveal from "@/components/Reveal";

/** Bandeau compact : photo + présentation courte. La page complète est /a-propos. */
export default function AproposSection() {
  return (
    <section
      id="apropos"
      className="mx-auto section-x section-y-sm"
      style={{ maxWidth: 1320 }}
    >
      <Reveal>
        <div
          className="grid sm:grid-cols-[auto_1fr] items-center"
          style={{
            gap: "clamp(24px, 4vw, 48px)",
            padding: "clamp(24px, 3vw, 40px)",
            borderRadius: 20,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <img
            src="/nathan.webp"
            alt="Nathan Fautrat, fondateur de Studio FTT"
            width={951}
            height={1268}
            loading="lazy"
            className="object-cover"
            style={{ width: 140, height: 170, borderRadius: 14 }}
          />
          <div>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 1, margin: "0 0 14px" }}
            >
              LE STUDIO, C&apos;EST{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                moi
              </em>
            </h2>
            <p
              style={{
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: 1.55,
                color: "var(--ftt-text-mid)",
                margin: "0 0 10px",
                maxWidth: 720,
              }}
            >
              Studio FTT, c&apos;est une personne, pas une agence à étages. Vous
              m&apos;appelez, c&apos;est moi qui décroche, qui conçois votre site
              et qui le mets en ligne. Nathan Fautrat, designer et développeur web
              indépendant en Sarthe, disponible dans toute la France.
            </p>
            <h3
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ftt-text-dim)",
                fontWeight: 500,
                margin: "0 0 18px",
              }}
            >
              Création de site internet au Mans, en Sarthe et dans toute la France
            </h3>
            <a
              href="/a-propos"
              style={{
                color: "var(--ftt-cream)",
                fontSize: 14,
                textDecoration: "underline",
                textUnderlineOffset: 4,
                textDecorationColor: "var(--ftt-line-strong)",
              }}
            >
              En savoir plus sur moi <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
