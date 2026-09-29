import { AUTHOR_NAME, DEFAULT_SOCIAL_IMAGE, siteUrl } from "@/constants/site";
import {
  PERSON_ID,
  personReference,
  WEBSITE_ID,
} from "@/constants/structured-data";
import { type BlogArticle, publishedOn } from "@/features/blog/content";

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
    author: personReference(article.locale),
    publisher: { "@type": "Person", "@id": PERSON_ID, name: AUTHOR_NAME },
    isPartOf: { "@id": WEBSITE_ID },
    image: siteUrl(article.image ?? DEFAULT_SOCIAL_IMAGE),
    datePublished: publishedOn(article),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
  };
};
