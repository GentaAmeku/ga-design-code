import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AudioProvider from "@/features/music/AudioProvider";
import ThemeProvider from "@/stores/ThemeProvider";

// 各言語のページと、どのルートにも当たらない 404 で共通の骨格
export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        {process.env.VERCEL && <Analytics />}
      </AudioProvider>
    </ThemeProvider>
  );
}
