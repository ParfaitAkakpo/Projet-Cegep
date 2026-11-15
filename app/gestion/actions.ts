// app/gestion/actions.ts
// Server Actions : ces fonctions s'exécutent côté serveur
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Rafraîchit toutes les pages qui affichent ces données
function rafraichirPages() {
  revalidatePath("/gestion");
  revalidatePath("/formations");
  revalidatePath("/etudiants");
}

// ---------- Formations (CRUD complet) ----------

export async function createFormation(formData: FormData) {
  const nom = String(formData.get("nom"));
  const description = String(formData.get("description"));

  await prisma.formation.create({
    data: { nom, description },
  });

  rafraichirPages();
}

export async function updateFormation(id: number, formData: FormData) {
  const nom = String(formData.get("nom"));
  const description = String(formData.get("description"));

  await prisma.formation.update({
    where: { id: id },
    data: { nom, description },
  });

  rafraichirPages();
}

export async function deleteFormation(id: number) {
  // Les cours de la formation sont supprimés aussi (onDelete: Cascade)
  await prisma.formation.delete({
    where: { id: id },
  });

  rafraichirPages();
}

// ---------- Cours (relation 1:n) ----------

export async function creerCours(formData: FormData) {
  const titre = String(formData.get("titre"));
  // FormData renvoie du texte : on convertit l'id avec Number()
  const formationId = Number(formData.get("formationId"));

  await prisma.cours.create({
    data: {
      titre,
      formationId,
    },
  });

  rafraichirPages();
}

export async function supprimerCours(id: number) {
  await prisma.cours.delete({
    where: { id: id },
  });

  rafraichirPages();
}

// ---------- Étudiants (profil 1:1 + formations n:n) ----------

export async function creerEtudiant(formData: FormData) {
  const nom = String(formData.get("nom"));
  const bio = String(formData.get("bio") ?? "");

  // getAll récupère toutes les formations cochées
  const ids = formData.getAll("formations").map((id) => Number(id));

  await prisma.etudiant.create({
    data: {
      nom,
      // create : crée le profil lié (1:1) seulement si une bio est saisie
      profil: bio ? { create: { bio } } : undefined,
      // connect : relie l'étudiant aux formations existantes (n:n)
      formations: {
        connect: ids.map((id) => ({ id })),
      },
    },
  });

  rafraichirPages();
}

export async function supprimerEtudiant(id: number) {
  // Le profil est supprimé aussi (onDelete: Cascade)
  await prisma.etudiant.delete({
    where: { id: id },
  });

  rafraichirPages();
}
