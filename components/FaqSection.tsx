"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { FAQ, type FaqItem } from "@/lib/data";
import { faqPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="mx-auto section-x section-y"
      style={{ maxWidth: 1320, borderTop: "1px solid var(--ftt-line)" }}
    >
      <JsonLd data={faqPageSchema(FAQ)} />

      <Reveal>
        <SectionHeader num="05" label="Questions fréquentes" title="FAQ." />
      </Reveal>

      <div style={{ maxWidth: 860 }}>
        {FAQ.map((item: FaqItem, i: number) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div style={{ borderBottom: "1px solid var(--ftt-line)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left flex justify-between items-center"
                  aria-expanded={isOpen}
                  style={{
                    padding: "22px 0",
                    gap: 20,
                    background: "none",
                    border: 0,
                    cursor: "pointer",
                    color: "var(--ftt-cream)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(16px, 2vw, 19px)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      color: "var(--ftt-red)",
                      fontSize: 28,
                      lineHeight: 1,
                      flexShrink: 0,
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transition: "transform 0.25s ease",
                      display: "block",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: "var(--ftt-text-mid)",
                      paddingBottom: 24,
                      margin: 0,
                    }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
