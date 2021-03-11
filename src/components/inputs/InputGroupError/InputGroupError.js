import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
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
  },
  column: {
    display: 'inline-flex',
    flexDirection: 'column',
  }
}),{name: 'InputGroupError'})

/**
 * This is a HoC for adding error messages to form fields
 */
const InputGroupError = (props) => {
  const classes = useStyles()
  const {children, error = false, errorMessage = '', variant = false} = props

  return error ? (
    // <div className={classes.root}>
    <div className={`${classes.root} ${variant ? classes[variant] : ''}`}>
      {children}
      <Typography className={classes.errorText}>{errorMessage}</Typography>
    </div>
  ) : children
}

InputGroupError.displayName = "InputGroupError"
InputGroupError.propTypes = {
  /**
   * The input group that is wrapped by the error
   */
  children: PropTypes.node.isRequired,
  /**
   * The error state of this component. When `true` the errorMessage is displayed
   */
  error: PropTypes.bool,
  /**
   * The error message displayed (after the form field) when there is an error
   */
  errorMessage: PropTypes.string,
  /**
   * An additional class to add to the component to provide layout options
   */
  variant: PropTypes.string
}

export default InputGroupError