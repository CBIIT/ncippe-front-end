
import React, { Suspense } from 'react'
import App from '../src/stories/Layout/AppWrapper'

// const App = lazy(() => import('../src/stories/Layout/AppWrapper')) 

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true },
  viewMode: 'docs'
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'es', right: '🇪🇸', title: 'Español' },
      ],
    },
  },
}

export const decorators = [(Story,{globals: {locale}}) => <Suspense fallback={<div style={{display:'flex', justifyContent:'center', width:'100vw', height:'50vh'}}>Loading...</div>}><App lang={locale}><Story/></App></Suspense>]