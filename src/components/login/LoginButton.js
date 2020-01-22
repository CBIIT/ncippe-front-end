import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
import { AuthContext } from './AuthContext'
import { useTracking } from 'react-tracking'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const { auth } = loginContext
  const { t } = useTranslation('common');
  const { trackEvent } = useTracking()

  const handleClick = () => {
    if(auth) {
      trackEvent({
        prop53: `BioBank_TopNav|Sign-Out`,
        eVar53: `BioBank_TopNav|Sign-Out`,
        events: 'event26'
      })
      // reset user data and log-out
      signoutRedirectCallback()
      dispatch({
        type: 'reset'
      })

    } else {
      trackEvent({
        prop53: `BioBank_TopNav|Sign-In`,
        eVar53: `BioBank_TopNav|Sign-In`,
        events: 'event26'
      })
      // Using openID to redirect to login.gov
      signinRedirect()
    }
  }
  return <Button variant="contained" color="primary" onClick={handleClick}>{auth ? t('buttons.sign_out') : t('buttons.sign_in')}</Button>
}

export default LoginButton