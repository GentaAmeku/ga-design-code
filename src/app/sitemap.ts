import type { MetadataRoute } from "next";
import { siteUrl } from "@/constants/site";
import { getArticles } from "@/features/blog/content";
import { type Locale, locales } from "@/lib/locale";

const fixedPaths = ["", "/career", "/blog"] as const;

const localizedAlternates = (path: string, availableLocales: Locale[]) => ({
  languages: Object.fromEntries(
    availableLocales.map((locale) => [locale, siteUrl(`/${locale}${path}`)]),
  ),
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articlesByLocale = Object.fromEntries(
    await Promise.all(
      locales.map(async (locale) => [locale, await getArticles(locale)]),
    ),
  ) as Record<Locale, Awaited<ReturnType<typeof getArticles>>>;

  const fixedEntries = locales.flatMap((locale) =>
    fixedPaths.map((path) => ({
      url: siteUrl(`/${locale}${path}`),
      alternates: localizedAlternates(path, [...locales]),
    })),
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
        ...(article.updatedAt ? { lastModified: article.updatedAt } : {}),
        alternates: localizedAlternates(path, availableLocales),
        ...(article.image ? { images: [siteUrl(article.image)] } : {}),
      };
    }),
  );

  return [...fixedEntries, ...articleEntries];
}
