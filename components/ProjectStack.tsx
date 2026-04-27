"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";

export type StackProject = {
  id: string;
  name: string;
  kind: string;
  tag: string;
  blurb: string;
  href: string;
  preview: ReactNode;
};

type ProjectStackProps = {
  projects: StackProject[];
};

export default function ProjectStack({ projects }: ProjectStackProps) {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-16 items-start">
      {/* Index — sticky left */}
      <div className="lg:sticky lg:top-24">
        {projects.map((p, i) => {
          const isActive = active === i;
          return (
            <button
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="flex justify-between items-center w-full text-left bg-transparent border-none cursor-pointer relative"
              style={{
                padding: "20px 0",
                borderTop: "1px solid var(--ftt-line)",
                borderBottom:
                  i === projects.length - 1 ? "1px solid var(--ftt-line)" : "none",
                color: isActive ? "var(--ftt-cream)" : "var(--ftt-text-dim)",
                paddingLeft: isActive ? 16 : 0,
                transition:
                  "color 0.35s cubic-bezier(0.2,0.7,0.2,1), padding-left 0.4s cubic-bezier(0.2,0.7,0.2,1)",
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
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase hidden sm:inline">
                {p.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Big preview — sticky right */}
      <div className="lg:sticky lg:top-24" style={{ height: "min(580px, 70vh)" }}>
        <div
          className="relative h-full overflow-hidden"
          style={{
            borderRadius: 18,
            border: "1px solid var(--ftt-line-strong)",
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

          {/* Overlay bottom */}
          <div
            className="absolute inset-x-0 bottom-0 z-10 flex justify-between items-end gap-4"
            style={{ padding: 24 }}
          >
            <div
              style={{
                background: "rgba(5,5,5,0.7)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: "14px 18px",
                borderRadius: 12,
                border: "1px solid var(--ftt-line-strong)",
                maxWidth: 360,
              }}
            >
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
                  color: "var(--ftt-cream)",
                }}
              >
                {current.blurb}
              </div>
            </div>
            <Link href={current.href} className="btn btn--solid shrink-0">
              Voir le projet <span className="btn__arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
