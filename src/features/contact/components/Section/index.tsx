import Section from "@/components/Section";
import ContactForm from "../Form";

const ContactSection = () => {
  return (
    <Section className="fade-in-once">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold text-center md:text-4xl leading-11">
          Contact me
        </h2>
        <p className="text-muted-foreground text-center mt-4 text-md tracking-wide md:text-lg">
          Feel free to email me if you have any questions.
        </p>
        <ContactForm />
      </div>
    </Section>
  );
};

export default ContactSection;
