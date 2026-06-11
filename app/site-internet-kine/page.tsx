"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutresOffres from "@/components/AutresOffres";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { CabinetAtlasPreview } from "@/components/ProjectPreviews";

const PROBLEMES = [
  {
    num: "01",
    title: "Une ligne parmi cinquante",
    desc: "Le patient qui ouvre Doctolib compare des créneaux, pas des approches. Votre formation en thérapie manuelle, vos années de cabinet : rien de tout ça ne se voit dans une liste.",
  },
  {
    num: "02",
    title: "Une fiche comme toutes les autres",
    desc: "Kiné du sport, périnéologie, rééducation vestibulaire ? Sur la plateforme, votre fiche ressemble à celle du cabinet d'à côté. Impossible de montrer ce qui fait venir les patients de loin.",
  },
  {
    num: "03",
    title: "Même votre nom ne vous appartient plus",
    desc: "Tapez votre propre nom dans Google : la plateforme sort souvent avant vous. Le patient qu'on vous a recommandé atterrit sur une liste où il peut cliquer ailleurs.",
  },
];

const CONTENU_SITE = [
  {
    title: "Vos spécialités, expliquées simplement",
    desc: "Un patient ne sait pas ce qu'est la rééducation vestibulaire. Une page qui l'explique avec ses mots, c'est lui qui comprend qu'il est au bon endroit.",
  },
  {
    title: "Votre parcours et vos formations",
    desc: "Diplômes, formations complémentaires, années d'exercice. Factuel, vérifiable, autorisé par votre code de déontologie.",
  },
  {
    title: "Les infos pratiques qui évitent 10 appels par jour",
    desc: "Accès, parking, étage, horaires, conventionnement, ce qu'il faut apporter à la première séance.",
  },
  {
    title: "Votre prise de rendez-vous, intégrée",
    desc: "Vous gardez Doctolib ou votre secrétariat : le site renvoie dessus. Il ne remplace pas votre agenda, il fait le travail d'avant — convaincre.",
  },
  {
    title: "Une fiche Google reliée et configurée",
    desc: "C'est elle qui vous fait apparaître sur la carte quand on cherche un kiné dans votre ville. Incluse dans le pack Visibilité.",
  },
];

const AUTORISE = [
  "Présenter votre parcours, vos diplômes et vos formations",
  "Expliquer vos spécialités et vos techniques",
  "Donner les infos pratiques : accès, horaires, conventionnement",
  "Montrer votre cabinet en photos",
];

const A_EVITER = [
  "Les promesses de résultat ou de guérison",
  "Les comparaisons avec d'autres praticiens",
  "Les témoignages de patients à visée publicitaire",
  "Les offres promotionnelles sur les soins",
];

const KINE_FAQ = [
  {
    q: "Un kinésithérapeute a-t-il le droit d'avoir un site internet ?",
    a: "Oui. Depuis le décret n° 2020-1663 du 22 décembre 2020, la profession est passée à un principe de libre communication. Vous pouvez présenter votre cabinet, votre parcours et vos spécialités, à condition de rester dans l'information : formulations prudentes et mesurées, pas de publicité commerciale ni de promesses de résultat. Je construis vos pages dans ces règles.",
  },
  {
    q: "Est-ce que le site remplace Doctolib ?",
    a: "Non, et ce n'est pas le but. Doctolib gère très bien la prise de rendez-vous. Le site fait le travail d'avant : il montre qui vous êtes, ce que vous traitez et comment vous travaillez, puis renvoie vers votre agenda en ligne ou votre téléphone. Les deux se complètent.",
  },
  {
    q: "Combien coûte un site pour un cabinet de kiné ?",
    a: "Pour la plupart des cabinets, c'est le pack Visibilité à 750 € : jusqu'à 3 pages, référencement local sur votre ville et vos spécialités, fiche Google Business Profile configurée. Une page simple coûte 500 €, et les besoins particuliers (cabinet de groupe, plusieurs sites d'exercice) passent en sur-mesure à partir de 1 000 €. Prix one-shot, aucun abonnement obligatoire.",
  },
  {
    q: "Qu'est-ce que je peux écrire sans risque avec l'Ordre ?",
    a: "Tout ce qui relève de l'information factuelle : votre parcours, vos diplômes, vos spécialités, le déroulement d'une séance, les infos pratiques du cabinet. À éviter : les promesses de résultat, les comparaisons avec des confrères et les témoignages de patients utilisés comme publicité. Le Conseil national de l'ordre a publié des recommandations en 2021, je m'y réfère pour chaque page.",
  },
  {
    q: "Je n'ai pas le temps de m'en occuper.",
    a: "C'est prévu. Un appel de 15 minutes pour comprendre votre cabinet, vous m'envoyez vos contenus (photos, parcours, spécialités), et je m'occupe du reste : textes, design, mise en ligne, fiche Google. Livré en 14 jours ouvrés après réception de l'acompte et de vos contenus.",
  },
];

export default function SiteInternetKine() {
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
              Kinés · Ostéos · Sophrologues
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
            ÊTRE CHOISI,{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              pas juste réservé
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
            Doctolib remplit les agendas, très bien. Mais sur Doctolib, vous êtes
            une ligne parmi cinquante. Un site de cabinet bien fait, c&apos;est ce
            qui fait qu&apos;un patient vous choisit{" "}
            <span style={{ color: "var(--ftt-cream)", fontWeight: 500 }}>vous</span>,
            avant même de cliquer sur « réserver ».
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

      {/* PROBLÈME DOCTOLIB */}
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
            DOCTOLIB N&apos;EST PAS{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              votre site
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
            Je ne vous dirai pas de quitter Doctolib : pour la prise de
            rendez-vous, ça marche. Le site fait autre chose — il vous rend
            visible sur Google, il raconte votre façon de travailler, et il
            renvoie vers votre agenda. Chacun son rôle.
          </p>
        </Reveal>
      </section>

      {/* DÉONTOLOGIE */}
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
              Déontologie
            </span>
          </div>
        </Reveal>
        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(36px, 6.5vw, 90px)", lineHeight: 0.95, margin: "0 0 24px" }}
          >
            VOTRE ORDRE NE{" "}
            <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
              l&apos;interdit pas
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
              margin: "0 0 48px",
            }}
          >
            Beaucoup de praticiens pensent qu&apos;un site, « ça ne se fait pas »
            dans la profession. C&apos;était vrai avant. Depuis le décret
            n° 2020-1663 du 22 décembre 2020, la communication des
            masseurs-kinésithérapeutes est libre, dans le respect des règles
            déontologiques : de l&apos;information, pas de publicité racoleuse.
            Concrètement, voilà la ligne.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          <Reveal delay={2}>
            <div
              style={{
                borderRadius: 18,
                border: "1px solid var(--ftt-line-strong)",
                background: "rgba(255,255,255,0.02)",
                padding: "clamp(24px, 3vw, 36px)",
                height: "100%",
              }}
            >
              <div
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-cream)", marginBottom: 20 }}
              >
                ✓ Autorisé
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {AUTORISE.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.5, color: "var(--ftt-text-mid)" }}>
                    <span style={{ color: "var(--ftt-red)", flexShrink: 0, marginTop: 1 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={3}>
            <div
              style={{
                borderRadius: 18,
                border: "1px solid var(--ftt-line)",
                background: "rgba(255,255,255,0.02)",
                padding: "clamp(24px, 3vw, 36px)",
                height: "100%",
              }}
            >
              <div
                className="font-mono"
                style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)", marginBottom: 20 }}
              >
                ✕ À éviter
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {A_EVITER.map((item) => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.5, color: "var(--ftt-text-mid)" }}>
                    <span style={{ color: "var(--ftt-text-dim)", flexShrink: 0, marginTop: 1 }}>✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={3}>
          <p style={{ fontSize: 13, color: "var(--ftt-text-dim)", marginTop: 20, lineHeight: 1.6, maxWidth: 680 }}>
            Le Conseil national de l&apos;ordre a publié des recommandations sur la
            communication en 2021. Chaque page que je rédige reste dans ce cadre :
            factuel, prudent, mesuré.
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
                CABINET{" "}
                <em className="font-serif" style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}>
                  Atlas
                </em>
                .
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 16px" }}>
                Une démo que j&apos;ai construite pour montrer ce qu&apos;un site
                de cabinet peut donner : présentation des spécialités, équipe,
                infos pratiques, prise de rendez-vous reliée. Ce n&apos;est pas un
                client réel et les textes sont des exemples — c&apos;est justement
                le but : voir le rendu avant de décider.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ftt-text-mid)", margin: "0 0 28px" }}>
                Pour votre cabinet, on commence par un appel de 15 minutes :
                vous me parlez de votre activité, je vous dis franchement ce que
                je ferais. Sans engagement : si ça ne vous parle pas, on en
                reste là.
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
              href="/demo/cabinet-atlas/index.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir la démo Cabinet Atlas dans un nouvel onglet"
              style={{
                display: "block",
                position: "relative",
                aspectRatio: "16 / 10",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--ftt-line-strong)",
              }}
            >
              <CabinetAtlasPreview />
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
                "Jusqu'à 3 pages (accueil, spécialités, infos pratiques)",
                "SEO local : votre ville + vos spécialités",
                "Fiche Google Business Profile configurée",
                "Lien de prise de rendez-vous intégré",
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
                praticiens. Une page simple coûte 500 €, les cabinets de groupe
                passent en sur-mesure.{" "}
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
        <JsonLd data={faqPageSchema(KINE_FAQ)} />

        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 24 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>(07)</span>
            <span
              className="font-mono"
              style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ftt-text-dim)" }}
            >
              Questions de praticiens
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
          {KINE_FAQ.map((item, i) => {
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

      <AutresOffres current="/site-internet-kine" />

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
              entre deux patients
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
