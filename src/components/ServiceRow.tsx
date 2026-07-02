type ServiceRowProps = {
    title: string;
    price: string;
    delay: string;
    description: string;
    included?: string[];
    excluded?: string[];
    note?: string;
    icon: React.ReactNode;
    reverse?: boolean; // true = image/icône à droite au lieu de gauche
};

export default function ServiceRow({
    title,
    price,
    delay,
    description,
    included,
    excluded,
    note,
    icon,
    reverse = false,
}: ServiceRowProps) {
    return (
        <div
            className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-10 md:gap-16`}
        >
            {/* Panneau icône — bordure dégradée subtile + icône centrée,
          taille fixe pour garder l'alignement cohérent même si le
          texte à côté varie en longueur */}
            <div className="shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border border-asgrin-violet/40 bg-asgrin-violet/5 flex items-center justify-center">
                    <div className="w-20 h-20 text-soft-iris" aria-hidden="true">
                        {icon}
                    </div>
                </div>
            </div>

            {/* Panneau texte */}
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>

                {/* Badges prix/délai — pills discrètes plutôt que du texte brut,
            pour que l'info clé (combien / combien de temps) saute aux
            yeux sans lire tout le paragraphe */}
                <div className="flex gap-3 justify-center md:justify-start mb-4 flex-wrap">
                    <span className="text-sm px-3 py-1 rounded-full bg-asgrin-violet/20 text-soft-iris border border-asgrin-violet/40">
                        {price}
                    </span>
                    <span className="text-sm px-3 py-1 rounded-full bg-frost/5 text-frost/70 border border-frost/20">
                        {delay}
                    </span>
                </div>

                <p className="text-frost/80 mb-4 max-w-xl mx-auto md:mx-0">{description}</p>

                {included && included.length > 0 && (
                    <ul className="text-sm text-frost/70 space-y-1 mb-2 max-w-xl mx-auto md:mx-0">
                        {included.map((item) => (
                            <li key={item}>✓ {item}</li>
                        ))}
                    </ul>
                )}

                {excluded && excluded.length > 0 && (
                    <ul className="text-sm text-frost/50 space-y-1 mb-2 max-w-xl mx-auto md:mx-0">
                        {excluded.map((item) => (
                            <li key={item}>— {item}</li>
                        ))}
                    </ul>
                )}

                {note && (
                    <p className="text-sm text-soft-iris/80 italic max-w-xl mx-auto md:mx-0 mt-2">
                        {note}
                    </p>
                )}
            </div>
        </div>
    );
}