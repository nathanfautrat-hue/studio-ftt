import Link from "next/link";
import LogoMark from "./LogoMark";

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
            href="mailto:contactstudioftt@gmail.com"
            className="lift"
            style={{
              color: "var(--ftt-cream)",
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            contactstudioftt@gmail.com
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
                href="https://www.instagram.com/studio_ftt___/"
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
                href="https://www.linkedin.com/in/fautrat-nathan-ba790a404"
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
        className="mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
        style={{
          maxWidth: 1320,
          marginTop: 56,
          paddingTop: 24,
          borderTop: "1px solid var(--ftt-line)",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ftt-text-dim)",
          }}
        >
          Studio FTT © 2026
        </span>
        <div className="flex gap-6">
          <Link
            href="/mentions-legales"
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              textDecoration: "none",
            }}
          >
            Mentions légales
          </Link>
          <Link
            href="/confidentialite"
            className="font-mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ftt-text-dim)",
              textDecoration: "none",
            }}
          >
            Confidentialité
          </Link>
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
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
