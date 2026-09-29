import type { MetadataRoute } from "next";
import { defaultLocaleOf } from "@/constants/metadata";
import { siteUrl } from "@/constants/site";
import { getArticles, publishedOn } from "@/features/blog/content";
import { type Locale, locales } from "@/lib/locale";

const fixedPaths = ["", "/career", "/blog"] as const;

const localizedAlternates = (path: string, availableLocales: Locale[]) => ({
  languages: {
    ...Object.fromEntries(
      availableLocales.map((locale) => [locale, siteUrl(`/${locale}${path}`)]),
    ),
    "x-default": siteUrl(`/${defaultLocaleOf(availableLocales)}${path}`),
  },
});

type ArticleSummaries = Awaited<ReturnType<typeof getArticles>>;

// トップと記事一覧は記事の一覧を載せるので、いちばん新しい記事の日付を更新日にする
const latestArticleDate = (articles: ArticleSummaries): string | undefined =>
  articles
    .map((article) => article.updatedAt ?? publishedOn(article))
    .sort()
    .at(-1);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlesByLocale = Object.fromEntries(
    await Promise.all(
      locales.map(async (locale) => [locale, await getArticles(locale)]),
    ),
  ) as Record<Locale, ArticleSummaries>;

  const fixedEntries = locales.flatMap((locale) =>
    fixedPaths.map((path) => {
      const lastModified =
        path === "/career"
          ? undefined
          : latestArticleDate(articlesByLocale[locale]);
      return {
        url: siteUrl(`/${locale}${path}`),
        ...(lastModified ? { lastModified } : {}),
        alternates: localizedAlternates(path, [...locales]),
      };
    }),
  );

  const articleEntries = locales.flatMap((locale) =>
    articlesByLocale[locale].map((article) => {
      const path = `/blog/${article.slug}`;
      const availableLocales = locales.filter((alternateLocale) =>
        articlesByLocale[alternateLocale].some(
          (alternateArticle) => alternateArticle.slug === article.slug,
        ),
      );

      return {
        url: siteUrl(`/${locale}${path}`),
        lastModified: article.updatedAt ?? publishedOn(article),
        alternates: localizedAlternates(path, availableLocales),
        ...(article.image ? { images: [siteUrl(article.image)] } : {}),
      };
    }),
  );

  return [...fixedEntries, ...articleEntries];
}
