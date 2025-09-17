import Section from "@/components/Section";
import {
  AI,
  DESIGN_TOOLS,
  FRONT_END_SKILLS,
  TOOLS,
} from "@/features/skills/constants";
import SkillSection from "../SkillSection";

const SkillsSection = () => {
  return (
    <Section>
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-center fade-in-once md:text-4xl leading-11">
          Skills
        </h2>
        <div className="flex flex-col w-full gap-16 mt-15 fade-in-once">
          <SkillSection title="Frontend" list={FRONT_END_SKILLS} />
          <SkillSection title="Design" list={DESIGN_TOOLS} />
          <SkillSection title="Tools" list={TOOLS} />
          <SkillSection title="AI" list={AI} />
        </div>
      </div>
    </Section>
  );
};

export default SkillsSection;
