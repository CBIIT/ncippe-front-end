import React, {useEffect} from 'react'
import { CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import track from 'react-tracking'

// importing i18n here to be bundled with the app code
import '../../i18n'

import { useTranslation } from 'react-i18next'

import { theme } from '../../theme/theme'

// global variable for determining if a user has logged in or not. Will be toggled by SignInCallback
window.$role = 'Public'

const useStyles = makeStyles(theme => ({
  main: {
    flex: '1 0 auto',
    margin: '0',
  },
}))


/**
 * The main app wrapper. This is littered with code for analytics tracking
 * 
 */
const App = (props) => {
  const classes = useStyles()
  const { i18n } = useTranslation()

  // global variable for tracking generic links and buttons. It may be desirable to skip this tracking method if the link triggers something more specific
  window.$defaultLinkTrack = true
  
  // generic event deligation for links and buttons in the body
  const genericLinkTracking = (e) => {
    // skip tracking this event if global variable has been flagged (is false)
    if(window.$defaultLinkTrack){
      
      const target = e.target.closest('a, button')
      const main = target ? target.closest("#main") : false
      
      // track generic event if it's from a link or button inside of #main OR it's the backButton outside of #main
      // other header and footer links are not reported by this event
      if ((target && main) || (target && target.classList.contains('backButton'))) {
        // console.log("tracking")
        const linkType = target.tagName.toLowerCase() === 'button' || target.getAttribute('role') === 'button' ? 'button' : 'text'
        props.tracking.trackEvent({
          prop50: e.target.textContent,
          prop66: `BioBank|${linkType}`,
          eVar66: `BioBank|${linkType}`,
          events: 'event71',
        })
      }
    } else {
      // tracking was skipped - toggle the flag back on
      window.$defaultLinkTrack = true
    }
  }

  useEffect(()=>{
    // spawn new process - in the case of multiple tracking events, we want this generic one to be bound last so it can be consolidated/canceled by other events
    
    // I guess the timeout was not working?
    // setTimeout(() => { 
      document.addEventListener("click", genericLinkTracking, false)
    // }, 300)
    return () => {
      document.removeEventListener("click", genericLinkTracking, false)
    }
  })

  useEffect(() => {
    if(props.lang !== i18n.language) {
      i18n.changeLanguage(props.lang)
    }
  },[props.lang, i18n])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="siteWrapper"> {/* returning a fragment here does not work in ie11 */}
        <div id="main" className={classes.main} role="main">
          {props.children}
        </div>
      </div>
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
    // const isPrivate = window.location.pathname.match("account")

    // set url specific data on every call
    let computedData = {
      pageName: `msbiobank.c.gov${window.location.pathname}`,
      pageURL: window.location,
      prop1: window.location.href.substring(0,99),
      prop2: window.location.href.substring(100),
      // eVar7: isPrivate ? "Private" : "Public",
      // prop7: isPrivate ? "Private" : "Public",
      eVar7: window.$role,
      prop7: window.$role,
      pageType: null // from the docs: Do not set this variable on non-error pages. https://docs.adobe.com/content/help/en/analytics/implementation/vars/page-vars/pagetype.html
      // language: sessionStorage.getItem('i18nextLng')
      // prop10: window.document.title
    }

    if(data.event === 'pageview') {
      // console.log("data", data)
      const pageName = `msbiobank.c.gov${window.location.pathname}` // needed for homepage
      local_s.getPercentPageViewed(pageName,false,".siteWrapper,.zoom-enter-done")

      // for capturing percent page view on dashboard popups - not currently in scope
      // let targetElement = ".siteWrapper";
      // if (isPrivate && window.location.pathname !== "/account") {
      //   targetElement = ".transitionGroup"
      // }
      // local_s.getPercentPageViewed(pageName,false,targetElement)

      computedData = {
        ...computedData,
        events: `event1,event47=${window.s_getLoadTime()}`,
        prop61: local_s._ppvPreviousPage,
        prop64: `${local_s._ppvInitialPercentViewed}|${local_s._ppvHighestPercentViewed}`,
        prop65: window.s_getLoadTime(),
        eVar1: computedData.pageName,
      }

      Object.assign(local_s, data, computedData)

      // report to analytics
      local_s.t()

      // clear variables when done
      local_s.clearVars()

    } else {

      computedData = {
        ...computedData,
        prop67: computedData.pageName,
        eVar1: computedData.pageName,
        // linkTrackVars contains all possible eVars and props used throughout the app
        linkTrackVars: 'prop11,eVar11,prop13,eVar13,prop14,eVar14,eVar37,prop41,prop42,eVar42,prop50,prop53,eVar53,prop57,prop66,eVar66,prop67', // no spaces allowed
        linkTrackEvents: data.events ? data.events.concat(",") : null
      }

      Object.assign(local_s, data, computedData)

      // required variables for tracking
      const linkType = data.linkType || "o"
      const linkName = data.eventName || "generic"

      // report to analytics
      local_s.tl(this,linkType,linkName)

      // clear variables when done
      local_s.clearVars()
    }
  }
})(App)
