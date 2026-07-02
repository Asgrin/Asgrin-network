import type { Metadata } from "next";
import { Orbitron, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuroraBackground from "@/components/AuroraBackground"; // ← nouveau

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-orbitron",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Asgrin Network — Développement web freelance",
  description: "Votre projet web, de l'idée au résultat.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${orbitron.variable} ${dmSans.variable} antialiased`}>
        <AuroraBackground /> {/* ← une seule fois ici, s'applique à toutes les pages */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}