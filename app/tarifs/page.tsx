"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";

const PLANS = [
  {
    id: "vitrine",
    name: "Vitrine",
    price: "500 €",
    sub: "one-shot, tout compris",
    featured: false,
    desc: "Pour démarrer avec un site propre et référencé.",
    features: [
      "Site sur-mesure (aucun template)",
      "Design adapté à votre secteur",
      "Formulaire de contact",
      "SEO de base (title, meta, structure Hn)",
      "Mise en ligne incluse",
      "1 modification gratuite",
    ],
  },
  {
    id: "visibilite",
    name: "Visibilité",
    price: "750 €",
    sub: "one-shot, tout compris",
    featured: true,
    desc: "Le choix de la plupart des artisans et indépendants.",
    features: [
      "Tout ce qu'inclut Vitrine",
      "SEO avancé (mots-clés ciblés, schema.org)",
      "Fiche Google Business Profile configurée",
      "1 modification gratuite",
    ],
  },
  {
    id: "sur-mesure",
    name: "Sur-mesure",
    price: "à partir de 1 000 €",
    sub: "devis personnalisé",
    featured: false,
    desc: "Pour les projets plus complets ou avec des besoins spécifiques.",
    features: [
      "Tout ce qu'inclut Visibilité",
      "Site multi-pages (5 pages et plus)",
      "Fonctionnalités sur mesure selon le projet",
      "1 modification gratuite",
    ],
  },
];


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
            Gestion de campagnes Google Ads, Meta (Facebook · Instagram) et SEO local.
            Tarif mensuel sans engagement —{" "}
            <span style={{ color: "var(--ftt-cream)", fontWeight: 500 }}>
              budget publicitaire en plus, payé directement à la plateforme
            </span>{" "}
            (≥ 150 €/mois recommandé pour des résultats sérieux).
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              id: "presence-locale",
              name: "Présence locale",
              price: "300 €",
              sub: "/mois · hors budget pub",
              featured: false,
              desc: "Pour rester visible sur ta zone et capter la demande locale toute l'année.",
              features: [
                "1 campagne Google Ads locale",
                "Fiche Google Business optimisée chaque mois",
                "1 visuel publicitaire par mois",
                "Rapport mensuel simple (vues · clics · appels)",
              ],
            },
            {
              id: "leader",
              name: "Leader",
              price: "600 €",
              sub: "/mois · hors budget pub",
              featured: true,
              desc: "Pour devenir le numéro 1 de ton secteur sur ta ville.",
              features: [
                "Tout ce qu'inclut Présence locale",
                "Campagnes Meta (Facebook + Instagram)",
                "Jusqu'à 4 visuels publicitaires par mois",
                "A/B test des audiences et créas",
                "SEO local renforcé (citations, backlinks)",
                "Rapport détaillé + appel stratégique mensuel",
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
                {c.featured && (
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
                    Le plus complet
                  </div>
                )}

                <div style={{ marginBottom: 24, paddingTop: c.featured ? 12 : 0 }}>
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
            Le budget publicitaire (Google, Meta) est payé directement par tes soins à la plateforme — tu gardes la main sur tes dépenses.
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
            15 minutes, sans engagement. On répond à toutes vos questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
              Réserver un appel <span className="btn__arrow">→</span>
            </a>
            <a href="/#contact" className="btn btn--ghost">
              Nous écrire <span className="btn__arrow">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
