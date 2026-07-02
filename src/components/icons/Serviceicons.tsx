// Icônes SVG minimalistes en stroke, chacune pensée pour représenter
// concrètement le service plutôt que des pictos génériques interchangeables
type IconProps = { className?: string };

export function BrowserIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <rect x="4" y="8" width="40" height="32" rx="3" />
            <line x1="4" y1="16" x2="44" y2="16" />
            <circle cx="10" cy="12" r="1.2" fill="currentColor" />
            <circle cx="15" cy="12" r="1.2" fill="currentColor" />
            <circle cx="20" cy="12" r="1.2" fill="currentColor" />
        </svg>
    );
}

export function LayersIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M24 6L44 16L24 26L4 16L24 6Z" />
            <path d="M4 24L24 34L44 24" />
            <path d="M4 32L24 42L44 32" />
        </svg>
    );
}

export function PulseIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <circle cx="24" cy="24" r="20" />
            <path d="M12 24h6l3-8 6 16 3-8h6" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
    );
}

export function TrendUpIcon({ className = "" }: IconProps) {
    return (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
            <path d="M6 34L18 22L26 30L42 12" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 12H42V22" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}