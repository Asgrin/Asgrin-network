export default function Footer() {
    return (
        <footer className="border-t border-asgrin-violet/30 mt-20">
            <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-soft-iris">
                <p>© {new Date().getFullYear()} Asgrin Network — Tous droits réservés.</p>
                <p>thomas@asgrinnetwork.fr</p>
            </div>
        </footer>
    );
}