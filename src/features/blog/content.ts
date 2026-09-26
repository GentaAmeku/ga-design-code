import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";
import type { Locale } from "@/lib/locale";

const blogRoot = path.join(process.cwd(), "content", "blog");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Date must be a real calendar date");

const frontMatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  order: z.number().int().nonnegative().default(999),
  draft: z.boolean().default(true),
  createdAt: dateSchema,
  publishedAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
  image: z
    .string()
    .regex(/^\/(?!\/)/)
    .optional(),
});

export type BlogArticle = z.infer<typeof frontMatterSchema> & {
  slug: string;
  locale: Locale;
  content: string;
};

export type BlogArticleSummary = Omit<BlogArticle, "content">;

// 一覧の日付。公開日があればそれ、無ければ作成日。新しいものを上に並べる
export const publishedOn = (
  article: Pick<BlogArticle, "publishedAt" | "createdAt">,
): string => article.publishedAt ?? article.createdAt;

const articlePath = (locale: Locale, slug: string) =>
  path.join(blogRoot, locale, `${slug}.md`);

const parseArticle = (
  source: string,
  locale: Locale,
  slug: string,
  filePath: string,
): BlogArticle => {
  const parsed = matter(source);
  const frontMatter = frontMatterSchema.safeParse(parsed.data);

  if (!frontMatter.success) {
    throw new Error(
      `Invalid blog front matter in ${filePath}: ${frontMatter.error.message}`,
    );
  }

  return {
    ...frontMatter.data,
    slug,
    locale,
    content: parsed.content.trim(),
  };
};

export const getArticle = cache(
  async (locale: Locale, slug: string): Promise<BlogArticle | null> => {
    if (!slugPattern.test(slug)) return null;

    const filePath = articlePath(locale, slug);

    try {
      const source = await readFile(filePath, "utf8");
      return parseArticle(source, locale, slug, filePath);
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return null;
      }
      throw error;
    }
  },
);

export const getArticles = cache(
  async (locale: Locale): Promise<BlogArticleSummary[]> => {
    const directory = path.join(blogRoot, locale);

    try {
      const entries = await readdir(directory, { withFileTypes: true });
      const articles = await Promise.all(
        entries
          .filter(
            (entry) =>
              entry.isFile() &&
              entry.name.endsWith(".md") &&
              slugPattern.test(entry.name.slice(0, -3)),
          )
          .map(async (entry) => {
            const slug = entry.name.slice(0, -3);
            const article = await getArticle(locale, slug);
            if (!article) {
              throw new Error(
                `Blog article disappeared while reading: ${slug}`,
              );
            }
            const { content: _content, ...summary } = article;
            return summary;
          }),
      );

      return articles
        .filter((article) => !article.draft)
        .sort(
          (left, right) =>
            publishedOn(right).localeCompare(publishedOn(left)) ||
            left.order - right.order ||
            left.slug.localeCompare(right.slug),
        );
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return [];
      }
      throw error;
    }
  },
);
