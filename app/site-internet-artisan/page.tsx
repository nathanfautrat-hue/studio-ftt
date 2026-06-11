"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { MarceauPreview } from "@/components/ProjectPreviews";

const PROBLEMES = [
  {
    num: "01",
    title: "Le bouche-à-oreille ne suffit plus",
    desc: "Vos clients vous recommandent, très bien. Mais la personne qui reçoit votre nom vous cherche sur Google avant d'appeler. Si elle ne trouve rien, le doute s'installe, et elle compare.",
  },
  {
    num: "02",
    title: "Les urgences partent ailleurs",
    desc: "Une fuite à 22h, un tableau qui saute un dimanche : personne ne feuillette un annuaire. Celui qui sort en premier avec un numéro cliquable prend l'appel.",
  },
  {
    num: "03",
    title: "Sans photos, vous êtes un devis parmi d'autres",
    desc: "Vos chantiers parlent pour vous. Un client qui a vu vos réalisations avant d'appeler ne vous compare pas de la même façon, et ne négocie pas pareil.",
  },
];

const CONTENU_SITE = [
  {
    title: "Vos services, clairement listés",
    desc: "Dépannage, installation, rénovation : ce que vous faites vraiment, dans vos mots. Pas de catalogue générique copié d'un autre site.",
  },
  {
    title: "Votre zone d'intervention",
    desc: "Les villes et le rayon où vous vous déplacez. C'est ce qui vous fait sortir sur les recherches « plombier + ville » autour de chez vous.",
  },
  {
    title: "Vos photos de chantiers",
    desc: "Les vraies. Un avant/après de salle de bain dit plus qu'un long paragraphe, et le client le sent tout de suite.",
  },
  {
    title: "Vos certifications, si vous en avez",
    desc: "RGE, Qualibat, assurance décennale : tout ce qui rassure et débloque les aides pour vos clients mérite d'être affiché.",
  },
  {
    title: "Un numéro cliquable partout",
    desc: "Sur mobile, votre téléphone se compose en un appui. Plus un formulaire de demande de devis pour ceux qui préfèrent écrire.",
  },
];

const ARTISAN_FAQ = [
  {
    q: "Combien coûte un site internet pour un artisan ?",
    a: "Le plus souvent, 750 € : c'est le pack Visibilité, avec jusqu'à 3 pages, le référencement local sur votre ville et vos services, et votre fiche Google Business Profile configurée. Une page simple coûte 500 €, et les besoins particuliers passent en sur-mesure à partir de 1 000 €. Prix one-shot, aucun abonnement obligatoire.",
  },
  {
    q: "J'ai déjà du travail avec le bouche-à-oreille, à quoi ça sert ?",
    a: "Le site ne remplace pas la recommandation, il la sécurise. La personne à qui on a donné votre nom vous cherche sur Google avant d'appeler : si elle trouve un site propre avec vos chantiers, elle appelle. Et le site capte en plus ceux qui ne vous connaissent pas encore, notamment le soir et le week-end.",
  },
  {
    q: "Je n'ai pas de belles photos de mes chantiers.",
    a: "Des photos de téléphone nettes et récentes suffisent largement pour démarrer. Je peux vous aider pour les textes, et le site est prévu pour ajouter des photos au fil des chantiers.",
  },
  {
    q: "Combien de temps ça prend ?",
    a: "14 jours ouvrés après réception de l'acompte et de vos contenus. Votre seul travail : me transmettre vos photos, vos services et vos infos. Je m'occupe du reste, du design à la mise en ligne.",
  },
  {
    q: "Il faut payer tous les mois ?",
    a: "Non, aucun abonnement obligatoire : le site se paie une fois. L'hébergement est offert la première année, puis 10 €/mois ou inclus dans la maintenance optionnelle à 35 €/mois (3 modifications par mois comprises). Votre nom de domaine, une dizaine d'euros par an, reste à votre nom.",
  },
];

export default function SiteInternetArtisan() {
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
              Plombiers · Électriciens · Chauffagistes · Maçons
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
            ÊTRE TROUVÉ,{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              avant le concurrent
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
            Une fuite à 22h, une panne un dimanche : le client tape
            « plombier + votre ville » et appelle le premier qui inspire
            confiance. Si vous n&apos;êtes pas là,{" "}
            <span style={{ color: "var(--ftt-cream)", fontWeight: 500 }}>
              c&apos;est le concurrent qui décroche
            </span>
            .
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
            BIEN BOSSER NE SUFFIT{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              plus
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

      {/* SITE + FICHE GOOGLE */}
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
              Site + fiche Google
            </span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 6.5vw, 90px)", lineHeight: 0.95, margin: "0 0 24px" }}
          >
            LES DEUX{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              ensemble
            </em>
            .
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--ftt-text-mid)",
              maxWidth: 680,
              margin: 0,
            }}
          >
            Quand on cherche un artisan, Google montre d&apos;abord la carte avec
            trois fiches locales. C&apos;est votre fiche Google Business Profile
            qui vous met là, et c&apos;est votre site qui transforme le clic en
            appel : services détaillés, photos de chantiers, zone
            d&apos;intervention. L&apos;un sans l&apos;autre, vous perdez une
            marche. Le pack Visibilité configure les deux, reliés.
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(04)</span>
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(05)</span>
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
                ATELIER{" "}
                <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
                  Marceau
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 16px" }}>
                Une démo que j&apos;ai construite autour d&apos;un plombier
                artisan : urgences mises en avant, services clairs, zone
                d&apos;intervention, demande de devis. Ce n&apos;est pas un
                client réel et les textes sont des exemples — c&apos;est
                justement le but : voir le rendu avant de décider.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 28px" }}>
                Pour votre activité, on commence par un appel de 15 minutes :
                vous me parlez de votre métier, je vous dis franchement ce que
                je ferais. Sans engagement : si ça ne vous parle pas, on en
                reste là.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="flex flex-wrap" style={{ gap: 12 }}>
                <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer" className="btn btn--solid">
                  Réserver un appel · 15 min <span className="btn__arrow">→</span>
                </a>
                <a href="/projets/marceau" className="btn btn--ghost">
                  Voir le projet <span className="btn__arrow">→</span>
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <a
              href="/projets/marceau"
              aria-label="Voir le projet Atelier Marceau"
              style={{
                display: "block",
                position: "relative",
                aspectRatio: "16 / 10",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--ftt-line-strong)",
              }}
            >
              <MarceauPreview />
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
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(06)</span>
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
                "Jusqu'à 3 pages (accueil, services, contact/devis)",
                "SEO local : votre ville + vos services",
                "Fiche Google Business Profile configurée",
                "Zone d'intervention détaillée",
                "Livré en 14 jours ouvrés",
                "1 modification gratuite incluse",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--ftt-text-mid)" }}>
                  <span style={{ color: "var(--ftt-red)", flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
              <p style={{ fontSize: 13, color: "var(--ftt-text-dim)", marginTop: 8, lineHeight: 1.6 }}>
                C&apos;est le pack Visibilité. Une page simple coûte 500 €, et la
                maintenance à 35 €/mois reste optionnelle.{" "}
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
        <JsonLd data={faqPageSchema(ARTISAN_FAQ)} />

        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(07)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Questions d&apos;artisans
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
          {ARTISAN_FAQ.map((item, i) => {
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
              entre deux chantiers
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
