import { cn } from "@/lib/utils";

type SectionProps = {
  className?: string;
  children: React.ReactNode;
};

const Section = ({ className, children }: SectionProps) => {
  return (
    <section
      className={cn(
        "min-h-dvh flex items-center justify-center w-full",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
