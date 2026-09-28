/**
 * En-tête de section réutilisable.
 * Pattern : numéro (01) + label mono + titre display.
 */

type SectionHeaderProps = {
  num: string;
  label: string;
  title: string;
  /** Contenu JSX optionnel pour enrichir le titre (italique, couleur) */
  titleChildren?: React.ReactNode;
  /** Titre plus petit, pour une colonne étroite */
  compact?: boolean;
};

export default function SectionHeader({
  num,
  label,
  title,
  titleChildren,
  compact = false,
}: SectionHeaderProps) {
  return (
    <>
      <h2
        className="font-display one-line"
        style={{
          fontSize: compact ? "clamp(32px, 3.4vw, 50px)" : "clamp(36px, 5vw, 72px)",
          margin: "0 0 clamp(28px, 4vw, 48px)",
          lineHeight: 1.05,
          paddingBottom: "0.06em",
        }}
      >
        {titleChildren ?? title}
      </h2>
    </>
  );
}
