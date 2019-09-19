import React from 'react'
import { Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'




const useStyles = makeStyles(theme => ({

}))

const CreateAccount = (event) => {alert('login.gov')}
export default () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Container className={classes.mainContainer}>
        <Button variant="contained" color="primary"onClick={CreateAccount}>Create a login.gov account</Button>
        <Button variant="outlined" color="primary">Already have an account</Button>
        
     </Container>
    </Box>
  )
}