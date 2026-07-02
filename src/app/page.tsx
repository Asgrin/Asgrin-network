import Button from "@/components/Button";
import Section from "@/components/Section";
import Card from "@/components/Card";

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

// Textes étoffés suite à la session de copywriting — ton décontracté/accessible,
// on insiste sur rapidité + sur-mesure + prix (les 3 priorités données)
const WHY_ME = [
  {
    title: "100% sur-mesure",
    description: "Pas de template recyclé à l'infini. Chaque site est pensé pour votre activité, votre image et vos clients — pas pour rentrer dans un moule générique.",
  },
  {
    title: "Livraison rapide",
    description: "Entre 5 jours et 3 semaines selon la complexité du projet. Vous savez à quoi vous attendre, sans les délais à rallonge des grosses structures.",
  },
  {
    title: "Tarifs pensés pour les TPE/PME",
    description: "Un accompagnement sérieux, sans le coût d'une agence. Vous payez pour le travail, pas pour la structure.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <Section className="text-center py-24">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Votre projet web, de l&apos;idée au résultat.
        </h1>
        <p className="text-lg text-frost/80 mb-10 max-w-2xl mx-auto">
          Je m&apos;adapte à vos besoins et à votre budget. Développeur freelance
          basé à Toulon, j&apos;accompagne les TPE et PME avec des sites rapides
          à livrer, taillés sur-mesure, sans les tarifs ni la lourdeur d&apos;une
          agence.
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

      {/* POURQUOI MOI */}
      <Section id="pourquoi-moi">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi travailler avec moi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_ME.map((item) => (
            <Card key={item.title} title={item.title} description={item.description} />
          ))}
        </div>
      </Section>

      {/* SERVICES HIGHLIGHT */}
      <Section id="services-highlight">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce que je peux faire pour vous
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHT_SERVICES.map((service) => (
            <Card key={service.title} title={service.title} description={service.description} />
          ))}
        </div>
      </Section>
    </>
  );
}