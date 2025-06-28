import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar arquivos de tradução
import translationPT from './locales/pt.json';
import translationEN from './locales/en.json';
import translationES from './locales/es.json';

// Recursos de tradução
const resources = {
  pt: {
    translation: translationPT
  },
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

i18n
  // Detectar idioma do navegador
  .use(LanguageDetector)
  // Passar o módulo i18n para react-i18next
  .use(initReactI18next)
  // Inicializar i18next
  .init({
    resources,
    fallbackLng: 'pt',
    debug: false,
    interpolation: {
      escapeValue: false, // não é necessário para React
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;
