import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
import { AuthContext } from './AuthContext'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const { isAuthenticated, signinRedirect, signoutRedirectCallback } = useContext(AuthContext)
  const { auth } = loginContext
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
  return <Button variant="contained" color="primary" onClick={handleClick}>Log {auth ? 'Out' : 'In'}</Button>
}

export default LoginButton