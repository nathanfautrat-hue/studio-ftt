"use client";

import { useEffect, useRef, RefObject } from "react";

type CursorBlobProps = {
  /** Container ref qui sert de zone de capture du mouvement souris */
  containerRef: RefObject<HTMLElement | null>;
};

export default function CursorBlob({ containerRef }: CursorBlobProps) {
  const blobRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    const b = blobRef.current;
    if (!el || !b) return;

    let raf = 0;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        b.style.transform = `translate(${x - 260}px, ${y - 260}px)`;
      });
    };

    el.addEventListener("mousemove", move);
    return () => {
      el.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [containerRef]);

  return <div ref={blobRef} className="blob" aria-hidden />;
}
