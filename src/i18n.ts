import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Rick and Morty Characters": "Rick and Morty Characters",
      "Explore characters from the multiverse": "Explore characters from the multiverse",
      "Adventure Awaits!": "Adventure Awaits!",
      "Discover more characters from the infinite multiverse of Rick and Morty": "Discover more characters from the infinite multiverse of Rick and Morty",
      "No characters found": "No characters found",
      "Gender": "Gender",
      "Origin": "Origin",
      "Location": "Location",
      "Error": "Error",
      "Powered by Rick and Morty API": "Powered by Rick and Morty API"
    }
  },
  es: {
    translation: {
      "Rick and Morty Characters": "Personajes de Rick y Morty",
      "Explore characters from the multiverse": "Explora personajes del multiverso",
      "Adventure Awaits!": "¡La aventura te espera!",
      "Discover more characters from the infinite multiverse of Rick and Morty": "Descubre más personajes del infinito multiverso de Rick y Morty",
      "No characters found": "No se encontraron personajes",
      "Gender": "Género",
      "Origin": "Origen",
      "Location": "Ubicación",
      "Error": "Error",
      "Powered by Rick and Morty API": "Desarrollado por la API de Rick y Morty"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.split('-')[0],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['navigator'],
      caches: [],
    },
  });

export default i18n;
