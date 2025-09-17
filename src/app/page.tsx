import AboutSection from "@/features/about/components/Section";
import ContactSection from "@/features/contact/components/Section";
import GamesSection from "@/features/games/components/Section";
import LandingSection from "@/features/landing/components/Section";
import SkillsSection from "@/features/skills/components/Section";

export default function Home() {
  return (
    <div className="max-w-3xl px-4 md:px-0">
      <LandingSection />
      <AboutSection />
      <SkillsSection />
      <GamesSection />
      <ContactSection />
    </div>
  );
}
