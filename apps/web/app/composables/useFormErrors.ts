import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ZodType, output } from 'zod';
import { NAME_MAX, NAME_MIN, PASSWORD_MIN, TITLE_MAX, TITLE_MIN } from '@picross/shared';
import { ApiError } from '@/api/client';

/**
 * Validation de formulaire avec les schémas partagés avec le serveur, mais des messages
 * localisés : on ne montre jamais les messages techniques de zod à l'utilisateur.
 */
export function useFormErrors() {
  const { t, te } = useI18n();
  const fields = ref<Record<string, string>>({});
  const formError = ref('');

  function message(field: string, code?: string): string {
    if (code && te(`errors.${code}`)) return t(`errors.${code}`);
    switch (field) {
      case 'name':
        return t('errors.name', { min: NAME_MIN, max: NAME_MAX });
      case 'password':
        return t('errors.password', { min: PASSWORD_MIN });
      case 'title':
        return t('errors.title', { min: TITLE_MIN, max: TITLE_MAX });
      default:
        return te(`errors.${field}`) ? t(`errors.${field}`) : t('errors.unknown');
    }
  }

  function clear() {
    fields.value = {};
    formError.value = '';
  }

  /** Valide `data` ; renvoie la valeur parsée ou `null` (et remplit `fields`). */
  function validate<S extends ZodType>(schema: S, data: unknown): output<S> | null {
    clear();
    const result = schema.safeParse(data);
    if (result.success) return result.data;
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? '_');
      fields.value[field] ??= message(field);
    }
    return null;
  }

  /** Traduit une erreur d'API (champ par champ si possible, sinon message général). */
  function handleApiError(error: unknown) {
    clear();
    if (!(error instanceof ApiError)) {
      formError.value = t('errors.unknown');
      return;
    }
    const entries = Object.entries(error.fields);
    if (entries.length) {
      for (const [field, code] of entries) fields.value[field] = message(field, code);
    } else {
      formError.value = te(`errors.${error.code}`)
        ? t(`errors.${error.code}`)
        : t('errors.unknown');
    }
  }

  const hasErrors = computed(() => Object.keys(fields.value).length > 0 || formError.value !== '');
  return { fields, formError, hasErrors, validate, handleApiError, clear };
}
