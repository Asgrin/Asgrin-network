type SectionProps = {
    children: React.ReactNode;
    className?: string;
    id?: string; // utile pour les ancres de navigation (#services, #contact)
};

export default function Section({ children, className = "", id }: SectionProps) {
    return (
        <section id={id} className={`mx-auto max-w-6xl px-6 py-16 ${className}`}>
            {children}
        </section>
    );
}