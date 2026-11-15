import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Route dynamique : app/formations/[id]/page.tsx correspond à /formations/1, /formations/2...
// Dans cette version de Next.js, params est une Promise : il faut l'attendre avec await
export default async function DetailsFormationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // findUnique lit UNE formation, avec ses cours (1:n) et ses étudiants (n:n)
  const formation = await prisma.formation.findUnique({
    where: { id: Number(id) },
    include: { cours: true, etudiants: true },
  });

  if (!formation) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Formation introuvable</h1>
        <Link href="/formations" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Retour aux formations
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/formations" className="text-sm text-blue-600 hover:underline">
        ← Retour aux formations
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-slate-900">{formation.nom}</h1>
      <p className="mt-2 text-slate-600">{formation.description}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Cours de la formation</h2>
          {formation.cours.length === 0 ? (
            <p className="mt-2 text-slate-500">Aucun cours.</p>
          ) : (
            <ul className="mt-3 list-inside list-disc space-y-1 text-slate-700">
              {formation.cours.map((cours) => (
                <li key={cours.id}>{cours.titre}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Étudiants inscrits</h2>
          {formation.etudiants.length === 0 ? (
            <p className="mt-2 text-slate-500">Aucun étudiant inscrit.</p>
          ) : (
            <ul className="mt-3 list-inside list-disc space-y-1 text-slate-700">
              {formation.etudiants.map((etudiant) => (
                <li key={etudiant.id}>{etudiant.nom}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
