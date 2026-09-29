import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { imageSize } from "image-size";
import { cache } from "react";

// 本文の ![説明](/images/...) の画像の寸法を、生成のときに public/ から読む。
// 寸法が分かれば next/image で描き、幅に合わせた縮小と WebP 化、遅延読み込みが効く。

export interface ImageDimensions {
  width: number;
  height: number;
}

export type ImageSizes = Record<string, ImageDimensions>;

const publicRoot = path.join(process.cwd(), "public");
const localImagePattern = /!\[[^\]]*\]\((\/(?!\/)[^)\s]+)(?:\s+"[^"]*")?\)/g;
const videoPattern = /\.mp4$/i;

// 本文に出てくるサイト内の画像のパスを、出てきた順に重複なく返す
export const extractLocalImageSrcs = (content: string): string[] =>
  [...content.matchAll(localImagePattern)]
    .map((match) => match[1])
    .filter((src) => !videoPattern.test(src))
    .filter((src, index, srcs) => srcs.indexOf(src) === index);

const readDimensions = async (
  src: string,
): Promise<[string, ImageDimensions] | null> => {
  const filePath = path.join(publicRoot, src);
  if (!filePath.startsWith(publicRoot + path.sep)) return null;
  try {
    const { width, height } = imageSize(await readFile(filePath));
    return width && height ? [src, { width, height }] : null;
  } catch {
    return null;
  }
};

// 寸法が読めた画像だけを、パスをキーに返す。読めなければ通常の <img> で描く
export const getImageSizes = cache(
  async (content: string): Promise<ImageSizes> => {
    const entries = await Promise.all(
      extractLocalImageSrcs(content).map(readDimensions),
    );
    return Object.fromEntries(
      entries.flatMap((entry) => (entry ? [entry] : [])),
    );
  },
);
