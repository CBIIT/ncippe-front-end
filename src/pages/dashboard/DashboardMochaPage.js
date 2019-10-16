import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'

import { LoginConsumer } from '../../components/login/Login.context'
import UploadReport from '../../components/Mocha/UploadReport'

const MochaDashboard = () => {
  return (
    <Box>
      <Container className="mainContainer--dashboard">
          <LoginConsumer>
          {([{firstName, lastName}]) => <Box my={6} mx={0}><Typography variant='h1' component='h1' gutterBottom>Welcome, {firstName} {lastName}</Typography></Box>}
          </LoginConsumer>
          <UploadReport />
      </Container>
    </Box>
  )
}

export default MochaDashboard