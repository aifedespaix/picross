import { z } from 'zod';
import { MAX_SIZE, MIN_SIZE, fromBits, validateSolution } from './grid.ts';

export const NAME_MIN = 3;
export const NAME_MAX = 30;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 128;
export const TITLE_MIN = 3;
export const TITLE_MAX = 60;

const bitRow = z
  .array(z.union([z.literal(0), z.literal(1)]))
  .min(MIN_SIZE)
  .max(MAX_SIZE);

/** Matrice 0/1 -> vérifie forme, bornes et remplissage minimal. */
export const mapSchema = z
  .array(bitRow)
  .min(MIN_SIZE)
  .max(MAX_SIZE)
  .superRefine((bits, ctx) => {
    const issue = validateSolution(fromBits(bits));
    if (issue) ctx.addIssue({ code: 'custom', message: `map.${issue}` });
  });

export const emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(254));
export const nameSchema = z.string().trim().min(NAME_MIN).max(NAME_MAX);
export const passwordSchema = z.string().min(PASSWORD_MIN).max(PASSWORD_MAX);

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  // Pas de règle de longueur ici : on ne révèle rien sur la politique de mot de passe.
  password: z.string().min(1).max(PASSWORD_MAX),
});

export const createPicrossSchema = z.object({
  title: z.string().trim().min(TITLE_MIN).max(TITLE_MAX),
  map: mapSchema,
});

export const likeSchema = z.object({ liked: z.boolean() });
export const validateSchema = z.object({ validated: z.boolean() });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePicrossInput = z.infer<typeof createPicrossSchema>;
