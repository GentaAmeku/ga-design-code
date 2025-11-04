"use cache";

import Section from "@/components/Section";
import {
  AI,
  DESIGN_TOOLS,
  FRONT_END_SKILLS,
  TOOLS,
} from "@/features/skills/constants";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";
import SkillSection from "../SkillSection";

const SkillsSection = async () => {
  return (
    <Section>
      <FadeInWithStagger>
        <div className="flex flex-col">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center md:text-4xl leading-11">
              Skills
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-col w-full gap-16 mt-15">
              <SkillSection title="Frontend" list={FRONT_END_SKILLS} />
              <SkillSection title="Design" list={DESIGN_TOOLS} />
              <SkillSection title="Tools" list={TOOLS} />
              <SkillSection title="AI" list={AI} />
            </div>
          </FadeIn>
        </div>
      </FadeInWithStagger>
    </Section>
  );
};

export default SkillsSection;
