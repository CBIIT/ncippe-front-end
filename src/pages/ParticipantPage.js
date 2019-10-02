import React from 'react'
import { Box, Container } from '@material-ui/core'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ParticipantView from '../components/ParticipantView/ParticipantView'

export default ({patientId}) => {
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Reports" />
      <Container className="mainContainer">
        <ParticipantView patientId={patientId} />
      </Container>
    </Box>
  )
}