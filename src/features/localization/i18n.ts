/* eslint-disable import/no-named-as-default-member */
import { setDefaultOptions } from "date-fns";
import { de, enUS, tr } from "date-fns/locale";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { locales } from "./resources";

const dateFnsLocales = {
  en: enUS,
  de: de,
  tr: tr,
};

i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    compatibilityJSON: "v3",

    fallbackLng: "en_US",
    interpolation: {
      prefix: "{",
      suffix: "}",
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
  .then(() => {
    setLanguageSettings(i18n.language);
  });

i18n.on("languageChanged", (currentLanguage) => {
  setLanguageSettings(currentLanguage);
});

const setLanguageSettings = async (currentLanguage: string) => {
  const language = currentLanguage.split("_")[0];

  setDefaultOptions({
    locale: dateFnsLocales[language as keyof typeof dateFnsLocales],
  });
};

export default i18n;
