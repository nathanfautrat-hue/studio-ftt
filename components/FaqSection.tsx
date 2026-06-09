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
        <SectionHeader
          num="05"
          label="FAQ"
          title=""
          titleChildren={
            <>
              LES QUESTIONS{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                qu&apos;on me pose
              </em>
              .
            </>
          }
        />
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

      <Reveal>
        <div
          style={{
            maxWidth: 860,
            marginTop: 48,
            paddingTop: 32,
            borderTop: "1px solid var(--ftt-line)",
          }}
        >
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ftt-text-mid)",
              margin: "0 0 22px",
            }}
          >
            Vous ne trouvez pas votre réponse ? Écrivez-moi à{" "}
            <a
              href="mailto:contact@studioftt.fr"
              style={{ color: "var(--ftt-cream)", textDecoration: "underline" }}
            >
              contact@studioftt.fr
            </a>{" "}
            ou appelez le{" "}
            <a
              href="tel:+33607033804"
              style={{ color: "var(--ftt-cream)", textDecoration: "underline", whiteSpace: "nowrap" }}
            >
              06 07 03 38 04
            </a>
            .
          </p>
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            <a
              href="tel:+33607033804"
              className="lift inline-flex items-center"
              style={{
                gap: 8,
                padding: "13px 24px",
                borderRadius: 999,
                background: "var(--ftt-red)",
                color: "#fff",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              M&apos;appeler <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="lift inline-flex items-center"
              style={{
                gap: 8,
                padding: "13px 24px",
                borderRadius: 999,
                border: "1px solid var(--ftt-line-strong)",
                color: "var(--ftt-cream)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              M&apos;écrire <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
