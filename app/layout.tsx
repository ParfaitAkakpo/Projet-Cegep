import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cégep de La Pocatière",
  description: "Site du Cégep : formations, étudiants et gestion",
};

// Le layout garde les éléments communs (navigation, pied de page)
// et affiche la page courante dans {children}
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900">
        <Navigation />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-4 text-center text-sm text-slate-500">
          Cégep de La Pocatière - Programmation avancée
        </footer>
      </body>
    </html>
  );
}
