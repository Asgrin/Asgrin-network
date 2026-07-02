import Link from "next/link";

type CardProps = {
    title: string;
    description: string;
    icon?: React.ReactNode;
    href?: string; // optionnel : si fourni, la carte devient cliquable
    className?: string;
};

export default function Card({ title, description, icon, href, className = "" }: CardProps) {
    // Styles communs, qu'on soit en <div> ou en <Link>
    const baseStyles = `rounded-xl border border-asgrin-violet/30 bg-deep-space p-6 transition-all duration-300 hover:border-soft-iris hover:shadow-[0_0_20px_rgba(83,74,183,0.25)] ${className}`;

    const content = (
        <>
            {icon && (
                <div className="mb-4 text-soft-iris" aria-hidden="true">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-frost/80">{description}</p>
        </>
    );

    // Si href est fourni, on rend un <Link> (élément interactif, focusable,
    // navigable au clavier) plutôt qu'un <div onClick> — un <div> cliquable
    // n'est PAS accessible par défaut (pas de focus, pas de rôle sémantique,
    // pas d'activation au clavier), donc à éviter systématiquement pour de la navigation
    if (href) {
        return (
            <Link href={href} className={`block ${baseStyles} cursor-pointer`}>
                {content}
            </Link>
        );
    }

    return <div className={baseStyles}>{content}</div>;
}