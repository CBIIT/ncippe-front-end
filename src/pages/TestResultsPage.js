import React from 'react'
import { Box, Container } from '@material-ui/core';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import TestResults from '../components/TestResults/TestResults'

export default ({userName}) => {
  return (
    <Box my={0} mx={0}>
      <Breadcrumbs pageName="Reports" />
      <Container>
        <TestResults userName={userName} />
      </Container>
    </Box>
  )
}