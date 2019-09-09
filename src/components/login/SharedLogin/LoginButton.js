import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'

const LoginButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const handleClick = () => {
    if(loginContext.auth) {
      // reset user data and log-out
      dispatch({
        type: 'reset'
      })
    } else {
      // This is where we dispatch action to trigger login modal
      alert('Sign in form not implemented yet')
    }
  }
  return <Button variant="outlined" color="primary" onClick={handleClick}>Log {loginContext.auth ? 'Out' : 'In'}</Button>
}

export default LoginButton