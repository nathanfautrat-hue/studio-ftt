"use client";

import Link from "next/link";
import type { StackProject } from "@/components/ProjectStack";

/**
 * Projets sur deux lignes qui défilent en continu (inspiration Infinify).
 * Ligne 1 vers la gauche, ligne 2 vers la droite. Pause au survol.
 * Mouvements réduits : pas d'animation, défilement manuel à la place.
 */

function Card({ p, dup }: { p: StackProject; dup?: boolean }) {
  // Démos : rechargement complet (le bandeau démo s'installe proprement à chaque visite)
  const isStatic = p.href.startsWith("/demo/") || !!p.isDemo;
  const inner = (
    <>
      <div className="relative" style={{ aspectRatio: "16 / 10" }}>
        {p.preview}
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
