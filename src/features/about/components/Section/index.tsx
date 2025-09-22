import Image from "next/image";
import Section from "@/components/Section";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";

const AboutSection = () => {
  return (
    <Section>
      <FadeInWithStagger>
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row justify-between md:gap-12">
            <div className="shadow-lg rounded-xl overflow-hidden flex-1 relative aspect-square">
              <Image
                src="/images/about.png"
                alt="about image"
                fill
                priority
                sizes="(max-width: 768px) 360px, 360px"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl leading-11">
                About Me
              </h2>
              <p className="leading-loose text-lg tracking-wide">
                <span className="marker-line">
                  Frontend Developer based in Tokyo.
                </span>
              </p>
              <p className="leading-loose text-lg tracking-wide">
                I focus on building intuitive and high-performance digital
                experiences. I am passionate about crafting{" "}
                <span className="marker-line">clean code</span> and{" "}
                <span className="marker-line">seamless user interfaces</span>{" "}
                that are both beautiful and functional.
              </p>
              <p className="leading-loose text-lg tracking-wide">
                I am also a{" "}
                <span className="marker-line">rhythm game enthusiast</span>.
              </p>
            </div>
          </div>
        </FadeIn>
      </FadeInWithStagger>
    </Section>
  );
};

export default AboutSection;
