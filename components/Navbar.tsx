"use client";

import { useState } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";

const NAV_LINKS = [
  { label: "Approche", href: "/#approche" },
  { label: "Projets", href: "/#projets" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/#contact" },
  { label: "À propos", href: "/a-propos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
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

        {/* Nav desktop */}
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

        <div className="flex items-center gap-3">
          {/* CTA */}
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

          {/* Burger mobile */}
          <button
            className="md:hidden shrink-0"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            style={{
              position: "relative",
              width: 40,
              height: 40,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid var(--ftt-line)",
              borderRadius: 10,
              cursor: "pointer",
              padding: 0,
            }}
          >
            {[
              { y: open ? 0 : -6, rotate: open ? 45 : 0 },
              { y: 0, rotate: 0, hidden: open },
              { y: open ? 0 : 6, rotate: open ? -45 : 0 },
            ].map((bar, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 18,
                  height: 1.5,
                  background: "var(--ftt-cream)",
                  borderRadius: 2,
                  transition: "transform 0.25s ease, opacity 0.2s ease",
                  transform: `translate(-50%, calc(-50% + ${bar.y}px)) rotate(${bar.rotate}deg)`,
                  opacity: bar.hidden ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Menu mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col"
          style={{
            top: 64,
            background: "rgba(5,5,5,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid var(--ftt-line)",
            padding: "32px clamp(20px, 6vw, 40px)",
          }}
          onClick={() => setOpen(false)}
        >
          <nav className="flex flex-col" style={{ gap: 4 }}>
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  padding: "16px 0",
                  borderBottom: i < NAV_LINKS.length - 1 ? "1px solid var(--ftt-line)" : "none",
                  color: "var(--ftt-cream)",
                  textDecoration: "none",
                  fontSize: "clamp(22px, 6vw, 32px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
