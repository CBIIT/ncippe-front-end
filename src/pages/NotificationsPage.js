import React from 'react'
import { Box, Container} from '@material-ui/core';

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Notifications from '../components/Notifications/Notifications'

export default () => {
  return (
    <Box my={0} mx={0}>
      <Breadcrumbs pageName="Notifications" />
      <Container>
        <Notifications />
      </Container>
    </Box>
  )
}