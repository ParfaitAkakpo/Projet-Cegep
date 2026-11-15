// app/gestion/page.tsx
import { prisma } from "@/lib/prisma";
import {
  createFormation,
  updateFormation,
  deleteFormation,
  creerCours,
  supprimerCours,
  creerEtudiant,
  supprimerEtudiant,
} from "./actions";

// Classes Tailwind réutilisées dans les formulaires
const champ =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
const etiquette = "mb-1 block text-sm font-medium text-slate-700";
const carte = "rounded-xl border border-slate-200 bg-white p-5 shadow-sm";

export default async function GestionPage() {
  // Lecture (R) : formations avec leurs cours, étudiants avec profil et formations
  const formations = await prisma.formation.findMany({
    include: { cours: true },
    orderBy: { id: "desc" },
  });

  const etudiants = await prisma.etudiant.findMany({
    include: { profil: true, formations: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Gestion</h1>
        <p className="mt-2 text-sm text-slate-600">
          Créer, modifier et supprimer les formations, les cours et les étudiants.
        </p>
      </header>

      {/* ================= FORMATIONS ================= */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Formulaire de création (C) */}
        <div className="lg:col-span-1">
          <form action={createFormation} className={`${carte} space-y-4`}>
            <h2 className="text-lg font-semibold">Ajouter une formation</h2>
            <div>
              <label className={etiquette}>Nom</label>
              <input type="text" name="nom" required className={champ} />
            </div>
            <div>
              <label className={etiquette}>Description</label>
              <textarea name="description" required className={champ} />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Ajouter
            </button>
          </form>
        </div>

        {/* Liste (R) + Modifier (U) + Supprimer (D) */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">
            Formations enregistrées ({formations.length})
          </h2>

          {formations.map((formation) => (
            <article key={formation.id} className={carte}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                {/* Formulaire de modification (U) */}
                <form
                  action={updateFormation.bind(null, formation.id)}
                  className="flex-1 space-y-2"
                >
                  <input
                    type="text"
                    name="nom"
                    defaultValue={formation.nom}
                    required
                    className={`${champ} font-semibold`}
                  />
                  <textarea
                    name="description"
                    defaultValue={formation.description}
                    required
                    className={champ}
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-white hover:bg-amber-600"
                  >
                    Modifier
                  </button>
                </form>

                {/* Formulaire de suppression (D) */}
                <form action={deleteFormation.bind(null, formation.id)}>
                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </form>
              </div>

              {/* Cours de cette formation (1:n) */}
              {formation.cours.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {formation.cours.map((cours) => (
                    <li key={cours.id} className="flex items-center justify-between text-sm">
                      <span>{cours.titre}</span>
                      <form action={supprimerCours.bind(null, cours.id)}>
                        <button type="submit" className="text-red-600 hover:underline">
                          Retirer
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ================= COURS (1:n) ================= */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <form action={creerCours} className={`${carte} space-y-4 lg:col-span-1`}>
          <h2 className="text-lg font-semibold">Ajouter un cours</h2>
          <div>
            <label className={etiquette}>Titre du cours</label>
            <input name="titre" required className={champ} />
          </div>
          <div>
            <label className={etiquette}>Formation</label>
            {/* Le formulaire envoie l'id de la formation choisie */}
            <select name="formationId" required className={champ}>
              {formations.map((formation) => (
                <option key={formation.id} value={formation.id}>
                  {formation.nom}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Ajouter
          </button>
        </form>
      </section>

      {/* ================= ÉTUDIANTS (1:1 + n:n) ================= */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <form action={creerEtudiant} className={`${carte} space-y-4 lg:col-span-1`}>
          <h2 className="text-lg font-semibold">Ajouter un étudiant</h2>
          <div>
            <label className={etiquette}>Nom</label>
            <input name="nom" required className={champ} />
          </div>
          <div>
            <label className={etiquette}>Bio (profil)</label>
            <textarea name="bio" className={champ} />
          </div>
          <div>
            <label className={etiquette}>Formations (Ctrl + clic pour plusieurs)</label>
            <select name="formations" multiple className={champ}>
              {formations.map((formation) => (
                <option key={formation.id} value={formation.id}>
                  {formation.nom}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Ajouter
          </button>
        </form>

        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">
            Étudiants enregistrés ({etudiants.length})
          </h2>

          {etudiants.map((etudiant) => (
            <article
              key={etudiant.id}
              className={`${carte} flex items-start justify-between gap-4`}
            >
              <div>
                <h3 className="font-semibold">{etudiant.nom}</h3>
                <p className="text-sm text-slate-600">
                  {etudiant.profil?.bio ?? "Aucun profil"}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {etudiant.formations.map((formation) => formation.nom).join(", ") ||
                    "Aucune formation"}
                </p>
              </div>
              <form action={supprimerEtudiant.bind(null, etudiant.id)}>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
                >
                  Supprimer
                </button>
              </form>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
