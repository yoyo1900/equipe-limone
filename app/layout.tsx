import type { Metadata } from "next";
import { Lexend, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scuola Sci Equipe Limone Piemonte - Dal 2002",
  description: "Scuola Sci & Snowboard Equipe Limone: tradizione agonistica dal 2002. Dal 170° al 17° posto FISI nazionale. Lezioni sci, snowboard e corsi stagionali a Limone Piemonte.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${lexend.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
