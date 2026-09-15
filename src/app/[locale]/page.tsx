import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { pageMetadata } from "@/constants/metadata";
import AboutSection from "@/features/about/components/Section";
import Timeline from "@/features/career/Timeline";
import ContactSection from "@/features/contact/components/Section";
import { copy } from "@/features/content/copy";
import LandingSection from "@/features/landing/components/Section";
import Player from "@/features/music/Player";
import SkillsSection from "@/features/skills/components/Section";
import FeaturedArticles from "@/features/writing/FeaturedArticles";
import { isLocale } from "@/lib/locale";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, "", "G.A Design & Code");
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = copy[locale];
  return (
    <>
      <LandingSection locale={locale} />
      <AboutSection locale={locale} />
      <Section id="career">
        <div className="career-layout">
          <div>
            <SectionHeading title="Career" lead={t.careerLead} />
            <p className="career-intro">{t.careerIntro}</p>
            <Link className="text-link mt-8" href={`/${locale}/career`}>
              {t.careerMore} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Timeline locale={locale} />
        </div>
      </Section>
      <SkillsSection />
      <Section id="writing">
        <SectionHeading title="Writing" lead={t.writingLead} />
        <p className="sample-note mb-3">{t.sample}</p>
        <FeaturedArticles locale={locale} />
        <Link
          className="text-link mt-8 all-articles"
          href={`/${locale}/writing`}
        >
          {t.allArticles} <span aria-hidden="true">→</span>
        </Link>
      </Section>
      <Section id="music">
        <SectionHeading title="Music" lead={t.musicLead} />
        <Player />
      </Section>
      <ContactSection locale={locale} />
    </>
  );
}
