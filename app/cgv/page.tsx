import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site-config";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "CGV Studio FTT : création de sites web, hébergement, maintenance et campagnes pour artisans et PME en Sarthe. Modalités, paiement, livraison, garanties.",
  alternates: {
    canonical: "/cgv",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CGV() {
  return (
    <main className="bg-black text-white min-h-screen">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", url: siteConfig.url },
          { name: "Conditions générales de vente", url: `${siteConfig.url}/cgv` },
        ])}
      />
      <Navbar />

      <section className="container pt-40 pb-24 max-w-3xl">
        <div className="text-xs tracking-[0.3em] uppercase text-[#E8352A] mb-4">
          Conditions générales
        </div>
        <h1 className="font-display text-5xl md:text-6xl leading-tight mb-4">
          Conditions générales de vente
        </h1>
        <p className="text-white/50 text-sm mb-12">
          Version en vigueur depuis le 3 mai 2026.
        </p>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 1 — Objet
            </h2>
            <p>
              Les présentes conditions générales de vente (ci-après «&nbsp;CGV&nbsp;»)
              régissent l&apos;ensemble des prestations vendues par Studio FTT
              (ci-après «&nbsp;le Prestataire&nbsp;») à ses clients professionnels
              (ci-après «&nbsp;le Client&nbsp;»). Elles s&apos;appliquent à toute
              commande passée auprès de Studio FTT et prévalent sur tout autre
              document du Client.
            </p>
            <p className="mt-3">
              Studio FTT propose les prestations suivantes&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 marker:text-[#E8352A]">
              <li>Création de sites web sur mesure (vitrine, e-commerce, blog)</li>
              <li>Options associées (SEO, Google Business, Analytics, rédaction)</li>
              <li>Hébergement web</li>
              <li>Maintenance mensuelle</li>
              <li>Campagnes de référencement &amp; visibilité (Présence locale, Leader)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 2 — Devis &amp; commande
            </h2>
            <p>
              Toute prestation fait l&apos;objet d&apos;un devis détaillé, établi
              gratuitement par le Prestataire et envoyé au Client par email via
              Qonto ou tout autre service équivalent.
            </p>
            <p className="mt-3">
              Le devis est valable&nbsp;<strong className="text-white">30 jours</strong>{" "}
              à compter de sa date d&apos;émission. Au-delà, un nouveau devis pourra
              être nécessaire.
            </p>
            <p className="mt-3">
              La commande est ferme dès l&apos;acceptation du devis par le Client
              (signature électronique, retour par email ou paiement de
              l&apos;acompte). Cette acceptation vaut adhésion sans réserve aux
              présentes CGV.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 3 — Tarifs
            </h2>
            <p>
              Les prix sont exprimés en euros, nets de taxes.
            </p>
            <p className="mt-3">
              <strong className="text-white">
                TVA non applicable, art.&nbsp;293 B du CGI.
              </strong>{" "}
              Studio FTT est exploité en entreprise individuelle au régime de la
              micro-entreprise et bénéficie de la franchise en base de TVA.
            </p>
            <p className="mt-3">
              La grille tarifaire en vigueur est consultable sur{" "}
              <a
                href="https://studio-ftt.pages.dev/tarifs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline hover:text-[#E8352A]"
              >
                studio-ftt.pages.dev/tarifs
              </a>
              . Les prix indiqués sont des tarifs «&nbsp;à partir de&nbsp;»&nbsp;;
              le prix final est déterminé sur devis selon la complexité du projet.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 4 — Modalités de paiement
            </h2>
            <p>
              Pour les prestations de création de site (one-shot)&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 marker:text-[#E8352A]">
              <li>
                <strong className="text-white">Acompte de 30 %</strong> à la signature
                du devis. Les travaux ne démarrent qu&apos;à réception de
                l&apos;acompte.
              </li>
              <li>
                <strong className="text-white">Solde de 70 % avant la mise en ligne.</strong>{" "}
                Le site est présenté au Client sur une URL de prévisualisation
                Cloudflare Pages. La mise en ligne sur le nom de domaine final,
                ainsi que le transfert des accès et du code, ne sont effectués
                qu&apos;après réception complète du solde. Aucun délai de
                paiement post-livraison n&apos;est accordé.
              </li>
            </ul>
            <p className="mt-3">
              Pour les prestations récurrentes (maintenance, campagnes)&nbsp;:
              paiement mensuel, prélevé à terme à échoir, sans engagement de
              durée.
            </p>
            <p className="mt-3">
              Moyens de paiement acceptés&nbsp;: virement bancaire, lien de
              paiement Qonto. Aucun escompte n&apos;est accordé pour paiement
              anticipé.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 5 — Délais &amp; livraison
            </h2>
            <p>
              Le délai standard de création d&apos;un site vitrine est de{" "}
              <strong className="text-white">2 semaines</strong> à compter de la
              réception de l&apos;acompte ET de l&apos;ensemble des contenus
              fournis par le Client (textes, photos, logo, accès Google
              Business le cas échéant).
            </p>
            <p className="mt-3">
              En cas de retard dans la fourniture des contenus par le Client, le
              délai de livraison est suspendu d&apos;autant. Tout délai
              spécifique négocié figure sur le devis.
            </p>
            <p className="mt-3">
              La livraison correspond à la mise en ligne du site sur son nom de
              domaine final, ou à défaut sur l&apos;URL de prévisualisation
              Cloudflare Pages.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 6 — Modifications &amp; révisions
            </h2>
            <p>
              Une (1) modification gratuite est incluse après livraison du site.
              Une modification correspond à un ensemble cohérent de demandes
              communiquées en une fois (changement de textes, ajustement de
              couleurs, remplacement de photos sur une page, etc.).
            </p>
            <p className="mt-3">
              Au-delà, toute modification supplémentaire est facturée selon le
              temps passé, sur devis préalable. Tarif horaire indicatif&nbsp;:
              50&nbsp;€ de l&apos;heure.
            </p>
            <p className="mt-3">
              <strong className="text-white">Justification du temps facturé&nbsp;:</strong>{" "}
              chaque facture précise un descriptif des modifications réalisées
              (nature des tâches, temps passé estimé). Toute intervention
              supérieure à une heure fait l&apos;objet d&apos;une estimation
              préalable communiquée par email&nbsp;; l&apos;accord écrit du
              Client (réponse par email ou validation explicite) vaut
              acceptation du temps annoncé. Le Prestataire estime le temps de
              bonne foi sur la base du temps réellement passé&nbsp;; les outils
              de versionnage (commits Git, historique de tâches) servent de
              référence en cas de contestation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 7 — Hébergement
            </h2>
            <p>
              L&apos;hébergement du site est offert pendant la première année
              suivant la livraison, via le service Cloudflare Pages.
            </p>
            <p className="mt-3">
              Au-delà de cette première année, deux options&nbsp;:
              <br />— Avec le contrat de maintenance (35&nbsp;€/mois)&nbsp;:
              l&apos;hébergement est inclus, sans supplément.
              <br />— Sans maintenance&nbsp;: un forfait hébergement seul est
              disponible à <strong className="text-white">10&nbsp;€/mois</strong>.
            </p>
            <p className="mt-3">
              <strong className="text-white">Clause d&apos;adaptation&nbsp;:</strong>{" "}
              en cas d&apos;évolution significative des coûts d&apos;hébergement
              (changement de pricing Cloudflare, dépassement des limites
              gratuites en raison du trafic ou des fonctionnalités du site),
              Studio FTT se réserve le droit de migrer le site vers un
              hébergeur équivalent ou de proposer une solution payante adaptée,
              avec un préavis d&apos;au moins 30 jours.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 8 — Maintenance &amp; campagnes (abonnements mensuels)
            </h2>
            <p>
              Les prestations récurrentes (maintenance 35&nbsp;€/mois,
              campagne Présence locale 200&nbsp;€/mois, campagne Leader
              400&nbsp;€/mois) sont sans engagement de durée et résiliables à
              tout moment par email, avec un préavis d&apos;<strong className="text-white">un mois</strong>{" "}
              avant la prochaine échéance.
            </p>
            <p className="mt-3">
              En cas de résiliation de la maintenance après la première année,
              l&apos;hébergement n&apos;est plus inclus&nbsp;: le Client peut
              soit migrer son site vers son propre hébergeur, soit souscrire le
              forfait hébergement seul à <strong className="text-white">10&nbsp;€/mois</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 9 — Propriété intellectuelle
            </h2>
            <p>
              <strong className="text-white">Code source &amp; designs Studio FTT&nbsp;:</strong>{" "}
              demeurent la propriété exclusive du Prestataire. Le Client
              dispose d&apos;une licence d&apos;usage non-exclusive et
              non-transférable sur le site livré, tant que ce dernier reste
              hébergé par Studio FTT ou tant qu&apos;une prestation est en
              cours.
            </p>
            <p className="mt-3">
              <strong className="text-white">Contenus du Client&nbsp;</strong>
              (textes, photos, logo, vidéos, marque)&nbsp;: demeurent la
              propriété exclusive du Client, qui en garantit la libre
              exploitation. Le Client est seul responsable des droits
              attachés aux contenus qu&apos;il fournit.
            </p>
            <p className="mt-3">
              <strong className="text-white">Nom de domaine&nbsp;:</strong>{" "}
              le nom de domaine est et reste la propriété du Client. Studio
              FTT n&apos;agit qu&apos;en tant qu&apos;exploitant technique
              durant la collaboration.
            </p>
            <p className="mt-3">
              <strong className="text-white">Fin de collaboration&nbsp;:</strong>{" "}
              en cas de rupture (à l&apos;initiative du Client ou du
              Prestataire), le Client conserve son nom de domaine et tous ses
              contenus, mais ne peut prétendre à la cession du code source
              ni des designs Studio FTT. Il devra reconstruire son site
              ailleurs s&apos;il souhaite quitter l&apos;écosystème Studio FTT.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 10 — Obligations du Client
            </h2>
            <p>
              Le Client s&apos;engage à&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 marker:text-[#E8352A]">
              <li>Fournir l&apos;ensemble des contenus nécessaires (textes, photos, logo, etc.) dans des délais raisonnables</li>
              <li>Garantir qu&apos;il détient les droits d&apos;exploitation de tous les contenus fournis</li>
              <li>Communiquer ses retours et validations dans des délais raisonnables (sous 7 jours en moyenne)</li>
              <li>Régler les sommes dues aux échéances convenues</li>
              <li>Respecter la législation française en vigueur sur le contenu publié sur son site</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 11 — Responsabilité
            </h2>
            <p>
              Studio FTT s&apos;engage à mettre en œuvre les moyens nécessaires
              à la bonne exécution de ses prestations. Sa responsabilité ne
              saurait être engagée en cas de&nbsp;:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 marker:text-[#E8352A]">
              <li>Indisponibilité de l&apos;hébergeur tiers (Cloudflare ou autre)</li>
              <li>Acte de piratage extérieur, attaque DDoS, intrusion malveillante</li>
              <li>Perte de données due à un défaut d&apos;action du Client (oubli de sauvegarde côté Client, suppression accidentelle, etc.)</li>
              <li>Mauvais usage du site par le Client ou ses utilisateurs</li>
              <li>Conséquences indirectes (perte de chiffre d&apos;affaires, perte de clientèle, etc.)</li>
            </ul>
            <p className="mt-3">
              En tout état de cause, la responsabilité de Studio FTT est
              limitée au montant total facturé pour la prestation concernée
              au cours des 12 derniers mois.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 12 — Pénalités de retard &amp; indemnité forfaitaire
            </h2>
            <p>
              En cas de retard de paiement, des pénalités calculées à{" "}
              <strong className="text-white">trois fois le taux d&apos;intérêt légal</strong>{" "}
              en vigueur seront appliquées de plein droit, sans rappel
              préalable, à compter du jour suivant la date d&apos;échéance.
            </p>
            <p className="mt-3">
              Une indemnité forfaitaire pour frais de recouvrement de{" "}
              <strong className="text-white">40&nbsp;€</strong> sera également
              due (art.&nbsp;D441-5 du Code de commerce).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 13 — Données personnelles &amp; RGPD
            </h2>
            <p>
              Le traitement des données personnelles est encadré par notre{" "}
              <a
                href="/confidentialite"
                className="text-white underline hover:text-[#E8352A]"
              >
                politique de confidentialité
              </a>
              , conforme au RGPD et à la loi Informatique et Libertés.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 14 — Force majeure
            </h2>
            <p>
              Aucune des parties ne pourra être tenue responsable d&apos;un
              manquement à ses obligations en cas de force majeure au sens
              de l&apos;article 1218 du Code civil (catastrophe naturelle,
              guerre, pandémie, panne majeure d&apos;infrastructure tierce,
              etc.).
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 15 — Droit applicable &amp; juridiction compétente
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français.
            </p>
            <p className="mt-3">
              Tout litige relatif à leur exécution ou à leur interprétation
              relèvera, à défaut d&apos;accord amiable, de la compétence
              exclusive du <strong className="text-white">Tribunal de commerce du Mans</strong>{" "}
              (72), même en cas de pluralité de défendeurs ou d&apos;appel en
              garantie.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-white mb-3">
              Article 16 — Modification des CGV
            </h2>
            <p>
              Studio FTT se réserve le droit de modifier les présentes CGV à
              tout moment. La version applicable à une commande est celle en
              vigueur au jour de l&apos;acceptation du devis par le Client.
            </p>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-white/50 text-sm">
              <strong className="text-white">Studio FTT</strong> · Nathan
              Fautrat · Entrepreneur individuel · 7 rue du Fromenteau, 72270
              Arthezé, France · SIRET&nbsp;: 10404864000015 ·
              contactstudioftt@gmail.com
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
