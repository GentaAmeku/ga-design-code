import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/constants/metadata";
import Timeline from "@/features/career/Timeline";
import { copy } from "@/features/content/copy";
import { isLocale } from "@/lib/locale";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "/career", "Career | G.A Design & Code");
}
export default async function Career({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <div className="reading-page">
      <Link className="text-link" href={`/${locale}#career`}>
        ← {t.backHome}
      </Link>
      <h1>Career</h1>
      <p className="reading-lead">{t.careerLead}</p>
      <Timeline locale={locale} />
      <p className="sample-note">{t.sampleCareer}</p>
    </div>
  );
}
