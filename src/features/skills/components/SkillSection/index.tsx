import { Separator } from "@/components/ui/separator";
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
      <Separator className="my-2.5" />
      <SkillList list={list} />
    </div>
  );
};

export default SkillSection;
