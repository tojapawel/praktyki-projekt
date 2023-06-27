import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './lang/en.json';
import translationPL from './lang/pl.json';

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
};

const storedLanguage = localStorage.getItem('selectedLanguage');
const defaultLanguage = storedLanguage || 'pl';

i18next.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
