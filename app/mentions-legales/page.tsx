import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales — Studio FTT",
  description:
    "Mentions légales du site Studio FTT — agence web en Sarthe.",
};

export default function MentionsLegales() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="container pt-40 pb-24 max-w-3xl">
        <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
          Informations légales
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-12">
          Mentions légales
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Éditeur du site
            </h2>
            <p>
              Le site studio-ftt.pages.dev est édité par&nbsp;:
              <br />
              <strong className="text-white">Nathan Fautrat</strong>
              <br />
              Entrepreneur individuel — Studio FTT
              <br />
              7 rue du Fromenteau, 72270 Arthezé, France
              <br />
              SIRET&nbsp;: 1040486400015 [À VÉRIFIER]
              <br />
              Email&nbsp;:{" "}
              <a
                href="mailto:contactstudioftt@gmail.com"
                className="text-white underline hover:text-[#E8352A]"
              >
                contactstudioftt@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Directeur de la publication
            </h2>
            <p>Nathan Fautrat</p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Hébergeur</h2>
            <p>
              <strong className="text-white">Cloudflare, Inc.</strong>
              <br />
              101 Townsend Street, San Francisco, CA 94107, États-Unis
              <br />
              <a
                href="https://www.cloudflare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-[#E8352A]"
              >
                cloudflare.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble du contenu du site (textes, visuels, code,
              identité graphique) est la propriété exclusive de Studio FTT,
              sauf mention contraire. Toute reproduction, même partielle, est
              interdite sans autorisation écrite préalable.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Responsabilité
            </h2>
            <p>
              Studio FTT s&apos;efforce de fournir des informations exactes et
              à jour, mais ne saurait être tenu responsable des omissions, des
              inexactitudes ou des défaillances techniques. L&apos;utilisateur
              est seul responsable de l&apos;usage qu&apos;il fait des
              informations fournies sur ce site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Contact</h2>
            <p>
              Pour toute question relative au site ou à nos prestations,
              contactez-nous à&nbsp;:{" "}
              <a
                href="mailto:contactstudioftt@gmail.com"
                className="text-white underline hover:text-[#E8352A]"
              >
                contactstudioftt@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
