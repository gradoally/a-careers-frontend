import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "ru",

  interpolation: {
    escapeValue: false,
  },

  resources: { ru: { translationsNS: {} } },
});

export default i18n;
