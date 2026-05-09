"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { APPROCHE, type ApprocheStep } from "@/lib/data";

export default function ApprocheSection() {
  return (
    <section
      id="approche"
      className="mx-auto section-x section-y"
      style={{ maxWidth: 1320 }}
    >
      <Reveal>
        <SectionHeader
          num="01"
          label="Notre approche"
          title=""
          titleChildren={
            <>
              DU SUR-MESURE.{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-text-mid)" }}
              >
                Pensé
              </em>{" "}
              pour vous.{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                Et
              </em>{" "}
              avec vous.
            </>
          }
        />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mt-12 md:mt-20 lg:mt-24">
        {APPROCHE.map((step: ApprocheStep, i: number) => (
          <Reveal key={step.num} delay={((i + 1) as 1 | 2 | 3)}>
            <article
              className="lift flex flex-col justify-between"
              style={{
                position: "relative",
                padding: "clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 28px)",
                minHeight: 320,
                height: "100%",
                borderRadius: 18,
                overflow: "hidden",
                background:
                  "linear-gradient(180deg, rgba(232,53,42,0.05), rgba(255,255,255,0.02))",
                border: "1px solid var(--ftt-line)",
                gap: 24,
              }}
            >
              <div className="flex justify-between items-start">
                <span
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ftt-text-dim)",
                  }}
                >
                  Étape
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(56px, 6vw, 80px)",
                    lineHeight: 1,
                    color: "var(--ftt-red)",
                  }}
                >
                  {step.num}
                </span>
              </div>
              <div>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 36px)",
                    margin: "0 0 14px",
                    fontWeight: 500,
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--ftt-text-mid)",
                    margin: "0 0 18px",
                  }}
                >
                  {step.desc}
                </p>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ftt-cream)",
                    paddingTop: 14,
                    borderTop: "1px solid var(--ftt-line-strong)",
                  }}
                >
                  {step.action}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
