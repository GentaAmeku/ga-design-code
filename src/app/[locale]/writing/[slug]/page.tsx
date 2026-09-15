import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/constants/metadata";
import { copy } from "@/features/content/copy";
import { articleSections, getArticle } from "@/features/content/data";
import { isLocale } from "@/lib/locale";
// Sample articles should not be indexed until their content is approved.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(locale) || !article) notFound();
  return {
    ...pageMetadata(
      locale,
      `/writing/${slug}`,
      `${article.title[locale]} | G.A Design & Code`,
    ),
    robots: { index: false, follow: true },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(locale) || !article) notFound();
  const t = copy[locale];
  return (
    <article className="reading-page">
      <Link className="text-link" href={`/${locale}/writing`}>
        ← {t.backWriting}
      </Link>
      <p className="sample-note mt-14">{t.sample}</p>
      <h1 className="article-title">{article.title[locale]}</h1>
      <p className="reading-lead">{t.articleNote}</p>
      <div className="article-body">
        {articleSections(locale).map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </div>
      <Link className="text-link mt-16" href={`/${locale}/writing`}>
        ← {t.backWriting}
      </Link>
    </article>
  );
}
