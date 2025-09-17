import { Paintbrush } from "lucide-react";

type ArcIconProps = {
  size?: number;
  className?: string;
};

const CustomizeIcon = ({ size = 24, className = "" }: ArcIconProps) => {
  return <Paintbrush size={size} className={className} />;
};

export default CustomizeIcon;
