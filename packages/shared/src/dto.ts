import type { Difficulty } from './solver.ts';

/** Contrat d'API partagé entre le serveur et le client web. */

export type Role = 'user' | 'admin';

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface PicrossSummary {
  id: string;
  title: string;
  width: number;
  height: number;
  likes: number;
  difficulty: Difficulty;
  validated: boolean;
  /** Pseudo de l'auteur (`null` pour les grilles fournies avec l'application). */
  author: string | null;
  createdAt: string;
  /** Renseigné uniquement pour un utilisateur connecté. */
  likedByMe: boolean;
}

export interface PicrossDetail extends PicrossSummary {
  /** Solution : matrice de 0 / 1. */
  map: (0 | 1)[][];
}

export interface ApiErrorBody {
  error: string;
  /** Erreurs de validation champ par champ, quand applicable. */
  fields?: Record<string, string>;
}
