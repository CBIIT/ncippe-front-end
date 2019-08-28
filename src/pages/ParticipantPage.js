import React from 'react'
import { Box, Container } from '@material-ui/core';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ParticipantView from '../components/ParticipantView/ParticipantView'

export default ({userName}) => {
  return (
    <Box my={0} mx={0}>
      <Breadcrumbs pageName="Reports" />
      <Container>
        <ParticipantView userName={userName} />
      </Container>
    </Box>
  )
}