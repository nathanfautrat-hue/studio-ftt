"use client";

import Reveal from "@/components/Reveal";
import BookingInline from "@/components/BookingInline";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden section-x section-y-sm"
      style={{ borderTop: "1px solid var(--ftt-line)" }}
    >
      {/* Halo décoratif */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(closest-side, rgba(232,53,42,0.25), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative mx-auto" style={{ maxWidth: 1320 }}>
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 24 }}>
            <span className="dot" />
            (04) — Contact
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display one-line"
            style={{
              fontSize: "clamp(40px, 6vw, 96px)",
              margin: 0,
              lineHeight: 0.92,
            }}
          >
            PROCHAIN PROJET{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              — le vôtre
            </em>
          </h2>
        </Reveal>

        {/* Calendrier Cal.com intégré, pleine largeur */}
        <Reveal delay={2}>
          <div className="mt-10">
            <BookingInline />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
