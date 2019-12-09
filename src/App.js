import React, { useEffect } from 'react'
import { useScript } from './components/utils/useScript'
import { ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import track from 'react-tracking'

import Routes from './routers/routes'
import { AuthProvider } from './components/login/AuthContext'
import { LoginProvider } from './components/login/Login.context'
import { theme } from './theme/theme'

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LoginProvider>
          <CssBaseline />
          <Routes />
        </LoginProvider>
      </AuthProvider>
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
  prop1: "", // first 100 characters in the url
  prop2: "", // remaining characters in the url
  prop6: "short title", // pretty version of browser title
  prop7: "Public", // Audience: unless logged in, then it's userType: "CRC, Participant, Lab Admin, Health Provider"
  prop10: window.document.title, // page - org
  // TODO: Previous Page Plugin
  // TODO: Page Load Speed Plugin
  // TODO: Percentage of Page Viewed
  
},{
  // tracking options - {dispatch, dispatchOnMount, process} - see https://github.com/nytimes/react-tracking
  dispatch: (data) => {
    let local_s = window.s_gi(process.env.REACT_APP_ANALYTICS_ACCOUNT)

    const computedData = {
      prop1: window.location.href.substring(0,99),
      prop2: window.location.href.substring(100),
      events: 'event1',
      eVar1: data.pageName,
      prop10:  window.document.title,
    }

    if(data.event === 'pageview') {

      Object.assign(local_s, data, computedData)
      local_s.t()

    } else {
      // window.s = {...window.s, ...data}
      // console.log(Object.keys(data).join(','))
      // TODO: process variables 
      window.s.linkTrackVars='eVar8'
      window.s.eVar8 = data.eVar8 || ""
      const linkType = data.linkType || "o"
      const linkName = data.linkName || "missing link name"
      window.s.tl(this,linkType,linkName)
    }
  }
})(App)
