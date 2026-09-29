import Image from "next/image";
import ReactMarkdown, {
  type Components,
  type ExtraProps,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import ArticleVideo, { isVideoSrc } from "@/features/blog/ArticleVideo";
import type { ImageSizes } from "@/features/blog/image-sizes";
import LinkCard from "@/features/blog/LinkCard";
import type { LinkCards } from "@/features/blog/link-cards";

interface MarkdownArticleProps {
  content: string;
  linkCards?: LinkCards;
  imageSizes?: ImageSizes;
}

// 本文の幅。.reading-page の最大幅 736px から左右の余白 24px ずつを引いたもの
const ARTICLE_IMAGE_SIZES = "(max-width: 736px) calc(100vw - 48px), 688px";

type ParagraphNode = ExtraProps["node"];

// 段落の中身がリンク1つだけなら、その href を返す
const soleLinkHref = (node: ParagraphNode): string | null => {
  const child = node?.children.length === 1 ? node.children[0] : undefined;
  if (child?.type !== "element" || child.tagName !== "a") return null;
  const href = child.properties?.href;
  return typeof href === "string" ? href : null;
};

const componentsFor = (
  linkCards: LinkCards,
  imageSizes: ImageSizes,
): Components => ({
  p: ({ node, children, ...props }) => {
    const href = soleLinkHref(node);
    const card = href ? linkCards[href] : undefined;
    return card ? <LinkCard card={card} /> : <p {...props}>{children}</p>;
  },
  img: ({ node: _node, src, alt, title, ...props }) => {
    if (isVideoSrc(src)) {
      return <ArticleVideo src={src} label={alt} loop={title === "loop"} />;
    }
    const size = typeof src === "string" ? imageSizes[src] : undefined;
    // 寸法が分かるサイト内の画像は、幅に合わせて縮小・WebP 化し、遅延読み込みにする
    return typeof src === "string" && size ? (
      <Image
        src={src}
        alt={alt ?? ""}
        title={title}
        width={size.width}
        height={size.height}
        sizes={ARTICLE_IMAGE_SIZES}
      />
    ) : (
      // biome-ignore lint/performance/noImgElement: Images without known dimensions keep their own size and path.
      <img
        src={src}
        alt={alt}
        title={title}
        loading="lazy"
        decoding="async"
        {...props}
      />
    );
  },
});

export default function MarkdownArticle({
  content,
  linkCards = {},
  imageSizes = {},
}: MarkdownArticleProps) {
  return (
    <div className="article-body">
      {/* 本文の HTML は書き手向けのコメントだけなので、描画しない */}
      <ReactMarkdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        components={componentsFor(linkCards, imageSizes)}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
