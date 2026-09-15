import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/constants/metadata";
import { copy } from "@/features/content/copy";
import ArticleList from "@/features/writing/ArticleList";
import { isLocale } from "@/lib/locale";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "/writing", "Writing | G.A Design & Code");
}
export default async function Writing({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <div className="reading-page">
      <Link className="text-link" href={`/${locale}#writing`}>
        ← {t.backHome}
      </Link>
      <h1>Writing</h1>
      <p className="reading-lead">{t.writingLead}</p>
      <p className="sample-note mb-4">{t.sample}</p>
      <ArticleList locale={locale} />
    </div>
  );
}
