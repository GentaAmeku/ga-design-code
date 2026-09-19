import { AUTHOR_NAME, DEFAULT_SOCIAL_IMAGE, siteUrl } from "@/constants/site";
import type { BlogArticle } from "@/features/blog/content";

export const toBlogPosting = (article: BlogArticle) => {
  const url = siteUrl(`/${article.locale}/blog/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    inLanguage: article.locale,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: siteUrl(`/${article.locale}#about`),
    },
    image: siteUrl(article.image ?? DEFAULT_SOCIAL_IMAGE),
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
  };
};
