"use client";

import { useState, ReactNode, ComponentProps } from "react";
import Link from "next/link";

export type StackProject = {
  id: string;
  name: string;
  kind: string;
  tag: string;
  blurb: string;
  href: string;
  preview: ReactNode;
  isDemo?: boolean;
};

function DemoBadge() {
  return (
    <span
      className="font-mono shrink-0"
      style={{
        fontSize: 9,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--ftt-red)",
        border: "1px solid var(--ftt-red)",
        padding: "3px 7px 2px",
        borderRadius: 999,
        lineHeight: 1,
        whiteSpace: "nowrap",
      }}
    >
      Démo
    </span>
  );
}

// Static demos (under /demo/) live in public/ and are served as raw HTML.
// Next's <Link> would try to client-route them — use a plain <a> instead.
function ProjectLink({
  href,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const isStatic = typeof href === "string" && href.startsWith("/demo/");
  if (isStatic) {
    return (
      <a href={href as string} {...(rest as ComponentProps<"a">)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

type ProjectStackProps = {
  projects: StackProject[];
};

export default function ProjectStack({ projects }: ProjectStackProps) {
  return (
    <>
      {/* MOBILE / TABLET — cards stackées avec preview au-dessus */}
      <div className="grid gap-6 sm:gap-8 lg:hidden">
        {projects.map((p, i) => (
          <ProjectLink
            key={p.id}
            href={p.href}
            className="lift block no-underline"
            style={{
              borderRadius: 18,
              overflow: "hidden",
              border: "1px solid var(--ftt-line-strong)",
              color: "var(--ftt-cream)",
              textDecoration: "none",
            }}
          >
            {/* Preview */}
            <div
              className="relative w-full"
              style={{
                aspectRatio: "16 / 10",
                background: "var(--ftt-black-2)",
              }}
            >
              {p.preview}
            </div>

            {/* Footer card */}
            <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-5">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="font-mono shrink-0"
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    opacity: 0.6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display truncate"
                  style={{
                    fontSize: "clamp(24px, 6vw, 32px)",
                    lineHeight: 1,
                  }}
                >
                  {p.name.toUpperCase()}
                </span>
                {p.isDemo && <DemoBadge />}
              </div>
              <span
                aria-hidden
                className="shrink-0"
                style={{
                  color: "var(--ftt-red)",
                  fontSize: 22,
                }}
              >
                →
              </span>
            </div>
          </ProjectLink>
        ))}
      </div>

      {/* DESKTOP — stack interactif (≥ lg) */}
      <DesktopStack projects={projects} />
    </>
  );
}

function DesktopStack({ projects }: { projects: StackProject[] }) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
      {/* Index — sticky left */}
      <div className="sticky top-24">
        {projects.map((p, i) => {
          const isActive = active === i;
          return (
            <ProjectLink
              key={p.id}
              href={p.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="flex justify-between items-center w-full text-left bg-transparent border-none cursor-pointer relative no-underline"
              style={{
                padding: "20px 0",
                borderTop: "1px solid var(--ftt-line)",
                borderBottom:
                  i === projects.length - 1
                    ? "1px solid var(--ftt-line)"
                    : "none",
                color: isActive ? "var(--ftt-cream)" : "var(--ftt-text-dim)",
                paddingLeft: isActive ? 16 : 0,
                transition:
                  "color 0.35s cubic-bezier(0.2,0.7,0.2,1), padding-left 0.4s cubic-bezier(0.2,0.7,0.2,1)",
                textDecoration: "none",
              }}
            >
              {isActive && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--ftt-red)",
                    boxShadow: "0 0 12px var(--ftt-red)",
                  }}
                />
              )}
              <span className="flex items-center gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] opacity-70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display"
                  style={{
                    fontSize: isActive ? 38 : 30,
                    lineHeight: 1,
                    transition: "font-size 0.35s cubic-bezier(0.2,0.7,0.2,1)",
                  }}
                >
                  {p.name.toUpperCase()}
                </span>
                {p.isDemo && <DemoBadge />}
              </span>
            </ProjectLink>
          );
        })}
      </div>

      {/* Big preview — sticky right */}
      <div className="sticky top-24">
        {/* La card ne contient QUE l'aperçu — le vrai site, en entier.
            aspect-ratio 16/10 = le viewport exact des previews (1440×900) :
            l'aperçu remplit la card pile, sans vide ni recadrage. */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 18,
            border: "1px solid var(--ftt-line-strong)",
            aspectRatio: "16 / 10",
          }}
        >
          {projects.map((p, i) => {
            const isActive = active === i;
            return (
              <div
                key={p.id}
                aria-hidden={!isActive}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(1.03)",
                  transition:
                    "opacity 0.55s ease, transform 0.55s cubic-bezier(0.2,0.7,0.2,1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {p.preview}
              </div>
            );
          })}
        </div>

        {/* Texte + bouton sous la card */}
        <div className="flex justify-between items-center gap-6" style={{ marginTop: 18 }}>
          <div style={{ minWidth: 0 }}>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--ftt-text-dim)",
                marginBottom: 6,
              }}
            >
              {current.kind}
            </div>
            <div
              style={{
                fontSize: 14,
                lineHeight: 1.45,
                color: "var(--ftt-text-mid)",
                maxWidth: 480,
              }}
            >
              {current.blurb}
            </div>
          </div>
          <ProjectLink href={current.href} className="btn btn--solid shrink-0">
            Voir le projet <span className="btn__arrow">→</span>
          </ProjectLink>
        </div>
      </div>
    </div>
  );
}
