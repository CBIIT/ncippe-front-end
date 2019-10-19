import React from 'react'
import { Box, Container} from '@material-ui/core'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import ChangeParticipation from '../../components/Participation/Participation'



const TestResults = (props) => {

  return (
    <Box className="popup">
      <Breadcrumbs pageName="Participation" />
      <Container className="mainContainer">
        <ChangeParticipation />
      </Container>
    </Box>
  )
}

export default TestResults