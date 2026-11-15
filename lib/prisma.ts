// lib/prisma.ts
// TP3 Partie B : connexion à une base PostgreSQL hébergée (Prisma Postgres sur Vercel).
// Seul l'adaptateur change par rapport à SQLite : le reste du code Prisma est identique.
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

// L'adresse de la base vient d'une variable d'environnement :
// - en local : fichier .env (jamais envoyé sur GitHub)
// - sur Vercel : Settings → Environment Variables
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL ?? "",
});

export const prisma = new PrismaClient({ adapter });
