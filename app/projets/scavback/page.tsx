"use client";

import Reveal from "@/components/Reveal";
import BackLink from "@/components/BackLink";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";

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
        <div className="fade-in-up">
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
              href="https://scavback.pages.dev/"
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
              Un collectif artistique avait besoin d&apos;un espace pour exister en ligne.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Scavback rassemble des artistes indépendants autour d&apos;un univers
              visuel commun — son, image, vision. L&apos;enjeu : créer une
              plateforme qui reflète leur identité tout en restant fonctionnelle
              pour présenter les œuvres, les artistes et les événements à venir.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mt-6">
              Un collectif, ce n&apos;est ni une entreprise ni un artiste solo :
              le site devait laisser de la place à chaque membre sans diluer
              l&apos;identité du groupe. C&apos;est ce qui a guidé toutes les
              décisions, du design à la structure des pages.
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
              Un site qui ressemble à leur scène, pas à une plaquette.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Fond noir, textures sombres, typographie massive en capitales et
              rouge signature : l&apos;arrivée sur le site pose l&apos;ambiance
              avant même le premier mot. Le nom du collectif occupe
              l&apos;écran entier, la navigation se réduit à l&apos;essentiel,
              et chaque section garde cette tension visuelle plutôt que de
              l&apos;adoucir.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mt-6">
              Le piège classique pour ce genre de projet, c&apos;est le template
              de portfolio générique qui aplatit tout. Ici, l&apos;identité du
              collectif est le point de départ du design, pas un logo posé sur
              une maquette toute faite.
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
                  t: "Design UI",
                  d: "Identité visuelle forte, typographies contrastées, mise en page éditoriale. Chaque écran a été dessiné pour l'univers du collectif, sans partir d'un template.",
                },
                {
                  t: "Développement React",
                  d: "Application React compilée avec Vite : navigation fluide, animations maîtrisées, et un site qui reste rapide malgré la densité visuelle.",
                },
                {
                  t: "Identité visuelle",
                  d: "Système de couleurs autour du rouge signature, logo, déclinaisons pensées pour les réseaux du collectif.",
                },
                {
                  t: "Déploiement",
                  d: "Build de production, mise en ligne sur Cloudflare Pages, configuration DNS et suivi après livraison.",
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

      {/* STACK */}
      <section className="container py-16 md:py-24 border-t border-white/5">
        <div className="grid md:grid-cols-[auto_1fr] gap-12 md:gap-24">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A]">
            <span className="text-white/30 mr-2">04</span>Côté technique
          </div>
          <div className="max-w-3xl">
            <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
              React + Vite, servi par Cloudflare Pages.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Le site est une application React compilée avec Vite, déployée sur
              Cloudflare Pages : chaque mise à jour du code part en ligne
              automatiquement, et les pages sont servies depuis un réseau mondial
              — le site charge vite, en France comme ailleurs.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mt-6">
              Pour un budget de 500 €, le collectif repart avec un vrai site
              sur-mesure : pas d&apos;abonnement à une plateforme, pas de
              template loué, un univers à eux.
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
