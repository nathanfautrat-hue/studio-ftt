"use client";

import { useEffect, useRef, ReactNode, ElementType } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: ElementType;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: As = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback : si IntersectionObserver n'existe pas, on révèle direct.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    obs.observe(el);

    // Filet de sécurité : si l'observer ne s'est jamais déclenché après 1.2s
    // (extension navigateur qui bloque, bug rare), on force la révélation.
    const safety = window.setTimeout(() => {
      if (!el.classList.contains("is-in")) {
        el.classList.add("is-in");
        obs.disconnect();
      }
    }, 1200);

    return () => {
      obs.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  const delayClass = delay ? ` delay-${delay}` : "";
  return (
    <As ref={ref} className={`reveal-up${delayClass} ${className}`}>
      {children}
    </As>
  );
}
