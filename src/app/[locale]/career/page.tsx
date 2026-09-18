import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/constants/metadata";
import { careerEntries } from "@/features/career/content";
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
    <div className="reading-page career-page">
      <Link className="text-link" href={`/${locale}#career`}>
        ← {t.backHome}
      </Link>
      <h1>Career</h1>
      <ol className="career-details">
        {careerEntries(locale).map((entry) => (
          <li key={entry.period}>
            <p className="career-period">{entry.period}</p>
            <h2>{entry.title}</h2>
            {entry.role && <p className="career-detail-role">{entry.role}</p>}
            <p className="career-description">{entry.body}</p>
            {entry.tools && (
              <p className="career-detail-tools">{entry.tools}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
