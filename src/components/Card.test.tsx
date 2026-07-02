import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
    it("affiche le titre et la description", () => {
        render(<Card title="Sites vitrines" description="Un site qui vous ressemble." />);
        expect(screen.getByText("Sites vitrines")).toBeInTheDocument();
        expect(screen.getByText("Un site qui vous ressemble.")).toBeInTheDocument();
    });

    it("ne rend pas d'icône si aucune n'est fournie", () => {
        const { container } = render(<Card title="Test" description="Desc" />);
        expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });

    it("rend l'icône fournie", () => {
        render(
            <Card title="Test" description="Desc" icon={<span data-testid="fake-icon">🚀</span>} />
        );
        expect(screen.getByTestId("fake-icon")).toBeInTheDocument();
    });

    // Nouveaux tests pour le comportement cliquable
    it("rend un <div> (non cliquable) sans href", () => {
        render(<Card title="Test" description="Desc" />);
        // Aucun rôle "link" ne doit exister dans ce cas
        expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });

    it("rend un <Link> cliquable quand href est fourni", () => {
        render(<Card title="Services" description="Desc" href="/services" />);
        const link = screen.getByRole("link");
        expect(link).toHaveAttribute("href", "/services");
    });
});