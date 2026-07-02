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
        // aria-hidden est notre marqueur du wrapper icône : s'il est absent,
        // le bloc icône entier n'a pas été rendu
        expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    });

    it("rend l'icône fournie", () => {
        render(
            <Card
                title="Test"
                description="Desc"
                icon={<span data-testid="fake-icon">🚀</span>}
            />
        );
        expect(screen.getByTestId("fake-icon")).toBeInTheDocument();
    });
});