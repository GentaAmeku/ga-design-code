import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getArticles } from "@/features/blog/content";
import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";

export default async function FeaturedArticles({
  locale,
  all = false,
}: {
  locale: Locale;
  all?: boolean;
}) {
  const articles = await getArticles(locale);
  const items = all ? [...articles] : articles.slice(0, 2);
  return (
    <ul className="featured-articles">
      {items.map((article) => (
        <li key={article.slug}>
          <div>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <Link
              className="text-link"
              href={`/${locale}/blog/${article.slug}${all ? "" : "?from=home"}`}
            >
              {copy[locale].read}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
