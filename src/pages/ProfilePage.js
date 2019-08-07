import React from 'react'
import { Box, Container } from '@material-ui/core';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Profile from '../components/Profile/Profile'

export default () => {
  return (
    <Box my={0} mx={0}>
      <Breadcrumbs pageName="Profile" />
      <Container>
        <Profile />
      </Container>
    </Box>
  )
}