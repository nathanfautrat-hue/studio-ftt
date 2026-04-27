type LogoMarkProps = {
  size?: number;
  showWordmark?: boolean;
};

/**
 * Logo Studio FTT en SVG inline (F rouge + T crème + T crème).
 * Plus net qu'un PNG à toutes les tailles.
 */
export default function LogoMark({ size = 30, showWordmark = true }: LogoMarkProps) {
  return (
    <span
      className="inline-flex items-center"
      style={{ gap: 10, letterSpacing: "0.02em" }}
    >
      <span
        className="grid place-items-center relative overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: 6,
          background: "var(--ftt-black-2)",
          border: "1px solid var(--ftt-line-strong)",
        }}
      >
        <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} aria-hidden>
          <path d="M10 14 L28 14 L28 22 L18 22 L18 30 L26 30 L26 38 L18 38 L18 50 L10 50 Z" fill="#E8352A" />
          <path d="M28 14 L46 14 L46 22 L40 22 L40 50 L32 50 L32 22 L28 22 Z" fill="#F5F1EA" />
          <path d="M44 14 L60 14 L60 22 L56 22 L56 50 L48 50 L48 22 L44 22 Z" fill="#F5F1EA" />
        </svg>
      </span>
      {showWordmark && (
        <span
          className="font-display"
          style={{
            fontSize: size * 0.55,
            lineHeight: 1,
            letterSpacing: "0.06em",
          }}
        >
          STUDIO FTT
        </span>
      )}
    </span>
  );
}
