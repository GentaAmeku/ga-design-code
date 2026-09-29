// ページの主見出しになるとき(記事一覧)は as="h1"。見た目は同じ
export default function SectionHeading({
  title,
  lead,
  marker = true,
  as: Heading = "h2",
}: {
  title: string;
  lead?: string;
  marker?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className="section-heading">
      <Heading>{title}</Heading>
      {lead && (
        <p>
          <span className={marker ? "marker-line" : undefined}>{lead}</span>
        </p>
      )}
    </div>
  );
}
