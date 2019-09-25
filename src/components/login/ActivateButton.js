import React, { useContext } from 'react'
import { Button } from '@material-ui/core';
import { LoginContext } from './Login.context'
import { Link } from '@reach/router'


const ActivateButton = () => {
  const [loginContext, dispatch] = useContext(LoginContext)
  const handleClick = () => {
    if(loginContext.auth) {
      // reset user data and log-out
      dispatch({
        type: 'reset'
      })
    } else {
      // This is where we dispatch action to trigger login modal
      alert('Activate form not implemented yet')
    }
  }
  return <Button variant="outlined" color="primary" component={Link} to="/activate">Activate Account</Button>
}


export default ActivateButton