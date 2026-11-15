export default function AproposPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-slate-900">À propos</h1>
      <p className="mt-4 text-slate-600">
        Ce site présente les formations du Cégep de La Pocatière. Il a été
        réalisé dans le cours Programmation avancée.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Next.js</h2>
          <p className="mt-1 text-sm text-slate-600">Pages, routes et layout.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Prisma</h2>
          <p className="mt-1 text-sm text-slate-600">Accès à la base de données.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Tailwind CSS</h2>
          <p className="mt-1 text-sm text-slate-600">Interface responsive.</p>
        </div>
      </div>
    </div>
  );
}
