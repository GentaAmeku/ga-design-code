import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownArticle({ content }: { content: string }) {
  return (
    <div className="article-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
