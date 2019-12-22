import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import track from 'react-tracking'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

import Routes from './routers/routes'
// import { AuthProvider } from './components/login/AuthContext'
// import { LoginProvider } from './components/login/Login.context'
import { theme } from './theme/theme'

const App = (props) => {
  const { t } = useTranslation('common')

  // generic event deligation for links and buttons in the body
  document.addEventListener("click", (e) => {

    const target = e.target.closest('#main a, #main button')

    if (target) {
      props.tracking.trackEvent({
        prop50: e.target.textContent,
        prop66: `BioBank|[Section of Page]|${target.tagName}`,
        eVar66: `BioBank|[Section of Page]|${target.tagName}`,
        events: 'event71',
      })
    }
  })

  return (
    <ThemeProvider theme={theme}>
      {/* <AuthProvider>
        <LoginProvider> */}
          <HelmetProvider>
            <Helmet>
              <meta name="twitter:image:alt" content={t('metaData.twitter_image_alt')} />
            </Helmet>
            <CssBaseline />
            <Routes />
          </HelmetProvider>
        {/* </LoginProvider>
      </AuthProvider> */}
    </ThemeProvider>
  )
}

// wrapping App in react-tracking analytics HOC
export default track({
  // tracking data - common for all events
  site: "msbiobank.c.gov",
  pageName: `msbiobank.c.gov${window.location.pathname}`, // pageName should be "msbiobank.c.gov" plus the relative path of the current route
  channel: "DCTD - Moonshot Biobank: Public", // append "Public" or "Account" based on logged in status
  eVar1: "pagename", // computer page name
  eVar7: "Public", // Audience: unless logged in, then it's userType: "CRC, Participant, Lab Admin, Health Provider"
  prop1: window.location.href.substring(0,99), // first 100 characters in the url
  prop2: window.location.href.substring(100), // remaining characters in the url
  prop6: "short title", // pretty version of browser title
  prop7: "Public", // Audience: unless logged in, then it's userType: "CRC, Participant, Lab Admin, Health Provider"
  prop10: window.document.title, // page - org
},{
  // tracking options - {dispatch, dispatchOnMount, process} - see https://github.com/nytimes/react-tracking
  dispatch: (data) => {
    const local_s = window.s_gi(process.env.REACT_APP_ANALYTICS_ACCOUNT)

    // set url specific data on every call
    let computedData = {
      pageName: `msbiobank.c.gov${window.location.pathname}`,
      pageURL: window.location,
      prop1: window.location.href.substring(0,99),
      prop2: window.location.href.substring(100),
      prop10: window.document.title
    }

    if(data.event === 'pageview') {
      local_s.getPercentPageViewed(local_s.pageName,false,".transitionGroup")

      computedData = {
        ...computedData,
        events: `event1,event47=${window.s_getLoadTime()}`,
        prop61: local_s._ppvPreviousPage,
        prop64: `${local_s._ppvInitialPercentViewed}|${local_s._ppvHighestPercentViewed}`,
        prop65: window.s_getLoadTime(),
        eVar1: computedData.pageName,
      }

      Object.assign(local_s, data, computedData)
      local_s.t()

      // clear variables when done
      local_s.clearVars()

    } else {

      computedData = {
        ...computedData,
        prop67: computedData.pageName,
        eVar1: computedData.pageName,
        linkTrackVars: 'prop11,eVar11,prop13,eVar13,prop14,eVar14,prop41,prop50,prop53,eVar53,prop66,eVar66,prop67', // no spaces allowed
        linkTrackEvents: data.events ? data.events.concat(",") : null
      }

      Object.assign(local_s, data, computedData)

      const linkType = data.linkType || "o"

      local_s.tl(this,linkType)

      // clear variables when done
      local_s.clearVars()
    }
  }
})(App)
