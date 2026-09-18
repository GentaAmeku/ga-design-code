import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/constants/metadata";
import { getArticle, getArticles } from "@/features/blog/content";
import MarkdownArticle from "@/features/blog/MarkdownArticle";
import { copy } from "@/features/content/copy";
import { isLocale, locales } from "@/lib/locale";

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
  if (!article) notFound();
  return {
    ...pageMetadata(
      locale,
      `/blog/${slug}`,
      `${article.title} | G.A Design & Code`,
    ),
    description: article.description,
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
  if (!article) notFound();
  const t = copy[locale];
  const fromHome = (await searchParams).from === "home";
  const backHref = fromHome ? `/${locale}#blog` : `/${locale}/blog`;
  const backLabel = fromHome ? t.backHome : t.backWriting;
  return (
    <article className="reading-page">
      <Link className="text-link" href={backHref}>
        ← {backLabel}
      </Link>
      {article.draft ? <p className="sample-note mt-14">{t.sample}</p> : null}
      <h1 className="article-title">{article.title}</h1>
      <p className="reading-lead">{article.description}</p>
      <MarkdownArticle content={article.content} />
      <Link className="text-link mt-16" href={backHref}>
        ← {backLabel}
      </Link>
    </article>
  );
}
