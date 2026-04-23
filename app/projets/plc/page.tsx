"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import BackLink from "@/components/BackLink";

const NEON = "#00FF87";

const features = [
  {
    t: "Automatisation",
    d: "L'agent IA exécute les tâches répétitives — facturation, relances, reporting — sans intervention humaine.",
  },
  {
    t: "Analytiques",
    d: "Tableaux de bord en temps réel. Votre entreprise, vue à travers les bons KPI, mis à jour à la seconde.",
  },
  {
    t: "Intégrations",
    d: "Connectez Stripe, Notion, Slack, Google Workspace et 50+ outils. L'IA lit et agit dessus.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "29",
    desc: "Pour les indépendants qui lancent leur activité.",
    features: ["1 agent IA", "5 intégrations", "Support email", "1 utilisateur"],
    cta: "Démarrer",
    highlight: false,
  },
  {
    name: "Pro",
    price: "79",
    desc: "Pour les équipes qui veulent passer la seconde.",
    features: [
      "5 agents IA",
      "Intégrations illimitées",
      "Support prioritaire",
      "10 utilisateurs",
      "Analytiques avancées",
    ],
    cta: "Essai 14 jours",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    desc: "Pour les entreprises avec des besoins complexes.",
    features: [
      "Agents IA illimités",
      "SLA 99.99 %",
      "Support dédié 24/7",
      "SSO + SAML",
      "Conformité RGPD",
    ],
    cta: "Contacter",
    highlight: false,
  },
];

export default function PlcPage() {
  return (
    <main style={{ backgroundColor: "#0d0d0d" }} className="text-white min-h-screen">
      {/* grid bg */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* top bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between py-4">
          <BackLink />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="h-6 w-6 rounded-md"
                style={{ backgroundColor: NEON }}
              />
              <span className="font-display tracking-[0.2em] text-sm">PLC</span>
            </div>
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/60 border border-white/15 px-3 py-1 rounded-full">
              Concept démo
            </span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative pt-40 pb-24 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase mb-8"
            style={{ borderColor: `${NEON}30`, color: NEON, backgroundColor: `${NEON}08` }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: NEON }} />
            Nouveau · Agent IA autonome
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight">
            L'agent IA qui gère<br />
            <span style={{ color: NEON }}>votre entreprise.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            PLC automatise vos tâches, analyse vos données et prend des décisions — pour que vous vous concentriez sur ce qui compte vraiment.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:contactstudioftt@gmail.com?subject=Projet%20PLC%20%E2%80%94%20d%C3%A9marrage"
              className="btn"
              style={{
                backgroundColor: NEON,
                color: "#0d0d0d",
                borderColor: NEON,
              }}
            >
              Démarrer gratuitement <span className="btn__arrow">→</span>
            </a>
            <a href="#features" className="btn btn--ghost">
              Voir la démo <span className="btn__arrow">→</span>
            </a>
          </div>

          {/* logos */}
          <div className="mt-20">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">
              Utilisé par des équipes chez
            </div>
            <div className="flex flex-wrap gap-10 items-center justify-center text-white/40">
              {["NOVA", "ATLAS", "HORIZON", "CRAFT", "PULSE"].map((n) => (
                <span key={n} className="font-display text-xl tracking-[0.3em]">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCT MOCK */}
      <section className="container pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/0 overflow-hidden"
          style={{ boxShadow: `0 60px 140px -40px ${NEON}30` }}
        >
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-[220px_1fr] gap-8">
              <div className="space-y-3">
                {["Dashboard", "Agents", "Intégrations", "Analytiques", "Équipe"].map((n, i) => (
                  <div
                    key={n}
                    className={`px-4 py-3 rounded-xl text-sm ${
                      i === 0
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:bg-white/5"
                    }`}
                  >
                    {n}
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl tracking-wide">Dashboard</h3>
                  <span className="text-xs tracking-[0.2em] uppercase" style={{ color: NEON }}>● En direct</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { l: "MRR", v: "€42 180", d: "+12 %" },
                    { l: "Clients", v: "284", d: "+8" },
                    { l: "Tâches auto", v: "1 247", d: "cette semaine" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-xl border border-white/10 p-5">
                      <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-2">{s.l}</div>
                      <div className="font-display text-3xl">{s.v}</div>
                      <div className="text-xs mt-1" style={{ color: NEON }}>
                        {s.d}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-white/10 p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
                    Activité agent
                  </div>
                  <div className="space-y-3">
                    {[
                      "Facture #2341 envoyée à Sofia Martin",
                      "Relance payment reçue — 3 clients",
                      "Rapport hebdo généré et envoyé à l'équipe",
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: NEON }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section id="features" className="container py-24 md:py-32 border-t border-white/5">
        <div className="max-w-3xl mb-16">
          <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: NEON }}>
            Fonctionnalités
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Tout ce dont vous avez besoin,<br />
            <span className="text-white/40">rien de plus.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-colors"
            >
              <div
                className="h-12 w-12 rounded-xl grid place-items-center mb-6 font-display text-xl"
                style={{ backgroundColor: `${NEON}15`, color: NEON }}
              >
                0{i + 1}
              </div>
              <h3 className="font-display text-2xl mb-3 tracking-wide">{f.t}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="container py-24 md:py-32 border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: NEON }}>
            Tarifs
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
            Simple et honnête.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`rounded-2xl p-8 border ${
                p.highlight
                  ? ""
                  : "border-white/10 bg-white/[0.02]"
              }`}
              style={
                p.highlight
                  ? {
                      borderColor: NEON,
                      background: `linear-gradient(180deg, ${NEON}10, transparent)`,
                    }
                  : {}
              }
            >
              {p.highlight && (
                <div
                  className="inline-block text-[10px] tracking-[0.3em] uppercase mb-4 px-3 py-1 rounded-full"
                  style={{ backgroundColor: NEON, color: "#0d0d0d" }}
                >
                  Populaire
                </div>
              )}
              <h3 className="font-display text-2xl mb-2">{p.name}</h3>
              <p className="text-white/50 text-sm mb-6">{p.desc}</p>
              <div className="mb-8">
                <span className="font-display text-5xl">{p.price}</span>
                {p.price !== "Sur devis" && (
                  <span className="text-white/50 ml-1">€/mois</span>
                )}
              </div>
              <ul className="space-y-3 mb-8 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/70">
                    <span style={{ color: NEON }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className="btn w-full justify-center"
                style={
                  p.highlight
                    ? { backgroundColor: NEON, color: "#0d0d0d", borderColor: NEON }
                    : { borderColor: "rgba(255,255,255,0.2)", color: "#fff" }
                }
              >
                {p.cta} <span className="btn__arrow">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container py-24 md:py-32">
        <div
          className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center"
          style={{ backgroundColor: NEON, color: "#0d0d0d" }}
        >
          <h3 className="font-display text-5xl md:text-8xl leading-[0.9] max-w-4xl mx-auto mb-8">
            Prêt à laisser l'IA travailler pour vous ?
          </h3>
          <a href="mailto:contactstudioftt@gmail.com?subject=PLC%20%E2%80%94%20Essai%20gratuit" className="btn" style={{ backgroundColor: "#0d0d0d", borderColor: "#0d0d0d", color: "#fff" }}>
            Essai gratuit 14 jours <span className="btn__arrow">→</span>
          </a>
        </div>
      </section>

      <footer className="container py-12 border-t border-white/5 text-xs text-white/40 flex flex-col md:flex-row gap-2 items-center justify-between">
        <span>PLC — L'agent IA pour entreprises</span>
        <span>
          Concept démo par <Link href="/" className="underline hover:text-white">Studio FTT</Link>
        </span>
      </footer>
    </main>
  );
}
