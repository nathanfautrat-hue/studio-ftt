const OFFRES = [
  { href: "/site-internet-artisan", label: "Artisans & BTP" },
  { href: "/site-internet-kine", label: "Kinés, ostéos & santé" },
  { href: "/site-internet-commerce", label: "Garages & commerces locaux" },
  { href: "/site-internet-consultant", label: "Consultants & coachs" },
];

export default function AutresOffres({ current }: { current: string }) {
  const autres = OFFRES.filter((o) => o.href !== current);
  return (
    <section
      className="mx-auto section-x"
      style={{
        maxWidth: 1320,
        borderTop: "1px solid var(--ftt-line)",
        paddingTop: 36,
        paddingBottom: 36,
      }}
    >
      <div
        className="flex flex-wrap items-center"
        style={{ gap: 14 }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ftt-text-dim)",
          }}
        >
          Vous êtes plutôt…
        </span>
        {autres.map((o) => (
          <a
            key={o.href}
            href={o.href}
            className="lift inline-flex items-center"
            style={{
              gap: 8,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid var(--ftt-line-strong)",
              color: "var(--ftt-cream)",
              textDecoration: "none",
              fontSize: 13,
            }}
          >
            {o.label} <span aria-hidden style={{ color: "var(--ftt-red)" }}>→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
