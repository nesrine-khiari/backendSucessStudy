// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

import aboutEN from "../locales/about-us/en.json";
import aboutFR from "../locales/about-us/fr.json";

import landingEN from "../locales/landing-page/en.json";
import landingFR from "../locales/landing-page/fr.json";

import serEN from "../locales/services/en.json";
import serFR from "../locales/services/fr.json";

import legalEN from "../locales/mention-legal/en.json";
import legalFR from "../locales/mention-legal/fr.json";

import privacyEN from "../locales/privacy/en.json";
import privacyFR from "../locales/privacy/fr.json";

import faqEN from "../locales/faq/en.json";
import faqFR from "../locales/faq/fr.json";

import registerEN from "../locales/register/en.json";
import registerFR from "../locales/register/fr.json";

import loginEN from "../locales/login/en.json";
import loginFR from "../locales/login/fr.json";

import cityEN from "../locales/city/en.json";
import cityFR from "../locales/city/fr.json";


import universityEN from "../locales/university/en.json";
import universityFR from "../locales/university/fr.json";

import demandeEN from "../locales/demand/en.json";
import demandeFR from "../locales/demand/fr.json";

import userEN from "../locales/user/en.json";
import userFR from "../locales/user/fr.json";

import dashEN from "../locales/dashboard-uni/en.json";
import dashFR from "../locales/dashboard-uni/fr.json";


import certifEN from "../locales/certif/en.json";
import certifFR from "../locales/certif/fr.json";

import confEN from "../locales/dash-conf-uni/en.json";
import confFR from "../locales/dash-conf-uni/fr.json";

import headerEN from "../locales/header/en.json";
import headerFR from "../locales/header/fr.json";

import buttonsEN from "../locales/buttons/en.json";
import buttonsFR from "../locales/buttons/fr.json";
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: {...landingEN,...aboutEN,...serEN,...legalEN,...privacyEN,...faqEN,...registerEN,...loginEN,...cityEN,...universityEN,...demandeEN,...dashEN,...userEN,...certifEN,...confEN,...headerEN,...buttonsEN} },
      fr: { translation: {...landingFR,...aboutFR,...serFR,...legalFR,...privacyFR,...faqFR,...registerFR,...loginFR,...cityFR,...universityFR,...demandeFR,...dashFR,...userFR,...certifFR,...confFR,...headerFR,...buttonsFR} },
    },
    lng: "fr",
    fallbackLng: "fr",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
