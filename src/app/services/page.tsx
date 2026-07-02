import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import ServiceRow from "@/components/ServiceRow";
import { BrowserIcon, LayersIcon, PulseIcon, TrendUpIcon } from "@/components/icons/Serviceicons";

const SERVICES = [
    {
        slug: "sites-vitrines",
        title: "Sites vitrines",
        price: "500€",
        delay: "3 à 5 jours",
        description:
            "Un site vitrine simple et efficace pour poser vos bases en ligne : accueil, à propos, contact avec formulaire fonctionnel. Idéal pour démarrer votre présence web sans y laisser toute votre trésorerie.",
        included: [
            "3 pages (Accueil / À propos / Contact)",
            "Formulaire de contact fonctionnel",
            "Effets d'interaction simples (hover, transitions)",
            "Design responsive adapté à votre image",
        ],
        excluded: [
            "Hébergement (accompagnement possible pour le choisir)",
            "Fonctionnalités avancées — galerie complexe, back-office, e-commerce (sur devis)",
        ],
        icon: <BrowserIcon />,
    },
    {
        slug: "apps-web",
        title: "Applications web & sites sur-mesure",
        price: "Devis personnalisé",
        delay: "5 jours à 3 semaines",
        description:
            "Vous avez un besoin plus spécifique : plus de pages, des fonctionnalités avancées, un outil interne, une interface de gestion ? On en discute ensemble pour cadrer précisément votre projet et vous proposer un devis adapté à sa complexité réelle.",
        icon: <LayersIcon />,
    },
    {
        slug: "maintenance",
        title: "Maintenance & évolutions",
        price: "250€/mois",
        delay: "Intervention sous 24h ouvrées",
        description:
            "Une tranquillité d'esprit sur le long terme : corrections de bugs, petites modifications de contenu et mises à jour de sécurité. Sans engagement de durée, résiliable à tout moment.",
        excluded: ["Ajout de nouvelles fonctionnalités (sur devis séparé)"],
        icon: <PulseIcon />,
    },
    {
        slug: "google-ads",
        title: "Campagnes Google Ads",
        price: "300€ + 150€/mois",
        delay: "Suivi résiliable avec 1 mois de préavis",
        description:
            "Rédaction et lancement de votre campagne publicitaire Google Ads, puis suivi régulier pour optimiser vos résultats (mots-clés, enchères, exclusions).",
        note: "Le budget publicitaire diffusé sur Google est à votre charge, en plus de cette prestation de gestion. Par souci de gestion de la concurrence locale, je ne prends qu'un seul client par secteur d'activité en simultané.",
        icon: <TrendUpIcon />,
    },
];

export default function ServicesPage() {
    return (
        <>
            <Section className="text-center pt-20 pb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Services</h1>
                <p className="text-frost/80 max-w-xl mx-auto">
                    Des prestations claires, pensées pour les TPE et PME du Var.
                </p>
            </Section>

            <Section className="flex flex-col gap-24 pb-24">
                {SERVICES.map(({ slug, ...service }, i) => (
                    <FadeIn key={slug} id={slug}>
                        <ServiceRow {...service} reverse={i % 2 === 1} />
                    </FadeIn>
                ))}
            </Section>
        </>
    );
}