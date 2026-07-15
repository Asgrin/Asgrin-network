import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <Section className="text-center pt-20 pb-24">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
            <p className="text-frost/80 mb-12 max-w-xl mx-auto">
                Une question, un projet ? Écrivez-moi via le formulaire, ou
                directement à{" "}
                <a href="mailto:thomas@asgrinnetwork.fr" className="text-soft-iris underline">
                    thomas@asgrinnetwork.fr
                </a>
                .
            </p>
            <ContactForm />
        </Section>
    );
}