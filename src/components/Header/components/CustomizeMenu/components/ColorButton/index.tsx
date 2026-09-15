"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { copy } from "@/features/content/copy";
import { useLocale } from "@/lib/useLocale";
import { cn } from "@/lib/utils";
import type { ThemeColor } from "@/types/theme-types";

type ColorButtonProps = {
  themeColor: ThemeColor;
};

const getColorClass = (themeColor: ThemeColor) => {
  if (themeColor === "default") return "bg-gray-300";
  if (themeColor === "blue") return "bg-blue-500";
  if (themeColor === "green") return "bg-green-500";
  if (themeColor === "pink") return "bg-pink-400";
};

const getSelectedColorClass = (
  themeColor: ThemeColor,
  selectedTheme: string | undefined,
) => {
  if (themeColor === selectedTheme) return "border-primary border-2";
  return "";
};

const ColorButton = ({ themeColor }: ColorButtonProps) => {
  const { theme, setTheme } = useTheme();
  const t = copy[useLocale()];
  const handleColorButton = () => setTheme(themeColor);
  return (
    <Button
      aria-pressed={theme === themeColor}
      variant="outline"
      onClick={handleColorButton}
      size="sm"
      className={cn(
        "inline-flex justify-start",
        getSelectedColorClass(themeColor, theme),
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full",
          getColorClass(themeColor),
        )}
      />
      {t.colors[themeColor]}
    </Button>
  );
};

export default ColorButton;
