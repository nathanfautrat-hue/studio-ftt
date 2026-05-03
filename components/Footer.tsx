import Link from "next/link";
import LogoMark from "./LogoMark";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "clamp(48px, 6vw, 64px) clamp(20px, 4vw, 32px) clamp(28px, 4vw, 40px)",
        borderTop: "1px solid var(--ftt-line)",
        background: "var(--ftt-black)",
      }}
    >
      <div
        className="mx-auto grid gap-12 md:grid-cols-[2fr_1fr_1fr]"
        style={{ maxWidth: 1320 }}
      >
        <div>
          <LogoMark size={30} />
          <p
            style={{
              marginTop: 18,
              maxWidth: 420,
              fontSize: 15,
              lineHeight: 1.55,
              color: "var(--ftt-text-mid)",
            }}
          >
            Studio indépendant basé en Sarthe. On crée des sites pour artisans
            et PME — propres, rapides, qui amènent des clients.
          </p>
        </div>

        <div>
          <h4
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              marginBottom: 14,
            }}
          >
            Contact
          </h4>
          <a
            href={`mailto:${siteConfig.email}`}
            className="lift"
            style={{
              color: "var(--ftt-cream)",
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            {siteConfig.email}
          </a>
        </div>

        <div>
          <h4
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              marginBottom: 14,
            }}
          >
            Suivre
          </h4>
          <ul className="space-y-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="lift"
                style={{ color: "var(--ftt-cream)", textDecoration: "none", fontSize: 15 }}
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="lift"
                style={{ color: "var(--ftt-cream)", textDecoration: "none", fontSize: 15 }}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center"
        style={{
          maxWidth: 1320,
          marginTop: 56,
          paddingTop: 24,
          borderTop: "1px solid var(--ftt-line)",
        }}
      >
        <span
          className="font-mono order-1"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ftt-text-dim)",
          }}
        >
          Studio FTT © 2026
        </span>

        <div
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 order-3 md:order-2"
          style={{ rowGap: 8 }}
        >
          <Link
            href="/mentions-legales"
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Mentions légales
          </Link>
          <span
            aria-hidden
            className="font-mono"
            style={{
              fontSize: 9,
              color: "var(--ftt-text-dim)",
              opacity: 0.5,
            }}
          >
            ·
          </span>
          <Link
            href="/confidentialite"
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Confidentialité
          </Link>
          <span
            aria-hidden
            className="font-mono"
            style={{
              fontSize: 9,
              color: "var(--ftt-text-dim)",
              opacity: 0.5,
            }}
          >
            ·
          </span>
          <Link
            href="/cgv"
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            CGV
          </Link>
        </div>

        <span
          className="font-mono order-2 md:order-3"
          style={{
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ftt-text-dim)",
          }}
        >
          Made with care — Sarthe, FR
        </span>
      </div>
    </footer>
  );
}
