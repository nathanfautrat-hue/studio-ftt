import Image from "next/image";

export default function Logo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo_ftt.png"
      alt="Studio FTT"
      width={size}
      height={size}
      className={`rounded-lg ${className}`}
      priority
    />
  );
}
