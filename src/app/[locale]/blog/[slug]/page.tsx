import Link from "next/link";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import { pageMetadata } from "@/constants/metadata";
import { AUTHOR_NAME, DEFAULT_SOCIAL_IMAGE, SITE_NAME } from "@/constants/site";
import { getArticle, getArticles } from "@/features/blog/content";
import { getImageSizes } from "@/features/blog/image-sizes";
import { getLinkCards } from "@/features/blog/link-cards";
import MarkdownArticle from "@/features/blog/MarkdownArticle";
import { toBlogPosting } from "@/features/blog/toBlogPosting";
import { copy } from "@/features/content/copy";
import { isLocale, locales } from "@/lib/locale";
import { serializeJsonLd } from "@/lib/serializeJsonLd";

// 公開済みの記事を静的に生成する。無い slug や下書きは、その言語の 404 になる
export const dynamicParams = true;

export async function generateStaticParams() {
  const articlesByLocale = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      articles: await getArticles(locale),
    })),
  );

  return articlesByLocale.flatMap(({ locale, articles }) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = await getArticle(locale, slug);
  if (!article || article.draft) notFound();
  const localizedArticles = await Promise.all(
    locales.map((alternateLocale) => getArticle(alternateLocale, slug)),
  );
  const alternateLocales = localizedArticles.flatMap((localizedArticle) =>
    localizedArticle && !localizedArticle.draft
      ? [localizedArticle.locale]
      : [],
  );

  return {
    ...pageMetadata({
      locale,
      path: `/blog/${slug}`,
      title: `${article.title} | ${SITE_NAME}`,
      description: article.description,
      type: "article",
      images: [article.image ?? DEFAULT_SOCIAL_IMAGE],
      alternateLocales,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
    }),
    robots: { index: !article.draft, follow: true },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = await getArticle(locale, slug);
  if (!article || article.draft) notFound();
  const t = copy[locale];
  const jsonLd = toBlogPosting(article);
  const [linkCards, imageSizes] = await Promise.all([
    getLinkCards(article.content),
    getImageSizes(article.content),
  ]);
  return (
    <article className="reading-page">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: The JSON-LD serializer escapes script-breaking characters.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <BackLink className="text-link" locale={locale} />
      <p className="article-dates">
        <span>
          {t.createdAt}:{" "}
          <time dateTime={article.createdAt}>{article.createdAt}</time>
        </span>
        {article.updatedAt ? (
          <span>
            {t.updatedAt}:{" "}
            <time dateTime={article.updatedAt}>{article.updatedAt}</time>
          </span>
        ) : null}
      </p>
      <h1 className="article-title">{article.title}</h1>
      <p className="reading-lead">{article.description}</p>
      <p className="article-author">
        {t.author}: <Link href={`/${locale}#about`}>{AUTHOR_NAME}</Link>
      </p>
      <MarkdownArticle
        content={article.content}
        linkCards={linkCards}
        imageSizes={imageSizes}
      />
      <BackLink className="text-link mt-16" locale={locale} />
    </article>
  );
}
