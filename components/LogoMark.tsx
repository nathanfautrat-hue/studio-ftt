import Image from "next/image";

type LogoMarkProps = {
  size?: number;
  showWordmark?: boolean;
};

/**
 * Logo Studio FTT — vraie image PNG depuis /public/logo_ftt.png.
 */
export default function LogoMark({ size = 30, showWordmark = true }: LogoMarkProps) {
  return (
    <span
      className="inline-flex items-center"
      style={{ gap: 10, letterSpacing: "0.02em" }}
    >
      <Image
        src="/logo_ftt.png"
        alt="Studio FTT"
        width={size}
        height={size}
        priority
        style={{
          width: size,
          height: size,
          borderRadius: 6,
          objectFit: "cover",
        }}
      />
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
