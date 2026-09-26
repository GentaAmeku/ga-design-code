import "server-only";

import { cache } from "react";

// 本文の中で、段落が URL 1つだけの行をリンクカードにする。
// OGP は静的生成のときに取りに行き、取れなかった URL は通常のリンクのまま描く。

export interface LinkCard {
  url: string;
  title: string;
  description: string | null;
  image: string | null;
  siteName: string;
}

export type LinkCards = Record<string, LinkCard>;

const FETCH_TIMEOUT_MS = 5000;
const bareUrlPattern = /^https?:\/\/\S+$/;

// 段落が URL だけの行を、出てきた順に重複なく返す
export const extractBareUrls = (content: string): string[] =>
  content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => bareUrlPattern.test(paragraph))
    .filter((url, index, urls) => urls.indexOf(url) === index);

const decodeEntities = (value: string): string =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

// <meta property="og:title" content="…"> と <meta content="…" property="og:title"> の両方を読む
const readMeta = (html: string, key: string): string | null => {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']*)["']`,
      "i",
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${escaped}["']`,
      "i",
    ),
  ];
  const match = patterns.map((p) => html.match(p)).find((m) => m?.[1]);
  return match?.[1] ? decodeEntities(match[1].trim()) : null;
};

const readTitleTag = (html: string): string | null => {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match?.[1] ? decodeEntities(match[1].trim()) : null;
};

const resolveImage = (image: string | null, base: string): string | null => {
  if (!image) return null;
  try {
    return new URL(image, base).toString();
  } catch {
    return null;
  }
};

// GitHub のように題名の末尾が説明文の繰り返しなら、題名からその部分を落とす
const tidyTitle = (title: string, description: string | null): string => {
  const head = description?.slice(0, 24);
  const index = head ? title.indexOf(`: ${head}`) : -1;
  return index > 0 ? title.slice(0, index) : title;
};

// HTML から OGP を読む。題名が取れなければカードにしない
export const parseLinkCard = (url: string, html: string): LinkCard | null => {
  const rawTitle = readMeta(html, "og:title") ?? readTitleTag(html);
  if (!rawTitle) return null;
  const description =
    readMeta(html, "og:description") ?? readMeta(html, "description");
  return {
    url,
    title: tidyTitle(rawTitle, description),
    description,
    image: resolveImage(readMeta(html, "og:image"), url),
    siteName: readMeta(html, "og:site_name") ?? new URL(url).hostname,
  };
};

const fetchLinkCard = async (url: string): Promise<LinkCard | null> => {
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; ga-design-code-link-card/1.0; +https://www.genta-ameku.com)",
        accept: "text/html",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return null;
    return parseLinkCard(url, await response.text());
  } catch {
    return null;
  }
};

// 本文に出てくる URL のカードを、取れた分だけ URL をキーに返す
export const getLinkCards = cache(
  async (content: string): Promise<LinkCards> => {
    const cards = await Promise.all(
      extractBareUrls(content).map(fetchLinkCard),
    );
    return cards.reduce<LinkCards>(
      (all, card) => (card ? { ...all, [card.url]: card } : all),
      {},
    );
  },
);
