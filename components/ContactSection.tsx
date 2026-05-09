"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  featured?: boolean;
};

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "Réserver un appel · 15 min",
    value: "calendly.com/contactstudioftt",
    href: siteConfig.calendly,
    featured: true,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Instagram",
    value: siteConfig.instagramHandle,
    href: siteConfig.instagram,
  },
  {
    label: "LinkedIn",
    value: siteConfig.linkedinHandle,
    href: siteConfig.linkedin,
  },
];

export default function ContactSection() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, description }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setSent(true);
      setNom("");
      setEmail("");
      setDescription("");
    } catch {
      setError("Une erreur est survenue. Réessayez ou écrivez-nous directement.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden section-x section-y"
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
            className="font-display"
            style={{
              fontSize: "clamp(48px, 11vw, 200px)",
              margin: 0,
              lineHeight: 0.92,
            }}
          >
            PROCHAIN PROJET
            <br />
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              — le vôtre.
            </em>
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-2 items-start mt-12 md:mt-16 lg:mt-20 gap-10 lg:gap-16">
          {/* Cartes contact */}
          <Reveal delay={2}>
            <div className="grid" style={{ gap: 14 }}>
              {CONTACT_LINKS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="lift flex justify-between items-center"
                  style={{
                    padding: "18px 22px",
                    borderRadius: 12,
                    background: c.featured
                      ? "rgba(232,53,42,0.08)"
                      : "rgba(255,255,255,0.02)",
                    border: c.featured
                      ? "1px solid rgba(232,53,42,0.45)"
                      : "1px solid var(--ftt-line)",
                    textDecoration: "none",
                    color: "var(--ftt-cream)",
                  }}
                >
                  <span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: c.featured ? "var(--ftt-red)" : "var(--ftt-text-dim)",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {c.label}
                    </span>
                    <span style={{ fontSize: 16 }}>{c.value}</span>
                  </span>
                  <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={3}>
            <form
              onSubmit={handleSubmit}
              className="grid"
              style={{
                gap: 16,
                padding: "clamp(20px, 3vw, 28px)",
                borderRadius: 18,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--ftt-line-strong)",
              }}
            >
              <input
                type="text"
                placeholder="Votre nom"
                className="input-modern"
                required
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-modern"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                rows={4}
                placeholder="Décrivez votre projet en deux lignes"
                className="input-modern"
                style={{ resize: "vertical" }}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                type="submit"
                disabled={sending}
                className="btn btn--solid"
                style={{ justifyContent: "center", padding: "18px 24px" }}
              >
                {sending ? "Envoi en cours…" : "Envoyer le message"}{" "}
                <span className="btn__arrow">→</span>
              </button>
              {sent && (
                <p style={{ color: "var(--ftt-green)", fontSize: 14, margin: 0 }}>
                  ✅ Message envoyé. On revient vers vous sous 24h.
                </p>
              )}
              {error && (
                <p style={{ color: "var(--ftt-red)", fontSize: 14, margin: 0 }}>
                  {error}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
