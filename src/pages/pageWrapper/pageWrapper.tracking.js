import React from 'react'
import { useTracking } from 'react-tracking'
// cannot dynamically import a Higher Order Component, so pulling in both PROD and DEV versions
import pageWrapper from './pageWrapper'
import pageWrapperDev from './pageWrapper_dev'

const pageTracker = (Component) => ({children, ...props}) => {
  const { trackEvent } = useTracking()
  const handleTrackEvent = (event, data) => {
    switch (event) {
      case "page view":
        const { pageTitle, metaTitle, ...rest } = data
        trackEvent({
          event:'pageview',
          prop6: pageTitle,
          prop10: metaTitle,
          ...rest
        })
        break;
      case "tab click":
        trackEvent("tab click", {
          events: 'event33',
          prop53: `BioBank_SectionTabNav|${data.textContent}`,
          eVar53: `BioBank_SectionTabNav|${data.textContent}`,
        })
        break;
      case "sign in":
        trackEvent({
          eventName: 'sign in',
          events: 'event26',
          prop53: `BioBank_Activate|Sign-In`,
          eVar53: `BioBank_Activate|Sign-In`,
        })
        break;
      case "card link":
        trackEvent({
          eventName: 'CardLink',
          events: 'event27',
          prop57: `BioBank_AccountCard|${data.textContent}`,
          eVar37: `BioBank_AccountCard|${data.textContent}`,
        })
        break;
      case "submit search":
        trackEvent({
          events: "event2",
          prop11: "BioBank Global Search - Results New Search",
          prop14: data.term,
          eVar11: "BioBank Global Search - Results New Search",
          eVar13: "+1",
          eVar14: data.term,
        })
        break;
      case "search result link":
        trackEvent({
          prop50: data.textContent,
          prop13: data.rank
        })
        break;
      default:
        console.warn(`unexpected tracking event "${event}"`)
    }
  }

  const WrappedComponent = process.env.REACT_APP_API_PATH === 'local' ? pageWrapper(Component) : pageWrapperDev(Component)
  return <WrappedComponent trackEvent={handleTrackEvent} {...props} />
}

export default pageTracker