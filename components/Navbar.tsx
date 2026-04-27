"use client";

import Link from "next/link";
import LogoMark from "./LogoMark";

const NAV_LINKS = [
  { label: "Approche", href: "/#approche" },
  { label: "Projets", href: "/#projets" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  return (
    <header
      className="nav-blur sticky top-0 z-50 flex items-center justify-between gap-3"
      style={{
        padding: "16px clamp(20px, 4vw, 36px)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        background: "rgba(5,5,5,0.55)",
        borderBottom: "1px solid var(--ftt-line)",
      }}
    >
      <Link href="/" aria-label="Studio FTT — accueil" className="lift shrink-0">
        <LogoMark size={30} />
      </Link>

      <nav
        className="hidden md:flex items-center"
        style={{
          gap: 4,
          padding: 4,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--ftt-line)",
          borderRadius: 999,
        }}
      >
        {NAV_LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="lift"
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              color: "var(--ftt-text-mid)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* CTA — visible toujours, compact mobile */}
      <a
        href="#contact"
        className="inline-flex items-center shrink-0"
        style={{
          gap: 8,
          padding: "10px 16px",
          borderRadius: 999,
          background: "var(--ftt-red)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 500,
          textDecoration: "none",
          transition: "all 0.35s cubic-bezier(0.2,0.7,0.2,1)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--ftt-red-deep)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 12px 30px -10px rgba(232,53,42,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--ftt-red)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <span className="hidden sm:inline">Démarrer un projet</span>
        <span className="sm:hidden">Démarrer</span>
        <span aria-hidden>→</span>
      </a>
    </header>
  );
}
