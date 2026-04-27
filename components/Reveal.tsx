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
    return () => obs.disconnect();
  }, []);

  const delayClass = delay ? ` delay-${delay}` : "";
  return (
    <As ref={ref} className={`reveal-up${delayClass} ${className}`}>
      {children}
    </As>
  );
}
