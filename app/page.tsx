import Link from "next/link";
import Message from "./components/Message";
import Compteur from "./components/Compteur";

// Page d'accueil : app/page.tsx correspond à "/"
export default function Home() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Bienvenue au Cégep de La Pocatière
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Découvrez nos formations, consultez la liste des étudiants et gérez
          les données du site.
        </p>
        <div className="mt-6">
          <Message texte="Site réalisé avec Next.js, Prisma et Tailwind CSS." />
        </div>
        <div className="mt-6">
          <Compteur />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/formations"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-400"
        >
          <h2 className="text-lg font-semibold">Formations</h2>
          <p className="mt-2 text-sm text-slate-600">
            Les programmes offerts et leurs cours.
          </p>
        </Link>

        <Link
          href="/etudiants"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-400"
        >
          <h2 className="text-lg font-semibold">Étudiants</h2>
          <p className="mt-2 text-sm text-slate-600">
            Les étudiants, leur profil et leurs formations.
          </p>
        </Link>

        <Link
          href="/gestion"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-400"
        >
          <h2 className="text-lg font-semibold">Gestion</h2>
          <p className="mt-2 text-sm text-slate-600">
            Ajouter, modifier et supprimer les données.
          </p>
        </Link>
      </section>
    </div>
  );
}
