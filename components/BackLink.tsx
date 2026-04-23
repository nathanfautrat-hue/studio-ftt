import Link from "next/link";

export default function BackLink({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors ${
        className || "text-white/60 hover:text-white"
      }`}
    >
      <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
      Retour au portfolio
    </Link>
  );
}
