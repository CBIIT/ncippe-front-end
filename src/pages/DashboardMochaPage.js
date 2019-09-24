import React, { useContext, useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'

import { api } from '../data/api'
import { LoginConsumer, LoginContext } from '../components/login/SharedLogin/Login.context'
import { getBool, formatPhoneNumber } from '../utils/utils'
import UploadReport from '../components/Mocha/UploadReport'

const MochaDashboard = (props) => {
  const [loginContext, dispatch] = useContext(LoginContext)

  // fetch profile data for the logged in user
  useEffect(() => {
    const {userName, token, env, userGUID} = loginContext
    // fetch call
    api[env].fetchUser({userGUID, userName, token})
      .then(data => {
        const userData = {
          ...data,
          phoneNumber: formatPhoneNumber(data.phoneNumber), //format "phoneNumber" field
        }
        
        //TODO: set context
        dispatch({
          type: 'update',
          userData
        })

      })
  }, []) // This effect never not re-runs

  return (
    <Box>
      <Container className="mainContainer--dashboard">
          <LoginConsumer>
          {([{firstName, lastName, roleName}]) => <Box my={6} mx={0}><Typography variant='h1' component='h1' gutterBottom>Welcome, {firstName} {lastName}</Typography></Box>}
          </LoginConsumer>

          <UploadReport />
      </Container>
    </Box>
  )
}

export default MochaDashboard