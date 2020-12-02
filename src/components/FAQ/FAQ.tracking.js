import React from 'react'
import { useLocation } from '@reach/router'
import { useTracking } from 'react-tracking'

import FAQ from './FAQ'

export default (props) => {
  const { trackEvent } = useTracking()
  const location = useLocation()
  const pageName = location.pathname.replace(/\//g,"-")
  
  const handleTrackEvent = (event, data) => {
    switch (event) {
      case "expand":
        // if index is a number then add 1 to offset loops starting at 0
        const index = typeof data.index === 'string' ? data.id : data.index + 1
        trackEvent({
          prop41: `BioBank|AccordianExpand|FAQ${pageName}-${index}`,
          events: 'event72',
          eventName: 'FAQ'
        })
        break;
      default:
        console.warn(`unexpected tracking event "${event}"`)
    }
  }
  return <FAQ trackEvent={handleTrackEvent} {...props} />
}