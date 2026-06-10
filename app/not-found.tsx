import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page introuvable — Studio FTT",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main>
      <Navbar />
      <section
        className="mx-auto section-x flex flex-col items-start justify-center"
        style={{ maxWidth: 1320, minHeight: "70vh", paddingTop: 140, paddingBottom: 100 }}
      >
        <p
          style={{
            fontSize: 13,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--ftt-red)",
            margin: "0 0 18px",
          }}
        >
          Erreur 404
        </p>
        <h1
          className="font-display"
          style={{ fontSize: "clamp(48px, 9vw, 130px)", lineHeight: 0.95, margin: "0 0 24px" }}
        >
          CETTE PAGE{" "}
          <em
            className="font-serif"
            style={{ fontStyle: "italic", fontWeight: 500, color: "var(--ftt-red)" }}
          >
            n&apos;existe pas
          </em>
          .
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: "var(--ftt-text-mid)",
            maxWidth: 560,
            margin: "0 0 36px",
          }}
        >
          L&apos;adresse a peut-être changé, ou la page a été déplacée. Le reste du site, lui,
          fonctionne très bien.
        </p>
        <div className="flex flex-wrap" style={{ gap: 12 }}>
          <a href="/" className="btn btn--solid">
            Retour à l&apos;accueil <span className="btn__arrow">→</span>
          </a>
          <a href="/tarifs" className="btn btn--ghost">
            Voir les tarifs <span className="btn__arrow">→</span>
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
