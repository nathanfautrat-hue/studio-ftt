"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/70 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_ftt.png"
            alt="Studio FTT"
            width={44}
            height={44}
            className="rounded-lg"
            priority
          />
          <span className="hidden md:inline font-display tracking-[0.2em] text-sm">STUDIO FTT</span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-10 text-xs tracking-[0.2em] uppercase text-white/70">
          <a href="/#approche" className="hover:text-white">Approche</a>
          <a href="/#projets" className="hover:text-white">Projets</a>
          <a href="/#contact" className="hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
