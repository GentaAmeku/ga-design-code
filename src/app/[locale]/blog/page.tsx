import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { pageMetadata } from "@/constants/metadata";
import { copy } from "@/features/content/copy";
import FeaturedArticles from "@/features/writing/FeaturedArticles";
import { isLocale } from "@/lib/locale";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "/blog", "Blog | G.A Design & Code");
}
export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <Section id="blog">
      <Link className="text-link" href={`/${locale}#blog`}>
        ← {t.backHome}
      </Link>
      <SectionHeading title="Blog" lead={t.writingLead} marker={false} />
      <FeaturedArticles all locale={locale} />
    </Section>
  );
}
