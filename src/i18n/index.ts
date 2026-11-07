import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { nl } from './locales/nl';

export type SupportedLanguage = 'en' | 'nl';

export function getSupportedLanguage(languageCode: string | null): SupportedLanguage {
  return languageCode === 'nl' ? 'nl' : 'en';
}

const initialLanguage = getSupportedLanguage(getLocales()[0]?.languageCode ?? null);

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    nl: { translation: nl },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'nl'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
