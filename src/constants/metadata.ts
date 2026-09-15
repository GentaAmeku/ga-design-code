import type { Metadata } from "next";
import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";
export function pageMetadata(
  locale: Locale,
  path = "",
  title = "G.A Design & Code",
): Metadata {
  const description = copy[locale].aboutLead;
  const images = ["/images/presentation.png"];
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { ja: `/ja${path}`, en: `/en${path}` },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${locale}${path}`,
      images,
      locale: locale === "ja" ? "ja_JP" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
