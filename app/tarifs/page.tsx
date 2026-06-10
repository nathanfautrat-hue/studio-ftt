"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import { PLANS } from "@/lib/data";

export default function Tarifs() {
  const [open, setOpen] = useState(false);

  return (
    <main
      className="ftt-grain"
      style={{ background: "var(--ftt-black)", color: "var(--ftt-cream)" }}
    >
      <Navbar />

      {/* HERO */}
      <section
        className="mx-auto section-x"
        style={{ maxWidth: 1320, paddingTop: "clamp(80px, 12vw, 160px)", paddingBottom: "clamp(48px, 6vw, 80px)" }}
      >
        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>
              (01)
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ftt-text-dim)",
              }}
            >
              Tarifs
            </span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(52px, 11vw, 160px)",
              lineHeight: 0.92,
              margin: "0 0 clamp(16px, 2vw, 24px)",
            }}
          >
            COMBIEN{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              ça coûte
            </em>
            .
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <div
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(232,53,42,0.4)",
                background: "rgba(232,53,42,0.07)",
                fontSize: 13,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--ftt-cream)",
              }}
            >
              <span style={{ color: "var(--ftt-red)", fontSize: 16 }}>⚡</span>
              Livraison en 14 jours ouvrés
            </div>
          </div>
        </Reveal>
      </section>

      {/* PLANS */}
      <section
        className="mx-auto section-x"
        style={{ maxWidth: 1320, paddingBottom: "clamp(64px, 8vw, 120px)" }}
      >
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={((i + 1) as 1 | 2 | 3)}>
              <div
                className="flex flex-col"
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: 18,
                  border: plan.featured
                    ? "1px solid rgba(232,53,42,0.5)"
                    : "1px solid var(--ftt-line-strong)",
                  background: plan.featured
                    ? "linear-gradient(160deg, rgba(232,53,42,0.08), rgba(255,255,255,0.01))"
                    : "rgba(255,255,255,0.02)",
                  padding: "clamp(24px, 3vw, 36px)",
                  gap: 0,
                }}
              >
                {plan.featured && (
                  <div
                    className="font-mono"
                    style={{
                      position: "absolute",
                      top: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--ftt-red)",
                      color: "#fff",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      padding: "5px 16px",
                      borderRadius: "0 0 10px 10px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Le plus choisi
                  </div>
                )}

                {/* Header plan */}
                <div style={{ marginBottom: 24, paddingTop: plan.featured ? 12 : 0 }}>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: plan.featured ? "var(--ftt-red)" : "var(--ftt-text-dim)",
                      marginBottom: 10,
                    }}
                  >
                    {plan.id}
                  </div>
                  <div
                    className="font-display"
                    style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1, marginBottom: 6 }}
                  >
                    {plan.name.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: 700,
                        color: plan.featured ? "var(--ftt-red)" : "var(--ftt-cream)",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: 11, color: "var(--ftt-text-dim)", letterSpacing: "0.1em" }}
                    >
                      {plan.sub}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ftt-text-mid)",
                    marginBottom: 24,
                    paddingBottom: 24,
                    borderBottom: "1px solid var(--ftt-line)",
                  }}
                >
                  {plan.desc}
                </p>

                {/* Features */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    flex: 1,
                  }}
                >
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "var(--ftt-text-mid)",
                      }}
                    >
                      <span style={{ color: "var(--ftt-red)", flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.featured ? "btn btn--solid" : "btn btn--ghost"}
                  style={{ justifyContent: "center" }}
                >
                  Démarrer <span className="btn__arrow">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OPTIONS À LA CARTE */}
      <section
        className="mx-auto section-x"
        style={{
          maxWidth: 1320,
          borderTop: "1px solid var(--ftt-line)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 32 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>+</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Options à la carte
            </span>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { name: "Page supplémentaire", price: "300 €", note: "par page, au-delà du pack" },
            { name: "Copywriting", price: "250 €", note: "rédaction des textes de votre site" },
            { name: "Blog intégré", price: "350 €", note: "avec 3 articles rédigés" },
          ].map((o, i) => (
            <Reveal key={o.name} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div
                style={{
                  padding: "clamp(20px, 2.5vw, 28px)",
                  borderRadius: 16,
                  border: "1px solid var(--ftt-line)",
                  background: "rgba(255,255,255,0.02)",
                  height: "100%",
                }}
              >
                <div
                  className="font-display"
                  style={{ fontSize: "clamp(24px, 2.6vw, 32px)", lineHeight: 1, marginBottom: 12, color: "var(--ftt-cream)" }}
                >
                  {o.price}
                </div>
                <div style={{ fontSize: 15, color: "var(--ftt-cream)", marginBottom: 4 }}>{o.name}</div>
                <div
                  className="font-mono"
                  style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--ftt-text-dim)" }}
                >
                  {o.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MAINTENANCE */}
      <section
        className="mx-auto section-x"
        style={{
          maxWidth: 1320,
          borderTop: "1px solid var(--ftt-line)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 32 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(02)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Maintenance mensuelle
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal delay={1}>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(36px, 6vw, 90px)", lineHeight: 0.95, margin: 0 }}
            >
              35 €{" "}
              <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-text-mid)" }}>
                /mois.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Hébergement & sécurité inclus",
                "Mises à jour techniques",
                "3 modifications incluses par mois",
                "50 €/h au-delà des 3 modifications",
                "Support par email",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 15,
                    color: "var(--ftt-text-mid)",
                  }}
                >
                  <span style={{ color: "var(--ftt-red)", flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
              <p style={{ fontSize: 13, color: "var(--ftt-text-dim)", marginTop: 8, lineHeight: 1.5 }}>
                Sans maintenance : 1 modification gratuite incluse à la livraison, puis 50 €/h.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMPAGNES */}
      <section
        className="mx-auto section-x"
        style={{
          maxWidth: 1320,
          borderTop: "1px solid var(--ftt-line)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(03)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Campagnes publicitaires
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.95, margin: "0 0 16px" }}
          >
            ALLER{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              chercher
            </em>{" "}
            les clients.
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p
            style={{
              fontSize: 16,
              color: "var(--ftt-text-mid)",
              maxWidth: 720,
              lineHeight: 1.6,
              marginBottom: 48,
            }}
          >
            Gestion de campagnes Google Ads et SEO local.
            Tarif mensuel sans engagement —{" "}
            <span style={{ color: "var(--ftt-cream)", fontWeight: 500 }}>
              budget publicitaire en plus, payé directement à Google
            </span>{" "}
            (≥ 300 €/mois recommandé pour des résultats sérieux).
          </p>
        </Reveal>

        <div className="mx-auto" style={{ maxWidth: 540 }}>
          {[
            {
              id: "google-ads",
              name: "Google Ads",
              price: "500 €",
              sub: "/mois · hors budget pub",
              featured: true,
              desc: "Pour aller chercher les clients qui tapent vos services sur Google, au moment précis où ils en ont besoin.",
              features: [
                "Création et gestion de votre campagne Google Ads",
                "Optimisation continue (mots-clés, enchères, annonces)",
                "SEO local renforcé pour remonter dans Google",
                "Accès Google Analytics pour suivre vos résultats en direct",
              ],
            },
          ].map((c, i) => (
            <Reveal key={c.id} delay={((i + 1) as 1 | 2)}>
              <div
                className="flex flex-col"
                style={{
                  position: "relative",
                  height: "100%",
                  borderRadius: 18,
                  border: c.featured
                    ? "1px solid rgba(232,53,42,0.5)"
                    : "1px solid var(--ftt-line-strong)",
                  background: c.featured
                    ? "linear-gradient(160deg, rgba(232,53,42,0.08), rgba(255,255,255,0.01))"
                    : "rgba(255,255,255,0.02)",
                  padding: "clamp(24px, 3vw, 36px)",
                }}
              >
                <div style={{ marginBottom: 24 }}>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: c.featured ? "var(--ftt-red)" : "var(--ftt-text-dim)",
                      marginBottom: 10,
                    }}
                  >
                    {c.id}
                  </div>
                  <div
                    className="font-display"
                    style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1, marginBottom: 6 }}
                  >
                    {c.name.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: 700,
                        color: c.featured ? "var(--ftt-red)" : "var(--ftt-cream)",
                        lineHeight: 1,
                      }}
                    >
                      {c.price}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: 11, color: "var(--ftt-text-dim)", letterSpacing: "0.1em" }}
                    >
                      {c.sub}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--ftt-text-mid)",
                    marginBottom: 24,
                    paddingBottom: 24,
                    borderBottom: "1px solid var(--ftt-line)",
                  }}
                >
                  {c.desc}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    flex: 1,
                  }}
                >
                  {c.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 14,
                        lineHeight: 1.5,
                        color: "var(--ftt-text-mid)",
                      }}
                    >
                      <span style={{ color: "var(--ftt-red)", flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={c.featured ? "btn btn--solid" : "btn btn--ghost"}
                  style={{ justifyContent: "center" }}
                >
                  En discuter <span className="btn__arrow">→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={3}>
          <p
            style={{
              fontSize: 13,
              color: "var(--ftt-text-dim)",
              marginTop: 24,
              lineHeight: 1.6,
              maxWidth: 720,
            }}
          >
            Sans engagement, résiliable à tout moment avec un mois de préavis.
            Le budget publicitaire Google est payé directement par vos soins à la plateforme, vous gardez la main sur vos dépenses.
          </p>
        </Reveal>
      </section>

      {/* CTA FINAL */}
      <section
        className="mx-auto section-x"
        style={{
          maxWidth: 1320,
          borderTop: "1px solid var(--ftt-line)",
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(80px, 10vw, 160px)",
          textAlign: "center",
        }}
      >
        <Reveal>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(40px, 8vw, 120px)", lineHeight: 0.95, margin: "0 0 24px" }}
          >
            UN DOUTE ?{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              On s&apos;appelle.
            </em>
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p style={{ fontSize: 16, color: "var(--ftt-text-mid)", marginBottom: 36 }}>
            15 minutes, sans engagement. Je réponds à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
              Réserver un appel <span className="btn__arrow">→</span>
            </a>
            <a href="/#contact" className="btn btn--ghost">
              M&apos;écrire <span className="btn__arrow">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
