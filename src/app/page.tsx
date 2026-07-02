import Button from "@/components/Button";
import Section from "@/components/Section";

export default function Home() {
  return (
    <Section className="text-center">
      <h1 className="text-6xl font-bold mb-4">
        Votre projet web, <span className="text-soft-iris">de l&apos;idée au résultat.</span>
      </h1>
      <p className="text-lg mb-8">
        Développeur web freelance pour TPE & PME.
      </p>
      <div className="flex gap-4 justify-center">
        <Button href="/contact" variant="primary">
          Me contacter
        </Button>
        <Button href="/services" variant="secondary">
          Voir mes services
        </Button>
      </div>
    </Section>
  );
}