"use client";
import CustomizeIcon from "@/components/Icons/CustomizeIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEMES } from "@/constants/theme-constants";
import { copy } from "@/features/content/copy";
import { useLocale } from "@/lib/useLocale";
import ColorButton from "./components/ColorButton";
export default function CustomizeMenu() {
  const t = copy[useLocale()];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t.theme}>
          <CustomizeIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-4">
        <h2 className="text-lg font-semibold">{t.theme}</h2>
        <p className="text-xs text-muted-foreground mt-1">{t.themeLead}</p>
        <div className="grid grid-cols-2 gap-2 mt-5">
          {THEMES.map((theme) => (
            <ColorButton themeColor={theme} key={theme} />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
