import { b as useI18n, A as ApiError } from '../virtual/entry.mjs';
import { x as computed, l as ref } from '../_/vue.mjs';

// app/composables/useFormErrors.ts
/**
* Validation de formulaire avec les schémas partagés avec le serveur, mais des messages
* localisés : on ne montre jamais les messages techniques de zod à l'utilisateur.
*/
function useFormErrors() {
	const { t, te } = useI18n();
	const fields = ref({});
	const formError = ref("");
	function message(field, code) {
		if (code && te(`errors.${code}`)) return t(`errors.${code}`);
		switch (field) {
			case "name": return t("errors.name", {
				min: 3,
				max: 30
			});
			case "password": return t("errors.password", { min: 8 });
			case "title": return t("errors.title", {
				min: 3,
				max: 60
			});
			default: return te(`errors.${field}`) ? t(`errors.${field}`) : t("errors.unknown");
		}
	}
	function clear() {
		fields.value = {};
		formError.value = "";
	}
	/** Valide `data` ; renvoie la valeur parsée ou `null` (et remplit `fields`). */
	function validate(schema, data) {
		clear();
		const result = schema.safeParse(data);
		if (result.success) return result.data;
		for (const issue of result.error.issues) {
			const field = String(issue.path[0] ?? "_");
			fields.value[field] ??= message(field);
		}
		return null;
	}
	/** Traduit une erreur d'API (champ par champ si possible, sinon message général). */
	function handleApiError(error) {
		clear();
		if (!(error instanceof ApiError)) {
			formError.value = t("errors.unknown");
			return;
		}
		const entries = Object.entries(error.fields);
		if (entries.length) for (const [field, code] of entries) fields.value[field] = message(field, code);
		else formError.value = te(`errors.${error.code}`) ? t(`errors.${error.code}`) : t("errors.unknown");
	}
	return {
		fields,
		formError,
		hasErrors: computed(() => Object.keys(fields.value).length > 0 || formError.value !== ""),
		validate,
		handleApiError,
		clear
	};
}

export { useFormErrors as u };
//# sourceMappingURL=useFormErrors-8fixJtZx.mjs.map
