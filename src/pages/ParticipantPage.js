import React from 'react'
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import ParticipantView from '../components/ParticipantView/ParticipantView'

const useStyles = makeStyles(theme => ({

}))

export default ({userName}) => {
  const classes = useStyles()
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Reports" />
      <Container className="mainContainer">
        <ParticipantView userName={userName} />
      </Container>
    </Box>
  )
}