import type { Metadata } from "next";
import {
  AUTHOR_NAME,
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  siteUrl,
} from "@/constants/site";
import type { Locale } from "@/lib/locale";

export const pageDescriptions = {
  ja: {
    home: "企業の生成AI導入とAI駆動開発を支援する、Genta Amekuのポートフォリオです。",
    career:
      "生成AI導入支援、AI駆動開発、フロントエンド開発、品質管理に携わってきたGenta Amekuの経歴です。",
    blog: "AI駆動開発や制作の過程、日々の学びを紹介するGenta Amekuのブログです。",
  },
  en: {
    home: "The portfolio of Genta Ameku, an AI Enablement Engineer helping companies adopt generative AI and AI-driven development.",
    career:
      "Genta Ameku’s experience across generative AI adoption, AI-driven development, frontend engineering, and quality assurance.",
    blog: "Genta Ameku’s blog about AI-driven development, creative processes, and lessons from everyday work.",
  },
} satisfies Record<Locale, Record<"home" | "career" | "blog", string>>;

// トップの題。検索結果で誰の何のサイトか分かるよう、名前と役割を先に置く
export const homeTitles = {
  ja: `${AUTHOR_NAME} — 生成AI導入支援とAI駆動開発 | ${SITE_NAME}`,
  en: `${AUTHOR_NAME} — AI Enablement Engineer | ${SITE_NAME}`,
} satisfies Record<Locale, string>;

export const feedTitle = (locale: Locale) =>
  `${SITE_NAME} Blog (${locale === "ja" ? "日本語" : "English"})`;

// 対になる言語が無いときの x-default。/ は /ja へ転送するので、日本語があれば日本語にする
export const defaultLocaleOf = (available: readonly Locale[]): Locale =>
  available.includes("ja") ? "ja" : available[0];

interface PageMetadataOptions {
  locale: Locale;
  path?: string;
  title?: string;
  description: string;
  type?: "website" | "article";
  images?: string[];
  alternateLocales?: Locale[];
  publishedAt?: string;
  updatedAt?: string;
}

export function pageMetadata({
  locale,
  path = "",
  title = SITE_NAME,
  description,
  type = "website",
  images = [DEFAULT_SOCIAL_IMAGE],
  alternateLocales = ["ja", "en"],
  publishedAt,
  updatedAt,
}: PageMetadataOptions): Metadata {
  const localizedPath = `/${locale}${path}`;
  const languages = {
    ...Object.fromEntries(
      alternateLocales.map((alternateLocale) => [
        alternateLocale,
        `/${alternateLocale}${path}`,
      ]),
    ),
    "x-default": `/${defaultLocaleOf(alternateLocales)}${path}`,
  };

  return {
    title,
    description,
    authors: [{ name: AUTHOR_NAME, url: siteUrl(`/${locale}#about`) }],
    alternates: {
      canonical: localizedPath,
      languages,
      types: {
        "application/rss+xml": [
          { url: `/${locale}/feed.xml`, title: feedTitle(locale) },
        ],
      },
    },
    openGraph: {
      title,
      description,
      type,
      url: localizedPath,
      siteName: SITE_NAME,
      images,
      locale: locale === "ja" ? "ja_JP" : "en_US",
      ...(type === "article" && publishedAt
        ? { publishedTime: publishedAt }
        : {}),
      ...(type === "article" && updatedAt ? { modifiedTime: updatedAt } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
