"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BackLink from "@/components/BackLink";

const NAVY = "#0F2C47";
const NAVY_DARK = "#08192B";
const ORANGE = "#E67E22";
const ORANGE_DARK = "#C96C1B";
const CREAM = "#F7F5F1";
const INK = "#1A1D22";

const PHONE = "02 43 52 18 90";
const PHONE_TEL = "+33243521890";

// Inline SVG icons keep things reliable and stylable
const Icon = {
  Drop: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M12 2.5c4 5 7 9 7 12.5a7 7 0 01-14 0c0-3.5 3-7.5 7-12.5z" />
    </svg>
  ),
  Wrench: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M14.7 6.3a4 4 0 015.5 5.4l-11 11a2 2 0 01-3-3l11-11a4 4 0 01-.5-2.4z" />
      <path d="M13 8l3 3" />
    </svg>
  ),
  Flame: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M12 2.5s4 4 4 8a4 4 0 01-8 0c0-2 2-3 2-5s2 3 2-3z" />
      <path d="M8 14a4 4 0 008 0" />
    </svg>
  ),
  Shower: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M4 10h16M7 10v-3a3 3 0 016 0v3M12 14v1M9 17v1M15 17v1M12 20v1" />
    </svg>
  ),
  Search: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16 16l5 5" />
    </svg>
  ),
  Home: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z" />
    </svg>
  ),
  Phone: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}>
      <path d="M5 4h4l2 5-2 1a11 11 0 005 5l1-2 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </svg>
  ),
  Clock: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  Shield: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Check: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={p.className}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  ),
  Euro: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M17 6a7 7 0 100 12M4 10h9M4 14h9" />
    </svg>
  ),
  Pin: (p: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={p.className}>
      <path d="M12 21s7-6 7-12a7 7 0 00-14 0c0 6 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
};

const services = [
  {
    i: <Icon.Drop className="w-7 h-7" />,
    t: "Dépannage urgent",
    d: "Fuite, canalisation bouchée, robinet cassé. Intervention sous 1h en agglomération mancelle.",
    tag: "24/7",
  },
  {
    i: <Icon.Shower className="w-7 h-7" />,
    t: "Salle de bain",
    d: "Rénovation complète ou partielle. Douche à l'italienne, baignoire, sanitaires, carrelage.",
    tag: "Clé en main",
  },
  {
    i: <Icon.Flame className="w-7 h-7" />,
    t: "Chauffage",
    d: "Installation et entretien de chaudières gaz, radiateurs, planchers chauffants, sèche-serviettes.",
    tag: "RGE",
  },
  {
    i: <Icon.Wrench className="w-7 h-7" />,
    t: "Eau chaude",
    d: "Ballon, chauffe-eau, pompe à chaleur. Dimensionnement et remplacement de vos équipements.",
    tag: "Économies",
  },
  {
    i: <Icon.Search className="w-7 h-7" />,
    t: "Détection de fuite",
    d: "Inspection caméra, test de pression. On localise sans casser — réparation ciblée.",
    tag: "Sans casse",
  },
  {
    i: <Icon.Home className="w-7 h-7" />,
    t: "Rénovation réseau",
    d: "Remplacement de canalisations vétustes, mise aux normes, diagnostic plomb ou cuivre.",
    tag: "Durable",
  },
];

const garanties = [
  { i: <Icon.Shield className="w-6 h-6" />, t: "Garantie décennale", d: "Couverture complète 10 ans" },
  { i: <Icon.Euro className="w-6 h-6" />, t: "Devis gratuit", d: "Sans engagement, écrit" },
  { i: <Icon.Clock className="w-6 h-6" />, t: "Intervention rapide", d: "Sous 1h en urgence" },
  { i: <Icon.Check className="w-6 h-6" />, t: "Chantier propre", d: "On repart sans traces" },
];

const etapes = [
  {
    n: "01",
    t: "Appel ou formulaire",
    d: "Vous décrivez votre besoin. On évalue l'urgence et on planifie un passage.",
  },
  {
    n: "02",
    t: "Diagnostic sur place",
    d: "Analyse de la situation. Devis écrit, clair et détaillé — sans surprise.",
  },
  {
    n: "03",
    t: "Intervention",
    d: "Travaux réalisés par un artisan qualifié. Matériel professionnel, finitions soignées.",
  },
  {
    n: "04",
    t: "Garantie & suivi",
    d: "Facture détaillée, garantie décennale, et un numéro direct si besoin.",
  },
];

const zones = [
  "Le Mans", "Coulaines", "Allonnes", "Yvré-l'Évêque", "Arnage",
  "Champagné", "Mulsanne", "Ruaudin", "Pontlieue", "Saint-Pavace",
  "La Chapelle-Saint-Aubin", "Savigné-l'Évêque",
];

const avis = [
  {
    n: "Sylvie M.",
    v: "Particulier · Le Mans",
    t: "Fuite détectée et réparée en 2h.",
    d: "Appelé un samedi matin pour une fuite sous évier. Arrivé dans l'heure, travail impeccable, prix annoncé respecté. Je recommande sans hésiter.",
  },
  {
    n: "Jean-Paul B.",
    v: "Syndic · Coulaines",
    t: "Interlocuteur de confiance.",
    d: "On travaille avec Atelier Marceau sur plusieurs copropriétés. Sérieux, disponibilité, tarifs honnêtes. Nos locataires sont toujours contents.",
  },
  {
    n: "Caroline D.",
    v: "Rénovation · Arnage",
    t: "Salle de bain refaite de A à Z.",
    d: "Chantier de 3 semaines tenu à la journée près. Résultat magnifique, et ils ont tout nettoyé tous les soirs. Je referai appel à eux sans hésiter.",
  },
];

const faq = [
  {
    q: "Intervenez-vous en urgence la nuit ou le week-end ?",
    a: "Oui, nous assurons un service d'urgence 7j/7 et 24h/24 pour les fuites majeures, débouchage et problèmes de chauffage en hiver. Appelez le numéro d'urgence — nous sommes sur place sous 1h en agglomération.",
  },
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui, tout devis est gratuit, écrit et sans engagement. Pour un simple diagnostic hors urgence, nous nous déplaçons gratuitement dans un rayon de 15 km autour du Mans.",
  },
  {
    q: "Quels sont vos tarifs d'intervention ?",
    a: "Main-d'œuvre à partir de 55 €/h. Déplacement offert dans un rayon de 15 km. Majoration nuit/férié : +50 %. Tous les prix sont annoncés avant toute intervention, pas de surprise à la facture.",
  },
  {
    q: "Êtes-vous assurés et certifiés ?",
    a: "Oui : garantie décennale complète, RC Pro, certifications RGE pour le chauffage et PGN/PGP pour le gaz. Tous nos artisans ont au moins 5 ans d'expérience et un CAP Installateur sanitaire.",
  },
  {
    q: "Installez-vous les pompes à chaleur ?",
    a: "Oui, en air/eau et air/air. Nous dimensionnons l'équipement selon votre logement, déposons le dossier d'aides (MaPrimeRénov') et posons dans les règles — RGE QualiPAC obligatoire.",
  },
];

export default function MarceauPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  return (
    <main style={{ backgroundColor: CREAM, color: INK }} className="min-h-screen">
      {/* urgency top strip */}
      <div
        style={{ backgroundColor: ORANGE, color: "#fff" }}
        className="text-[11px] md:text-xs tracking-wider"
      >
        <div className="container py-2 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="uppercase tracking-[0.2em]">Urgence 24/7</span>
            <span className="hidden sm:inline">— Intervention sous 1h en agglo mancelle</span>
          </div>
          <a
            href={`tel:${PHONE_TEL}`}
            className="font-semibold flex items-center gap-2 hover:underline"
          >
            <Icon.Phone className="w-3.5 h-3.5" />
            {PHONE}
          </a>
        </div>
      </div>

      {/* NAV */}
      <div
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{ backgroundColor: "rgba(247,245,241,0.9)", borderColor: "rgba(26,29,34,0.08)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <BackLink className="text-black/60 hover:text-black hidden md:inline-flex" />
            <div
              className="flex items-center gap-2 text-lg tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <span style={{ color: NAVY }}>Atelier</span>
              <span style={{ color: ORANGE }}>Marceau</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: "rgba(26,29,34,0.7)" }}>
            <a href="#services" className="hover:text-black">Services</a>
            <a href="#processus" className="hover:text-black">Processus</a>
            <a href="#zone" className="hover:text-black">Zone</a>
            <a href="#contact" className="hover:text-black">Contact</a>
          </div>
          <a
            href="#contact"
            className="btn text-xs md:text-sm whitespace-nowrap"
            style={{ backgroundColor: NAVY, borderColor: NAVY, color: "#fff" }}
          >
            <span className="hidden sm:inline">Devis gratuit</span>
            <span className="sm:hidden">Devis</span>
            <span className="btn__arrow">→</span>
          </a>
        </div>
      </div>

      {/* concept démo badge */}
      <div className="container pt-4">
        <span
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border px-3 py-1 rounded-full"
          style={{ borderColor: "rgba(26,29,34,0.15)", color: "rgba(26,29,34,0.6)" }}
        >
          Concept démo · Studio FTT
        </span>
      </div>

      {/* HERO */}
      <section className="container pt-10 md:pt-16 pb-24 md:pb-32">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase mb-8 px-3 py-1 rounded-full"
              style={{ backgroundColor: "rgba(15,44,71,0.07)", color: NAVY }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ORANGE }} />
              Plombier artisan · Le Mans depuis 2004
            </div>
            <h1
              className="text-5xl md:text-7xl lg:text-[5.2rem] leading-[0.98] tracking-tight mb-8"
              style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
            >
              Un plombier <em style={{ color: ORANGE }}>de confiance</em>,
              <br className="hidden md:block" /> quand vous en avez besoin.
            </h1>
            <p className="text-lg leading-relaxed max-w-xl mb-10" style={{ color: "rgba(26,29,34,0.7)" }}>
              Dépannage urgent, rénovation de salle de bain, chauffage, détection de fuite —
              artisans qualifiés, devis gratuit, garantie décennale.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="btn"
                style={{ backgroundColor: ORANGE, borderColor: ORANGE, color: "#fff" }}
              >
                <Icon.Phone className="w-4 h-4" />
                {PHONE}
              </a>
              <a
                href="#contact"
                className="btn"
                style={{ backgroundColor: NAVY, borderColor: NAVY, color: "#fff" }}
              >
                Demander un devis <span className="btn__arrow">→</span>
              </a>
            </div>

            {/* quick badges under hero */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {garanties.map((g) => (
                <div
                  key={g.t}
                  className="flex items-start gap-3 p-3 rounded-xl border"
                  style={{ borderColor: "rgba(15,44,71,0.1)", backgroundColor: "#fff" }}
                >
                  <span style={{ color: ORANGE }}>{g.i}</span>
                  <div>
                    <div className="text-xs font-semibold" style={{ color: NAVY }}>{g.t}</div>
                    <div className="text-[11px]" style={{ color: "rgba(26,29,34,0.55)" }}>{g.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* hero image stack */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(15,44,71,0.35)]">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=85"
                alt="Salle de bain moderne — réalisation Atelier Marceau"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(200deg, transparent 40%, rgba(15,44,71,0.35) 100%)",
                }}
              />
            </div>
            {/* floating stat card */}
            <div
              className="absolute -bottom-6 -left-6 md:-left-10 bg-white rounded-2xl p-5 shadow-[0_20px_60px_-20px_rgba(15,44,71,0.35)] border"
              style={{ borderColor: "rgba(15,44,71,0.08)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  <Icon.Check className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: NAVY, fontFamily: "var(--font-playfair), serif" }}>
                    1 200+
                  </div>
                  <div className="text-[11px] tracking-wider uppercase" style={{ color: "rgba(26,29,34,0.55)" }}>
                    Interventions réussies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ backgroundColor: NAVY, color: "#fff" }} className="py-10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 text-center md:text-left">
          {[
            { k: "20 ans", v: "D'expérience locale" },
            { k: "1h", v: "Délai moyen en urgence" },
            { k: "98 %", v: "Clients satisfaits" },
            { k: "RGE", v: "Certifié Chauffage & Gaz" },
          ].map((s) => (
            <div key={s.k}>
              <div
                className="text-4xl md:text-5xl leading-none mb-3"
                style={{ fontFamily: "var(--font-playfair), serif", color: ORANGE }}
              >
                {s.k}
              </div>
              <div className="text-xs md:text-sm opacity-80 tracking-wide leading-snug">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container py-24 md:py-32">
        <div className="max-w-3xl mb-16">
          <div
            className="text-[10px] tracking-[0.3em] uppercase mb-4"
            style={{ color: ORANGE }}
          >
            <span className="opacity-40 mr-2">01</span>Nos prestations
          </div>
          <h2
            className="text-4xl md:text-6xl leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
          >
            Tous les <em style={{ color: ORANGE }}>travaux d&apos;eau</em>,
            un seul interlocuteur.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group p-8 rounded-2xl bg-white border transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(15,44,71,0.25)]"
              style={{ borderColor: "rgba(15,44,71,0.08)" }}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:scale-105"
                  style={{ backgroundColor: "rgba(230,126,34,0.1)", color: ORANGE }}
                >
                  {s.i}
                </div>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "rgba(15,44,71,0.06)", color: NAVY }}
                >
                  {s.tag}
                </span>
              </div>
              <h3
                className="text-2xl mb-3 tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
              >
                {s.t}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(26,29,34,0.65)" }}>
                {s.d}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* À PROPOS */}
      <section style={{ backgroundColor: "#fff" }} className="py-24 md:py-32">
        <div className="container grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=85"
              alt="Marceau, plombier artisan au Mans"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              className="absolute bottom-4 left-4 right-4 backdrop-blur rounded-xl p-4"
              style={{ backgroundColor: "rgba(15,44,71,0.92)", color: "#fff" }}
            >
              <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">Fondateur</div>
              <div className="text-lg" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Thomas Marceau, artisan plombier
              </div>
            </div>
          </div>
          <div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              <span className="opacity-40 mr-2">02</span>L&apos;atelier
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] mb-8 tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
            >
              Un métier d&apos;artisan, <em style={{ color: ORANGE }}>pas une franchise</em>.
            </h2>
            <p className="text-lg leading-relaxed mb-5" style={{ color: "rgba(26,29,34,0.7)" }}>
              L&apos;Atelier Marceau, c&apos;est une petite équipe de cinq artisans
              basée au Mans. Pas de standard téléphonique à rallonge, pas de
              sous-traitance : celui qui prend votre appel est celui qui viendra
              chez vous.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "rgba(26,29,34,0.55)" }}>
              Thomas Marceau a fondé l&apos;entreprise en 2004 après quinze ans
              chez un grand groupe. Sa conviction : un bon plombier, c&apos;est
              avant tout quelqu&apos;un qui explique clairement et qui tient ses
              délais. On vous garantit les deux.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "Fondée en", v: "2004" },
                { k: "Équipe", v: "5 artisans" },
                { k: "Siège", v: "Le Mans (72)" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="border-t pt-4"
                  style={{ borderColor: "rgba(15,44,71,0.15)" }}
                >
                  <div
                    className="text-[10px] tracking-[0.3em] uppercase mb-1"
                    style={{ color: "rgba(26,29,34,0.5)" }}
                  >
                    {s.k}
                  </div>
                  <div
                    className="text-xl"
                    style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section
        id="processus"
        style={{
          background: `linear-gradient(180deg, ${NAVY} 0%, ${NAVY_DARK} 100%)`,
          color: "#fff",
        }}
        className="py-24 md:py-32"
      >
        <div className="container">
          <div className="max-w-3xl mb-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              <span className="opacity-40 mr-2">03</span>Comment ça se passe
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Quatre étapes, <em style={{ color: ORANGE }}>zéro surprise</em>.
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 md:gap-5">
            {etapes.map((e, i) => (
              <motion.div
                key={e.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative p-8 rounded-2xl"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="text-5xl mb-6"
                  style={{ fontFamily: "var(--font-playfair), serif", color: ORANGE }}
                >
                  {e.n}
                </div>
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {e.t}
                </h3>
                <p className="text-sm opacity-75 leading-relaxed">{e.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ZONE D'INTERVENTION */}
      <section id="zone" className="container py-24 md:py-32">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-20 items-center">
          <div>
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              <span className="opacity-40 mr-2">04</span>Zone d&apos;intervention
            </div>
            <h2
              className="text-4xl md:text-5xl leading-[1.1] mb-6 tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
            >
              Nous intervenons dans un rayon de 30 km autour du Mans.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(26,29,34,0.65)" }}>
              Au-delà, un petit supplément de déplacement peut s&apos;appliquer —
              toujours annoncé avant intervention.
            </p>
            <div className="flex flex-wrap gap-2">
              {zones.map((z) => (
                <span
                  key={z}
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(15,44,71,0.06)",
                    color: NAVY,
                  }}
                >
                  <Icon.Pin className="w-3 h-3" />
                  {z}
                </span>
              ))}
            </div>
          </div>
          {/* Stylised radar/map */}
          <div
            className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: NAVY }}
          >
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {[0.3, 0.55, 0.8].map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full border animate-pulse"
                style={{
                  width: `${s * 100}%`,
                  height: `${s * 100}%`,
                  borderColor: "rgba(230,126,34,0.4)",
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: "3s",
                }}
              />
            ))}
            <div
              className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: ORANGE, color: "#fff" }}
            >
              <Icon.Pin className="w-10 h-10" />
            </div>
            <div
              className="absolute bottom-6 left-6 text-white text-sm tracking-wide"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <div className="text-2xl">Le Mans</div>
              <div className="text-xs opacity-60 tracking-[0.3em] uppercase">Base d&apos;intervention</div>
            </div>
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section style={{ backgroundColor: "#fff" }} className="py-24 md:py-32">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              <span className="opacity-40 mr-2">05</span>Témoignages
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
            >
              Ce que disent <em style={{ color: ORANGE }}>nos clients</em>.
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
                className="p-8 rounded-2xl border"
                style={{ backgroundColor: CREAM, borderColor: "rgba(15,44,71,0.08)" }}
              >
                <div style={{ color: ORANGE }} className="text-sm mb-4">★★★★★</div>
                <h3
                  className="text-xl mb-4 leading-snug"
                  style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
                >
                  « {a.t} »
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(26,29,34,0.65)" }}>
                  {a.d}
                </p>
                <div
                  className="border-t pt-4"
                  style={{ borderColor: "rgba(15,44,71,0.12)" }}
                >
                  <div className="text-sm font-semibold" style={{ color: NAVY }}>{a.n}</div>
                  <div className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "rgba(26,29,34,0.5)" }}>
                    {a.v}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              <span className="opacity-40 mr-2">06</span>Questions fréquentes
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif", color: NAVY }}
            >
              Tout savoir <em style={{ color: ORANGE }}>avant d&apos;appeler</em>.
            </h2>
          </div>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border overflow-hidden"
                style={{ borderColor: "rgba(15,44,71,0.08)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left p-6 md:p-7 hover:bg-black/[0.02] transition"
                >
                  <span
                    className="text-base md:text-lg pr-6 font-medium"
                    style={{ color: NAVY }}
                  >
                    {f.q}
                  </span>
                  <span
                    className="text-2xl transition-transform flex-shrink-0"
                    style={{
                      color: ORANGE,
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 md:px-7 pb-6 md:pb-7 text-sm leading-relaxed"
                    style={{ color: "rgba(26,29,34,0.65)" }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          background: `linear-gradient(135deg, ${ORANGE} 0%, ${ORANGE_DARK} 100%)`,
          color: "#fff",
        }}
        className="py-24 md:py-32"
      >
        <div className="container grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-80 mb-4">
              Nous contacter
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.02] mb-8 tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Un souci de plomberie&nbsp;? On est à une heure de chez vous.
            </h2>
            <p className="opacity-90 text-lg leading-relaxed mb-10 max-w-lg">
              Appelez-nous directement pour une urgence, ou décrivez votre besoin
              via le formulaire — on vous rappelle dans la journée avec un devis.
            </p>
            <div className="space-y-5">
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-4 group"
              >
                <div
                  className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition"
                >
                  <Icon.Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">Téléphone 24/7</div>
                  <div className="text-2xl" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {PHONE}
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon.Pin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">Atelier</div>
                  <div className="text-base">18 rue de l&apos;Arche · 72000 Le Mans</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon.Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase opacity-70">Horaires bureau</div>
                  <div className="text-base">Lun — Ven · 8h — 19h</div>
                  <div className="text-xs opacity-70">Urgences : 24/7</div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
              const form = e.currentTarget;
              const data = new FormData(form);
              const body = Array.from(data.entries())
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n");
              window.location.href = `mailto:contactstudioftt@gmail.com?subject=Atelier Marceau — Demande de devis&body=${encodeURIComponent(body)}`;
            }}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 md:p-8 space-y-4 border border-white/20"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                name="Prénom"
                placeholder="Prénom"
                required
                className="bg-white/10 border border-white/25 rounded-lg px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/70 transition"
              />
              <input
                name="Nom"
                placeholder="Nom"
                required
                className="bg-white/10 border border-white/25 rounded-lg px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/70 transition"
              />
            </div>
            <input
              name="Email"
              type="email"
              placeholder="Email"
              required
              className="w-full bg-white/10 border border-white/25 rounded-lg px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/70 transition"
            />
            <input
              name="Téléphone"
              type="tel"
              placeholder="Téléphone"
              required
              className="w-full bg-white/10 border border-white/25 rounded-lg px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/70 transition"
            />
            <select
              name="Type"
              required
              className="w-full bg-white/10 border border-white/25 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/70 transition"
              defaultValue=""
            >
              <option value="" disabled className="text-black">Type d&apos;intervention</option>
              <option value="urgence" className="text-black">Urgence (fuite, débouchage)</option>
              <option value="renovation" className="text-black">Rénovation salle de bain</option>
              <option value="chauffage" className="text-black">Chauffage / eau chaude</option>
              <option value="detection" className="text-black">Détection de fuite</option>
              <option value="autre" className="text-black">Autre — décrire ci-dessous</option>
            </select>
            <textarea
              name="Description"
              placeholder="Décrivez votre besoin en quelques mots…"
              rows={4}
              required
              className="w-full bg-white/10 border border-white/25 rounded-lg px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/70 transition resize-none"
            />
            <button
              type="submit"
              className="btn w-full justify-center"
              style={{ backgroundColor: NAVY, borderColor: NAVY, color: "#fff" }}
            >
              Envoyer ma demande <span className="btn__arrow">→</span>
            </button>
            {sent && (
              <div className="text-sm text-white/90 text-center bg-white/10 rounded-lg py-2">
                ✅ Votre client mail s&apos;ouvre — il ne reste qu&apos;à valider l&apos;envoi.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: NAVY_DARK, color: "rgba(255,255,255,0.6)" }} className="py-12">
        <div className="container grid md:grid-cols-3 gap-10 text-sm">
          <div>
            <div
              className="text-lg tracking-tight mb-3"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              <span style={{ color: "#fff" }}>Atelier</span>
              <span style={{ color: ORANGE }}> Marceau</span>
            </div>
            <p className="text-xs leading-relaxed opacity-70">
              Plombier artisan au Mans depuis 2004 — Dépannage, rénovation,
              chauffage, détection de fuite.
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/80 mb-3">
              Contact
            </div>
            <div className="space-y-1 text-xs">
              <div>{PHONE} · 24/7 urgences</div>
              <div>contact@ateliermarceau.fr</div>
              <div>18 rue de l&apos;Arche · 72000 Le Mans</div>
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/80 mb-3">
              Certifications
            </div>
            <div className="flex flex-wrap gap-2">
              {["RGE", "QualiPAC", "Décennale", "PGN-PGP"].map((c) => (
                <span
                  key={c}
                  className="text-[10px] tracking-[0.15em] uppercase border px-2 py-1 rounded"
                  style={{ borderColor: "rgba(255,255,255,0.2)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div
          className="container mt-10 pt-6 border-t text-xs flex flex-col md:flex-row gap-2 items-center justify-between"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <span>© 2026 Atelier Marceau · Tous droits réservés</span>
          <span>
            Concept démo par{" "}
            <Link href="/" className="underline hover:text-white">
              Studio FTT
            </Link>
          </span>
        </div>
      </footer>
    </main>
  );
}
