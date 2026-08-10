import type { SkillItem } from "@/features/skills/types";
import SkillList from "../SkillList";

type SkillSectionProps = {
  title: string;
  list: SkillItem[];
};

const SkillSection = ({ title, list }: SkillSectionProps) => {
  return (
    <div>
      <h3 className="text-xl tracking-wider">{title}</h3>
      <div className="mt-4">
        <SkillList list={list} />
      </div>
    </div>
  );
};

export default SkillSection;
