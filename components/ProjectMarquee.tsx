"use client";

import Link from "next/link";
import type { StackProject } from "@/components/ProjectStack";

/**
 * Projets sur deux lignes qui défilent en continu (inspiration Infinify).
 * Ligne 1 vers la gauche, ligne 2 vers la droite. Pause au survol.
 * Mouvements réduits : pas d'animation, défilement manuel à la place.
 */

function Card({ p, dup }: { p: StackProject; dup?: boolean }) {
  const isStatic = p.href.startsWith("/demo/");
  const inner = (
    <>
      <div className="relative" style={{ aspectRatio: "16 / 10" }}>
        {p.preview}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.92) 100%)" }}
        />
        <div className="absolute" style={{ left: 18, right: 18, bottom: 14 }}>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span style={{ fontSize: 17, fontWeight: 500, color: "var(--ftt-cream)" }}>{p.name}</span>
            {p.isDemo && (
              <span
                className="demo-badge font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--ftt-red)",
                  border: "1px solid var(--ftt-red)",
                  padding: "3px 7px 2px",
                  borderRadius: 999,
                  lineHeight: 1,
                }}
              >
                Démo
              </span>
            )}
          </div>
          <div style={{ fontSize: 13, color: "var(--ftt-text-mid)", marginTop: 2 }}>{p.kind}</div>
        </div>
      </div>
    </>
  );
  const cls = "project-card block overflow-hidden";
  const style = { borderRadius: 20, background: "#0f0f0f", textDecoration: "none" } as const;
  return isStatic ? (
    <a href={p.href} className={cls} style={style} aria-label={`${p.name}, ${p.kind}`} tabIndex={dup ? -1 : undefined}>
      {inner}
    </a>
  ) : (
    <Link href={p.href} className={cls} style={style} aria-label={`${p.name}, ${p.kind}`} tabIndex={dup ? -1 : undefined}>
      {inner}
    </Link>
  );
}

function Row({ items, reverse }: { items: StackProject[]; reverse?: boolean }) {
  // Liste répétée 4 fois : l'animation glisse de -50 % (2 copies), la boucle est invisible même sur grand écran.
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="marquee-row">
      <div className={`marquee-track${reverse ? " marquee-track--reverse" : ""}`}>
        {loop.map((p, i) => (
          <div key={`${p.id}-${i}`} className="marquee-item" aria-hidden={i >= items.length || undefined}>
            <Card p={p} dup={i >= items.length} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectMarquee({ projects }: { projects: StackProject[] }) {
  const half = Math.ceil(projects.length / 2);
  return (
    <div className="grid" style={{ gap: 16 }}>
      <Row items={projects.slice(0, half)} />
      <Row items={projects.slice(half)} reverse />
    </div>
  );
}
