"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import { PLANS } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";

const COMPARATIF = {
  cols: ["Wix / Squarespace", "Freelance classique", "Studio FTT", "Agence web"],
  rows: [
    { label: "Prix", cells: ["17 à 30 €/mois, à vie", "800 à 1 500 €", "500 à 1 000 € one-shot", "1 800 à 2 500 €+"] },
    { label: "Qui fait le travail", cells: ["Vous, seul", "Le freelance", "Moi, en direct", "Une équipe + un chef de projet"] },
    { label: "Délai", cells: ["Selon votre temps libre", "Variable", "14 jours ouvrés", "6 à 12 semaines"] },
    { label: "Design", cells: ["Template à adapter", "Selon le profil", "Sur-mesure pour votre métier", "Sur-mesure"] },
    { label: "SEO", cells: ["À faire vous-même", "Souvent en option", "Inclus dès 500 €", "Inclus"] },
    { label: "Abonnement", cells: ["Obligatoire, sinon le site disparaît", "Selon le prestataire", "Aucun obligatoire", "Maintenance en supplément"] },
  ],
};

const TARIFS_FAQ = [
  {
    q: "Combien coûte un site internet pour un artisan ou un indépendant ?",
    a: "Chez moi, entre 500 et 1 000 €. Le pack Vitrine à 500 € couvre un site d'une page avec formulaire de contact et SEO de base. Le pack Visibilité à 750 € monte jusqu'à 3 pages, avec un référencement plus poussé et votre fiche Google configurée. Au-delà, c'est du sur-mesure sur devis, à partir de 1 000 €. Le prix se paie une fois, pas tous les mois.",
  },
  {
    q: "Pourquoi 500 € quand une agence facture 1 800 € ?",
    a: "Une agence facture un site équivalent entre 1 800 et 2 500 € parce qu'elle paie des locaux, des commerciaux et un chef de projet. Moi je travaille seul, avec les mêmes outils. Vous payez le travail, pas la structure autour.",
  },
  {
    q: "Wix coûte 17 €/mois, pourquoi payer 500 € ?",
    a: "Sur 3 ans, un abonnement Wix revient à environ 600 €, et c'est vous qui faites tout : le design, les textes, le référencement. Si vous arrêtez de payer, votre site disparaît. Chez moi, vous payez une fois, et c'est moi qui construis le site pour votre métier — pas un template à remplir le dimanche soir.",
  },
  {
    q: "Y a-t-il des frais après l'achat du site ?",
    a: "Aucun abonnement obligatoire. Deux frais existent quand même : votre nom de domaine, une dizaine d'euros par an, payé à votre nom. Et l'hébergement, offert la première année, puis 10 €/mois ou inclus dans la maintenance à 35 €/mois si vous la prenez.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Un devis écrit, valable 30 jours. Vous versez un acompte de 30 % à la signature pour lancer les travaux, et le solde se règle avant la mise en ligne. Tout est posé par écrit avant de commencer.",
  },
  {
    q: "Le délai de 14 jours ouvrés démarre quand ?",
    a: "À la réception de votre acompte et de vos contenus : textes, photos, logo. C'est le temps qu'il me faut pour concevoir la maquette, la faire valider et mettre le site en ligne. S'il vous manque des éléments, je démarre avec ce que vous avez.",
  },
];

export default function Tarifs() {
  const [open, setOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

      {/* COMPARATIF */}
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(02)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Comparer avant de choisir
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.95, margin: "0 0 16px" }}
          >
            WIX, FREELANCE, AGENCE…{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              ou moi
            </em>
            .
          </h2>
        </Reveal>

        <Reveal delay={2}>
          <p
            style={{
              fontSize: 16,
              color: "var(--ftt-text-mid)",
              maxWidth: 720,
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            Quatre façons d&apos;avoir un site. Comparez avant de signer, chez moi ou ailleurs.
          </p>
        </Reveal>

        <Reveal delay={3}>
          <p
            className="font-mono md:hidden"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              margin: "0 0 12px",
            }}
          >
            Faites glisser le tableau →
          </p>
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table
              style={{
                width: "100%",
                minWidth: 760,
                borderCollapse: "collapse",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              <thead>
                <tr>
                  <th aria-hidden style={{ width: "16%" }} />
                  {COMPARATIF.cols.map((c) => (
                    <th
                      key={c}
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "14px 16px",
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: c === "Studio FTT" ? "var(--ftt-red)" : "var(--ftt-text-dim)",
                        background: c === "Studio FTT" ? "rgba(232,53,42,0.07)" : "transparent",
                        borderBottom: "1px solid var(--ftt-line-strong)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARATIF.rows.map((row) => (
                  <tr key={row.label}>
                    <th
                      scope="row"
                      style={{
                        textAlign: "left",
                        padding: "16px 16px 16px 0",
                        fontSize: 12,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        color: "var(--ftt-text-dim)",
                        borderBottom: "1px solid var(--ftt-line)",
                        verticalAlign: "top",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.label}
                    </th>
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: "16px",
                          color: ci === 2 ? "var(--ftt-cream)" : "var(--ftt-text-mid)",
                          fontWeight: ci === 2 ? 500 : 400,
                          background: ci === 2 ? "rgba(232,53,42,0.07)" : "transparent",
                          borderBottom: "1px solid var(--ftt-line)",
                          verticalAlign: "top",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: "var(--ftt-text-dim)", marginTop: 16, lineHeight: 1.6 }}>
            Fourchettes constatées en France en 2026 pour un site vitrine de TPE. Forfaits Wix
            Light à Essentiel : 16,80 à 30 €/mois, nom de domaine en plus dès la 2ème année.
          </p>
        </Reveal>
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(03)</span>
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(04)</span>
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

      {/* FAQ TARIFS */}
      <section
        className="mx-auto section-x"
        style={{
          maxWidth: 1320,
          borderTop: "1px solid var(--ftt-line)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <JsonLd data={faqPageSchema(TARIFS_FAQ)} />

        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(05)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Questions sur les prix
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(40px, 7vw, 96px)", lineHeight: 0.95, margin: "0 0 40px" }}
          >
            AVANT DE{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              sortir la carte
            </em>
            .
          </h2>
        </Reveal>

        <div style={{ maxWidth: 860 }}>
          {TARIFS_FAQ.map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <Reveal key={i} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                <div style={{ borderBottom: "1px solid var(--ftt-line)" }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
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
                    <span style={{ fontSize: "clamp(16px, 2vw, 19px)", fontWeight: 500, lineHeight: 1.3 }}>
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
                  {/* Réponse toujours dans le DOM (SEO + conformité FAQPage), repli en CSS */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.25s ease",
                    }}
                  >
                    <p
                      style={{
                        overflow: "hidden",
                        minHeight: 0,
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: "var(--ftt-text-mid)",
                        paddingBottom: isOpen ? 24 : 0,
                        transition: "padding-bottom 0.25s ease",
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
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
