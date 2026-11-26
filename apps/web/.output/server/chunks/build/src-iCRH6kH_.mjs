import { z } from 'zod';

/** Une grille doit avoir plus d'1/3 de cases pleines pour être intéressante. */
var MIN_FILL_RATIO = 1 / 3;
function gridWidth(solution) {
	return solution[0]?.length ?? 0;
}
function gridHeight(solution) {
	return solution.length;
}
function countFilled(solution) {
	let total = 0;
	for (const row of solution) for (const cell of row) if (cell) total++;
	return total;
}
/** Convertit une matrice de 0 / 1 (format d'API) en solution booléenne. */
function fromBits(bits) {
	return bits.map((row) => row.map((bit) => bit === 1));
}
/** Indices des blocs consécutifs d'une ligne : `[1,1,0,1]` -> `[2, 1]`. */
function lineClues(line) {
	const clues = [];
	let run = 0;
	for (const filled of line) if (filled) run++;
	else if (run > 0) {
		clues.push(run);
		run = 0;
	}
	if (run > 0) clues.push(run);
	return clues;
}
function computeClues(solution) {
	const width = gridWidth(solution);
	const rows = solution.map((row) => lineClues(row));
	const cols = [];
	for (let col = 0; col < width; col++) cols.push(lineClues(solution.map((row) => row[col] ?? false)));
	return {
		rows,
		cols
	};
}
/** Une grille est valide si elle est rectangulaire, dans les bornes et assez remplie. */
function validateSolution(solution) {
	const height = gridHeight(solution);
	const width = gridWidth(solution);
	if (height < 3 || height > 15 || width < 3 || width > 15) return "size";
	if (solution.some((row) => row.length !== width)) return "shape";
	if (countFilled(solution) <= width * height * .3333333333333333) return "fill";
	return null;
}
var bitRow = z.array(z.union([z.literal(0), z.literal(1)])).min(3).max(15);
/** Matrice 0/1 -> vérifie forme, bornes et remplissage minimal. */
var mapSchema = z.array(bitRow).min(3).max(15).superRefine((bits, ctx) => {
	const issue = validateSolution(fromBits(bits));
	if (issue) ctx.addIssue({
		code: "custom",
		message: `map.${issue}`
	});
});
var emailSchema = z.string().trim().toLowerCase().pipe(z.email().max(254));
var nameSchema = z.string().trim().min(3).max(30);
var passwordSchema = z.string().min(8).max(128);
z.object({
	name: nameSchema,
	email: emailSchema,
	password: passwordSchema
});
z.object({
	email: emailSchema,
	password: z.string().min(1).max(128)
});
z.object({
	title: z.string().trim().min(3).max(40),
	map: mapSchema
});
z.object({ liked: z.boolean() });
z.object({ validated: z.boolean() });

export { MIN_FILL_RATIO as M, computeClues as a, countFilled as c, fromBits as f, lineClues as l };
//# sourceMappingURL=src-iCRH6kH_.mjs.map
