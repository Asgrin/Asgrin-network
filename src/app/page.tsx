import Button from "@/components/Button";
import Section from "@/components/Section";
import Card from "@/components/Card";

// Données des services en dur pour l'instant — on les sortira dans un
// fichier séparé (data/services.ts) le jour où la page Services doit
// réutiliser exactement la même liste, pour éviter la duplication
const HIGHLIGHT_SERVICES = [
  {
    title: "Sites vitrines",
    description: "Un site rapide, moderne et qui vous ressemble, pensé pour convertir vos visiteurs en clients.",
  },
  {
    title: "Applications web",
    description: "Des outils sur-mesure pour digitaliser vos process internes ou vos services clients.",
  },
  {
    title: "Maintenance & évolutions",
    description: "Un accompagnement continu pour faire évoluer votre site au rythme de votre activité.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Section className="text-center py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Votre projet web,{" "}
          <span className="text-soft-iris">de l&apos;idée au résultat.</span>
        </h1>
        <p className="text-lg text-frost/80 mb-10 max-w-2xl mx-auto">
          Développeur web freelance pour TPE & PME — sites vitrines,
          applications sur-mesure et accompagnement technique.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button href="/contact" variant="primary">
            Me contacter
          </Button>
          <Button href="/services" variant="secondary">
            Voir mes services
          </Button>
        </div>
      </Section>

      {/* SERVICES HIGHLIGHT */}
      <Section id="services-highlight">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que je peux faire pour vous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHT_SERVICES.map((service) => (
            <Card
              key={service.title}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </Section>
    </>
  );
}