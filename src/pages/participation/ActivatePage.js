import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
}))

const CreateAccount = (e) => {
  console.log("send to Create Account on login.gov")
}

export default () => {
  const classes = useStyles()
  return (
    <Box my={6} className={classes.root}>
      <Container className={classes.mainContainer}>
        <Button variant="contained" color="primary"onClick={CreateAccount}>Login Now</Button>
      </Container>
    </Box>
  )
}