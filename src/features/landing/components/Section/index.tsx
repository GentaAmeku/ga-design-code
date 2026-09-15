import Section from "@/components/Section";
import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";
export default function LandingSection({ locale }: { locale: Locale }) {
  return (
    <Section id="landing">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          G.A Design &amp; Code
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted-foreground">
          <span className="marker-line">{copy[locale].tagline}</span>
        </p>
      </div>
    </Section>
  );
}
