import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
import { AuthContext } from './AuthContext'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const { isAuthenticated, signinRedirect } = useContext(AuthContext)
  const handleClick = () => {
    if(isAuthenticated()) {
      // reset user data and log-out
      dispatch({
        type: 'reset'
      })
    } else {
      // This is where we dispatch action to trigger login modal
      // alert('Sign in form not implemented yet')
      // console.log(createSigninRequest)
      signinRedirect()

    }
  }
  return <Button variant="contained" color="primary" onClick={handleClick}>Log {isAuthenticated() ? 'Out' : 'In'}</Button>
}

export default LoginButton