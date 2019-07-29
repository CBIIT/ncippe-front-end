import React from 'react';
import { Box, Container } from '@material-ui/core';
import MockRoles from './MockRoles';

const HomePage = (props) => {
  return (
    <Container>
      <Box mb={6} >
        <MockRoles />
      </Box>
    </Container>
  )
}

export default HomePage