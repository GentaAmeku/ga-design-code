import { pageDescriptions } from "@/constants/metadata";
import {
  AUTHOR_IMAGE,
  AUTHOR_JOB_TITLE,
  AUTHOR_NAME,
  AUTHOR_PROFILES,
  SITE_NAME,
  SITE_ORIGIN,
  siteUrl,
} from "@/constants/site";
import { type Locale, locales } from "@/lib/locale";

// 人物とサイトは言語をまたいで 1 つなので、@id で同じものだと示す
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export const personReference = (locale: Locale) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: AUTHOR_NAME,
  url: siteUrl(`/${locale}#about`),
  sameAs: AUTHOR_PROFILES,
});

// トップページ: サイト・人物・プロフィールページを 1 つのグラフで出す
export const homeStructuredData = (locale: Locale, title: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: SITE_NAME,
      url: siteUrl(`/${locale}`),
      inLanguage: [...locales],
      publisher: { "@id": PERSON_ID },
    },
    {
      ...personReference(locale),
      jobTitle: AUTHOR_JOB_TITLE,
      image: siteUrl(AUTHOR_IMAGE),
      knowsAbout: [
        "Generative AI adoption",
        "AI-driven development",
        "Frontend development",
      ],
    },
    {
      "@type": "ProfilePage",
      url: siteUrl(`/${locale}`),
      name: title,
      description: pageDescriptions[locale].home,
      inLanguage: locale,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
    },
  ],
});
