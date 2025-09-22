import Section from "@/components/Section";
import { FadeIn, FadeInWithStagger } from "@/lib/motion";
import ContactForm from "../Form";

const ContactSection = () => {
  return (
    <Section>
      <FadeInWithStagger>
        <div className="flex flex-col">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center md:text-4xl leading-11">
              Contact me
            </h2>
            <p className="text-muted-foreground text-center mt-4 text-md tracking-wide md:text-lg">
              Feel free to email me if you have any questions.
            </p>
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
