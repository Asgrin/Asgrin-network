import type { Metadata } from "next";
import { Orbitron, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// next/font héberge les fonts EN LOCAL au build (pas de requête vers Google
// au chargement) → meilleure perf (pas de FOUT/FOIT) et zéro fuite de data
// vers le CDN Google Fonts pour tes visiteurs (bon point RGPD aussi)
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
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}