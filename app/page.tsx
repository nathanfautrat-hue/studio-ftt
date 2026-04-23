"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import {
  ScavbackPreview,
  SprayfilmPreview,
  PLCPreview,
  MedicentPreview,
} from "@/components/ProjectPreviews";

const projects = [
  {
    title: "Scavback",
    category: "Collectif artistique",
    description:
      "Plateforme en ligne pour un collectif artistique — galerie, portfolio et univers visuel fort.",
    preview: <ScavbackPreview />,
    href: "/projets/scavback",
    status: "client" as const,
  },
  {
    title: "Sprayfilm",
    category: "Production audiovisuelle",
    description:
      "Site vitrine pour une agence de production audiovisuelle en Bretagne — SEO local et Google Business inclus.",
    preview: <SprayfilmPreview />,
    href: "/projets/sprayfilm",
    status: "client" as const,
  },
  {
    title: "PLC",
    category: "SaaS — Agent IA B2B",
    description:
      "Landing page SaaS pour logiciel B2B — agent IA pour optimiser la gestion d'entreprise.",
    preview: <PLCPreview />,
    href: "/projets/plc",
    status: "demo" as const,
  },
  {
    title: "Medicent",
    category: "Naturopathe",
    description:
      "Site premium pour naturopathe — intégrant une expérience de scroll immersive unique.",
    preview: <MedicentPreview />,
    href: "/projets/medicent",
    status: "demo" as const,
  },
];

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100dvh] pt-28 overflow-hidden">
        {/* backdrop gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(232,53,42,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_90%_80%,rgba(232,53,42,0.12),transparent_60%)]" />
        </div>

        <div className="container pt-12 md:pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-white/60 mb-10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8352A] animate-pulse" />
            Agence web · Sarthe, France
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[18vw] md:text-[14vw] lg:text-[200px] leading-[0.82] tracking-tight"
          >
            STUDIO <span className="text-[#E8352A]">FTT</span>
          </motion.h1>

          <div className="mt-10 grid md:grid-cols-2 gap-10 items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-3xl md:text-5xl leading-tight max-w-2xl"
            >
              On crée des sites <span className="text-[#E8352A]">qui convertissent.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col md:items-end gap-4"
            >
              <p className="text-white/60 max-w-sm md:text-right">
                Agence web spécialisée artisans & entreprises — design, développement, SEO local, maintenance.
              </p>
              <a href="#projets" className="btn btn--solid self-start md:self-end">
                Voir nos projets <span className="btn__arrow">→</span>
              </a>
            </motion.div>
          </div>

          {/* marquee */}
          <div className="mt-24 overflow-hidden border-y border-white/5 -mx-6">
            <div className="flex gap-16 py-5 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
              {[
                "Design UI",
                "Développement",
                "SEO local",
                "Identité visuelle",
                "Maintenance",
                "Artisans & entreprises",
                "Sarthe · France",
              ]
                .concat([
                  "Design UI",
                  "Développement",
                  "SEO local",
                  "Identité visuelle",
                  "Maintenance",
                  "Artisans & entreprises",
                  "Sarthe · France",
                ])
                .map((t, i) => (
                  <span
                    key={i}
                    className="text-xs tracking-[0.3em] uppercase text-white/40"
                  >
                    {t} <span className="text-[#E8352A] ml-16">●</span>
                  </span>
                ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>

      {/* APPROCHE */}
      <section id="approche" className="container py-24 md:py-32">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24 items-start">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">01</span>Approche
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.05] max-w-3xl mb-8">
              Du sur-mesure. <span className="text-white/40">Chaque site est pensé pour vous. Et avec vous.</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  n: "01",
                  t: "Stratégie",
                  d: "On comprend votre métier, vos clients et vos objectifs avant la moindre ligne de code.",
                },
                {
                  n: "02",
                  t: "Design",
                  d: "Interfaces soignées, typographies fortes, mobile-first. Tout est pensé pour convertir.",
                },
                {
                  n: "03",
                  t: "Livraison",
                  d: "Le site est livré avec une vidéo explicative.",
                },
              ].map((s) => (
                <div
                  key={s.n}
                  className="border-t border-white/10 pt-6"
                >
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
                    {s.n}
                  </div>
                  <h3 className="font-display text-2xl mb-3 tracking-wide">{s.t}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" className="container py-24 md:py-32 border-t border-white/5">
        <div className="mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
            <span className="text-white/30 mr-2">02</span>Projets
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-none">
            Mes projets
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* CTA — formulaire contact */}
      <section id="contact-form" className="container py-24 md:py-32 border-t border-white/5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8352A] via-[#c62920] to-[#7a1a14] p-10 md:p-16">
          <div className="absolute inset-0 noise" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-4">
              Prochain projet — le vôtre ?
            </div>
            <h3 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl mb-10">
              Parlons de votre site.
            </h3>
            <form
              action="mailto:contactstudioftt@gmail.com"
              method="post"
              encType="text/plain"
              className="grid md:grid-cols-2 gap-4 max-w-3xl"
            >
              <input
                name="Prenom"
                placeholder="Prénom"
                required
                className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition"
              />
              <input
                name="Nom"
                placeholder="Nom"
                required
                className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition"
              />
              <input
                name="Email"
                type="email"
                placeholder="Email"
                required
                className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition md:col-span-2"
              />
              <textarea
                name="Description_projet"
                placeholder="Décrivez votre projet…"
                rows={5}
                required
                className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition md:col-span-2 resize-none"
              />
              <button type="submit" className="btn btn--dark md:col-span-2 justify-self-start">
                Envoyer le mail <span className="btn__arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
