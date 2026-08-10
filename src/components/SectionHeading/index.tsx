type SectionHeadingProps = {
  title: string;
  lead?: string;
};

const SectionHeading = ({ title, lead }: SectionHeadingProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center md:text-4xl leading-11">
        {title}
      </h2>
      {lead && (
        <p className="text-muted-foreground text-center mt-4 text-base tracking-wide md:text-lg">
          {lead}
        </p>
      )}
    </>
  );
};

export default SectionHeading;
