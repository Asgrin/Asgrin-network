import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
    it("rend un <button> par défaut (pas de href)", () => {
        render(<Button>Cliquer</Button>);
        // getByRole cible l'élément par son rôle sémantique (accessibilité)
        // plutôt que par une classe CSS ou un data-testid — c'est la bonne
        // pratique Testing Library : on teste ce que l'utilisateur perçoit,
        // pas les détails d'implémentation
        const button = screen.getByRole("button", { name: "Cliquer" });
        expect(button).toBeInTheDocument();
    });

    it("rend un <a> quand href est fourni", () => {
        render(<Button href="/contact">Contact</Button>);
        const link = screen.getByRole("link", { name: "Contact" });
        expect(link).toHaveAttribute("href", "/contact");
    });

    it("applique les classes de la variante primary par défaut", () => {
        render(<Button>Test</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass("bg-asgrin-violet");
    });

    it("applique les classes de la variante secondary", () => {
        render(<Button variant="secondary">Test</Button>);
        const button = screen.getByRole("button");
        expect(button).toHaveClass("border-asgrin-violet");
        // vérifie aussi qu'il n'a PAS les classes primary — évite un faux
        // positif si les deux variantes partageaient une classe par erreur
        expect(button).not.toHaveClass("bg-asgrin-violet");
    });
});