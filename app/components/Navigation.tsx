import Link from "next/link";

// Barre de navigation placée dans layout.tsx pour apparaître sur toutes les pages
export default function Navigation() {
  return (
    <header className="bg-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-xl font-bold">
          Cégep de La Pocatière
        </Link>

        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/" className="hover:text-sky-300">Accueil</Link>
          <Link href="/formations" className="hover:text-sky-300">Formations</Link>
          <Link href="/etudiants" className="hover:text-sky-300">Étudiants</Link>
          <Link href="/gestion" className="hover:text-sky-300">Gestion</Link>
          <Link href="/apropos" className="hover:text-sky-300">À propos</Link>
          <Link href="/contact" className="hover:text-sky-300">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
