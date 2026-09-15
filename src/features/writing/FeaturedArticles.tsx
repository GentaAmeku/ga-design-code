import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { copy } from "@/features/content/copy";
import { articles } from "@/features/content/data";
import type { Locale } from "@/lib/locale";

const descriptions = {
  ja: [
    "生成AIを、日々の開発や仕事の流れに組み込みながら、使い続けるための工夫や気づきをまとめました。",
    "生成AIを前提に、開発の進め方やツールの使い方を見直してみた試みと、その過程での学びを綴っています。",
  ],
  en: [
    "Ideas and lessons from integrating generative AI into everyday development and work, and making it useful over time.",
    "Experiments in rethinking development workflows and tools with generative AI, and lessons learned along the way.",
  ],
};
export default function FeaturedArticles({ locale }: { locale: Locale }) {
  return (
    <ul className="featured-articles">
      {articles.slice(0, 2).map((article, index) => (
        <li key={article.slug}>
          <div className="article-preview" aria-hidden="true">
            <div className="preview-chrome">
              <i />
              <i />
              <i />
            </div>
            {index === 0 ? (
              <div className="workflow-preview">
                <span>Workflow</span>
                <div className="workflow-nodes">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ) : (
              <div className="tasks-preview">
                <aside>
                  ⌂ Home
                  <br />⌕ Search
                  <br />▤ Notes
                  <br />⚙ Settings
                </aside>
                <div className="task-preview-body">
                  <strong>Today</strong>
                  <p>□ Plan an idea</p>
                  <p>□ Make progress</p>
                  <p>□ Write a note</p>
                  <footer>
                    New task… <span>+</span>
                  </footer>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3>{article.title[locale]}</h3>
            <p>{descriptions[locale][index]}</p>
            <Link
              className="text-link"
              href={`/${locale}/writing/${article.slug}`}
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
