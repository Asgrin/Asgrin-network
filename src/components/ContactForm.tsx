"use client";

import { useState } from "react";
import Button from "@/components/Button";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
            website: formData.get("website"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Erreur lors de l'envoi");
            }

            setStatus("success");
            e.currentTarget.reset();
        } catch (err) {
            setStatus("error");
            setErrorMessage(err instanceof Error ? err.message : "Erreur inconnue");
        }
    }

    if (status === "success") {
        return (
            <p className="text-soft-iris text-center py-8">
                Message envoyé ! Je vous réponds au plus vite.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto">
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px]"
            />

            <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                minLength={2}
                className="bg-transparent border border-asgrin-violet/40 rounded-lg px-4 py-3 text-frost placeholder:text-frost/40 focus:border-soft-iris outline-none"
            />
            <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="bg-transparent border border-asgrin-violet/40 rounded-lg px-4 py-3 text-frost placeholder:text-frost/40 focus:border-soft-iris outline-none"
            />
            <textarea
                name="message"
                placeholder="Votre message"
                required
                minLength={10}
                rows={5}
                className="bg-transparent border border-asgrin-violet/40 rounded-lg px-4 py-3 text-frost placeholder:text-frost/40 focus:border-soft-iris outline-none resize-none"
            />

            {status === "error" && <p className="text-red-400 text-sm">{errorMessage}</p>}

            <Button type="submit" variant="primary" disabled={status === "loading"}>
                {status === "loading" ? "Envoi..." : "Envoyer"}
            </Button>
        </form>
    );
}