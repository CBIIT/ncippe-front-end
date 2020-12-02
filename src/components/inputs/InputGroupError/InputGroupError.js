import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  root: {
    borderLeft: `10px solid ${theme.palette.error.main}`,
    padding: theme.spacing(0, 2),
    marginTop: theme.spacing(1)
  },
  errorText: {
    color: theme.palette.error.text,
    fontWeight: 'bold'
  }
}),{name: 'InputGroupError'})

const InputGroupError = (props) => {
  const classes = useStyles()
  const {children, error = false, errorMessage = ''} = props

  return error ? (
    <div className={classes.root}>
      {children}
      <Typography className={classes.errorText}>{errorMessage}</Typography>
    </div>
  ) : children
}

export default InputGroupError