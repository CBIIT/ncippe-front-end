import React, { useContext } from 'react'
import { navigate } from "@reach/router"
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LoginContext } from './Login.context'
// import { AuthContext } from './AuthContext'
import { useTracking } from 'react-tracking'

const useStyles = makeStyles(theme => ({
  button: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 224
    }
  }
}))

const LoginButton = () => {
  const classes = useStyles()
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
          events: 'event26',
          eventName: 'Sign out'
        })
        // reset user data and log-out
        sessionStorage.setItem('isDashboardTracked',false)
        window.$role = "Public"
        //TODO: use env variable for logout domain
        window.location.assign(process.env.REACT_APP_LOGOUT_LINK)
      }
    }
    // log-in
    else {
      trackEvent({
        prop53: `BioBank_TopNav|Sign-In`,
        eVar53: `BioBank_TopNav|Sign-In`,
        events: 'event26',
        eventName: 'Sign in'
      })
      // window.location.assign(process.env.REACT_APP_LOGIN_LINK)
      window.location.assign(`${process.env.REACT_APP_LOGIN_LINK}?date=${Date.now()}`)
    }
  }
  return auth ? 
    loc.includes('account') ?
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>{t('buttons.sign_out')}</Button>
      :
      <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>{t('buttons.your_account')}</Button>
    :
    <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>{t('buttons.sign_in')}</Button>
}

export default LoginButton