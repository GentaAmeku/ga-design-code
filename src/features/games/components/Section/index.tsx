import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { EmblaCarousel } from "@/features/games/components/EmblaCarousel";
import { FIRST_SLIDES, SECOND_SLIDES } from "@/features/games/constants";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";

const GamesSection = async () => {
  return (
    <Section>
      <FadeInWithStagger>
        <div className="flex flex-col">
          <FadeIn>
            <SectionHeading
              title="Let me introduce my favorite games."
              lead="The game that influenced my life."
            />
          </FadeIn>
          <FadeIn>
            <div className="w-full mt-16 space-y-8 md:mt-20">
              <EmblaCarousel slides={FIRST_SLIDES} />
              <EmblaCarousel slides={SECOND_SLIDES} direction="backward" />
            </div>
          </FadeIn>
        </div>
      </FadeInWithStagger>
    </Section>
  );
};

export default GamesSection;
