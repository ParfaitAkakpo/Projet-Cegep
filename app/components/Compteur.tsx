"use client";

import { useState } from "react";

// Client Component : "use client" est nécessaire à cause de useState et onClick
export default function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <button
      onClick={() => setCompteur(compteur + 1)}
      className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
    >
      Compteur : {compteur}
    </button>
  );
}
