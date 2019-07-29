import React from 'react'
import { Button } from '@material-ui/core';
import { LoginConsumer } from './Login.context'

const LoginButton = () => {
  return (
    <LoginConsumer>
      {({auth, handleClick}) => (
        <Button onClick={handleClick}>Sign {auth ? 'Out' : 'In'}</Button>
      )}
    </LoginConsumer>
  )
}

export default LoginButton