"use cache";

import Section from "@/components/Section";

import { EmblaCarousel } from "@/features/games/components/EmblaCarousel";
import { FIRST_SLIDES, SECOND_SLIDES } from "@/features/games/constants";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";

const GamesSection = async () => {
  return (
    <Section>
      <FadeInWithStagger>
        <div className="flex flex-col">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center md:text-4xl leading-11">
              Let me introduce my favorite games.
            </h2>
            <p className="text-muted-foreground text-center mt-4 text-md tracking-wide md:text-lg">
              The game that influenced my life.
            </p>
          </FadeIn>
          <FadeIn>
            <div className="w-full mt-15 space-y-8 md:mt-20">
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
