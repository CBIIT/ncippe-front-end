import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    backend: {
      // for all available options read the backend's repository readme file
      // loadPath: '/locales/{{lng}}/{{ns}}.json'
      loadPath: () => {
          const prefix = window.location.hostname === "cbiit.github.io" ? '/ncippe-front-end/' : '/';
          console.log('MHL 00 prefix: ' + prefix);
          console.log('MHL 01 window.location.hostname: ' + window.location.hostname);
          console.log('MHL 02 window.location.hostname: ' + prefix + 'locales/{{lng}}/{{ns}}.json');
          return prefix + 'locales/{{lng}}/{{ns}}.json';
      }

    },
    // setup backend to look for subfolders withing languages
    // turning off since BabelEdit does not detect subfolders either. Seems the paradigm is a flat file structures withing the language folders
    // backend: {
    //   // for all available options read the backend's repository readme file
    //   loadPath: (lng,ns) => {
    //     return ns.map(name => {
    //       // 'a_' prefix indicates an 'account' file 
    //       if(name.match('a_')){
    //         return `/locales/${lng}/account/${name.split('_')[1]}.json`
    //       }
    //       // 'c_' prefix indicates an 'component' file
    //       else if(name.match('c_')){
    //         return `/locales/${lng}/components/${name.split('_')[1]}.json`
    //       }
    //       else {
    //         return `/locales/${lng}/${name}.json`
    //       }
    //     })
    //   }
    // },
    // react: {
    //   useSuspense: true
    // },
    // lng: 'en',
    whitelist: ['en','es'],
    load: "languageOnly", // https://github.com/i18next/i18next/issues/964
    fallbackLng: 'en',
    debug: false,
    ns: [
      'common'
    ],
    defaultNS: 'common',
  })

export default i18n
