import ReactMarkdown, {
  type Components,
  type ExtraProps,
} from "react-markdown";
import remarkGfm from "remark-gfm";
import LinkCard from "@/features/blog/LinkCard";
import type { LinkCards } from "@/features/blog/link-cards";

interface MarkdownArticleProps {
  content: string;
  linkCards?: LinkCards;
}

type ParagraphNode = ExtraProps["node"];

// 段落の中身がリンク1つだけなら、その href を返す
const soleLinkHref = (node: ParagraphNode): string | null => {
  const child = node?.children.length === 1 ? node.children[0] : undefined;
  if (child?.type !== "element" || child.tagName !== "a") return null;
  const href = child.properties?.href;
  return typeof href === "string" ? href : null;
};

const componentsFor = (linkCards: LinkCards): Components => ({
  p: ({ node, children, ...props }) => {
    const href = soleLinkHref(node);
    const card = href ? linkCards[href] : undefined;
    return card ? <LinkCard card={card} /> : <p {...props}>{children}</p>;
  },
});

export default function MarkdownArticle({
  content,
  linkCards = {},
}: MarkdownArticleProps) {
  return (
    <div className="article-body">
      {/* 本文の HTML は書き手向けのコメントだけなので、描画しない */}
      <ReactMarkdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        components={componentsFor(linkCards)}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
