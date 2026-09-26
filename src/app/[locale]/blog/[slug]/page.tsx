import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/constants/metadata";
import { AUTHOR_NAME, DEFAULT_SOCIAL_IMAGE, SITE_NAME } from "@/constants/site";
import { getArticle, getArticles } from "@/features/blog/content";
import { getLinkCards } from "@/features/blog/link-cards";
import MarkdownArticle from "@/features/blog/MarkdownArticle";
import { toBlogPosting } from "@/features/blog/toBlogPosting";
import { copy } from "@/features/content/copy";
import { isLocale, locales } from "@/lib/locale";
import { serializeJsonLd } from "@/lib/serializeJsonLd";

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
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const article = await getArticle(locale, slug);
  if (!article || article.draft) notFound();
  const t = copy[locale];
  const fromHome = (await searchParams).from === "home";
  const backHref = fromHome ? `/${locale}#blog` : `/${locale}/blog`;
  const backLabel = fromHome ? t.backHome : t.backWriting;
  const jsonLd = toBlogPosting(article);
  const linkCards = await getLinkCards(article.content);
  return (
    <article className="reading-page">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: The JSON-LD serializer escapes script-breaking characters.
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Link className="text-link" href={backHref}>
        ← {backLabel}
      </Link>
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
      <MarkdownArticle content={article.content} linkCards={linkCards} />
      <Link className="text-link mt-16" href={backHref}>
        ← {backLabel}
      </Link>
    </article>
  );
}
