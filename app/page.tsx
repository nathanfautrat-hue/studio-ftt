"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorBlob from "@/components/CursorBlob";
import Reveal from "@/components/Reveal";
import ProjectStack, { StackProject } from "@/components/ProjectStack";
import {
  ScavbackPreview,
  SprayfilmPreview,
  GarageKlaxPreview,
  SigmaLiftPreview,
  MarceauPreview,
  CabinetAtlasPreview,
} from "@/components/ProjectPreviews";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";

const PROJECTS: StackProject[] = [
  {
    id: "scavback",
    name: "Scavback",
    kind: "Collectif artistique",
    tag: "Plateforme · Galerie",
    blurb:
      "Plateforme en ligne pour un collectif artistique — galerie, portfolio et univers visuel fort.",
    href: "/projets/scavback",
    preview: <ScavbackPreview />,
  },
  {
    id: "sprayfilm",
    name: "Sprayfilm",
    kind: "Production audiovisuelle",
    tag: "Site vitrine · SEO",
    blurb:
      "Site vitrine pour une agence de production audiovisuelle en Bretagne — SEO local et Google Business inclus.",
    href: "/projets/sprayfilm",
    preview: <SprayfilmPreview />,
  },
  {
    id: "garage-klax",
    name: "Garage Klax",
    kind: "Garage indépendant",
    tag: "Site vitrine · Forfaits affichés",
    blurb:
      "Démo pour un garage indépendant en Sarthe — design industriel brut, forfaits affichés, devis en ligne.",
    href: "/demo/garage-klax/index.html",
    preview: <GarageKlaxPreview />,
    isDemo: true,
  },
  {
    id: "sigma-lift",
    name: "Sigma Lift",
    kind: "Coaching sportif en ligne",
    tag: "Landing · Programmes & dashboard",
    blurb:
      "Démo pour un coach sportif en ligne — design performance noir/lime, programmes, dashboard de suivi data.",
    href: "/demo/sigma-lift/index.html",
    preview: <SigmaLiftPreview />,
    isDemo: true,
  },
  {
    id: "marceau",
    name: "Atelier Marceau",
    kind: "Plombier artisan",
    tag: "Site vitrine · Devis",
    blurb:
      "Site vitrine pour un plombier artisan au Mans — services, zone d'intervention, urgence 24/7.",
    href: "/projets/marceau",
    preview: <MarceauPreview />,
    isDemo: true,
  },
  {
    id: "cabinet-atlas",
    name: "Cabinet Atlas",
    kind: "Kinésithérapie · Ostéopathie",
    tag: "Site cabinet · Doctolib · RDV",
    blurb:
      "Démo pour un cabinet pluri kiné/ostéo — design contemporain lumineux (sable, bleu nuit, ocre), photo praticien, équipe, parcours patient.",
    href: "/demo/cabinet-atlas/index.html",
    preview: <CabinetAtlasPreview />,
    isDemo: true,
  },
];

const FAQ = [
  {
    q: "Combien coûte un site ?",
    a: "3 formules : Vitrine à 500 €, Visibilité à 750 € (avec SEO avancé et Google Business Profile), Sur-mesure à partir de 1 000 €. Tout est inclus — design, développement, mise en ligne, SEO de base et 1 modification gratuite.",
  },
  {
    q: "Combien de temps pour livrer ?",
    a: "Entre 3 jours et 2 semaines après réception de vos contenus.",
  },
  {
    q: "Je n'ai pas de textes ni de photos — vous gérez ?",
    a: "On peut vous aider à rédiger et on utilise des visuels adaptés à votre secteur en attendant les vôtres. L'essentiel, c'est de démarrer.",
  },
  {
    q: "Est-ce que je peux modifier mon site moi-même ?",
    a: "Non — c'est nous qui gérons les modifications. Chaque site livré inclut une modification gratuite. Avec la formule maintenance à 35 €/mois, vous avez 3 modifications incluses par mois. Au-delà, les modifications sont facturées 50 €/h.",
  },
  {
    q: "Vous travaillez avec qui ?",
    a: "Artisans, TPE, PME — principalement en Sarthe et Mayenne, mais on travaille aussi à distance partout en France.",
  },
  {
    q: "Quelle différence avec Wix ou Squarespace ?",
    a: "Le site est conçu sur-mesure pour votre activité, pas depuis un template générique. Il charge plus vite, il est mieux référencé, et vous n'avez pas d'abonnement mensuel lié à une plateforme.",
  },
];

const APPROCHE = [
  {
    n: "01",
    t: "On s'appelle",
    d: "15 minutes pour comprendre votre activité, vos clients, ce que vous attendez du site. On vous dit ce qu'on peut faire et comment.",
    a: "Appel de découverte · 15 min",
  },
  {
    n: "02",
    t: "On construit",
    d: "Design, développement, textes, référencement — on s'occupe de tout. Vous validez avant la mise en ligne.",
    a: "Design → Dev → Validation",
  },
  {
    n: "03",
    t: "On lance",
    d: "Le site est en ligne. On vous envoie une vidéo explicative pour que vous sachiez exactement ce que vous avez entre les mains.",
    a: "Mise en ligne + vidéo livrée",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);

  // Form contact
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

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
    <main className="ftt-grain" style={{ background: "var(--ftt-black)", color: "var(--ftt-cream)" }}>
      <JsonLd data={faqPageSchema(FAQ)} />
      <Navbar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="hero-pad relative overflow-hidden flex flex-col justify-between gap-10"
        style={{
          minHeight: "calc(100svh - 80px)",
        }}
      >
        <CursorBlob containerRef={heroRef} />

        {/* Top row */}
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-3">
          <Reveal>
            <div className="eyebrow">
              <span className="dot" />
              Studio FTT — Sites web sur-mesure
            </div>
          </Reveal>
          <Reveal>
            <div
              className="font-mono"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(59,245,156,0.28)",
                background: "rgba(59,245,156,0.05)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ftt-green)",
              }}
            >
              <span
                className="animate-pulse"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--ftt-green)",
                  flexShrink: 0,
                }}
              />
              Disponible · Projets ouverts
            </div>
          </Reveal>
        </div>

        {/* Title block */}
        <div className="relative z-10">
          <Reveal delay={1}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(44px, 11vw, 150px)",
                margin: 0,
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ display: "block" }}>ON CRÉE</span>
              <span style={{ display: "block" }}>DES SITES</span>
              <span style={{ display: "block" }}>
                <span style={{ display: "inline-block", position: "relative" }}>
                  QUI
                  <svg
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: -10,
                      right: -10,
                      bottom: -8,
                      width: "calc(100% + 20px)",
                      height: 22,
                    }}
                    viewBox="0 0 200 22"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 12 Q 50 2, 100 12 T 198 12"
                      stroke="#E8352A"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                <em
                  className="font-serif"
                  style={{
                    fontStyle: "italic",
                    fontWeight: 500,
                    color: "var(--ftt-red)",
                  }}
                >
                  convertissent
                </em>
                .
              </span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-10 mt-8 lg:mt-10">
              <p
                style={{
                  maxWidth: 460,
                  fontSize: "clamp(15px, 1.5vw, 17px)",
                  lineHeight: 1.5,
                  color: "var(--ftt-text-mid)",
                  margin: 0,
                }}
              >
                Studio indépendant pour artisans et PME. On dessine, on
                développe, on référence — vous obtenez un site qui rassure, et
                qui vous amène des clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <a
                  href="#projets"
                  className="btn btn--ghost justify-center w-full sm:w-auto"
                >
                  Voir les projets <span className="btn__arrow">→</span>
                </a>
                <a
                  href="#contact"
                  className="btn btn--solid justify-center w-full sm:w-auto"
                >
                  Démarrer le mien <span className="btn__arrow">→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>

      </section>

      {/* APPROCHE */}
      <section
        id="approche"
        className="mx-auto section-x section-y"
        style={{ maxWidth: 1320 }}
      >
        <Reveal>
          <div
            className="flex items-baseline"
            style={{ gap: 14, marginBottom: 32 }}
          >
            <span
              className="font-mono"
              style={{ color: "var(--ftt-red)", fontSize: 13 }}
            >
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
              Notre approche
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(40px, 8vw, 130px)",
              margin: 0,
              lineHeight: 0.95,
              maxWidth: 1100,
            }}
          >
            DU SUR-MESURE.{" "}
            <em
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--ftt-text-mid)",
              }}
            >
              Pensé
            </em>{" "}
            pour vous.{" "}
            <em
              className="font-serif"
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--ftt-red)",
              }}
            >
              Et
            </em>{" "}
            avec vous.
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mt-12 md:mt-20 lg:mt-24">
          {APPROCHE.map((c, i) => (
            <Reveal key={c.n} delay={((i + 1) as 1 | 2 | 3)}>
              <div
                className="lift flex flex-col justify-between"
                style={{
                  position: "relative",
                  padding: "clamp(24px, 3vw, 32px) clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 28px)",
                  minHeight: 320,
                  height: "100%",
                  borderRadius: 18,
                  overflow: "hidden",
                  background:
                    "linear-gradient(180deg, rgba(232,53,42,0.05), rgba(255,255,255,0.02))",
                  border: "1px solid var(--ftt-line)",
                  gap: 24,
                }}
              >
                <div className="flex justify-between items-start">
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--ftt-text-dim)",
                    }}
                  >
                    Étape
                  </span>
                  <span
                    className="font-display"
                    style={{
                      fontSize: "clamp(56px, 6vw, 80px)",
                      lineHeight: 1,
                      color: "var(--ftt-red)",
                    }}
                  >
                    {c.n}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(28px, 3.5vw, 36px)",
                      margin: "0 0 14px",
                      fontWeight: 500,
                      lineHeight: 1.1,
                    }}
                  >
                    {c.t}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--ftt-text-mid)",
                      margin: "0 0 18px",
                    }}
                  >
                    {c.d}
                  </p>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--ftt-cream)",
                      paddingTop: 14,
                      borderTop: "1px solid var(--ftt-line-strong)",
                    }}
                  >
                    {c.a}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJETS — interactive stack */}
      <section
        id="projets"
        className="mx-auto section-x section-y-sm"
        style={{ maxWidth: 1320 }}
      >
        <Reveal>
          <div
            className="flex items-baseline"
            style={{ gap: 14, marginBottom: 32 }}
          >
            <span
              className="font-mono"
              style={{ color: "var(--ftt-red)", fontSize: 13 }}
            >
              (02)
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
              Sélection de projets
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(48px, 9vw, 140px)",
              margin: "0 0 clamp(40px, 5vw, 64px)",
              lineHeight: 0.95,
            }}
          >
            LES PROJETS.
          </h2>
        </Reveal>

        <ProjectStack projects={PROJECTS} />
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="mx-auto section-x section-y"
        style={{ maxWidth: 1320, borderTop: "1px solid var(--ftt-line)" }}
      >
        <Reveal>
          <div className="flex items-baseline" style={{ gap: 14, marginBottom: 32 }}>
            <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>
              (03)
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
              Questions fréquentes
            </span>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(48px, 9vw, 140px)",
              margin: "0 0 clamp(40px, 5vw, 64px)",
              lineHeight: 0.95,
            }}
          >
            FAQ.
          </h2>
        </Reveal>

        <div style={{ maxWidth: 860 }}>
          {FAQ.map((item, i) => {
            const isOpen = faqOpen === i;
            return (
              <Reveal key={i} delay={((Math.min(i + 1, 3)) as 1 | 2 | 3)}>
                <div style={{ borderBottom: "1px solid var(--ftt-line)" }}>
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    className="w-full text-left flex justify-between items-center"
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
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative overflow-hidden section-x section-y"
        style={{
          borderTop: "1px solid var(--ftt-line)",
        }}
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

        <div
          className="relative mx-auto"
          style={{ maxWidth: 1320 }}
        >
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
              PROCHAIN PROJET<br />
              <em
                className="font-serif"
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "var(--ftt-red)",
                }}
              >
                — le vôtre.
              </em>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 items-start mt-12 md:mt-16 lg:mt-20 gap-10 lg:gap-16">
            {/* Gauche : description + cartes contact */}
            <Reveal delay={2}>
              <div
                className="grid"
                style={{ gap: 14 }}
              >
                {[
                  {
                    l: "Réserver un appel · 15 min",
                    v: "calendly.com/contactstudioftt",
                    h: siteConfig.calendly,
                    featured: true,
                  },
                  {
                    l: "Email",
                    v: siteConfig.email,
                    h: `mailto:${siteConfig.email}`,
                  },
                  {
                    l: "Instagram",
                    v: siteConfig.instagramHandle,
                    h: siteConfig.instagram,
                  },
                  {
                    l: "LinkedIn",
                    v: siteConfig.linkedinHandle,
                    h: siteConfig.linkedin,
                  },
                ].map((c) => (
                  <a
                    key={c.l}
                    href={c.h}
                    target={c.h.startsWith("http") ? "_blank" : undefined}
                    rel={c.h.startsWith("http") ? "noopener noreferrer" : undefined}
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
                          color: c.featured
                            ? "var(--ftt-red)"
                            : "var(--ftt-text-dim)",
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {c.l}
                      </span>
                      <span style={{ fontSize: 16 }}>{c.v}</span>
                    </span>
                    <span aria-hidden>→</span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Droite : formulaire (sans select) */}
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

      <Footer />
    </main>
  );
}
