"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollExpandMedia from "@/components/blocks/scroll-expansion-hero";
import BackLink from "@/components/BackLink";

const soins = [
  {
    t: "Nutrition",
    d: "Bilan alimentaire personnalisé, conseils adaptés à votre terrain et votre mode de vie.",
  },
  {
    t: "Phytothérapie",
    d: "Les plantes au service de votre équilibre — infusions, teintures, huiles essentielles.",
  },
  {
    t: "Gestion du stress",
    d: "Techniques de respiration, cohérence cardiaque, hygiène de vie apaisante.",
  },
  {
    t: "Bilan de vitalité",
    d: "Analyse complète de votre état général. Point de départ d'un accompagnement sur-mesure.",
  },
];

const palette = {
  bg: "#F5F1EA",
  green: "#3E5F3A",
  greenLight: "#7A9473",
  text: "#22231C",
};

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

      {/* SCROLL EXPAND HERO */}
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
  return (
    <div style={{ color: palette.text }} className="-mx-8 md:-mx-16 lg:-my-20">
      <div className="bg-[#F5F1EA] py-20">
        {/* INTRO */}
        <section className="container">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24 items-start">
            <div
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: palette.green }}
            >
              <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>01</span>
              À propos
            </div>
            <div>
              <h2
                className="text-4xl md:text-6xl leading-[1.05] mb-10 max-w-3xl"
                style={{ fontFamily: "var(--font-playfair), serif", color: palette.text }}
              >
                La naturopathie, c'est écouter son corps pour mieux l'accompagner.
              </h2>
              <div className="grid md:grid-cols-2 gap-8 text-lg leading-relaxed text-black/70">
                <p>
                  Je m'appelle Claire. Naturopathe certifiée, je vous accompagne
                  dans une approche naturelle et bienveillante de votre santé —
                  sans jamais remplacer votre médecin, en complément.
                </p>
                <p>
                  Chaque personne est unique. Mon travail est d'identifier les
                  déséquilibres, de comprendre votre terrain, et de construire
                  avec vous un chemin vers plus d'énergie et de sérénité.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOINS */}
        <section className="container py-24 md:py-32">
          <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24 items-start mb-16">
            <div
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: palette.green }}
            >
              <span style={{ color: "rgba(0,0,0,0.3)", marginRight: 8 }}>02</span>
              Mes soins
            </div>
            <h2
              className="text-4xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair), serif", color: palette.text }}
            >
              Des approches douces<br />pour retrouver l'équilibre.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {soins.map((s, i) => (
              <motion.div
                key={s.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl p-8 bg-white border border-black/5 transition-all duration-500 hover:-translate-y-1"
                style={{ boxShadow: "0 20px 60px -30px rgba(62, 95, 58, 0.35)" }}
              >
                <div
                  className="text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: palette.greenLight }}
                >
                  0{i + 1}
                </div>
                <h3
                  className="text-3xl mb-4"
                  style={{ fontFamily: "var(--font-playfair), serif", color: palette.text }}
                >
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-black/60">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="container py-16 md:py-24">
          <div
            className="rounded-3xl p-12 md:p-20 text-white text-center relative overflow-hidden"
            style={{ backgroundColor: palette.green }}
          >
            <div className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-6">
              Témoignage
            </div>
            <p
              className="text-3xl md:text-5xl leading-tight max-w-3xl mx-auto"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              « Claire m'a aidée à retrouver de l'énergie. Ses conseils sont
              concrets, doux, et ont vraiment changé mon quotidien. »
            </p>
            <div className="mt-8 text-sm opacity-70 tracking-[0.2em] uppercase">
              — Sophie, 38 ans
            </div>
          </div>
        </section>

        {/* RDV */}
        <section className="container py-24 md:py-32">
          <div className="text-center max-w-2xl mx-auto">
            <div
              className="text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: palette.green }}
            >
              Prendre rendez-vous
            </div>
            <h3
              className="text-4xl md:text-6xl mb-10 leading-[1.05]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Le premier pas vers votre équilibre.
            </h3>
            <a
              href="mailto:contactstudioftt@gmail.com?subject=Medicent%20%E2%80%94%20R%C3%A9servation%20s%C3%A9ance"
              className="btn"
              style={{
                backgroundColor: palette.green,
                borderColor: palette.green,
                color: "#fff",
              }}
            >
              Réserver une séance <span className="btn__arrow">→</span>
            </a>
            <p className="mt-6 text-sm text-black/50">
              Première consultation — 75 € · 1h30 · Cabinet au Mans ou visio
            </p>
          </div>
        </section>

        <footer
          className="container py-10 border-t text-sm flex flex-col md:flex-row gap-2 items-center justify-between"
          style={{ borderColor: "rgba(0,0,0,0.08)", color: "rgba(0,0,0,0.5)" }}
        >
          <span>Medicent — Claire, Naturopathe certifiée</span>
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
