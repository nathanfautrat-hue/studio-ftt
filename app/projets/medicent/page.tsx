"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import BackLink from "@/components/BackLink";

const palette = {
  bg: "#F5F1EA",
  green: "#3E5F3A",
  greenLight: "#7A9473",
  sand: "#E8DFD0",
  text: "#22231C",
};

const soins = [
  {
    t: "Consultation initiale",
    d: "Un temps long d'écoute et d'analyse. On fait le point sur votre histoire, vos habitudes, vos besoins.",
    duree: "1h30",
    prix: "75 €",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
  },
  {
    t: "Suivi personnalisé",
    d: "Ajustement du protocole, bilan des progrès, nouveaux conseils en phytothérapie ou en alimentation.",
    duree: "1h",
    prix: "55 €",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=900&q=80",
  },
  {
    t: "Accompagnement long",
    d: "3 séances sur 3 mois pour un travail en profondeur. Transformation durable de votre hygiène de vie.",
    duree: "3 × 1h",
    prix: "180 €",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80",
  },
];

const piliers = [
  {
    t: "Écouter",
    d: "Comprendre votre histoire, vos contraintes, votre quotidien — avant toute recommandation.",
  },
  {
    t: "Observer",
    d: "Identifier les déséquilibres du terrain : digestion, sommeil, stress, énergie.",
  },
  {
    t: "Accompagner",
    d: "Construire ensemble un protocole réaliste. Ajuster au fil des semaines.",
  },
];

const deroule = [
  {
    s: "0 — 15 min",
    t: "Accueil & anamnèse",
    d: "On fait connaissance. Je pose des questions sur votre santé, votre sommeil, votre alimentation.",
  },
  {
    s: "15 — 45 min",
    t: "Bilan de vitalité",
    d: "Analyse énergétique et de vos constantes de vie — un tableau clair de votre terrain.",
  },
  {
    s: "45 — 75 min",
    t: "Conseils personnalisés",
    d: "Je vous remets un protocole écrit : alimentation, plantes, gestion du stress, micro-nutrition.",
  },
  {
    s: "75 — 90 min",
    t: "Plan de route",
    d: "On répond à vos questions, on planifie le suivi si nécessaire.",
  },
];

const avis = [
  {
    n: "Sophie, 38 ans",
    t: "Je me sens enfin alignée.",
    d: "En trois séances, mon sommeil est redevenu réparateur et j'ai retrouvé une énergie que je n'avais plus depuis des années.",
  },
  {
    n: "Marc, 45 ans",
    t: "Un accompagnement humain.",
    d: "Claire prend le temps d'écouter, de comprendre. Ses conseils sont concrets et faciles à mettre en place.",
  },
  {
    n: "Léa, 29 ans",
    t: "Bien plus qu'une consultation.",
    d: "J'ai retrouvé une vraie relation avec mon corps. Plus de stress, meilleure digestion, plus de clarté.",
  },
];

const faq = [
  {
    q: "La naturopathie remplace-t-elle un médecin ?",
    a: "Non. La naturopathie est un accompagnement complémentaire. Je ne pose pas de diagnostic, je n'interromps aucun traitement — je travaille en parallèle de votre suivi médical habituel.",
  },
  {
    q: "Combien de séances faut-il ?",
    a: "Cela dépend de votre objectif. Un déséquilibre ponctuel peut se régler en 1 à 2 séances. Un travail de fond (fatigue chronique, stress, digestion) demande 3 à 5 séances sur quelques mois.",
  },
  {
    q: "Les consultations sont-elles remboursées ?",
    a: "Pas par la Sécurité sociale, mais de nombreuses mutuelles prennent en charge tout ou partie des séances. Je vous remets une facture sur demande.",
  },
  {
    q: "Puis-je faire la consultation en visio ?",
    a: "Oui. Les consultations en visio sont aussi efficaces qu'en cabinet pour la majorité des accompagnements, au même tarif.",
  },
];

export default function MedicentPage() {
  return (
    <main style={{ backgroundColor: palette.bg, color: palette.text }}>
      {/* top bar */}
      <div className="fixed top-0 inset-x-0 z-[60] bg-[#F5F1EA]/85 backdrop-blur-md border-b border-black/5">
        <div className="container flex items-center justify-between py-4">
          <BackLink className="text-black/60 hover:text-black" />
          <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-black/60 border border-black/15 px-3 py-1 rounded-full">
            Concept démo · Studio FTT
          </span>
        </div>
      </div>

      {/* SCROLL EXPAND HERO — component from 21st, kept as-is */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=85"
        bgImageSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=85"
        title="Medicent Naturopathe"
        date="Bien-être naturel"
        scrollToExpand="Scroll pour découvrir →"
        textBlend={true}
      >
        <MedicentContent />
      </ScrollExpandMedia>
    </main>
  );
}

function MedicentContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div style={{ color: palette.text }} className="-mx-8 md:-mx-16 lg:-my-20">
      <div className="bg-[#F5F1EA]">
        {/* 1. INTRO — portrait + histoire */}
        <section className="container py-24 md:py-40">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-14 md:gap-24 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/5">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=85"
                alt="Claire, Naturopathe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-4">
                <div
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: palette.green }}
                >
                  Naturopathe certifiée
                </div>
                <div
                  className="text-lg mt-1"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Claire Desmonts
                </div>
              </div>
            </div>
            <div>
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ color: palette.green }}
              >
                <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>01</span>
                À propos
              </div>
              <h2
                className="text-4xl md:text-6xl leading-[1.05] mb-10 max-w-3xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                La naturopathie, c&apos;est écouter son corps pour{" "}
                <em style={{ color: palette.green }}>mieux l&apos;accompagner</em>.
              </h2>
              <p className="text-lg leading-relaxed text-black/70 mb-5">
                Je m&apos;appelle Claire. Après dix ans dans la santé
                conventionnelle, j&apos;ai repris des études de naturopathie
                pour accompagner les personnes en amont — là où il y a encore
                de la marge pour agir naturellement.
              </p>
              <p className="text-base leading-relaxed text-black/55">
                Je ne prescris pas. Je n&apos;interromps aucun traitement. Je
                vous aide à comprendre votre terrain, à identifier les
                déséquilibres qui vous fatiguent, et à construire une hygiène
                de vie qui vous ressemble.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6 text-sm">
                {[
                  { k: "Diplôme", v: "FENAHMAN · 2019" },
                  { k: "Cabinet", v: "Le Mans · 72000" },
                  { k: "Format", v: "Cabinet ou visio" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="border-t pt-3"
                    style={{ borderColor: "rgba(0,0,0,0.2)" }}
                  >
                    <div className="text-[9px] tracking-[0.3em] uppercase text-black/50">
                      {x.k}
                    </div>
                    <div className="mt-1">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. PHILOSOPHIE */}
        <section
          style={{ backgroundColor: palette.green, color: "#F5F1EA" }}
          className="py-24 md:py-32"
        >
          <div className="container">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-8">
              <span className="opacity-50 mr-2">02</span>Ma philosophie
            </div>
            <h2
              className="text-4xl md:text-7xl leading-[1.05] mb-20 max-w-4xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Trois temps pour{" "}
              <em style={{ color: palette.sand }}>revenir à soi</em>.
            </h2>
            <div className="grid md:grid-cols-3 gap-10 md:gap-16">
              {piliers.map((p, i) => (
                <motion.div
                  key={p.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border-t pt-8"
                  style={{ borderColor: "rgba(245,241,234,0.2)" }}
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-4">
                    0{i + 1}
                  </div>
                  <h3
                    className="text-3xl md:text-4xl mb-5"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {p.t}
                  </h3>
                  <p className="opacity-75 leading-relaxed">{p.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. SOINS */}
        <section className="container py-24 md:py-40">
          <div className="max-w-3xl mb-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: palette.green }}
            >
              <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>03</span>
              Les consultations
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Trois formats, une{" "}
              <em style={{ color: palette.green }}>même attention</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {soins.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl overflow-hidden bg-white border border-black/5 flex flex-col"
                style={{ boxShadow: "0 20px 60px -30px rgba(62, 95, 58, 0.35)" }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={s.img}
                    alt={s.t}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3
                    className="text-2xl md:text-3xl mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {s.t}
                  </h3>
                  <p className="text-sm leading-relaxed text-black/60 flex-1">
                    {s.d}
                  </p>
                  <div
                    className="mt-6 flex items-end justify-between border-t pt-5"
                    style={{ borderColor: "rgba(0,0,0,0.1)" }}
                  >
                    <div>
                      <div className="text-[9px] tracking-[0.3em] uppercase text-black/50">
                        Durée
                      </div>
                      <div className="text-sm mt-0.5">{s.duree}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] tracking-[0.3em] uppercase text-black/50">
                        Tarif
                      </div>
                      <div
                        className="text-2xl"
                        style={{
                          fontFamily: "var(--font-playfair), serif",
                          color: palette.green,
                        }}
                      >
                        {s.prix}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. DÉROULÉ SÉANCE */}
        <section style={{ backgroundColor: palette.sand }} className="py-24 md:py-32">
          <div className="container">
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 md:gap-24">
              <div>
                <div
                  className="text-[10px] tracking-[0.3em] uppercase mb-6"
                  style={{ color: palette.green }}
                >
                  <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>
                    04
                  </span>
                  Déroulé d&apos;une séance
                </div>
                <h2
                  className="text-4xl md:text-6xl leading-[1.05] mb-10"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Ce qui vous <em style={{ color: palette.green }}>attend</em>.
                </h2>
                <p className="text-black/65 leading-relaxed">
                  Chaque consultation suit la même trame — un cadre rassurant
                  qui laisse pourtant toute la place à ce qui vous concerne,
                  vous.
                </p>
              </div>
              <div className="space-y-6">
                {deroule.map((d, i) => (
                  <motion.div
                    key={d.t}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] gap-5 pb-6 border-b"
                    style={{ borderColor: "rgba(0,0,0,0.12)" }}
                  >
                    <div
                      className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-mono pt-1"
                      style={{ color: palette.green }}
                    >
                      {d.s}
                    </div>
                    <div>
                      <h3
                        className="text-xl md:text-2xl mb-2"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {d.t}
                      </h3>
                      <p className="text-sm text-black/60 leading-relaxed">
                        {d.d}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. AVIS */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mb-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-6"
              style={{ color: palette.green }}
            >
              <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>05</span>
              Témoignages
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Les personnes que j&apos;ai{" "}
              <em style={{ color: palette.green }}>accompagnées</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {avis.map((a, i) => (
              <motion.div
                key={a.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-2xl bg-white border border-black/5"
              >
                <div className="text-[14px] mb-4" style={{ color: palette.green }}>
                  ★★★★★
                </div>
                <h3
                  className="text-xl mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  « {a.t} »
                </h3>
                <p className="text-sm text-black/60 leading-relaxed mb-6">
                  {a.d}
                </p>
                <div
                  className="text-[10px] tracking-[0.2em] uppercase text-black/40 border-t pt-4"
                  style={{ borderColor: "rgba(0,0,0,0.1)" }}
                >
                  {a.n}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. FAQ */}
        <section className="container py-24 md:py-32">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="text-[10px] tracking-[0.3em] uppercase mb-6"
                style={{ color: palette.green }}
              >
                <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>06</span>
                Questions fréquentes
              </div>
              <h2
                className="text-4xl md:text-6xl leading-[1.05]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Tout savoir,{" "}
                <em style={{ color: palette.green }}>avant de venir</em>.
              </h2>
            </div>
            <div className="space-y-3">
              {faq.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-black/5 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left p-6 md:p-7 hover:bg-black/[0.02] transition"
                  >
                    <span
                      className="text-base md:text-lg pr-6"
                      style={{ fontFamily: "var(--font-playfair), serif" }}
                    >
                      {f.q}
                    </span>
                    <span
                      className="text-2xl transition-transform flex-shrink-0"
                      style={{
                        color: palette.green,
                        transform:
                          openFaq === i ? "rotate(45deg)" : "rotate(0)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 md:px-7 pb-6 md:pb-7 text-sm text-black/65 leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA */}
        <section
          style={{ backgroundColor: palette.green, color: "#F5F1EA" }}
          className="py-24 md:py-40"
        >
          <div className="container text-center max-w-3xl mx-auto">
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-70 mb-8">
              Prendre rendez-vous
            </div>
            <h2
              className="text-4xl md:text-7xl leading-[1.0] mb-10"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Le premier pas{" "}
              <em style={{ color: palette.sand }}>vers votre équilibre</em>.
            </h2>
            <p className="opacity-80 text-lg mb-12 max-w-xl mx-auto">
              Écrivez-moi en quelques mots ce qui vous amène. Je vous réponds
              sous 24 heures avec les prochains créneaux disponibles.
            </p>
            <a
              href="mailto:contactstudioftt@gmail.com?subject=Medicent%20%E2%80%94%20R%C3%A9servation%20s%C3%A9ance"
              className="btn"
              style={{
                backgroundColor: palette.sand,
                borderColor: palette.sand,
                color: palette.green,
              }}
            >
              Réserver une séance <span className="btn__arrow">→</span>
            </a>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  k: "Cabinet",
                  v: "12 rue des Tilleuls\n72000 Le Mans",
                },
                { k: "Horaires", v: "Lundi — vendredi\n9h — 19h" },
                {
                  k: "Contact",
                  v: "claire@medicent.fr\n+33 (0)6 12 34 56 78",
                },
              ].map((x) => (
                <div
                  key={x.k}
                  className="border-t opacity-90 pt-4"
                  style={{ borderColor: "rgba(245,241,234,0.25)" }}
                >
                  <div className="text-[9px] tracking-[0.3em] uppercase opacity-60">
                    {x.k}
                  </div>
                  <div className="mt-1 text-sm whitespace-pre-line">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer
          className="container py-10 text-sm flex flex-col md:flex-row gap-2 items-center justify-between"
          style={{ color: "rgba(0,0,0,0.5)" }}
        >
          <span>Medicent — Claire Desmonts, Naturopathe certifiée</span>
          <span>
            Concept démo par{" "}
            <Link href="/" className="underline hover:text-black">
              Studio FTT
            </Link>
          </span>
        </footer>
      </div>
    </div>
  );
}
