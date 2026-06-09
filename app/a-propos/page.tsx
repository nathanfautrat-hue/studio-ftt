import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, personSchema, aboutPageSchema } from "@/lib/schema";

const TITLE = "À propos — Nathan Fautrat, fondateur de Studio FTT";
const DESCRIPTION =
  "Studio FTT, c'est Nathan Fautrat, 19 ans, basé en Sarthe. Designer et développeur web indépendant. Je crée des sites sur-mesure pour les artisans, indépendants et petites équipes qui veulent un site fait pour eux — pas un Wix générique.";
const URL_A_PROPOS = `${siteConfig.url}/a-propos`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Nathan Fautrat",
    "fondateur Studio FTT",
    "designer web Sarthe",
    "développeur web indépendant",
    "studio web Le Mans",
    "freelance web Sarthe",
  ],
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    type: "profile",
    locale: "fr_FR",
    url: URL_A_PROPOS,
    siteName: siteConfig.name,
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    firstName: "Nathan",
    lastName: "Fautrat",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
};

export default function APropos() {
  return (
    <main className="bg-black text-white min-h-screen">
      <JsonLd
        data={[
          aboutPageSchema(),
          breadcrumbSchema([
            { name: "Accueil", url: siteConfig.url },
            { name: "À propos", url: URL_A_PROPOS },
          ]),
          personSchema(),
        ]}
      />
      <Navbar />

      {/* HERO */}
      <section className="container pt-40 pb-20">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 md:gap-16 items-center max-w-5xl">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
              À propos
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mb-8">
              Le studio, c&apos;est <span className="text-[#E8352A]">moi</span>.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
              Nathan Fautrat, designer et développeur web indépendant en Sarthe.
              Je crée des sites sur-mesure pour les pros qui veulent un site fait
              pour eux, pas un Wix de plus.
            </p>
          </div>
          <div>
            <img
              src="/nathan.webp"
              alt="Nathan Fautrat, fondateur de Studio FTT"
              width={951}
              height={1268}
              className="w-full max-w-[300px] md:max-w-[360px] mx-auto rounded-2xl border border-white/10 object-cover"
            />
          </div>
        </div>
      </section>

      {/* SÉPARATEUR */}
      <div className="container max-w-3xl">
        <div className="h-px bg-white/10" />
      </div>

      {/* POURQUOI STUDIO FTT */}
      <section className="container pt-20 pb-20 max-w-3xl">
        <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-6 font-mono">
          01 — Pourquoi Studio FTT existe
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            J&apos;ai monté ce studio en Sarthe après avoir passé des heures à
            regarder les sites des artisans, kinés, garages et indépendants
            autour de moi. Toujours la même chose&nbsp;: des templates fades,
            des photos qui pourraient venir de n&apos;importe où, aucune
            identité.
          </p>
          <p className="text-white">
            Ces pros méritent mieux. Leur site devrait être à la hauteur du
            métier qu&apos;ils font.
          </p>
          <p>
            C&apos;est tout ce que fait Studio FTT. Un site pensé pour votre
            activité, fait à la main, qui parle aux gens que vous voulez
            vraiment toucher.
          </p>
        </div>
      </section>

      {/* COMMENT JE BOSSE */}
      <section
        className="py-20"
        style={{ background: "var(--ftt-black-2)" }}
      >
        <div className="container max-w-3xl">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-6 font-mono">
            02 — Comment je bosse
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/75">
            <p>
              Pas d&apos;agence à étages. Vous m&apos;appelez, c&apos;est moi
              qui décroche. Une modif à faire, je la fais le jour même. Vous
              parlez à la personne qui dessine le site, qui le code et qui le
              met en ligne, ça évite les téléphones arabes et les délais qui
              s&apos;allongent.
            </p>
            <p>
              Je livre en{" "}
              <strong className="text-white">14 jours ouvrés</strong>, pas en
              3&nbsp;mois. Devis gratuit et écrit avant de toucher à quoi que
              ce soit. Si je peux pas tenir un délai, je vous préviens avant.
              Pas après.
            </p>
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="container py-20 max-w-3xl">
        <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-6 font-mono">
          03 — Pour qui c&apos;est
        </div>
        <p className="text-lg leading-relaxed text-white/75 mb-8">
          Pour les artisans, les indépendants, les petites équipes qui ont
          mieux à faire que de gérer un Wix qui rame.
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Plombiers",
            "Kinés",
            "Ostéos",
            "Garagistes",
            "Coachs sportifs",
            "Cabinets pluri",
            "Architectes",
            "Photographes",
            "Consultants",
          ].map((m) => (
            <span
              key={m}
              className="font-mono text-xs tracking-wider px-3 py-2 border border-white/15 rounded-full text-white/70"
            >
              {m}
            </span>
          ))}
        </div>
        <p className="text-base text-white/60 mt-8 leading-relaxed">
          Peu importe le métier, tant qu&apos;on partage la même idée&nbsp;:
          un site qui travaille pour vous, pas l&apos;inverse.
        </p>
      </section>

      {/* MES ENGAGEMENTS */}
      <section
        className="py-20"
        style={{ background: "var(--ftt-black-2)" }}
      >
        <div className="container max-w-4xl">
          <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-6 font-mono">
            04 — Mes engagements
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                t: "Devis gratuit et clair",
                d: "Écrit, détaillé, sans surprise. Vous savez ce que vous payez avant qu'on démarre.",
              },
              {
                t: "Site livré en 14 jours ouvrés",
                d: "À compter du moment où j'ai vos contenus en main et l'acompte versé.",
              },
              {
                t: "Hébergement offert la 1ère année",
                d: "Sur Cloudflare Pages. Ensuite inclus dans la maintenance à 35€/mois si vous la souscrivez.",
              },
              {
                t: "1 modification gratuite incluse",
                d: "Après la mise en ligne, pour ajuster ce qui doit l'être.",
              },
              {
                t: "Vous m'avez en direct",
                d: "Pas d'intermédiaire, pas de chef de projet, pas de hotline. Mon numéro et mon mail, c'est tout.",
              },
              {
                t: "Conditions claires",
                d: "Acompte 30% à la signature, solde à la livraison. CGV en ligne consultables avant signature.",
              },
            ].map((e) => (
              <div
                key={e.t}
                className="p-6 rounded-2xl border"
                style={{
                  borderColor: "var(--ftt-line)",
                  background: "var(--ftt-black)",
                }}
              >
                <h3 className="font-display text-xl mb-2 text-white">
                  {e.t}
                </h3>
                <p className="text-sm text-white/65 leading-relaxed">
                  {e.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BASÉ EN SARTHE */}
      <section className="container py-20 max-w-3xl">
        <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-6 font-mono">
          05 — Basé en Sarthe
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/75">
          <p>
            <strong className="text-white">7 rue du Fromenteau, 72270 Arthezé.</strong>{" "}
            Je me déplace dans le département et autour du Mans pour les
            premiers rendez-vous quand c&apos;est utile. Ailleurs, on bosse à
            distance, la qualité ne change pas.
          </p>
        </div>
      </section>

      {/* CTA CALENDLY */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, var(--ftt-black-2) 0%, var(--ftt-black) 100%)",
        }}
      >
        <div className="container max-w-3xl text-center">
          <h2 className="font-display text-4xl md:text-6xl leading-tight mb-6">
            On en parle <span className="text-[#E8352A]">15 minutes</span>&nbsp;?
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl mx-auto">
            Un premier appel sans engagement. À la fin, vous repartez avec une
            réponse claire et un devis si ça vous parle. Pas un argumentaire
            commercial.
          </p>
          <a
            href={siteConfig.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all"
            style={{
              background: "var(--ftt-red)",
              color: "#fff",
              fontSize: 16,
              boxShadow: "0 12px 30px -10px rgba(232,53,42,0.45)",
            }}
          >
            Réserver un appel
            <span aria-hidden>→</span>
          </a>
          <p className="text-sm text-white/40 mt-6">
            Ou par mail&nbsp;:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-white/60 underline hover:text-white"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
