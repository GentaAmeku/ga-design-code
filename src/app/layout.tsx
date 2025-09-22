import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { commonMetadata } from "@/constants/metadata";
import ThemeProvider from "@/stores/ThemeProvider";

import "@/styles/global.css";

export const metadata: Metadata = commonMetadata;

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>;

export default function RootLayout({ children, modal }: RootLayoutProps) {
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
              toastOptions={{ duration: 6000 }}
              richColors
            />
            {modal}
            <Analytics />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
