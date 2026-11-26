import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem('picross:locale');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    /* stockage indisponible (navigation privée…) */
  }
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'fr',
  messages: { fr, en },
});
