import { feedTitle, pageDescriptions } from "@/constants/metadata";
import { AUTHOR_NAME, siteUrl } from "@/constants/site";
import { getArticles, publishedOn } from "@/features/blog/content";
import { isLocale, locales } from "@/lib/locale";

// 言語ごとの RSS 2.0。記事の題・説明・公開日だけを載せ、本文は記事ページで読んでもらう
export const dynamic = "force-static";
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

const escapeXml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

// 日付だけの公開日を、日本時間の 0 時として RFC 822 の形にする
const toRfc822 = (date: string): string =>
  new Date(`${date}T00:00:00+09:00`).toUTCString();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!isLocale(locale)) return new Response("Not Found", { status: 404 });
  const articles = await getArticles(locale);
  const blogUrl = siteUrl(`/${locale}/blog`);
  const items = articles.map((article) => {
    const url = siteUrl(`/${locale}/blog/${article.slug}`);
    return [
      "<item>",
      `<title>${escapeXml(article.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<description>${escapeXml(article.description)}</description>`,
      `<dc:creator>${escapeXml(AUTHOR_NAME)}</dc:creator>`,
      `<pubDate>${toRfc822(publishedOn(article))}</pubDate>`,
      "</item>",
    ].join("");
  });
  const latest = articles[0];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "<channel>",
    `<title>${escapeXml(feedTitle(locale))}</title>`,
    `<link>${blogUrl}</link>`,
    `<description>${escapeXml(pageDescriptions[locale].blog)}</description>`,
    `<language>${locale}</language>`,
    `<atom:link href="${siteUrl(`/${locale}/feed.xml`)}" rel="self" type="application/rss+xml"/>`,
    ...(latest
      ? [
          `<lastBuildDate>${toRfc822(latest.updatedAt ?? publishedOn(latest))}</lastBuildDate>`,
        ]
      : []),
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
