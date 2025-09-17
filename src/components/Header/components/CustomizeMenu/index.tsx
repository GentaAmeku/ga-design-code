import IconButton from "@/components/IconButton";
import CustomizeIcon from "@/components/Icons/CustomizeIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEMES } from "@/constants/theme-constants";
import ColorButton from "./components/ColorButton";

const CustomizeMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton icon={<CustomizeIcon className="size-6" />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-70 p-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Customize</h2>
          <p className="text-xs text-muted-foreground">
            Pick a style and color for your components.
          </p>
        </div>
        <div className="mt-5 space-y-2">
          <h3 className="text-md">Color</h3>
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((theme) => (
              <ColorButton themeColor={theme} key={theme} />
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomizeMenu;
