import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ApprocheSection from "@/components/ApprocheSection";
import ProjectStack from "@/components/ProjectStack";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { PROJECTS } from "@/lib/data";

export default function Home() {
  return (
    <main className="ftt-grain" style={{ background: "var(--ftt-black)", color: "var(--ftt-cream)" }}>
      <Navbar />
      <HeroSection />
      <ApprocheSection />

      {/* PROJETS */}
      <section
        id="projets"
        className="mx-auto section-x section-y-sm"
        style={{ maxWidth: 1320 }}
      >
        <Reveal>
          <SectionHeader num="02" label="Sélection de projets" title="LES PROJETS." />
        </Reveal>
        <ProjectStack projects={PROJECTS} />
      </section>

      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
