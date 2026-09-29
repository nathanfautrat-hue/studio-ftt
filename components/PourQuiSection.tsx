"use client";

import Reveal from "@/components/Reveal";
import { Hammer, HeartPulse, Store, Briefcase, type LucideIcon } from "lucide-react";

const PROFILES: Array<{ num: string; title: string; desc: string; href?: string; linkLabel?: string; icon: LucideIcon }> = [
  {
    num: "001",
    icon: Hammer,
    title: "Artisans & BTP",
    desc: "Vous bossez bien, mais on vous trouve pas sur Google.",
    href: "/site-internet-artisan",
    linkLabel: "L'offre artisans",
  },
  {
    num: "002",
    icon: HeartPulse,
    title: "Santé & bien-être",
    desc: "Noyé sur Doctolib, personne prend de rdv.",
    href: "/site-internet-kine",
    linkLabel: "L'offre kinés & ostéos",
  },
  {
    num: "003",
    icon: Store,
    title: "Commerces & services locaux",
    desc: "Le concurrent a un site clinquant, vous êtes invisible.",
    href: "/site-internet-commerce",
    linkLabel: "L'offre commerces",
  },
  {
    num: "004",
    icon: Briefcase,
    title: "Consultants & coachs",
    desc: "Votre expertise vaut cher, votre site dit l'inverse.",
    href: "/site-internet-consultant",
    linkLabel: "L'offre consultants",
  },
];

export default function PourQuiSection() {
  return (
    <section
      id="pour-qui"
      className="mx-auto section-x section-y"
      style={{ maxWidth: 1320 }}
    >

      <div className="grid gap-8">
        <Reveal>
          <h2
            className="font-display one-line"
            style={{ fontSize: "clamp(32px, 3.7vw, 56px)", lineHeight: 1.05, margin: 0, paddingBottom: "0.06em" }}
          >
            POUR LES PROS{" "}
            <em
              className="font-serif"
              style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
            >
              qui veulent un site à leur hauteur
            </em>
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ftt-text-mid)",
              margin: 0,
            }}
          >
            Vous vous reconnaissez ? Site qui n&apos;est plus au goût du jour,
            pas de site, ou refonte complète : je m&apos;occupe de tout.
          </p>
        </Reveal>
      </div>

      {/* Mobile : 4 cartes carrées en 2 × 2, toute la carte est cliquable. Ordinateur : 4 colonnes. */}
      <div className="pq-grid mt-10">
        {PROFILES.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.num} delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}>
              <a href={p.href} className="pq-card" aria-label={`${p.title} : ${p.linkLabel}`}>
                <span className="pq-num font-mono">{p.num}</span>
                <Icon className="pq-icon" aria-hidden="true" strokeWidth={1.75} />
                <h3 className="font-display pq-title">{p.title}</h3>
                <p className="pq-desc">{p.desc}</p>
                <span className="pq-link font-mono">{p.linkLabel} →</span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
