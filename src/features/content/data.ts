import type { Locale } from "@/lib/locale";
// Replace these samples with approved content. Slugs stay stable across translations.
export const articles = [
  {
    slug: "creating-with-ai",
    title: {
      ja: "AIとつくり、使い続ける。",
      en: "Creating with AI, for everyday use.",
    },
  },
  {
    slug: "rethinking-development",
    title: {
      ja: "開発の流れを、AIと見直す。",
      en: "Rethinking the way we build.",
    },
  },
  {
    slug: "small-tools",
    title: {
      ja: "小さな道具を、日々の仕事へ。",
      en: "Small tools for everyday work.",
    },
  },
] as const;
export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);
export const articleSections = (locale: Locale) =>
  locale === "ja"
    ? [
        {
          heading: "きっかけ",
          body: "ここには、取り組みを始めた背景や、日々の中で気づいたことを記します。",
        },
        {
          heading: "つくりながら考えたこと",
          body: "試したこと、選んだこと、その理由。制作の過程が伝わる文章と画像を、ここに少しずつ加えていきます。",
        },
        {
          heading: "これから",
          body: "使ってみて分かったことや、次に試したいことをまとめます。",
        },
      ]
    : [
        {
          heading: "The starting point",
          body: "This space will describe what sparked the project and the observations behind it.",
        },
        {
          heading: "Thinking through making",
          body: "What I tried, what I chose, and why. Words and images will tell the story of the process.",
        },
        {
          heading: "What comes next",
          body: "This space will capture lessons from everyday use and ideas worth exploring next.",
        },
      ];
// Set an approved address here; never use a placeholder as a real mail destination.
export const contactEmail: string | null = null;
export const previewTrack = { title: "Track 01", src: "/audio/preview.wav" };
