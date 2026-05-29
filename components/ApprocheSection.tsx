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
              .
            </>
          }
        />
      </Reveal>

      <div className="mt-12 md:mt-20 lg:mt-24">
        {APPROCHE.map((step: ApprocheStep, i: number) => (
          <Reveal key={step.num} delay={((i + 1) as 1 | 2 | 3)}>
            <div
              className="grid gap-x-8 gap-y-3 md:grid-cols-[80px_1fr_1.4fr] items-start"
              style={{
                padding: "clamp(28px, 4vw, 40px) 0",
                borderTop: "1px solid var(--ftt-line)",
                borderBottom:
                  i === APPROCHE.length - 1 ? "1px solid var(--ftt-line)" : "none",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontStyle: "italic",
                  fontSize: "clamp(40px, 5vw, 64px)",
                  lineHeight: 1,
                  color: "var(--ftt-red)",
                }}
              >
                {step.num}
              </div>
              <div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(24px, 3vw, 34px)",
                    margin: 0,
                    lineHeight: 1.05,
                  }}
                >
                  {step.title}
                </h3>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ftt-text-dim)",
                    marginTop: 12,
                  }}
                >
                  {step.action}
                </div>
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--ftt-text-mid)",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
