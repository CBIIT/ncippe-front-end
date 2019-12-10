import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
import { AuthContext } from './AuthContext'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const { signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const { auth } = loginContext
  const { t } = useTranslation('common');
  const handleClick = () => {
    if(auth) {
      // reset user data and log-out
      signoutRedirectCallback()
      dispatch({
        type: 'reset'
      })
    } else {
      // Using openID to redirect to login.gov
      signinRedirect()
    }
  }
  return <Button variant="contained" color="primary" onClick={handleClick}>{auth ? t('buttons.sign_out') : t('buttons.sign_in')}</Button>
}

export default LoginButton