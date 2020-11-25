import React from 'react'
import { useTracking } from 'react-tracking'

import MenuGroup from './MenuGroup'

export default (props) => {
  const { trackEvent } = useTracking()
  
  const handleTrackEvent = (event, data) => {
    switch (event) {
      case "toggle menu reveal":
        trackEvent({
          prop53: `BioBank_TopNav|${data.title}`,
          eVar53: `BioBank_TopNav|${data.title}`,
          events:'event26',
          eventName: 'ToggleMenuReveal'
        })
        break;
      case "toggle menu link":
        trackEvent({
          prop53: `BioBank_TopNav|${data.title}|${data.textContent}`,
          eVar53: `BioBank_TopNav|${data.title}|${data.textContent}`,
          events:'event28',
          eventName: 'ToggleMenuLink'
        })
      default:
        break;
    }
  }
  return <MenuGroup trackEvent={handleTrackEvent} {...props} />
}