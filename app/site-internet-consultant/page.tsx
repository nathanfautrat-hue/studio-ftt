"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { SigmaLiftPreview } from "@/components/ProjectPreviews";

const PROBLEMES = [
  {
    num: "01",
    title: "Le décalage se voit tout de suite",
    desc: "Vous facturez à la journée ce que d'autres facturent à la semaine. Un site bricolé envoie le message inverse, et le prospect le remarque avant même le premier échange.",
  },
  {
    num: "02",
    title: "LinkedIn ne suffit pas",
    desc: "Vos posts touchent votre réseau. Mais le prospect qui vous a repéré vérifie toujours ailleurs : il tape votre nom, cherche une offre claire, des preuves, un endroit pour réserver un échange.",
  },
  {
    num: "03",
    title: "Votre offre n'est posée nulle part",
    desc: "Qui vous servez, ce que vous livrez, comment on travaille avec vous. Tant que ce n'est pas écrit noir sur blanc, chaque appel découverte repart de zéro.",
  },
];

const CONTENU_SITE = [
  {
    title: "Votre positionnement en une phrase",
    desc: "Qui vous aidez, à faire quoi, avec quelle méthode. Le visiteur doit le comprendre en cinq secondes, pas après trois paragraphes.",
  },
  {
    title: "Vos offres, décrites",
    desc: "Accompagnement, formation, mission : le format, ce que ça couvre, pour qui c'est fait. Le prospect arrive à l'appel en sachant déjà ce qu'il veut.",
  },
  {
    title: "Votre parcours et vos références",
    desc: "Les expériences et les secteurs qui font votre légitimité. Uniquement du réel : ce que vous pouvez nommer, vous le montrez ; le reste, on le formule par secteur.",
  },
  {
    title: "Un endroit pour réserver",
    desc: "Votre lien Calendly ou équivalent, intégré. Le prospect convaincu prend rendez-vous tout de suite, sans échange de mails.",
  },
  {
    title: "De quoi prouver, si vous en avez",
    desc: "Articles, conférences, ressources, études de cas. Pas obligatoire pour démarrer, mais le site est structuré pour les accueillir.",
  },
];

const CONSULTANT_FAQ = [
  {
    q: "Combien coûte un site de consultant ou de coach ?",
    a: "Le plus souvent en sur-mesure à partir de 1 000 € : positionnement, pages offre, parcours, intégration de votre lien de réservation. Si vous démarrez, une page Visibilité à 750 € peut suffire dans un premier temps. Prix one-shot, aucun abonnement obligatoire.",
  },
  {
    q: "J'ai déjà LinkedIn, pourquoi un site ?",
    a: "LinkedIn est un canal : vos posts y vivent quelques jours, au milieu du bruit. Le site est votre socle : votre offre posée noir sur blanc, à votre nom de domaine, trouvable quand on vous cherche. C'est là que le prospect vérifie avant de vous écrire, et c'est là qu'il réserve.",
  },
  {
    q: "Je n'ai pas de témoignages clients à montrer.",
    a: "Pas bloquant. Un positionnement net, un parcours réel et des offres claires crédibilisent déjà beaucoup. Le site est structuré pour accueillir les preuves au fur et à mesure : références, études de cas, contenus. On démarre avec ce que vous avez de vrai.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "14 jours ouvrés après réception de l'acompte et de vos contenus. On cale votre positionnement à l'appel découverte, vous m'envoyez votre matière, je m'occupe du reste, du design à la mise en ligne.",
  },
  {
    q: "Vous écrivez les textes ?",
    a: "Je peux vous aider à rédiger à partir de votre matière — c'est souvent suffisant. Si vous voulez une rédaction complète et travaillée de vos pages, l'option copywriting existe à 250 €.",
  },
];

export default function SiteInternetConsultant() {
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
              Consultants · Formateurs · Coachs
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
            CRÉDIBLE EN RÉUNION,{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              invisible en ligne
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
            Votre expertise vaut cher. Votre site — quand il existe — dit
            l&apos;inverse. Or le prospect qui vous a repéré{" "}
            <span style={{ color: "var(--ftt-cream)", fontWeight: 500 }}>
              vérifie toujours avant d&apos;écrire
            </span>{" "}
            : ce qu&apos;il trouve à ce moment-là décide de la suite.
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
            LE PROSPECT{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              vérifie
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

        <Reveal delay={3}>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--ftt-text-mid)",
              maxWidth: 640,
              marginTop: 48,
            }}
          >
            Pas besoin d&apos;une usine à gaz. Le funnel minimum d&apos;un
            indépendant qui vend de l&apos;expertise tient en trois temps : un
            positionnement compris en cinq secondes, des preuves qui se
            vérifient, un bouton pour réserver l&apos;appel. C&apos;est
            exactement ce qu&apos;on construit.
          </p>
        </Reveal>
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
                SIGMA{" "}
                <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
                  Lift
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 16px" }}>
                Une démo B2B que j&apos;ai construite : l&apos;exercice est le
                même que pour un consultant — rendre une expertise crédible en
                quelques secondes, avec un positionnement net et un design qui
                tient le niveau du tarif. Ce n&apos;est pas un client réel, les
                textes sont des exemples.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 28px" }}>
                Pour votre activité, on commence par un appel de 15 minutes :
                vous me parlez de votre offre, je vous dis franchement ce que je
                ferais. Sans engagement : si ça ne vous parle pas, on en reste
                là.
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
              href="/demo/sigma-lift/index.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir la démo Sigma Lift dans un nouvel onglet"
              style={{
                display: "block",
                position: "relative",
                aspectRatio: "16 / 10",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--ftt-line-strong)",
              }}
            >
              <SigmaLiftPreview />
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
              DÈS 1 000 €{" "}
              <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-text-mid)" }}>
                sur devis.
              </em>
            </h2>
          </Reveal>

          <Reveal delay={2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Jusqu'à 5 pages (accueil, offres, à propos, contact…)",
                "Positionnement travaillé ensemble à l'appel découverte",
                "Votre lien de réservation intégré (Calendly ou autre)",
                "SEO sur votre expertise et vos mots-clés",
                "Livré en 14 jours ouvrés",
                "1 modification gratuite incluse",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ftt-text-mid)" }}>
                  <span style={{ color: "var(--ftt-red)", flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
              <p style={{ fontSize: 13, color: "var(--ftt-text-dim)", marginTop: 8, lineHeight: 1.6 }}>
                C&apos;est le pack Sur-mesure, sur devis personnalisé. Pour
                démarrer plus léger, le pack Visibilité à 750 € existe aussi.{" "}
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
        <JsonLd data={faqPageSchema(CONSULTANT_FAQ)} />

        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(06)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Questions d&apos;indépendants
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
          {CONSULTANT_FAQ.map((item, i) => {
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
              entre deux missions
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
