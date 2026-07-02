export default function AuroraBackground() {
    return (
        <div
            className="fixed inset-0 -z-10 overflow-hidden"
            aria-hidden="true"
        >
            {/* mix-blend-mode: screen = les couleurs s'additionnent à la lumière
          du fond au lieu d'être juste posées en transparence dessus.
          C'est ce qui donne le vrai effet "néon qui brille" plutôt qu'une
          tache de couleur discrète. Opacité remontée à 50-60% en
          conséquence, sinon avec le blend mode ça devient trop discret
          dans l'autre sens */}
            <div
                className="animate-aurora-1 absolute -top-1/4 -left-1/4 h-[60vw] w-[60vw] max-h-[700px] max-w-[700px] rounded-full bg-neon-violet/50 blur-[100px]"
                style={{ mixBlendMode: "screen" }}
            />
            <div
                className="animate-aurora-2 absolute top-1/4 -right-1/4 h-[50vw] w-[50vw] max-h-[600px] max-w-[600px] rounded-full bg-asgrin-violet/40 blur-[110px]"
                style={{ mixBlendMode: "screen" }}
            />
            <div
                className="animate-aurora-3 absolute -bottom-1/4 left-1/4 h-[55vw] w-[55vw] max-h-[650px] max-w-[650px] rounded-full bg-iris-dark/40 blur-[120px]"
                style={{ mixBlendMode: "screen" }}
            />
        </div>
    );
}