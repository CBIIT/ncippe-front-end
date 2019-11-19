import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // backend: {
    //   // for all available options read the backend's repository readme file
    //   loadPath: '/locales/{{lng}}/{{ns}}.json'
    // },
    // react: {
    //   useSuspense: true
    // },
    load: "languageOnly",
    fallbackLng: 'en',
    debug: true,
    ns: [
      'common',
      'homePage',
      'about',
      'eligibility',
      'research',
      'consent',
      'donate',
      'testing',
      'activate',
      'privacy'
    ],
    defaultNS: 'common',
  });


export default i18n;