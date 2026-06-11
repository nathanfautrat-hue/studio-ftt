"use client";

import Reveal from "@/components/Reveal";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

export default function SprayfilmPage() {
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
        <div className="fade-in-up">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
            Production audiovisuelle · Bretagne
          </div>
          <h1 className="font-display text-6xl md:text-[10vw] md:leading-[0.88] tracking-tight">
            Sprayfilm
          </h1>
          <p className="mt-6 text-white/60 text-lg md:text-xl max-w-2xl">
            Site vitrine pour une agence de production audiovisuelle et
            exécutive basée en Bretagne — SEO local et Google Business inclus.
          </p>
          <div className="mt-10">
            <a
              href="https://sprayfilm.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
            >
              Visiter le site <span className="btn__arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* META */}
      <section className="container py-24 md:py-32">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {[
            { k: "Catégorie", v: "Production audiovisuelle" },
            { k: "Type", v: "Site client" },
            { k: "Année", v: "2026" },
            { k: "Budget", v: "1 000 €" },
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
              Une agence de production qui avait besoin d&apos;exister en ligne
              — et d&apos;être trouvée sur Google.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Sprayfilm est une agence de production audiovisuelle et exécutive
              en Bretagne. Publicité, émissions, clips, films corporate, social
              content, VFX : l&apos;agence couvre toute la chaîne, de la
              conception à la post-production. L&apos;enjeu : un site vitrine
              qui reflète ce savoir-faire, couplé à une stratégie SEO locale et
              une fiche Google Business pour capter les recherches régionales.
            </p>
          </div>
        </div>
      </section>

      {/* PARTI PRIS */}
      <section className="container py-16 md:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">02</span>Parti pris
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
              Une bande démo, pas une plaquette commerciale.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Noir profond, un « PRODUCTION » géant qui occupe l&apos;écran
              d&apos;entrée, et les projets qui défilent avec leur année, comme
              un générique. Une boîte de production se juge à ses images :
              le site s&apos;efface derrière elles au lieu de les noyer dans
              du texte.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mt-6">
              Chaque métier de l&apos;agence — publicité, émission, social
              content, clip, corporate — a sa propre entrée, avec un texte qui
              parle aux marques et aux annonceurs, pas seulement aux gens de
              l&apos;image.
            </p>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="container py-16 md:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">03</span>Ce que j&apos;ai fait
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  t: "Site vitrine",
                  d: "Design épuré noir & blanc, mise en avant des productions par métier et par année, navigation claire vers le contact.",
                },
                {
                  t: "SEO local",
                  d: "Optimisation pour les recherches de production audiovisuelle en Bretagne — Rennes, Brest, Nantes, Angers, Lorient.",
                },
                {
                  t: "Google Business",
                  d: "Création et configuration de la fiche Google Business Profile, reliée au site, pour la visibilité locale.",
                },
                {
                  t: "Déploiement",
                  d: "Mise en ligne, configuration du domaine sprayfilm.fr, suivi post-livraison.",
                },
              ].map((s, i) => (
                <Reveal key={s.t} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#E8352A] mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-2xl mb-3">{s.t}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEO LOCAL */}
      <section className="container py-16 md:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">04</span>Être trouvé
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
              Un beau site ne sert à rien si personne ne le trouve.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Le marché de Sprayfilm est régional : les marques et boîtes de
              production qui cherchent un partenaire en Bretagne passent par
              Google. Le site a donc été structuré pour ces recherches — pages
              et textes optimisés sur les métiers et les villes d&apos;intervention,
              fiche Google Business reliée au domaine.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mt-6">
              C&apos;est la logique du pack Sur-mesure : le design d&apos;abord,
              mais jamais sans la mécanique qui amène les visiteurs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-20 md:py-28 border-t border-white/5 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] mb-6">
            Un projet du même genre&nbsp;?
          </h2>
          <p className="text-white/60 text-lg mb-10">
            15 minutes au téléphone pour en parler, sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={siteConfig.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--solid"
            >
              Réserver un appel <span className="btn__arrow">→</span>
            </a>
            <a href="/tarifs" className="btn btn--ghost">
              Voir les tarifs <span className="btn__arrow">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
