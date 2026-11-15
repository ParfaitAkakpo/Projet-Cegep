// app/gestion/page.tsx
// TP3 Partie A : l'interface de gestion est affichée, mais les formulaires sont
// désactivés, car il n'y a pas encore de base de données en ligne.
// En partie B, ils seront reliés aux Server Actions (actions.ts) et à PostgreSQL.
import { formations, etudiants } from "@/lib/donnees";

// Classes Tailwind réutilisées dans les formulaires
const champ =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100";
const etiquette = "mb-1 block text-sm font-medium text-slate-700";
const carte = "rounded-xl border border-slate-200 bg-white p-5 shadow-sm";
const bouton = "rounded-lg px-4 py-2 font-medium text-white disabled:opacity-60";

export default function GestionPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Gestion</h1>
        <p className="mt-2 text-sm text-slate-600">
          Créer, modifier et supprimer les formations et les étudiants.
        </p>
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Version de démonstration : les données sont fictives. L&apos;ajout, la
          modification et la suppression seront actifs avec la base PostgreSQL
          (partie B).
        </p>
      </header>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Formulaire de création (désactivé en partie A) */}
        <form className={`${carte} space-y-4 lg:col-span-1`}>
          <fieldset disabled className="space-y-4">
            <h2 className="text-lg font-semibold">Ajouter une formation</h2>
            <div>
              <label className={etiquette}>Nom</label>
              <input type="text" name="nom" className={champ} />
            </div>
            <div>
              <label className={etiquette}>Description</label>
              <textarea name="description" className={champ} />
            </div>
            <button type="submit" className={`${bouton} bg-blue-600`}>
              Ajouter
            </button>
          </fieldset>
        </form>

        {/* Liste des formations */}
        <div className="space-y-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">
            Formations enregistrées ({formations.length})
          </h2>
          {formations.map((formation) => (
            <article
              key={formation.id}
              className={`${carte} flex flex-col gap-4 md:flex-row md:items-start md:justify-between`}
            >
              <div>
                <h3 className="font-semibold">{formation.nom}</h3>
                <p className="mt-1 text-sm text-slate-600">{formation.description}</p>
              </div>
              <div className="flex gap-2">
                <button disabled className={`${bouton} bg-amber-500`}>Modifier</button>
                <button disabled className={`${bouton} bg-red-600`}>Supprimer</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Étudiants enregistrés ({etudiants.length})
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {etudiants.map((etudiant) => (
            <article key={etudiant.id} className={carte}>
              <h3 className="font-semibold">{etudiant.nom}</h3>
              <p className="text-sm text-slate-600">{etudiant.bio ?? "Aucun profil"}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
