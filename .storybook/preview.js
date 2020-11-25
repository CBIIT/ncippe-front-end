
import React, {Suspense} from 'react'
import App from '../src/stories/Layout/AppWrapper'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: { expanded: true }
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

// wrap all stories in our App Wrapper since trackEvent() is connected to everything
export const decorators = [(Story,{globals: {locale}}) => <Suspense fallback={<div style={{display:'flex', justifyContent:'center', width:'100vw', height:'50vh'}}>Loading...</div>}><App lang={locale}><Story/></App></Suspense>];