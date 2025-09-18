import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/stores/ThemeProvider";

import "@/styles/global.css";

export const metadata: Metadata = {
  title: "G.A Design & Code | Web Developer Portfolio",
  description:
    "GentaAmeku's Web Developer portfolio. This site features my skills and a personal story, including my favorite games that inspired my journey as a developer.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <main className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-items-center">
            <Header />
            {children}
            <Footer />
            <Toaster
              position="top-center"
              richColors
              toastOptions={{ duration: 6000 }}
            />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
