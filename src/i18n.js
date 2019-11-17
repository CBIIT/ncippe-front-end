import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import lunr from 'lunr'

import { flattenObject } from './utils/utils'
// not like to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

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
  })


i18n.on('loaded',(loaded)=>{
  // console.log('loaded:',loaded)
  // console.log('i18n',i18n)
  // console.log('en data',i18n.getDataByLanguage('en'))
  // todo: create lunr index here
  // todo: consider running search in web workers
  // console.log("seach index running")
  const data = i18n.getDataByLanguage('en')
  let textData = []
  Object.keys(data).map(resource => {
    if(resource !== 'common'){
      const flatData = flattenObject(data[resource],resource)

      Object.keys(flatData).map(key=>{
        const cleanUpText = flatData[key].replace(/<[\/]*?([a-z]+) *[\/]*?>/g,' ')
        textData.push({
          id: key,
          body: cleanUpText
        })
      })
    }
  })

  searchIndex = lunr(function(){
    this.ref('id')
    this.field('body')
    this.metadataWhitelist = ['position']

    textData.map(doc => {
      this.add(doc)
    })
  })
})

export default i18n