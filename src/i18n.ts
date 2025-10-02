import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./utils/locales/en/translation.json";
import translationEs from "./utils/locales/es/translation.json";

const resources = {
  en: translationEn,
  es: translationEs
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;