"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BackLink from "@/components/BackLink";

const NEON = "#00FF87";
const TABS = ["Dashboard", "Agents", "Intégrations", "Analytiques", "Équipe"] as const;
type Tab = typeof TABS[number];

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

function TabContent({ tab }: { tab: Tab }) {
  if (tab === "Dashboard") {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl md:text-2xl tracking-wide">Dashboard</h3>
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase" style={{ color: NEON }}>● En direct</span>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[
            { l: "MRR", v: "€42 180", d: "+12 %" },
            { l: "Clients", v: "284", d: "+8" },
            { l: "Tâches auto", v: "1 247", d: "cette semaine" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-white/10 p-3 md:p-5">
              <div className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/40 mb-1 md:mb-2 truncate">{s.l}</div>
              <div className="font-display text-xl md:text-3xl">{s.v}</div>
              <div className="text-[10px] md:text-xs mt-1" style={{ color: NEON }}>{s.d}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 p-4 md:p-6">
          <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">Activité agent</div>
          <div className="space-y-3">
            {[
              "Facture #2341 envoyée à Sofia Martin",
              "Relance paiement reçue — 3 clients",
              "Rapport hebdo généré et envoyé à l'équipe",
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-xs md:text-sm text-white/70">
                <div className="h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: NEON }} />
                <span className="truncate">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (tab === "Agents") {
    const agents = [
      { n: "Agent Facturation", st: "Actif", d: "Émet et envoie les factures automatiquement.", m: "218 factures / mois" },
      { n: "Agent Relance", st: "Actif", d: "Relance les impayés avec le bon ton au bon moment.", m: "€ 8 420 récupérés" },
      { n: "Agent Reporting", st: "Actif", d: "Génère et envoie les rapports hebdo à l'équipe.", m: "Dernier : il y a 2 h" },
      { n: "Agent Support", st: "Pause", d: "Répond aux demandes clients de niveau 1.", m: "92 tickets résolus" },
    ];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl md:text-2xl tracking-wide">Agents</h3>
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50">4 agents</span>
        </div>
        <div className="grid gap-3">
          {agents.map((a) => (
            <div key={a.n} className="rounded-xl border border-white/10 p-4 flex items-start gap-3">
              <div className="h-9 w-9 md:h-10 md:w-10 rounded-lg grid place-items-center flex-shrink-0 font-display" style={{ backgroundColor: `${NEON}15`, color: NEON }}>
                {a.n.split(" ")[1]?.[0] ?? "A"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-display text-sm md:text-base tracking-wide">{a.n}</div>
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full"
                    style={a.st === "Actif" ? { backgroundColor: `${NEON}20`, color: NEON } : { backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                  >
                    {a.st}
                  </span>
                </div>
                <p className="text-xs text-white/50 mt-1 leading-snug">{a.d}</p>
                <div className="text-[10px] md:text-xs mt-2" style={{ color: NEON }}>{a.m}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "Intégrations") {
    const items = [
      { n: "Stripe", c: "Paiements", ok: true },
      { n: "Notion", c: "Documentation", ok: true },
      { n: "Slack", c: "Communication", ok: true },
      { n: "Gmail", c: "Emails", ok: true },
      { n: "Google Calendar", c: "Agenda", ok: true },
      { n: "Zapier", c: "Automation", ok: false },
    ];
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl md:text-2xl tracking-wide">Intégrations</h3>
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50">5 / 6 actives</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {items.map((it) => (
            <div key={it.n} className="rounded-xl border border-white/10 p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-display text-sm md:text-base tracking-wide">{it.n}</div>
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: it.ok ? NEON : "rgba(255,255,255,0.2)" }}
                />
              </div>
              <div className="text-[10px] md:text-xs text-white/50">{it.c}</div>
              <div className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-2" style={{ color: it.ok ? NEON : "rgba(255,255,255,0.4)" }}>
                {it.ok ? "Connecté" : "À configurer"}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tab === "Analytiques") {
    const bars = [35, 52, 48, 68, 74, 82, 90, 86, 94];
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl md:text-2xl tracking-wide">Analytiques</h3>
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50">30 derniers jours</span>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {[
            { l: "Conversion", v: "6,8 %", d: "+1,2 pt" },
            { l: "Rétention", v: "94 %", d: "+3 %" },
            { l: "Tickets", v: "12 min", d: "-40 %" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-white/10 p-3 md:p-5">
              <div className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-white/40 mb-1 md:mb-2 truncate">{s.l}</div>
              <div className="font-display text-xl md:text-3xl">{s.v}</div>
              <div className="text-[10px] md:text-xs mt-1" style={{ color: NEON }}>{s.d}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 p-4 md:p-6">
          <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">Tâches automatisées / jour</div>
          <div className="flex items-end gap-1.5 md:gap-2 h-24 md:h-32">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md transition-all" style={{ height: `${h}%`, backgroundColor: NEON, opacity: 0.3 + (h / 100) * 0.7 }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Équipe
  const team = [
    { n: "Sofia Martin", r: "Founder & CEO", i: "SM", st: "En ligne" },
    { n: "Marc Dubois", r: "Head of Product", i: "MD", st: "En ligne" },
    { n: "Léa Chen", r: "Lead Engineer", i: "LC", st: "Absente" },
    { n: "Yanis Haddad", r: "Growth", i: "YH", st: "En ligne" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl md:text-2xl tracking-wide">Équipe</h3>
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/50">4 membres</span>
      </div>
      <div className="grid gap-3">
        {team.map((m) => (
          <div key={m.n} className="rounded-xl border border-white/10 p-3 md:p-4 flex items-center gap-3">
            <div className="h-9 w-9 md:h-10 md:w-10 rounded-full grid place-items-center flex-shrink-0 font-display text-sm" style={{ backgroundColor: `${NEON}15`, color: NEON }}>
              {m.i}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-display text-sm md:text-base tracking-wide truncate">{m.n}</div>
              <div className="text-xs text-white/50 truncate">{m.r}</div>
            </div>
            <span
              className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase flex-shrink-0"
              style={m.st === "En ligne" ? { color: NEON } : { color: "rgba(255,255,255,0.4)" }}
            >
              ● {m.st}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PlcPage() {
  const [tab, setTab] = useState<Tab>("Dashboard");

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
          <div className="p-4 sm:p-6 md:p-12">
            {/* mobile tabs — horizontal scroll */}
            <div className="md:hidden -mx-4 px-4 mb-5 overflow-x-auto scrollbar-none">
              <div className="flex gap-2 min-w-max">
                {TABS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setTab(n)}
                    className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${
                      tab === n
                        ? "bg-white/10 text-white"
                        : "bg-white/[0.02] text-white/50 hover:bg-white/5"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:grid md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] md:gap-8">
              {/* desktop sidebar */}
              <div className="hidden md:block space-y-2">
                {TABS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setTab(n)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                      tab === n
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:bg-white/5"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <TabContent tab={tab} />
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
