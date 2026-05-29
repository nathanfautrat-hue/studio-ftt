"use client";

import Reveal from "@/components/Reveal";

const PROFILES = [
  {
    num: "001",
    title: "Artisans & BTP",
    desc: "Vous bossez bien, mais on vous trouve pas sur Google.",
  },
  {
    num: "002",
    title: "Santé & bien-être",
    desc: "Noyé sur Doctolib, personne prend de rdv.",
  },
  {
    num: "003",
    title: "Commerces & services locaux",
    desc: "Le concurrent a un site clinquant, vous êtes invisible.",
  },
  {
    num: "004",
    title: "Consultants & coachs",
    desc: "Votre expertise vaut cher, votre site dit l'inverse.",
  },
];

export default function PourQuiSection() {
  return (
    <section
      id="pour-qui"
      className="mx-auto section-x section-y"
      style={{ maxWidth: 1320 }}
    >
      <Reveal>
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ftt-text-dim)",
            marginBottom: 24,
            display: "flex",
            gap: 14,
            alignItems: "center",
          }}
        >
          <span style={{ width: 36, height: 2, background: "var(--ftt-red)" }} />
          Pour qui ?
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-16 items-end">
        <Reveal>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(34px, 6vw, 76px)", lineHeight: 0.98, margin: 0 }}
          >
            POUR LES PROS{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              qui veulent un site à leur hauteur
            </em>
            .
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ftt-text-mid)",
              margin: 0,
            }}
          >
            Vous vous reconnaissez ? Site qui date, pas de site, ou refonte
            complète : je m&apos;occupe de tout.
          </p>
        </Reveal>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-14 md:mt-20">
        {PROFILES.map((p, i) => (
          <Reveal key={p.num} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
            <div style={{ paddingTop: 24, borderTop: "1px solid var(--ftt-line)" }}>
              <div
                className="font-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "var(--ftt-text-dim)",
                  marginBottom: 16,
                }}
              >
                {p.num}
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  margin: "0 0 12px",
                  lineHeight: 1.1,
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--ftt-text-mid)",
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
