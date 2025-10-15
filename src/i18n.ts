import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traducciones de ejemplo
const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      change_language: 'Change language',
      characters_title: 'Rick and Morty Characters',
      explore: 'Explore characters from the multiverse',
      no_characters: 'No characters found',
      error: 'Error',
      search_placeholder: 'Search for characters...'
    }
  },
  es: {
    translation: {
      welcome: 'Bienvenido',
      change_language: 'Cambiar idioma',
      characters_title: 'Personajes de Rick y Morty',
      explore: 'Explora personajes del multiverso',
      no_characters: 'No se encontraron personajes',
      error: 'Error',
      search_placeholder: 'Buscar personajes...'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.split('-')[0],
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;