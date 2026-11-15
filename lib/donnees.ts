// lib/donnees.ts
// TP3 — Partie A : données FICTIVES écrites dans le code.
// Les pages publiées n'ont donc pas besoin de la base SQLite locale (dev.db).
// En partie B, ces données seront remplacées par une base PostgreSQL hébergée.

export type Cours = {
  id: number;
  titre: string;
};

export type Formation = {
  id: number;
  nom: string;
  description: string;
  cours: Cours[];
};

export type Etudiant = {
  id: number;
  nom: string;
  bio: string | null;
  formationIds: number[]; // ids des formations suivies (relation n:n)
};

export const formations: Formation[] = [
  {
    id: 1,
    nom: "Techniques de l'informatique",
    description: "Programmation Web, bases de données et développement d'applications.",
    cours: [
      { id: 1, titre: "Programmation Web" },
      { id: 2, titre: "Bases de données" },
      { id: 3, titre: "Programmation avancée" },
    ],
  },
  {
    id: 2,
    nom: "Sciences de la nature",
    description: "Formation préuniversitaire en biologie, chimie, physique et mathématiques.",
    cours: [
      { id: 4, titre: "Chimie générale" },
      { id: 5, titre: "Calcul différentiel" },
    ],
  },
  {
    id: 3,
    nom: "Techniques de comptabilité et de gestion",
    description: "Comptabilité, gestion financière et outils informatiques de gestion.",
    cours: [
      { id: 6, titre: "Comptabilité 1" },
      { id: 7, titre: "Gestion d'entreprise" },
    ],
  },
];

export const etudiants: Etudiant[] = [
  { id: 1, nom: "Sophie Tremblay", bio: "Passionnée de développement Web.", formationIds: [1] },
  { id: 2, nom: "Marc Gagnon", bio: null, formationIds: [2] },
  { id: 3, nom: "Amira Benali", bio: "Intéressée par la gestion et l'informatique.", formationIds: [1, 3] },
];
