"use client";

/**
 * Mini-previews fidèles aux hero des pages projet.
 * Rendus dans une card 16/10 — reproduisent le look-and-feel
 * du haut de chaque site.
 */

export function ScavbackPreview() {
  return (
    <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
      {/* texture grain + vignetting */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,53,42,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,#000_100%)] opacity-60" />
      {/* top bar */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[8px] tracking-[0.25em] uppercase text-white/70 font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">SCAVBACK</span>
          <span className="text-[#E8352A]">[SYS.ONLINE]</span>
        </div>
        <div className="hidden md:flex gap-3 text-white/50">
          <span>ACCUEIL</span><span>ARTISTES</span><span>RÉSEAUX</span>
          <span className="text-[#E8352A]">[Presets]</span>
        </div>
      </div>
      {/* coords HUD */}
      <div className="absolute top-8 left-4 text-[7px] font-mono text-white/50 tracking-wide leading-3">
        <div>SEC. 01</div>
        <div>ISO_800</div>
        <div>SHUTTER_1/48</div>
      </div>
      {/* center target */}
      <div className="absolute left-[16%] top-[38%] w-5 h-5 rounded-full border-2 border-[#E8352A]/80">
        <div className="absolute inset-0 m-auto w-1 h-1 bg-[#E8352A] rounded-full" />
      </div>
      {/* giant title */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-baseline">
          <span className="font-display text-white text-5xl md:text-7xl tracking-tight leading-none">SCAV</span>
          <span className="font-display text-[#E8352A] text-5xl md:text-7xl tracking-tight leading-none">BACK</span>
        </div>
      </div>
      {/* tagline pill */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 border border-white/15 px-3 py-1 text-[8px] tracking-[0.3em] uppercase text-white/70 font-mono bg-black/40">
        Collectif créatif — Son · Image · Vision
      </div>
    </div>
  );
}

export function SprayfilmPreview() {
  return (
    <div className="absolute inset-0 bg-[#0c0c0c] overflow-hidden">
      {/* top bar */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
        <span
          className="text-white text-sm md:text-base italic font-bold leading-none"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Spray<span className="font-normal">film</span>
        </span>
        <div className="flex items-center gap-1.5 text-white text-[9px] md:text-[10px]">
          <span>Menu</span>
          <span className="flex flex-col gap-[2px]">
            <span className="block w-3 h-[1.5px] bg-white" />
            <span className="block w-3 h-[1.5px] bg-white" />
          </span>
        </div>
      </div>
      {/* giant yellow PRODUCTION */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
        <div
          className="font-display text-[#F2F425] leading-[0.82] tracking-[-0.04em] text-center"
          style={{ fontSize: "clamp(3.5rem, 18vw, 9rem)", transform: "scaleY(1.15)" }}
        >
          PRODUCTION
        </div>
        <div className="mt-4 text-white text-[9px] md:text-[11px] tracking-wide text-center leading-snug">
          Agence de Production Audiovisuelle &amp; Exécutive
          <br />
          en Bretagne.
        </div>
      </div>
      {/* bottom bar */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-[8px] md:text-[9px]">
        <div className="flex items-center gap-1.5">
          <span>Scroll</span>
          <span>⌄</span>
        </div>
        <span>Services</span>
      </div>
    </div>
  );
}

export function PLCPreview() {
  return (
    <div className="absolute inset-0 bg-[#050505] overflow-hidden">
      {/* green grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,245,156,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,245,156,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* green glow */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(59,245,156,0.18),transparent_70%)]" />
      {/* top pill */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 border border-[#3BF59C]/40 rounded-full px-2.5 py-1 text-[8px] tracking-[0.25em] uppercase font-mono">
        <span className="h-1 w-1 rounded-full bg-[#3BF59C] animate-pulse" />
        <span className="text-[#3BF59C]">Nouveau · Agent IA autonome</span>
      </div>
      {/* title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 px-6 pt-8">
        <div className="font-display text-white text-4xl md:text-5xl tracking-tight leading-[0.9] text-center">L&apos;AGENT IA QUI GÈRE</div>
        <div className="font-display text-4xl md:text-5xl tracking-tight leading-[0.9] text-center" style={{ color: "#3BF59C", textShadow: "0 0 20px rgba(59,245,156,0.5)" }}>VOTRE ENTREPRISE.</div>
      </div>
      {/* CTA */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="bg-[#3BF59C] text-black text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 rounded font-bold">Démarrer →</div>
        <div className="border border-white/30 text-white text-[8px] tracking-[0.25em] uppercase px-3 py-1.5 rounded">Démo →</div>
      </div>
    </div>
  );
}

export function MedicentPreview() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* forest background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1448375240586-882707db888b?w=1280&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      {/* phone mockup center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[32%] aspect-[9/16] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-2">
          <div className="font-serif text-xl md:text-3xl leading-tight tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Medicent
          </div>
          <div className="font-serif text-lg md:text-2xl leading-tight tracking-tight" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Naturopathe
          </div>
        </div>
      </div>
      {/* bottom label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-[10px] text-center drop-shadow-lg">
        <div>Bien-être naturel</div>
        <div className="text-white/70 text-[8px] mt-0.5">Scroll pour découvrir ↓</div>
      </div>
    </div>
  );
}
