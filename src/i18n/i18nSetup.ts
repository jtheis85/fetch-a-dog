import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nResources } from "./i18nResources.ts";

i18next.use(initReactI18next).init({
  resources: i18nResources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
