import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import lunr from 'lunr'

import { objectValuesToString } from './utils/utils'

export let searchIndex

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
    fallbackLng: ['en'],
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
  })


i18n.on('loaded',(loaded)=>{

  const data = i18n.getDataByLanguage('en')
  let textData = [] // lunr needs an array of docs
  let docData = {} // search results need an object keyed to the resource's name space

  Object.keys(data).map(resource => {
    if(resource !== 'common'){
      const ignoreKeys = ['pageTitle', 'pageRoute', 'alt_text']
      const value = objectValuesToString(data[resource], ignoreKeys)

      const entry = {
        id: resource,
        pageTitle: data[resource].pageTitle,
        pageRoute: data[resource].pageRoute,
        body: value
      }

      textData.push(entry)

      docData[resource] = entry

    }
  })

  searchIndex = lunr(function(){
    this.ref('id')
    this.field('body')
    this.metadataWhitelist = ['position']
    this.pipeline.remove(lunr.stemmer)
    // this.pipeline.remove(lunr.stopWordFilter)

    textData.map(doc => {
      this.add(doc)
    })
  })
  
  // save the docs for later reference in search results
  searchIndex.docs = docData

})

export default i18n