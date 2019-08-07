import React from 'react'

import TestResults from '../components/TestResults/TestResults'
import { Box, Container } from '@material-ui/core';

export default () => {
  return (
    <Box my={6} mx={0}>
      <Container>
        <TestResults />
      </Container>
    </Box>
  )
}