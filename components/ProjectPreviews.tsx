/**
 * Mini-previews des projets — captures statiques des vrais sites (1440×900,
 * même viewport que les anciennes iframes). Des photos, pas d'iframes :
 * rien ne charge, rien ne rame sur mobile. Rendues dans une card 16/10,
 * elles remplissent la card pile.
 *
 * Pour rafraîchir une capture après une évolution d'un site :
 * chrome headless --window-size=1440,900 --screenshot sur l'URL du site,
 * puis sharp → webp 80 dans public/preview-<nom>.webp.
 */

function StaticPreview({ src, alt, bg }: { src: string; alt: string; bg: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: bg }}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function ScavbackPreview() {
  return (
    <StaticPreview
      src="/preview-scavback.webp"
      alt="Aperçu du site SCAVBACK — collectif créatif"
      bg="#0a0a0a"
    />
  );
}

export function SprayfilmPreview() {
  return (
    <StaticPreview
      src="/preview-sprayfilm.webp"
      alt="Aperçu du site Sprayfilm — production audiovisuelle"
      bg="#171717"
    />
  );
}

export function GarageKlaxPreview() {
  return (
    <StaticPreview
      src="/preview-klax.webp"
      alt="Aperçu de la démo Garage Klax — garage indépendant"
      bg="#F7F5F0"
    />
  );
}

export function SigmaLiftPreview() {
  return (
    <StaticPreview
      src="/preview-sigma.webp"
      alt="Aperçu de la démo Sigma Lift — coaching sportif en ligne"
      bg="#0A0A0A"
    />
  );
}

export function MarceauPreview() {
  return (
    <StaticPreview
      src="/preview-marceau.webp"
      alt="Aperçu de la démo Atelier Marceau — plombier artisan"
      bg="#F7F4EF"
    />
  );
}

export function CabinetAtlasPreview() {
  return (
    <StaticPreview
      src="/preview-atlas.webp"
      alt="Aperçu de la démo Cabinet Atlas — cabinet kiné & ostéo"
      bg="#F5EFE6"
    />
  );
}
