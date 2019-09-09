import React from 'react'
import { Box, Container} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Notifications from '../components/Notifications/Notifications'
const useStyles = makeStyles(theme => ({

}))

export default () => {
  const classes = useStyles()
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <Notifications />
      </Container>
    </Box>
  )
}