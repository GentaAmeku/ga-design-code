export default function SectionHeading({
  title,
  lead,
  marker = true,
}: {
  title: string;
  lead?: string;
  marker?: boolean;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {lead && (
        <p>
          <span className={marker ? "marker-line" : undefined}>{lead}</span>
        </p>
      )}
    </div>
  );
}
