import React, { useContext, useEffect } from 'react';
import { Box, Container, Divider, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { api } from '../data/api'
import { LoginConsumer, LoginContext } from '../components/login/SharedLogin/Login.context'
import { getBool, formatPhoneNumber } from '../utils/utils'
import UploadReport from '../components/Mocha/UploadReport'

const useStyles = makeStyles( theme => ({

}))

const MochaDashboard = (props) => {
  const classes = useStyles()
  const [loginContext, dispatch] = useContext(LoginContext)

  // fetch profile data for the logged in user
  useEffect(() => {
    const {userName, token, env, userGUID} = loginContext
    // fetch call
    api[env].fetchUser({userGUID, userName, token})
      .then(data => {
        const userData = {
          ...data,
          allowEmailNotification: getBool(data.allowEmailNotification), //convert "allowEmailNotification" to boolean
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
    <Box my={6} mx={0}>
      <Container>
        <Box my={6} mx={0}>
          <LoginConsumer>
          {([{firstName, lastName, roleName}]) => <Typography variant='h3' component='h1' gutterBottom>Welcome, {firstName} {lastName}</Typography>}
          </LoginConsumer>

          <UploadReport />
        </Box>
      </Container>
    </Box>
  )
}

export default MochaDashboard