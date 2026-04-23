"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";

export default function ScavbackPage() {
  return (
    <main className="bg-black text-white">
      {/* top bar */}
      <div className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="container flex items-center justify-between py-4">
          <BackLink />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Site client
            </span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="pt-36 pb-16 container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
            Collectif artistique · 2026
          </div>
          <h1 className="font-display text-6xl md:text-[10vw] md:leading-[0.88] tracking-tight">
            Scavback
          </h1>
          <p className="mt-6 text-white/60 text-lg md:text-xl max-w-2xl">
            Plateforme en ligne pour un collectif artistique — galerie, portfolio
            et univers visuel fort.
          </p>
          <div className="mt-10">
            <a
              href="https://scavback.base44.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
            >
              Visiter le site <span className="btn__arrow">→</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* META */}
      <section className="container py-24 md:py-32">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {[
            { k: "Catégorie", v: "Collectif artistique" },
            { k: "Type", v: "Site client" },
            { k: "Année", v: "2026" },
            { k: "Budget", v: "500 €" },
          ].map((m) => (
            <div key={m.k} className="border-t border-white/10 pt-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-3">
                {m.k}
              </div>
              <div className="font-display text-2xl">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTEXT */}
      <section className="container py-16 md:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">01</span>Contexte
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
              Un collectif artistique avait besoin d'un espace pour exister en ligne.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Scavback rassemble des artistes indépendants autour d'un univers
              visuel commun. L'enjeu : créer une plateforme qui reflète leur
              identité tout en restant fonctionnelle pour présenter les œuvres,
              les artistes et les événements à venir.
            </p>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="container py-16 md:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">02</span>Ce qu'on a fait
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  t: "Design UI",
                  d: "Identité visuelle forte, typographies contrastées, mise en page éditoriale.",
                },
                {
                  t: "Développement React",
                  d: "Application moderne et performante, pensée pour la rapidité et l'expérience.",
                },
                {
                  t: "Identité visuelle",
                  d: "Système de couleurs, logo, déclinaisons sur les réseaux.",
                },
                {
                  t: "Déploiement",
                  d: "Mise en ligne, configuration DNS, suivi post-livraison.",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#E8352A] mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-2xl mb-3">{s.t}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
