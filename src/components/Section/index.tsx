import { cn } from "@/lib/utils";

type SectionProps = {
  className?: string;
  children: React.ReactNode;
};

const Section = ({ className, children }: SectionProps) => {
  return (
    <section
      className={cn(
        "min-h-screen flex items-center justify-center w-full will-change-transform",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
