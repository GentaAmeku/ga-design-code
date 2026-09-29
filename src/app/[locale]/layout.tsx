import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import SiteShell from "@/components/SiteShell";
import { SITE_NAME, SITE_ORIGIN } from "@/constants/site";
import { isLocale, locales } from "@/lib/locale";
import "@/styles/global.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: SITE_NAME,
};

// 言語ごとに静的に生成する。ja / en 以外はどのルートにも当たらず、global-not-found になる。
// この設定は子のルートにも効くので、記事と言語の下の 404 は各ページで dynamicParams を戻す
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
