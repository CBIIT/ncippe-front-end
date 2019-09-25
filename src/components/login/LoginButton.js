import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
import { AuthContext } from './AuthContext'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const { isAuthenticated, signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const handleClick = () => {
    if(isAuthenticated()) {
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
  return <Button variant="contained" color="primary" onClick={handleClick}>Log {isAuthenticated() ? 'Out' : 'In'}</Button>
}

export default LoginButton