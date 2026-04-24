"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BackLink from "@/components/BackLink";

const GOLD = "#C8A760";
const INK = "#1A1814";
const CREAM = "#F5F2EC";

const heroImg =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85";

const gallery = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=900&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80",
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=900&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80",
  "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=900&q=80",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=900&q=80",
];

// Bento layout: on desktop (4 cols × 3 rows = 12 cells) we have two "featured"
// tiles that span 2×2 and 2×1 — sums to exactly 12 cells, no holes.
const galleryLayout = [
  "md:col-span-2 md:row-span-2",
  "",
  "",
  "",
  "",
  "md:col-span-2",
  "",
  "",
];

const menu = {
  entrees: [
    { n: "Huîtres Gillardeau", d: "Mignonnette à l'échalote, pain de seigle toasté.", p: "24" },
    { n: "Foie gras maison", d: "Confit de coing, brioche tiède au beurre noisette.", p: "28" },
    { n: "Tartare de dorade", d: "Citron yuzu, gingembre, herbes du jardin.", p: "22" },
  ],
  plats: [
    { n: "Bar de ligne", d: "Fenouil rôti, sauce vierge à l'olive Taggiasche.", p: "42" },
    { n: "Pigeon en croûte", d: "Foie gras, truffe noire, jus corsé au cassis.", p: "56" },
    { n: "Ris de veau", d: "Topinambour, champignons de saison, beurre blanc.", p: "48" },
  ],
  desserts: [
    { n: "Tarte au chocolat", d: "Grand cru de Madagascar, sorbet cacao.", p: "18" },
    { n: "Soufflé Grand Marnier", d: "Glace vanille bourbon, crème anglaise.", p: "20" },
    { n: "Mille-feuille vanille", d: "Crème pâtissière minute, caramel beurre salé.", p: "18" },
  ],
};

const expériences = [
  {
    t: "Menu dégustation",
    d: "7 temps du Chef. Un voyage gustatif pensé au fil des saisons.",
    p: "145 €",
  },
  {
    t: "Accord mets & vins",
    d: "Sélection du sommelier pour accompagner chaque plat du menu dégustation.",
    p: "+ 75 €",
  },
  {
    t: "Table du Chef",
    d: "Dîner privé en cuisine, face au passe. Jusqu'à 6 convives.",
    p: "Sur devis",
  },
];

export default function OctavePage() {
  return (
    <main style={{ backgroundColor: CREAM, color: INK }} className="min-h-screen">
      {/* top bar */}
      <div
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b"
        style={{ backgroundColor: `${CREAM}dd`, borderColor: "rgba(26,24,20,0.08)" }}
      >
        <div className="container flex items-center justify-between py-4">
          <BackLink className="text-black/60 hover:text-black" />
          <div className="flex items-center gap-3">
            <span
              className="hidden md:inline font-display text-xs tracking-[0.3em] uppercase"
              style={{ color: GOLD }}
            >
              Maison Octave
            </span>
            <span
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase border px-3 py-1 rounded-full"
              style={{ borderColor: "rgba(26,24,20,0.15)", color: INK }}
            >
              Concept démo · Studio FTT
            </span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="relative h-[100dvh] min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImg}
          alt="Maison Octave"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(18,16,12,0.35) 0%, rgba(18,16,12,0.55) 60%, rgba(18,16,12,0.8) 100%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="relative z-10 text-center px-6"
        >
          <div
            className="flex items-center justify-center gap-3 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: GOLD }}
          >
            <span className="h-px w-10" style={{ backgroundColor: GOLD }} />
            <span>Gastronomie · Depuis 1923</span>
            <span className="h-px w-10" style={{ backgroundColor: GOLD }} />
          </div>
          <h1
            className="text-white text-6xl md:text-[10vw] lg:text-[11rem] leading-[0.9] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Maison
            <br />
            <em style={{ color: GOLD }}>Octave</em>
          </h1>
          <p className="mt-10 max-w-xl mx-auto text-white/80 text-base md:text-lg leading-relaxed">
            Un siècle de gastronomie française, sublimé par la vision du Chef
            Antoine Valmont. Une table d&apos;exception au cœur de la vallée.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <a
              href="#reserver"
              className="btn"
              style={{ backgroundColor: GOLD, borderColor: GOLD, color: INK }}
            >
              Réserver une table <span className="btn__arrow">→</span>
            </a>
            <a href="#carte" className="btn btn--ghost">
              Découvrir la carte <span className="btn__arrow">→</span>
            </a>
          </div>
        </motion.div>
        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-[10px] tracking-[0.4em] uppercase flex flex-col items-center gap-2">
          <span>Découvrir</span>
          <span className="animate-bounce">↓</span>
        </div>
      </section>

      {/* LA MAISON */}
      <section className="container py-24 md:py-40">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-24 items-center">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85"
              alt="Chef Antoine Valmont"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div
              className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: GOLD }}
            >
              <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
              <span>La Maison</span>
            </div>
            <h2
              className="text-5xl md:text-7xl leading-[0.95] mb-8 tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Une histoire de <em style={{ color: GOLD }}>passion</em> et de
              transmission.
            </h2>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "rgba(26,24,20,0.75)" }}
            >
              Fondée en 1923 par Octave Valmont, la maison perpétue depuis
              quatre générations l&apos;art d&apos;une gastronomie française
              ancrée dans son terroir et tournée vers l&apos;avenir.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(26,24,20,0.6)" }}
            >
              Aujourd&apos;hui sous la direction du Chef Antoine Valmont, la
              Maison Octave cultive ses propres légumes, travaille en circuit
              court avec les producteurs de la vallée et réinvente, plat après
              plat, l&apos;héritage familial.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[
                { k: "Chef", v: "Antoine Valmont" },
                { k: "Étoiles", v: "★★" },
                { k: "Depuis", v: "1923" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="border-t pt-4"
                  style={{ borderColor: "rgba(26,24,20,0.15)" }}
                >
                  <div
                    className="text-[10px] tracking-[0.3em] uppercase mb-2"
                    style={{ color: "rgba(26,24,20,0.5)" }}
                  >
                    {s.k}
                  </div>
                  <div
                    className="text-2xl"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CARTE */}
      <section
        id="carte"
        className="py-24 md:py-40"
        style={{ backgroundColor: INK, color: CREAM }}
      >
        <div className="container">
          <div className="text-center mb-20">
            <div
              className="flex items-center justify-center gap-3 text-xs tracking-[0.4em] uppercase mb-6"
              style={{ color: GOLD }}
            >
              <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
              <span>La Carte</span>
              <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
            </div>
            <h2
              className="text-5xl md:text-7xl leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Sélection de <em style={{ color: GOLD }}>saison</em>
            </h2>
            <p className="mt-6 text-white/60 max-w-xl mx-auto">
              Les plats évoluent au fil des récoltes et des arrivages. Voici un
              aperçu de la carte actuelle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {(
              [
                { title: "Entrées", items: menu.entrees },
                { title: "Plats", items: menu.plats },
                { title: "Desserts", items: menu.desserts },
              ] as const
            ).map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div
                  className="flex items-center gap-3 mb-8 text-xs tracking-[0.4em] uppercase"
                  style={{ color: GOLD }}
                >
                  <span className="h-px w-6" style={{ backgroundColor: GOLD }} />
                  <span>{section.title}</span>
                </div>
                <div className="space-y-8">
                  {section.items.map((d) => (
                    <div
                      key={d.n}
                      className="pb-6 border-b"
                      style={{ borderColor: "rgba(245,242,236,0.08)" }}
                    >
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <h3
                          className="text-2xl leading-tight"
                          style={{ fontFamily: "var(--font-playfair), serif" }}
                        >
                          {d.n}
                        </h3>
                        <span
                          className="text-lg flex-shrink-0"
                          style={{ color: GOLD, fontFamily: "var(--font-playfair), serif" }}
                        >
                          {d.p} €
                        </span>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {d.d}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPÉRIENCES */}
      <section className="container py-24 md:py-40">
        <div className="max-w-3xl mb-16">
          <div
            className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: GOLD }}
          >
            <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
            <span>Les expériences</span>
          </div>
          <h2
            className="text-5xl md:text-7xl leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Au-delà <em style={{ color: GOLD }}>du repas</em>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {expériences.map((e, i) => (
            <motion.div
              key={e.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-10 rounded-2xl border transition-all duration-500 hover:shadow-2xl"
              style={{ borderColor: "rgba(26,24,20,0.12)", backgroundColor: "#FBF9F4" }}
            >
              <div
                className="text-[10px] tracking-[0.4em] uppercase mb-8"
                style={{ color: GOLD }}
              >
                0{i + 1}
              </div>
              <h3
                className="text-3xl mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {e.t}
              </h3>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: "rgba(26,24,20,0.65)" }}
              >
                {e.d}
              </p>
              <div
                className="text-xl"
                style={{ color: GOLD, fontFamily: "var(--font-playfair), serif" }}
              >
                {e.p}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GALERIE */}
      <section className="container pb-24 md:pb-40">
        <div
          className="flex items-end justify-between mb-12 border-t pt-16"
          style={{ borderColor: "rgba(26,24,20,0.15)" }}
        >
          <div>
            <div
              className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: GOLD }}
            >
              <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
              <span>Galerie</span>
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              L&apos;<em style={{ color: GOLD }}>art</em> de la table.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-3 md:gap-5 auto-rows-[180px] md:auto-rows-[220px]">
          {gallery.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`relative overflow-hidden rounded-2xl ${galleryLayout[i] || ""}`}
            >
              <Image
                src={src}
                alt={`Galerie ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* RÉSERVER */}
      <section
        id="reserver"
        className="py-24 md:py-40"
        style={{ backgroundColor: INK, color: CREAM }}
      >
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <div
                className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase mb-6"
                style={{ color: GOLD }}
              >
                <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
                <span>Réserver</span>
              </div>
              <h2
                className="text-5xl md:text-7xl leading-[0.95] mb-10 tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Votre table <em style={{ color: GOLD }}>vous attend</em>.
              </h2>
              <div className="space-y-8 text-white/70">
                <div>
                  <div
                    className="text-[10px] tracking-[0.4em] uppercase mb-2"
                    style={{ color: GOLD }}
                  >
                    Horaires
                  </div>
                  <p>Du mardi au samedi</p>
                  <p>Déjeuner 12h — 14h</p>
                  <p>Dîner 19h — 22h</p>
                </div>
                <div>
                  <div
                    className="text-[10px] tracking-[0.4em] uppercase mb-2"
                    style={{ color: GOLD }}
                  >
                    Adresse
                  </div>
                  <p>12 rue des Jardins</p>
                  <p>72000 Le Mans, France</p>
                </div>
                <div>
                  <div
                    className="text-[10px] tracking-[0.4em] uppercase mb-2"
                    style={{ color: GOLD }}
                  >
                    Contact
                  </div>
                  <p>+33 (0)2 43 00 00 00</p>
                  <p>reservations@maison-octave.fr</p>
                </div>
              </div>
            </div>
            <form
              action="mailto:contactstudioftt@gmail.com"
              method="post"
              encType="text/plain"
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="Prenom"
                  placeholder="Prénom"
                  required
                  className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-sm focus:outline-none transition"
                  style={{ color: CREAM }}
                />
                <input
                  name="Nom"
                  placeholder="Nom"
                  required
                  className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-sm focus:outline-none transition"
                  style={{ color: CREAM }}
                />
              </div>
              <input
                name="Email"
                type="email"
                placeholder="Email"
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-sm focus:outline-none transition"
                style={{ color: CREAM }}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="Date"
                  type="date"
                  required
                  className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-sm focus:outline-none transition"
                  style={{ color: CREAM }}
                />
                <input
                  name="Convives"
                  type="number"
                  placeholder="Convives"
                  min={1}
                  max={20}
                  required
                  className="bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-sm focus:outline-none transition"
                  style={{ color: CREAM }}
                />
              </div>
              <textarea
                name="Message"
                placeholder="Occasion, allergies, demandes particulières…"
                rows={4}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-5 py-4 text-sm focus:outline-none transition resize-none"
                style={{ color: CREAM }}
              />
              <button
                type="submit"
                className="btn w-full justify-center"
                style={{ backgroundColor: GOLD, borderColor: GOLD, color: INK }}
              >
                Envoyer la demande <span className="btn__arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="container py-12 text-sm flex flex-col md:flex-row gap-3 items-center justify-between"
        style={{ color: "rgba(26,24,20,0.5)" }}
      >
        <span>Maison Octave — Gastronomie française depuis 1923</span>
        <span>
          Concept démo par{" "}
          <Link
            href="/"
            className="underline hover:text-black"
            style={{ color: INK }}
          >
            Studio FTT
          </Link>
        </span>
      </footer>
    </main>
  );
}
