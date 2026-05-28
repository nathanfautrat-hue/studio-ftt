"use client";

import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { PLANS, type Plan } from "@/lib/data";

export default function TarifsSection() {
  return (
    <section
      id="tarifs"
      className="mx-auto section-x section-y"
      style={{ maxWidth: 1320 }}
    >
      <Reveal>
        <SectionHeader num="02" label="Tarifs" title="LES TARIFS." />
      </Reveal>

      <div className="grid md:grid-cols-3 gap-5 mt-12 md:mt-20 lg:mt-24">
        {PLANS.map((plan: Plan, i: number) => (
          <Reveal key={plan.id} delay={((i + 1) as 1 | 2 | 3)}>
            <article
              className="lift flex flex-col"
              style={{
                position: "relative",
                padding: "clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px)",
                minHeight: 280,
                height: "100%",
                borderRadius: 18,
                overflow: "hidden",
                background: plan.featured
                  ? "linear-gradient(180deg, rgba(232,53,42,0.12), rgba(255,255,255,0.02))"
                  : "linear-gradient(180deg, rgba(232,53,42,0.05), rgba(255,255,255,0.02))",
                border: plan.featured
                  ? "1px solid rgba(232,53,42,0.4)"
                  : "1px solid var(--ftt-line)",
                gap: 18,
              }}
            >
              {plan.featured && (
                <span
                  className="font-mono"
                  style={{
                    position: "absolute",
                    top: 18,
                    right: 18,
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--ftt-red)",
                  }}
                >
                  Le + choisi
                </span>
              )}
              <div>
                <h3
                  className="font-serif"
                  style={{ fontSize: 24, fontWeight: 500, margin: 0 }}
                >
                  {plan.name}
                </h3>
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(36px, 5vw, 52px)",
                    lineHeight: 1,
                    marginTop: 8,
                    color: "var(--ftt-cream)",
                  }}
                >
                  {plan.price}
                </div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ftt-text-dim)",
                    marginTop: 6,
                  }}
                >
                  {plan.sub}
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
                {plan.desc}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-10 flex justify-center">
          <a
            href="/tarifs"
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
            Voir le détail des tarifs <span aria-hidden>→</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
