import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { ratelimit } from "@/lib/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
    name: z.string().trim().min(2, "Nom trop court").max(100),
    email: z.string().trim().email("Email invalide"),
    message: z.string().trim().min(10, "Message trop court").max(2000),
    // Honeypot : un champ invisible pour un humain, mais qu'un bot qui
    // remplit tout automatiquement va renseigner — signal quasi certain
    // de spam si rempli
    website: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
    try {
        const ip = request.headers.get("x-forwarded-for") ?? "unknown";
        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json(
                { error: "Trop de tentatives. Réessayez dans quelques minutes." },
                { status: 429 }
            );
        }

        const body = await request.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Données invalides", details: parsed.error.flatten() },
                { status: 400 }
            );
        }

        if (parsed.data.website) {
            // Bot détecté : on répond succès sans rien envoyer, pour ne pas
            // signaler au bot qu'il a été démasqué
            return NextResponse.json({ success: true });
        }

        const { name, email, message } = parsed.data;

        await resend.emails.send({
            from: "Asgrin Network <contact@asgrinnetwork.fr>", // domaine vérifié, on peut utiliser l'adresse finale directement
            to: process.env.CONTACT_EMAIL_TO!,
            replyTo: email,
            subject: `Nouveau message de ${name} via le site`,
            text: `Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Erreur envoi contact:", error);
        return NextResponse.json(
            { error: "Une erreur est survenue. Réessayez plus tard." },
            { status: 500 }
        );
    }
}