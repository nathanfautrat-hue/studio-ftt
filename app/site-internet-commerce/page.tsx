"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { GarageKlaxPreview } from "@/components/ProjectPreviews";

const PROBLEMES = [
  {
    num: "01",
    title: "Les chaînes vous écrasent en ligne",
    desc: "Norauto, les franchises, les plateformes : tous ont des sites professionnels. Le client compare sur Google avant de pousser une porte, et la confiance se joue là, pas sur le trottoir.",
  },
  {
    num: "02",
    title: "Votre fiche Google est laissée à l'abandon",
    desc: "Des horaires pas à jour, deux photos sombres, des avis sans réponse : ça refroidit plus que ça rassure. Et c'est souvent la première chose que le client voit de vous.",
  },
  {
    num: "03",
    title: "Vos prestations restent un mystère",
    desc: "Le client veut savoir avant d'appeler : ce que vous faites, comment ça se passe, dans quels délais. Sans réponse en ligne, il clique sur le concurrent qui l'affiche.",
  },
];

const CONTENU_SITE = [
  {
    title: "Vos prestations, détaillées",
    desc: "Ce que vous faites, ce qui est inclus, comment ça se déroule. Le client arrive en sachant déjà ce qu'il vient chercher.",
  },
  {
    title: "Les infos pratiques qui font gagner du temps",
    desc: "Horaires, adresse, parking, moyens de paiement, prise de rendez-vous. Moins d'appels pour des questions basiques, plus d'appels utiles.",
  },
  {
    title: "Des photos de chez vous",
    desc: "Votre atelier, votre salon, votre équipe au travail. Les vraies, pas des images de banque : c'est ça qui donne envie de pousser la porte.",
  },
  {
    title: "Vos avis Google, mis en avant",
    desc: "Vous avez des clients contents ? Le site les montre. C'est la preuve sociale qui fait pencher la balance face à une chaîne.",
  },
  {
    title: "Une fiche Google reliée et configurée",
    desc: "C'est elle qui vous met sur la carte. Reliée à un site complet, elle pèse plus lourd dans les recherches locales. Incluse dans le pack Visibilité.",
  },
];

const COMMERCE_FAQ = [
  {
    q: "Combien coûte un site pour un commerce ou un garage ?",
    a: "Le plus souvent, 750 € : c'est le pack Visibilité, avec jusqu'à 3 pages, le référencement local sur votre ville et vos prestations, et votre fiche Google Business Profile configurée. Une page simple coûte 500 €. Prix one-shot, aucun abonnement obligatoire.",
  },
  {
    q: "J'ai déjà une page Facebook ou Instagram, ça ne suffit pas ?",
    a: "Les réseaux touchent les gens qui vous suivent déjà. Google capte ceux qui cherchent un garage, un institut ou une auto-école maintenant, dans votre ville — sans vous connaître. Les deux se complètent, mais la recherche locale passe par un site et une fiche Google soignés.",
  },
  {
    q: "J'ai déjà une fiche Google, pourquoi un site en plus ?",
    a: "Une fiche seule donne vos horaires et votre adresse. Le site fait le reste : détailler vos prestations, montrer votre travail, expliquer comment ça se passe. Et une fiche reliée à un vrai site a plus de poids dans les résultats locaux qu'une fiche orpheline.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "14 jours ouvrés après réception de l'acompte et de vos contenus. Vous me transmettez photos, prestations et infos pratiques, je m'occupe du reste, du design à la mise en ligne.",
  },
  {
    q: "Et si je veux changer quelque chose après ?",
    a: "Une modification gratuite est incluse à la livraison. Ensuite, c'est 50 €/h à la demande, ou la maintenance optionnelle à 35 €/mois qui couvre 3 modifications par mois, l'hébergement et les mises à jour techniques.",
  },
];

export default function SiteInternetCommerce() {
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(01)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Garages · Instituts · Auto-écoles · Commerces
            </span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(44px, 9vw, 130px)",
              lineHeight: 0.95,
              margin: "0 0 clamp(20px, 2.5vw, 32px)",
            }}
          >
            DES ANNÉES DE MÉTIER,{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              zéro trace en ligne
            </em>
            .
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p
            style={{
              fontSize: "clamp(16px, 1.6vw, 19px)",
              lineHeight: 1.6,
              color: "var(--ftt-text-mid)",
              maxWidth: 640,
              margin: "0 0 36px",
            }}
          >
            Les chaînes ont des sites clinquants. Vous avez le métier, les
            clients fidèles, la réputation dans le quartier. Sauf que le nouveau
            client, lui,{" "}
            <span style={{ color: "var(--ftt-cream)", fontWeight: 500 }}>
              vous cherche d&apos;abord sur Google
            </span>{" "}
            — et il compare ce qu&apos;il y trouve.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="flex flex-wrap" style={{ gap: 12 }}>
            <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
              Réserver un appel · 15 min <span className="btn__arrow">→</span>
            </a>
            <a href="/tarifs" className="btn btn--ghost">
              Voir les tarifs <span className="btn__arrow">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* PROBLÈME */}
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
              Le vrai problème
            </span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 6.5vw, 90px)", lineHeight: 0.95, margin: "0 0 40px" }}
          >
            LA CONFIANCE SE JOUE{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              avant la porte
            </em>
            .
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-10">
          {PROBLEMES.map((p, i) => (
            <Reveal key={p.num} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div style={{ paddingTop: 24, borderTop: "1px solid var(--ftt-line)" }}>
                <div
                  className="font-mono"
                  style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--ftt-text-dim)", marginBottom: 16 }}
                >
                  {p.num}
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: "clamp(20px, 2.2vw, 26px)", margin: "0 0 12px", lineHeight: 1.1 }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ftt-text-mid)", margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTENU DU SITE */}
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
              Le contenu
            </span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 6.5vw, 90px)", lineHeight: 0.95, margin: "0 0 40px" }}
          >
            CE QU&apos;ON MET{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              dedans
            </em>
            .
          </h2>
        </Reveal>

        <div style={{ maxWidth: 860 }}>
          {CONTENU_SITE.map((item, i) => (
            <Reveal key={item.title} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  padding: "24px 0",
                  borderBottom: "1px solid var(--ftt-line)",
                  alignItems: "flex-start",
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 12, color: "var(--ftt-red)", flexShrink: 0, marginTop: 4 }}
                >
                  0{i + 1}
                </span>
                <div>
                  <h3 style={{ fontSize: "clamp(16px, 2vw, 19px)", fontWeight: 500, margin: "0 0 8px", lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ftt-text-mid)", margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DÉMO */}
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
              Un exemple concret
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Reveal delay={1}>
              <h2
                className="font-display"
                style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95, margin: "0 0 20px" }}
              >
                GARAGE{" "}
                <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
                  Klax
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 16px" }}>
                Une démo que j&apos;ai construite autour d&apos;un garage
                indépendant : prestations claires, demande de rendez-vous,
                ambiance atelier qui inspire confiance. Ce n&apos;est pas un
                client réel et les textes sont des exemples — c&apos;est
                justement le but : voir le rendu avant de décider.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 28px" }}>
                Pour votre établissement, on commence par un appel de 15
                minutes : vous me parlez de votre activité, je vous dis
                franchement ce que je ferais. Sans engagement : si ça ne vous
                parle pas, on en reste là.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                Réserver un appel · 15 min <span className="btn__arrow">→</span>
              </a>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <a
              href="/demo/garage-klax/index.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir la démo Garage Klax dans un nouvel onglet"
              style={{
                display: "block",
                position: "relative",
                aspectRatio: "16 / 10",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--ftt-line-strong)",
              }}
            >
              <GarageKlaxPreview />
            </a>
          </Reveal>
        </div>
      </section>

      {/* PACK */}
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(05)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Le pack adapté
            </span>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal delay={1}>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(40px, 7vw, 110px)", lineHeight: 0.95, margin: 0 }}
            >
              750 €{" "}
              <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-text-mid)" }}>
                tout compris.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Jusqu'à 3 pages (accueil, prestations, contact)",
                "SEO local : votre ville + vos prestations",
                "Fiche Google Business Profile configurée et reliée",
                "Horaires, accès et infos pratiques structurés",
                "Livré en 14 jours ouvrés",
                "1 modification gratuite incluse",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ftt-text-mid)" }}>
                  <span style={{ color: "var(--ftt-red)", flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
              <p style={{ fontSize: 13, color: "var(--ftt-text-dim)", marginTop: 8, lineHeight: 1.6 }}>
                C&apos;est le pack Visibilité, celui que prennent la plupart des
                commerces et services de proximité. Une page simple coûte
                500 €.{" "}
                <a href="/tarifs" style={{ color: "var(--ftt-cream)", textDecoration: "underline" }}>
                  Tous les tarifs en détail
                </a>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="mx-auto section-x"
        style={{
          maxWidth: 1320,
          borderTop: "1px solid var(--ftt-line)",
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <JsonLd data={faqPageSchema(COMMERCE_FAQ)} />

        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(06)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Questions de commerçants
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 6.5vw, 90px)", lineHeight: 0.95, margin: "0 0 40px" }}
          >
            CE QU&apos;ON ME{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              demande
            </em>
            .
          </h2>
        </Reveal>

        <div style={{ maxWidth: 860 }}>
          {COMMERCE_FAQ.map((item, i) => {
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
            ON EN PARLE{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              entre deux clients
            </em>
            ?
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p style={{ fontSize: 16, color: "var(--ftt-text-mid)", marginBottom: 36 }}>
            15 minutes au téléphone, sans engagement. Je réponds à toutes vos questions.
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
