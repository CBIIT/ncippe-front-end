import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { navigate, useLocation } from "@reach/router"
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import PubSub from 'pubsub-js'
import { LoginContext } from '../Login.context'

/**
 * The login button will change state according to the user's login state
 */
const LoginButton = (props) => {
  const [loginContext] = useContext(LoginContext)
  const { auth } = loginContext
  const location = useLocation()
  // destructure props
  const { isAccount = location.pathname.includes('account')} = props
  const { t } = useTranslation('common')

  const handleClick = () => {
    
    if(auth) {
      // return to account page from a public page
      if(!isAccount) {
        // track event - go to dashboard?
        navigate('/account')
      }
      else {
        // log-out
        PubSub.publish('ANALYTICS', {
          eventName: 'Sign out',
          events: 'event26',
          prop53: `BioBank_TopNav|Sign-Out`,
          eVar53: `BioBank_TopNav|Sign-Out`,
        })
        // reset user data and log-out
        sessionStorage.setItem('isDashboardTracked',false)
        window.$role = "Public"
        window.location.assign(process.env.REACT_APP_LOGOUT_LINK)
      }
    }
    // log-in
    else {
      PubSub.publish('ANALYTICS', {
        eventName: 'Sign in',
        events: 'event26',
        prop53: `BioBank_TopNav|Sign-In`,
        eVar53: `BioBank_TopNav|Sign-In`,
      })
      window.location.assign(`${process.env.REACT_APP_LOGIN_LINK}?date=${Date.now()}`)
    }
  }
  return auth ? 
    isAccount ?
      <Button variant="outlined" color="primary" onClick={handleClick}>{t('buttons.sign_out')}</Button>
      :
      <Button variant="contained" color="primary" onClick={handleClick}>{t('buttons.your_account')}</Button>
    :
    <Button variant="contained" color="primary" onClick={handleClick}>{t('buttons.sign_in')}</Button>
}

LoginButton.displayName = 'LoginButton'
LoginButton.propTypes = {
  /**
   * state when an authenticated user is in the account dashboard
   */
  isAccount: PropTypes.bool,
}

export default LoginButton