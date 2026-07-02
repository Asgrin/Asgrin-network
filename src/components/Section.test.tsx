import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Section from "./Section";

describe("Section", () => {
    it("rend ses enfants", () => {
        render(
            <Section>
                <p>Contenu de test</p>
            </Section>
        );
        expect(screen.getByText("Contenu de test")).toBeInTheDocument();
    });

    it("applique l'id fourni (pour les ancres de navigation)", () => {
        const { container } = render(<Section id="services">Contenu</Section>);
        // ici on est obligé de passer par container.querySelector car un id
        // sur une <section> n'a pas de "rôle" testable via getByRole
        expect(container.querySelector("#services")).toBeInTheDocument();
    });
});