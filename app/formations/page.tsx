import Link from "next/link";
import { formations } from "@/lib/donnees";

// TP3 Partie A : les formations viennent des données fictives (lib/donnees.ts),
// la page ne dépend donc pas de SQLite.
export default function FormationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Nos formations</h1>
      <p className="mt-2 text-slate-600">
        Cliquez sur une formation pour voir ses détails.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {formations.map((formation) => (
          <article
            key={formation.id}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{formation.nom}</h2>
            <p className="mt-2 flex-1 text-slate-600">{formation.description}</p>
            <p className="mt-4 text-sm text-slate-500">
              {formation.cours.length} cours
            </p>
            <Link
              href={`/formations/${formation.id}`}
              className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white hover:bg-blue-700"
            >
              Voir les détails
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
