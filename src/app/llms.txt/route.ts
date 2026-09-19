import { pageDescriptions } from "@/constants/metadata";
import { SITE_NAME, siteUrl } from "@/constants/site";
import { getArticles } from "@/features/blog/content";
import { type Locale, locales } from "@/lib/locale";

const escapeMarkdownText = (value: string): string =>
  value.replaceAll(/\s+/g, " ").replaceAll(/([\\[\]*_<>#])/g, "\\$1");

const localeLabels = {
  ja: "日本語",
  en: "English",
} satisfies Record<Locale, string>;

export async function GET() {
  const articleSections = await Promise.all(
    locales.map(async (locale) => {
      const articles = await getArticles(locale);
      const links = articles.map(
        (article) =>
          `- [${escapeMarkdownText(article.title)}](${siteUrl(`/${locale}/blog/${article.slug}`)}): ${escapeMarkdownText(article.description)}`,
      );

      return [
        `## Blog — ${localeLabels[locale]}`,
        "",
        `- [Blog index](${siteUrl(`/${locale}/blog`)}): ${escapeMarkdownText(pageDescriptions[locale].blog)}`,
        ...links,
      ].join("\n");
    }),
  );

  const content = [
    `# ${SITE_NAME}`,
    "",
    `> ${pageDescriptions.en.home}`,
    "",
    "## Profile",
    "",
    `- [日本語プロフィール](${siteUrl("/ja#about")})`,
    `- [English profile](${siteUrl("/en#about")})`,
    "",
    ...articleSections.flatMap((section) => [section, ""]),
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
