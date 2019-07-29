import React from 'react'

import Profile from '../components/Profile/Profile'
import { Box, Container } from '@material-ui/core';

export default () => {
  return (
    <Box my={6} mx={0}>
      <Container>
        <Profile />
      </Container>
    </Box>
  )
}