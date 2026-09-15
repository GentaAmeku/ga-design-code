import Image from "next/image";
import Section from "@/components/Section";
import { copy } from "@/features/content/copy";
import type { Locale } from "@/lib/locale";
export default function AboutSection({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <Section id="about">
      <div className="about-content">
        <div className="about-image">
          <Image
            src="/images/about.png"
            alt=""
            fill
            sizes="(max-width: 767px) 320px, 360px"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <p className="mt-5 text-lg leading-relaxed">
            <span className="marker-line">{t.aboutLead}</span>
          </p>
          <p className="mt-4 text-muted-foreground leading-loose">
            {t.aboutBody}
          </p>
          <p className="sample-note mt-4">{t.aboutNote}</p>
        </div>
      </div>
    </Section>
  );
}
