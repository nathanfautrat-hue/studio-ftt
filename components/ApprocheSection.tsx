"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { APPROCHE, type ApprocheStep } from "@/lib/data";

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
        {APPROCHE.map((step: ApprocheStep, i: number) => (
          <Reveal key={step.num} delay={((i + 1) as 1 | 2 | 3)}>
            <div
              className="flex flex-col h-full"
              style={{
                gap: 14,
                padding: "clamp(22px, 2.5vw, 28px)",
                borderRadius: 18,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div
                className="font-serif"
                style={{
                  fontStyle: "italic",
                  fontSize: "clamp(28px, 2.6vw, 36px)",
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
                    fontSize: "clamp(22px, 2vw, 28px)",
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
                  fontSize: 14,
                  lineHeight: 1.55,
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
