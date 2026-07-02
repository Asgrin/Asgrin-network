import Link from "next/link";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

// On type les props séparément pour pouvoir réutiliser ce composant
// soit comme <button> (action JS), soit comme <Link> (navigation) —
// évite de dupliquer un <ButtonLink> à côté
type ButtonProps = {
    variant?: ButtonVariant;
    href?: string; // si présent → rendu en <Link>, sinon en <button>
    children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
    primary:
        "bg-asgrin-violet text-frost hover:bg-soft-iris hover:text-deep-space hover:shadow-[0_0_20px_rgba(83,74,183,0.5)]",
    secondary:
        "border border-asgrin-violet text-frost hover:border-soft-iris hover:text-soft-iris hover:shadow-[0_0_15px_rgba(175,169,236,0.3)]",
};

// Classes communes aux deux variantes : transition sur TOUTES les
// propriétés animées (couleur + shadow) pour un effet fluide, pas saccadé
const BASE_STYLES =
    "inline-block rounded-lg px-6 py-3 font-medium transition-all duration-300";

export default function Button({
    variant = "primary",
    href,
    children,
    className = "",
    ...props
}: ButtonProps) {
    const styles = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button className={styles} {...props}>
            {children}
        </button>
    );
}