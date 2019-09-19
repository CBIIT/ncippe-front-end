import React from 'react'
import { Box, Container} from '@material-ui/core'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Notifications from '../components/Notifications/Notifications'

export default () => {
  return (
    <Box className="popup">
      <Breadcrumbs pageName="Notifications" />
      <Container className="mainContainer">
        <Notifications />
      </Container>
    </Box>
  )
}