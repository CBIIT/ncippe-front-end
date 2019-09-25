import React from 'react';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

import { AuthConsumer } from '../components/login/AuthContext'

const useStyles = makeStyles( theme => ({
  titleUploading: {
    marginLeft: theme.spacing(3),
    display: 'inline'
  },
}))

const SignInCallback = (props) => {
  const classes = useStyles()

  return (
    <AuthConsumer>
      {({ signinRedirectCallback }) => {
        signinRedirectCallback()
        return (
          <Box>
            <CircularProgress className={classes.progress} size={70} />
            <Typography className={classes.titleUploading} variant="h6">Loading User Data...</Typography>
          </Box>
        )
      }}
    </AuthConsumer>
  )
}

export default SignInCallback