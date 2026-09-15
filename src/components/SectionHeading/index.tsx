export default function SectionHeading({
  title,
  lead,
}: {
  title: string;
  lead?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {lead && (
        <p>
          <span className="marker-line">{lead}</span>
        </p>
      )}
    </div>
  );
}
