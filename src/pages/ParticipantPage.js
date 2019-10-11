import React from 'react'
import { Box, Container } from '@material-ui/core'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ParticipantView from '../components/ParticipantView/ParticipantView'

export default (props) => {
  const {patientId, location} = props
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Reports" link={location.state.forceNavigation} />
      <Container className="mainContainer">
        <ParticipantView patientId={patientId} />
      </Container>
    </Box>
  )
}