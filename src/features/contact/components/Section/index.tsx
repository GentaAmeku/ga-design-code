import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";
import ContactForm from "../Form";

const ContactSection = () => {
  return (
    <Section>
      <FadeInWithStagger>
        <div className="flex flex-col">
          <FadeIn>
            <SectionHeading
              title="Contact me"
              lead="Feel free to email me if you have any questions."
            />
          </FadeIn>
          <FadeIn>
            <ContactForm />
          </FadeIn>
        </div>
      </FadeInWithStagger>
    </Section>
  );
};

export default ContactSection;
