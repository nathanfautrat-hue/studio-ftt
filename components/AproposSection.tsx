"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";

export default function AproposSection() {
  return (
    <section
      id="apropos"
      className="mx-auto section-x section-y"
      style={{ maxWidth: 1320 }}
    >
      <Reveal>
        <SectionHeader
          num="04"
          label="À propos"
          title=""
          titleChildren={
            <>
              LE STUDIO, C&apos;EST{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                moi
              </em>
              .
            </>
          }
        />
      </Reveal>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16 items-center mt-12 md:mt-20">
        <Reveal delay={1}>
          <div>
            <p
              style={{
                fontSize: "clamp(18px, 2.2vw, 22px)",
                lineHeight: 1.5,
                color: "var(--ftt-text-mid)",
                margin: "0 0 32px",
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
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ftt-text-dim)",
                fontWeight: 500,
                margin: "0 0 28px",
              }}
            >
              Création de site internet au Mans, en Sarthe et dans toute la France
            </h3>
            <a
              href="/a-propos"
              className="lift inline-flex items-center"
              style={{
                gap: 10,
                padding: "13px 26px",
                borderRadius: 999,
                border: "1px solid var(--ftt-line-strong)",
                color: "var(--ftt-cream)",
                textDecoration: "none",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              En savoir plus sur moi <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <img
            src="/nathan.webp"
            alt="Nathan Fautrat, fondateur de Studio FTT"
            width={951}
            height={1268}
            className="w-full max-w-[280px] md:max-w-[340px] mx-auto object-cover"
            style={{ borderRadius: 16, border: "1px solid var(--ftt-line)" }}
          />
        </Reveal>
      </div>
    </section>
  );
}
