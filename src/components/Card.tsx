type CardProps = {
    title: string;
    description: string;
    icon?: React.ReactNode; // optionnel : une icône (ex: lucide-react) au-dessus du titre
    className?: string;
};

export default function Card({ title, description, icon, className = "" }: CardProps) {
    return (
        <div
            className={`rounded-xl border border-asgrin-violet/30 bg-deep-space p-6 transition-all duration-300 hover:border-soft-iris hover:shadow-[0_0_20px_rgba(83,74,183,0.25)] ${className}`}
        >
            {icon && (
                <div className="mb-4 text-soft-iris" aria-hidden="true">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-frost/80">{description}</p>
        </div>
    );
}