import React, { useContext } from 'react'
import { navigate, useLocation } from "@reach/router"
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LoginContext } from '../Login.context'
// import { AuthContext } from './AuthContext'
// import { useTracking } from 'react-tracking'

const useStyles = makeStyles(theme => ({
  button: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 224
    }
  }
}))

const LoginButton = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)
  // const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const { auth } = loginContext
  const location = useLocation()
  //TODO: add propTypes
  const { isAccount = location.pathname.includes('account'), trackEvent = (e) => console.log('track event', e)} = props
  const { t } = useTranslation('common');
  // const { trackEvent } = useTracking()

  const handleClick = () => {
    
    if(auth) {
      // return to account page from a public page
      if(!isAccount) {
        navigate('/account')
      }
      else {
        // log-out
        trackEvent('sign out')
        // reset user data and log-out
        sessionStorage.setItem('isDashboardTracked',false)
        window.$role = "Public"
        window.location.assign(process.env.REACT_APP_LOGOUT_LINK)
      }
    }
    // log-in
    else {
      trackEvent('sign in')
      // window.location.assign(process.env.REACT_APP_LOGIN_LINK)
      window.location.assign(`${process.env.REACT_APP_LOGIN_LINK}?date=${Date.now()}`)
    }
  }
  return auth ? 
    isAccount ?
      <Button className={classes.button} variant="outlined" color="primary" onClick={handleClick}>{t('buttons.sign_out')}</Button>
      :
      <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>{t('buttons.your_account')}</Button>
    :
    <Button className={classes.button} variant="contained" color="primary" onClick={handleClick}>{t('buttons.sign_in')}</Button>
}

export default LoginButton