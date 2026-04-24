import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Politique de confidentialité — Studio FTT",
  description:
    "Politique de confidentialité et utilisation des données personnelles sur le site Studio FTT.",
};

export default function Confidentialite() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="container pt-40 pb-24 max-w-3xl">
        <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
          RGPD
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-12">
          Politique de confidentialité
        </h1>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Responsable du traitement
            </h2>
            <p>
              Les données personnelles collectées sur ce site sont traitées
              par&nbsp;:
              <br />
              <strong className="text-white">Nathan Fautrat — Studio FTT</strong>
              <br />
              7 rue du Fromenteau, 72270 Arthezé, France
              <br />
              SIRET&nbsp;: 10404864000015
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
              Données collectées
            </h2>
            <p>
              Lorsque vous remplissez le formulaire de contact, nous collectons
              les données suivantes&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Prénom et nom</li>
              <li>Adresse email</li>
              <li>Description de votre projet</li>
            </ul>
            <p className="mt-3">
              Ces données sont strictement nécessaires pour répondre à votre
              demande.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Finalité du traitement
            </h2>
            <p>
              Vos données sont utilisées uniquement pour&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Répondre à votre demande de contact ou de devis</li>
              <li>Échanger avec vous dans le cadre d&apos;un projet</li>
            </ul>
            <p className="mt-3">
              Vos données ne sont jamais revendues, partagées avec des tiers à
              des fins commerciales, ni utilisées pour de la prospection
              automatisée.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Sous-traitants
            </h2>
            <p>
              Nous utilisons les services suivants pour faire fonctionner le
              site et le formulaire&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <strong className="text-white">Cloudflare</strong> — hébergement
                du site (États-Unis, transferts encadrés par les Clauses
                Contractuelles Types de la Commission européenne)
              </li>
              <li>
                <strong className="text-white">Resend</strong> — envoi des
                emails du formulaire de contact
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Durée de conservation
            </h2>
            <p>
              Les messages reçus via le formulaire sont conservés pendant 3 ans
              maximum à compter du dernier contact, puis supprimés.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Vos droits</h2>
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous
              disposez des droits suivants sur vos données&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Droit d&apos;accès, de rectification, d&apos;effacement</li>
              <li>Droit à la limitation et à la portabilité</li>
              <li>Droit d&apos;opposition au traitement</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits, contactez-nous à&nbsp;:{" "}
              <a
                href="mailto:contactstudioftt@gmail.com"
                className="text-white underline hover:text-[#E8352A]"
              >
                contactstudioftt@gmail.com
              </a>
              <br />
              Vous avez également le droit d&apos;introduire une réclamation
              auprès de la CNIL ({" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#E8352A]"
              >
                cnil.fr
              </a>
              ).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies de suivi publicitaire ni de
              traceurs analytiques. Seuls les cookies strictement nécessaires
              au fonctionnement du site sont utilisés.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
