import type { SkillItem } from "@/features/skills/types";
import TextWithIcon from "../TextWithIcon";

type SkillListProps = {
  list: SkillItem[];
};

const SkillList = ({ list }: SkillListProps) => {
  return (
    <div className="flex gap-4 flex-wrap md:gap-6">
      {list.map((skill) => {
        const Icon = skill.icon;
        const hasGold = skill.rank === "gold";
        return (
          <TextWithIcon key={skill.title} icon={<Icon />}>
            <span className={hasGold ? "marker-line" : ""}>{skill.title}</span>
          </TextWithIcon>
        );
      })}
    </div>
  );
};

export default SkillList;
