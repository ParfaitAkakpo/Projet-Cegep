import { etudiants, formations } from "@/lib/donnees";

// TP3 Partie A : étudiants fictifs (lib/donnees.ts), sans SQLite
export default function EtudiantsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Étudiants</h1>
      <p className="mt-2 text-slate-600">
        Chaque étudiant avec son profil et les formations qu&apos;il suit.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {etudiants.map((etudiant) => {
          // Formations suivies par cet étudiant (relation n:n)
          const sesFormations = formations.filter((f) =>
            etudiant.formationIds.includes(f.id)
          );

          return (
            <article
              key={etudiant.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold">{etudiant.nom}</h2>

              {/* ?? donne un texte de secours si la bio est absente */}
              <p className="mt-2 text-sm text-slate-600">
                Bio : {etudiant.bio ?? "Aucun profil"}
              </p>

              <h3 className="mt-4 text-sm font-medium text-slate-700">Formations :</h3>
              <ul className="mt-1 flex flex-wrap gap-2">
                {sesFormations.map((formation) => (
                  <li
                    key={formation.id}
                    className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-800"
                  >
                    {formation.nom}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </div>
  );
}
