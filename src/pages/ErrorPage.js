import React from 'react'
import { Link as RouterLink } from "@reach/router"
import { Box, Container, Button, Link, Typography } from '@material-ui/core'
import Status from '../components/Status/Status'


const ErrorPage = (props) => {
  const errorDefaults = {
    status: "error",
    name: "Error",
    message: "An undefined error has occured."
  }
  const error = {
    ...errorDefaults,
    ...props.location.state.error
  }
  return (
    <Container>
      <Box my={6} mx={0}>
        <Status state={error.status} title={error.name} message={error.message} />
        <Link component={RouterLink} to='/'>
          <Button variant="outlined" color="primary">Return to homepage</Button>
        </Link>
      </Box>
    </Container>
  )
}

export default ErrorPage