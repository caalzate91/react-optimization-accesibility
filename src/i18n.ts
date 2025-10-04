import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
  en: {
    translation: {
    
      "title": "Rick and Morty Characters",
      "explore": "Explore characters from the multiverse",
      "error_prefix": "Error:",
      "no_characters": "No characters found",
      "footer_title": "Adventure Awaits!",
      "footer_text": "Discover more characters from the infinite multiverse of Rick and Morty",
      "copyright": "© {{year}} Rick and Morty Character Explorer",
      "powered_by": "Powered by Rick and Morty API",
      "lang_en": "English",
      "lang_es": "Español",
      "search_placeholder": "Search for characters...",
      "search_button": "Search",
      "gender_label": "Gender",
      "origin_label": "Origin",
      "location_label": "Location",
      "status_Alive": "Alive",
      "status_Dead": "Dead",
      "status_unknown": "Unknown",
      "gender_Male": "Male",
      "gender_Female": "Female",
      "gender_Genderless": "Genderless",
      "gender_unknown": "Unknown", 
      "species_Human": "Human",
      "species_Alien": "Alien",
      "species_Poopybutthole": "Poopybutthole", 
      "species_unknown": "Unknown", 
      "place_Earth": "Earth",
    }
  },
  es: {
    translation: {
   
      "title": "Personajes de Rick y Morty",
      "explore": "Explora personajes del multiverso",
      "error_prefix": "Error:",
      "no_characters": "No se encontraron personajes",
      "footer_title": "¡La Aventura Espera!",
      "footer_text": "Descubre más personajes del multiverso infinito de Rick y Morty",
      "copyright": "© {{year}} Explorador de Personajes de Rick y Morty",
      "powered_by": "Con tecnología de Rick and Morty API",
      "lang_en": "Inglés",
      "lang_es": "Español",
      "search_placeholder": "Buscar personajes...",
      "search_button": "Buscar",
      "gender_label": "Género",
      "origin_label": "Origen",
      "location_label": "Ubicación",
      "status_Alive": "Vivo",
      "status_Dead": "Muerto",
      "status_unknown": "Desconocido",
      "gender_Male": "Masculino",
      "gender_Female": "Femenino",
      "gender_Genderless": "Sin Género",
      "gender_unknown": "Desconocido",
      "species_Human": "Humano",
      "species_Alien": "Alien",
      "species_Poopybutthole": "Poopybutthole",
      "species_unknown": "Desconocida", 
      "place_Earth": "Tierra",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ['en', 'es'],
    detection: {
      order: ['navigator', 'localStorage', 'cookie'], 
      caches: ['localStorage'], 
    },
    interpolation: {
      escapeValue: false, 
    },
    ns: ['translation'],
    defaultNS: 'translation',
  });

export default i18n;
