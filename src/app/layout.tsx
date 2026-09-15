import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AudioProvider from "@/features/music/AudioProvider";
import ThemeProvider from "@/stores/ThemeProvider";
import "@/styles/global.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.genta-ameku.com"),
  title: "G.A Design & Code",
};
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = (await headers()).get("x-site-locale") === "en" ? "en" : "ja";
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AudioProvider>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            {process.env.VERCEL && <Analytics />}
          </AudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
