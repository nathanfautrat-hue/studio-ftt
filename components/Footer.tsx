import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-black">
      <div className="container py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo_ftt.png"
              alt="Studio FTT"
              width={44}
              height={44}
              className="rounded-lg"
            />
            <span className="font-display tracking-[0.2em] text-sm">STUDIO FTT</span>
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-white/50 mb-4">Contact</h4>
          <a
            href="mailto:contactstudioftt@gmail.com"
            className="text-white hover:text-[#E8352A] transition-colors"
          >
            contactstudioftt@gmail.com
          </a>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-white/50 mb-4">Suivre</h4>
          <ul className="space-y-2 text-white/70">
            <li>
              <a
                href="https://www.instagram.com/studio_ftt___/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/fautrat-nathan-ba790a404"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="container py-6 flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-white/40">
          <span>Studio FTT © 2025 — Tous droits réservés</span>
          <span>Made with care in Sarthe, France</span>
        </div>
      </div>
    </footer>
  );
}
