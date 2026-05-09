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
};

export default function SectionHeader({
  num,
  label,
  title,
  titleChildren,
}: SectionHeaderProps) {
  return (
    <>
      <div className="flex items-baseline" style={{ gap: 14, marginBottom: 32 }}>
        <span className="font-mono" style={{ color: "var(--ftt-red)", fontSize: 13 }}>
          ({num})
        </span>
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ftt-text-dim)",
          }}
        >
          {label}
        </span>
      </div>

      <h2
        className="font-display"
        style={{
          fontSize: "clamp(48px, 9vw, 140px)",
          margin: "0 0 clamp(40px, 5vw, 64px)",
          lineHeight: 0.95,
        }}
      >
        {titleChildren ?? title}
      </h2>
    </>
  );
}
