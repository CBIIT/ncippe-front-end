import React, { useContext, useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'

import { api } from '../data/api'
import { LoginConsumer, LoginContext } from '../components/login/Login.context'
import { getBool, formatPhoneNumber } from '../utils/utils'
import UploadReport from '../components/Mocha/UploadReport'

const MochaDashboard = (props) => {
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