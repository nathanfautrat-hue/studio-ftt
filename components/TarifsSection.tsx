"use client";

import Reveal from "@/components/Reveal";
import { siteConfig } from "@/lib/site-config";
import { gtagEvent } from "@/lib/gtag";

/**
 * Accueil : pas de grille de prix, un devis après un appel de 30 min.
 * À gauche le message, à droite une carte « ce qui est inclus ».
 * Le détail chiffré reste sur /tarifs (SEO + transparence).
 */
const INCLUS = [
  "Un design fait pour votre métier",
  "Rapide, et lisible sur téléphone",
  "Formulaire de contact",
  "Référencement Google de base",
  "Mise en ligne, hébergement offert la 1re année",
  "1 modification offerte à la livraison",
];

export default function TarifsSection() {
  return (
    <section
      id="tarifs"
      className="mx-auto section-x section-y-sm"
      style={{ maxWidth: 1320 }}
    >
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal>
          <div>
            <h2
              className="font-display one-line"
              style={{ fontSize: "clamp(32px, 3.4vw, 50px)", lineHeight: 0.95, margin: "0 0 24px" }}
            >
              UN PRIX CLAIR,{" "}
              <em
                className="font-serif"
                style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
              >
                fixé avec vous
              </em>
            </h2>
            <p
              style={{
                fontSize: "clamp(16px, 1.4vw, 18px)",
                lineHeight: 1.6,
                color: "var(--ftt-text-mid)",
                margin: 0,
                maxWidth: 480,
              }}
            >
              Un plombier n&apos;a pas besoin du même site qu&apos;un kiné. On
              s&apos;appelle 30 minutes, vous m&apos;expliquez votre activité, et je
              vous envoie un devis clair. Vous payez une fois, sans abonnement
              obligatoire.
            </p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div
            style={{
              padding: "clamp(24px, 3vw, 36px)",
              borderRadius: 20,
              background: "linear-gradient(180deg, rgba(232,53,42,0.08), rgba(255,255,255,0.02))",
            }}
          >
            <div className="font-serif" style={{ fontSize: 24, fontWeight: 500 }}>
              Votre site internet
            </div>
            <p style={{ fontSize: 14, color: "var(--ftt-text-mid)", margin: "6px 0 22px" }}>
              Livré en 7 jours ouvrés, une fois l&apos;acompte et vos contenus reçus.
            </p>

            <ul className="grid" style={{ listStyle: "none", margin: 0, padding: 0, gap: 12 }}>
              {INCLUS.map((item) => (
                <li key={item} className="flex items-center" style={{ gap: 12, fontSize: 15 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden style={{ flexShrink: 0 }}>
                    <path
                      d="M4 9.5l3.2 3L14 5.5"
                      fill="none"
                      stroke="var(--ftt-red)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center mt-8" style={{ gap: 16 }}>
              <a
                href={siteConfig.booking}
                onClick={() => gtagEvent("clic_cta", { event_label: "tarifs_calendly" })}
                className="btn btn--solid justify-center"
              >
                Réserver un appel <span aria-hidden>→</span>
              </a>
              <a
                href="/tarifs"
                style={{
                  color: "var(--ftt-text-mid)",
                  fontSize: 14,
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  textDecorationColor: "var(--ftt-line-strong)",
                }}
              >
                Voir le détail des formules
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
