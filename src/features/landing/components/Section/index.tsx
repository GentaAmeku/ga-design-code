import Section from "@/components/Section";

const LandingSection = () => {
  return (
    <Section className="-mt-[var(--custom-header-height)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-center tracking-wide md:text-5xl">
          G.A Design & Code
        </h1>
        <p className="text-muted-foreground mt-4 text-md tracking-wide md:text-lg">
          <span className="marker-line">
            Crafting delightful digital experiences.
          </span>
        </p>
      </div>
    </Section>
  );
};

export default LandingSection;
