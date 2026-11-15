import { prisma } from "@/lib/prisma";

// Lecture des étudiants avec leur profil (1:1) et leurs formations (n:n)
export default async function EtudiantsPage() {
  const etudiants = await prisma.etudiant.findMany({
    include: {
      profil: true,
      formations: true,
    },
    orderBy: { nom: "asc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Étudiants</h1>
      <p className="mt-2 text-slate-600">
        Chaque étudiant avec son profil et les formations qu&apos;il suit.
      </p>

      {etudiants.length === 0 && (
        <p className="mt-8 text-slate-500">Aucun étudiant pour le moment.</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {etudiants.map((etudiant) => (
          <article
            key={etudiant.id}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold">{etudiant.nom}</h2>

            {/* ?. gère la relation optionnelle, ?? donne un texte de secours */}
            <p className="mt-2 text-sm text-slate-600">
              Bio : {etudiant.profil?.bio ?? "Aucun profil"}
            </p>

            <h3 className="mt-4 text-sm font-medium text-slate-700">Formations :</h3>
            {etudiant.formations.length === 0 ? (
              <p className="text-sm text-slate-500">Aucune formation.</p>
            ) : (
              <ul className="mt-1 flex flex-wrap gap-2">
                {etudiant.formations.map((formation) => (
                  <li
                    key={formation.id}
                    className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-800"
                  >
                    {formation.nom}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
