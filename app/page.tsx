"use client";

import { useState } from "react";
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
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom, nom, email, description }),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setSent(true);
      setPrenom(""); setNom(""); setEmail(""); setDescription("");
    } catch {
      setError("Une erreur est survenue. Réessayez ou écrivez-nous directement.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[100dvh] pt-28 overflow-hidden">
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
              <a href="#projets" className="btn btn--solid self-start md:self-end">
                Voir nos projets <span className="btn__arrow">→</span>
              </a>
            </motion.div>
          </div>

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
                  <span key={i} className="text-xs tracking-[0.3em] uppercase text-white/40">
                    {t} <span className="text-[#E8352A] ml-16">●</span>
                  </span>
                ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
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
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-5xl mb-10 tracking-tight">
              Du sur-mesure. <span className="text-white/40">Chaque site est pensé pour vous. Et avec vous.</span>
            </h2>
            <p className="text-white/70 text-lg md:text-2xl leading-relaxed max-w-3xl mb-4">
              De la première maquette à la mise en ligne, on s&apos;occupe de tout — et on vous laisse le contrôle.
            </p>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl">
              Hébergement offert. Pas d&apos;abonnement caché. À partir de 500€.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {[
                { n: "01", t: "Création", d: "Un site responsive pensé pour votre activité — design, contenus, formulaire de contact." },
                { n: "02", t: "Visibilité", d: "Référencement local et fiche Google pour que vos clients vous trouvent dans votre région." },
                { n: "03", t: "Autonomie", d: "Une vidéo explicative livrée avec le site. Maintenance annuelle en option si vous préférez être tranquille." },
              ].map((s) => (
                <div key={s.n} className="border-t border-white/10 pt-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">{s.n}</div>
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
          <h2 className="font-display text-5xl md:text-7xl leading-none">Mes projets</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-form" className="container py-24 md:py-32 border-t border-white/5">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8352A] via-[#c62920] to-[#7a1a14] p-10 md:p-16">
          <div className="absolute inset-0 noise" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/70 mb-4">Prochain projet — le vôtre ?</div>
            <h3 className="font-display text-4xl md:text-6xl leading-[0.95] max-w-3xl mb-10">Parlons de votre site.</h3>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 max-w-3xl">
              <input value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prénom" required className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition" />
              <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" required className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition" />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" required className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition md:col-span-2" />
              <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Décrivez votre projet…" rows={5} required className="bg-white/10 border border-white/20 rounded-lg px-5 py-4 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:bg-white/15 transition md:col-span-2 resize-none" />
              <button type="submit" disabled={sending} className="btn btn--dark md:col-span-2 justify-self-start disabled:opacity-50">
                {sending ? "Envoi en cours…" : "Envoyer le message"} <span className="btn__arrow">→</span>
              </button>
              {sent && <p className="md:col-span-2 text-green-400 text-sm">✅ Message envoyé ! Nous vous répondrons rapidement.</p>}
              {error && <p className="md:col-span-2 text-red-400 text-sm">{error}</p>}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
