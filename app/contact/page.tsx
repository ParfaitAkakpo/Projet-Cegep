import Message from "../components/Message";

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="mt-2 text-slate-600">
        Pour toute question sur nos formations, communiquez avec nous.
      </p>

      <div className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Coordonnées fictives à remplacer si nécessaire */}
        <p>
          <span className="font-medium">Adresse :</span> La Pocatière (Québec)
        </p>
        <p>
          <span className="font-medium">Téléphone :</span> 000 000-0000
        </p>
        <p>
          <span className="font-medium">Courriel :</span> contact@exemple.com
        </p>
      </div>

      <div className="mt-6">
        <Message texte="Nous répondons habituellement en moins de 48 heures." />
      </div>
    </div>
  );
}
