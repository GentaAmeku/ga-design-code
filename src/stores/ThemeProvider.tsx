import { ThemeProvider as NextThemeProvider } from "next-themes";
import { THEMES } from "@/constants/theme-constants";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const valie = Object.fromEntries(THEMES.map((k) => [k, k]));
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={THEMES.at(0)}
      enableSystem={false}
      value={valie}
    >
      {children}
    </NextThemeProvider>
  );
}
