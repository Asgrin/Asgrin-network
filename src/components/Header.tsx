import Link from "next/link";

// Centralisé ici plutôt qu'en dur dans le JSX : plus simple à maintenir
// si tu ajoutes/retires une page plus tard
const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-asgrin-violet/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-wide">
          ASGRIN <span className="text-soft-iris">NETWORK</span>
        </Link>

        {/* nav sémantique + aria-label : accessibilité et SEO, pas juste une <div> */}
        <nav aria-label="Navigation principale">
          <ul className="flex gap-6 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-soft-iris"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}