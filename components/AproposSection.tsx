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
              SALUT, MOI C&apos;EST{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                Nathan
              </em>
              .
            </>
          }
        />
      </Reveal>

      <div className="mt-12 md:mt-16" style={{ maxWidth: 760 }}>
        <Reveal delay={1}>
          <p
            style={{
              fontSize: "clamp(18px, 2.2vw, 22px)",
              lineHeight: 1.5,
              color: "var(--ftt-text-mid)",
              margin: 0,
            }}
          >
            19 ans, basé en Sarthe, je crée des sites web faits main pour les
            artisans, indépendants et petites équipes. Pas d&apos;agence à
            étages&nbsp;: vous m&apos;appelez, c&apos;est moi qui décroche, qui
            dessine, qui code et qui met votre site en ligne.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8">
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
      </div>
    </section>
  );
}
