import React, { useContext } from 'react'
import { navigate } from "@reach/router"
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
// import { AuthContext } from './AuthContext'
import { useTracking } from 'react-tracking'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  // const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const { auth } = loginContext
  const loc = window.location.pathname
  const { t } = useTranslation('common');
  const { trackEvent } = useTracking()

  const handleClick = () => {
    
    if(auth) {
      // return to account page from a public page
      if(!loc.includes('account')) {
        navigate('/account')
      }
      else {
        // log-out
        trackEvent({
          prop53: `BioBank_TopNav|Sign-Out`,
          eVar53: `BioBank_TopNav|Sign-Out`,
          events: 'event26'
        })
        // reset user data and log-out
        // dispatch({
        //   type: 'reset'
        // })
        window.location.assign('/signout')
      }
    }
    // log-in
    else {
      trackEvent({
        prop53: `BioBank_TopNav|Sign-In`,
        eVar53: `BioBank_TopNav|Sign-In`,
        events: 'event26'
      })
      window.location.assign('/account')
    }
  }
  return auth ? 
    loc.includes('account') ?
      <Button variant="outlined" color="primary" onClick={handleClick}>{t('buttons.sign_out')}</Button>
      :
      <Button variant="outlined" color="primary" onClick={handleClick}>{t('buttons.your_account')}</Button>
    :
    <Button variant="contained" color="primary" onClick={handleClick}>{t('buttons.sign_in')}</Button>
}

export default LoginButton