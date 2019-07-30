import React from 'react'
import { Route } from 'react-router-dom'
import { Box, Container, Typography, Grid, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { LoginConsumer } from '../components/login/SharedLogin/Login.context'

// import LoginContext from '../context/login'

// import Profile from '../components/Profile/Profile'
// import classes from '*.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    display: "flex",
    alignItems: "flex-end",
    minHeight: 250,
    minWidth: 100,
    maxWidth: 300,
    cursor: "pointer"
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box my={6} mx={0}>
      <Container>
        <LoginConsumer>
        {({firstName, lastName}) => {
          return (
            <Box my={6} mx={0}>
              <Typography variant='h3' component='h1' gutterBottom>Welcome, {firstName} {lastName}</Typography>
              <Typography>Thank you for joining the Cancer Moonshot Bitobank Program!</Typography>
            </Box>
          )
        }}
        </LoginConsumer>
        <Grid container className={classes.grid} spacing={2}>

          {/* User Profile */}
          <Grid item>
            <Route render={({ history }) => (
              <Card className={classes.card} onClick={()=>{history.push('/dashboard/profile')}}>
                <CardContent>
                  <Typography variant="h4" component="h2">Your Profile</Typography>
                  <Typography>Keep your contact information up to date to receive program notifications</Typography>
                </CardContent>
              </Card>
            )} />
          </Grid>
          {/* END: User Profile */}
          
        </Grid>
      </Container>
    </Box>
  )
}
