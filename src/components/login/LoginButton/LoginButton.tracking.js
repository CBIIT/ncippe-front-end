import React from 'react'
import { useTracking } from 'react-tracking'

import LoginButton from './LoginButton'

export default (props) => {
  const { trackEvent } = useTracking()

  const handleTrackEvent = (event) => {
    switch (event) {
      case "sign out":
        trackEvent({
          prop53: `BioBank_TopNav|Sign-Out`,
          eVar53: `BioBank_TopNav|Sign-Out`,
          events: 'event26',
          eventName: 'Sign out'
        })
        break;
      case "sign in":
        trackEvent({
          prop53: `BioBank_TopNav|Sign-In`,
          eVar53: `BioBank_TopNav|Sign-In`,
          events: 'event26',
          eventName: 'Sign in'
        })
      default:
        console.warn(`unexpected tracking event "${event}"`)
    }
  }
  return <LoginButton trackEvent={handleTrackEvent} {...props} />
}