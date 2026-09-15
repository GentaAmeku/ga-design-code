import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/features/content/data";
import type { Locale } from "@/lib/locale";
export default function ArticleList({ locale }: { locale: Locale }) {
  return (
    <ul className="article-list">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/${locale}/writing/${article.slug}`}>
            <span>{article.title[locale]}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
